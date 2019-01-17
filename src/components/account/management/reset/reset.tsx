import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-reset-password',
})
export class Reset {
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

  componentDidLoad() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        return this.history.push(`/verify?resend=true&email=${user.email}`);
      }

      this.email = this.history.location.query.email;
    });
  }

  send(e) {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(this.email)
      .then(() => {
        this.complete = true;
        this.alert.show();
      })
      .catch((error) => {
        console.error(error);
        this.complete = true;
        this.alertMsg = getAlertMessage(error.code);
        this.alert.show();
      });
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-letter-box-super">
        <blaze-card>
          <form onSubmit={(e) => this.send(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Reset password</h2>
            </blaze-card-header>
            <blaze-card-body>
              <blaze-alert ref={(alert) => (this.alert = alert)} type="info">
                Password reset email sent.
              </blaze-alert>
              <label class="c-label o-form-element">
                Email address:
                <div class="o-field o-field--icon-left">
                  <i class="fas fa-at c-icon" />
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
                Send password reset email
                <span class="c-button__icon-right" aria-hidden>
                  <i class="fas fa-paper-plane" />
                </span>
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </div>
    );
  }
}
