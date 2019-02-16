import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import services from '@/firebase/services';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-complete',
})
export class Complete {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  alertMsg: AlertMessage = {};

  emailVerified() {
    this.alertMsg = getAlertMessage('auth/verified');
    this.alert.show();
    setTimeout(() => this.history.push('/dashboard'), 5000);
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!this.history.location.query.oobCode) throw { code: 'auth/missing-action-code' };

      if (!user) return this.history.push(`/login?oobCode=${this.history.location.query.oobCode}`);
      this.user = user;

      try {
        if (this.user.emailVerified) {
          return this.emailVerified();
        }
        await firebase.auth().applyActionCode(this.history.location.query.oobCode);
        await this.user.reload();

        await services.setupAccount(this.user);
        this.emailVerified();
      } catch (error) {
        console.error(error);
        if (this.user.emailVerified) {
          return this.emailVerified();
        }

        this.alertMsg = getAlertMessage(error.code, this.user.email);
        this.alert.show();
      }
    });
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Account setup..." />
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading">Account setup...</h2>
          </blaze-card-header>
          <blaze-card-body>
            <p class="u-paragraph">
              We're checking <span class="u-text--loud">{this.user.email}</span> was used to setup a new account.
            </p>
          </blaze-card-body>
          <blaze-card-footer>
            <blaze-alert ref={(alert) => (this.alert = alert)} type={this.alertMsg.type}>
              <div>{this.alertMsg.message}</div>
              <div>
                {this.alertMsg.action && (
                  <stencil-route-link
                    url={this.alertMsg.action.url}
                    anchorClass="c-link"
                    anchorRole="link"
                    anchorTitle={this.alertMsg.action.text}>
                    {this.alertMsg.action.text}
                  </stencil-route-link>
                )}
              </div>
            </blaze-alert>
          </blaze-card-footer>
        </blaze-card>
      </div>
    );
  }
}
