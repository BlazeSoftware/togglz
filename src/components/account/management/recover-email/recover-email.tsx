import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-recover-email',
})
export class RecoverEmail {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  alertMsg: AlertMessage = {};

  async emailVerified() {
    this.alertMsg = {
      type: 'success',
      message: <span>Email recovered! Please wait whilst we take you to your account.</span>,
    };
    this.alert.show();
    setTimeout(() => this.history.push('/login?url=/account'), 5000);
  }

  async componentDidLoad() {
    if (!this.history.location.query.oobCode) throw { code: 'auth/missing-action-code' };

    try {
      await firebase.auth().applyActionCode(this.history.location.query.oobCode);
      this.emailVerified();
    } catch (error) {
      console.error(error);
      this.alertMsg = getAlertMessage(error.code);
      this.alert.show();
    }
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Recover email" />
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading u-gradient-text">Recover email</h2>
          </blaze-card-header>
          <blaze-card-body>
            <p class="u-paragraph">We're recovering your email address.</p>
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
