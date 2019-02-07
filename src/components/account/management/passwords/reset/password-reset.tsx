import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-reset-password',
})
export class ResetPassword {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  complete: boolean;

  @State()
  email: string;

  @State()
  alertMsg: AlertMessage = {};

  handleEmailChange(e) {
    this.email = e.target.value;
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.email = this.history.location.query.email;
  }

  async send(e) {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(this.email);
      this.complete = true;
      this.alert.show();
    } catch (error) {
      console.error(error);
      this.complete = true;
      this.alertMsg = getAlertMessage(error.code);
      this.alert.show();
    }
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Reset password" />
        <blaze-card>
          <form onSubmit={(e) => this.send(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Reset password</h2>
            </blaze-card-header>
            <blaze-card-body>
              <blaze-alert ref={(alert) => (this.alert = alert)} type="success">
                Password reset email sent.
              </blaze-alert>
              <label class="c-label o-form-element">
                Email address:
                <div class="o-field o-field--icon-left">
                  <i class="fa-fw fas fa-at c-icon" />
                  <input
                    type="email"
                    value={this.email}
                    class="c-field c-field--label"
                    disabled={this.complete}
                    required
                    onInput={(e) => this.handleEmailChange(e)}
                  />
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button
                class="c-button c-button--brand c-button--block"
                disabled={this.complete}
                onClick={(e) => this.send(e)}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fa-fw fas fa-paper-plane" />
                </span>
                Send password reset email
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </div>
    );
  }
}
