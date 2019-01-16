import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-complete',
})
export class Complete {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  email: string;

  @State()
  alertMsg: AlertMessage = {};

  componentDidLoad() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return this.history.push('/login');
      }

      this.email = user.email;

      if (!this.history.location.query.oobCode) {
        this.alertMsg = getAlertMessage('auth/missing-action-code', this.email);
        return this.alert.show();
      }

      firebase
        .auth()
        .applyActionCode(this.history.location.query.oobCode)
        .then(() =>
          user.reload().then(() => {
            this.history.push('/dashboard');
          })
        )
        .catch((error) => {
          console.log('Error', error);
          if (user.emailVerified) {
            this.alertMsg = {
              type: 'success',
              message: <span>Account successfully created! Please wait whilst we take you to your dashboard.</span>,
            };
            this.alert.show();
            return setTimeout(() => this.history.push('/dashboard'), 4000);
          }

          this.alertMsg = getAlertMessage(error.code, this.email);
          this.alert.show();
        });
    });
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-letter-box-super">
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading">Account setup...</h2>
          </blaze-card-header>
          <blaze-card-body>
            <p class="u-paragraph">
              We're checking <span class="u-text--loud">{this.email}</span> was used to setup a new account.
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
