import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-login',
})
export class Login {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  email: string;

  @State()
  password: string;

  @State()
  passwordVisible: boolean = false;

  handleEmailChange(e) {
    this.email = e.target.value;
  }

  handlePasswordChange(e) {
    this.password = e.target.value;
  }

  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(({ user }) => {
        if (user.emailVerified) {
          return this.history.push('/dashboard');
        }
        return this.history.push(`/verify?email=${user.email}`);
      })
      .catch((error) => {
        console.log(error);
        this.alertMsg = getAlertMessage(error.code, this.email);
        this.alert.show();
      });
  }

  componentDidLoad() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          return this.history.push('/dashboard');
        }
        return this.history.push(`/verify?email=${user.email}`);
      }
    });
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-letter-box-super">
        <blaze-card>
          <form onSubmit={(e) => this.login(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Log In</h2>
            </blaze-card-header>
            <blaze-card-body>
              <blaze-alert ref={(alert) => (this.alert = alert)} type={this.alertMsg.type} dismissible>
                {this.alertMsg.message}
              </blaze-alert>
              <label class="c-label o-form-element">
                Email address:
                <div class="o-field o-field--icon-left">
                  <i class="fas fa-at c-icon" />
                  <input
                    type="email"
                    value={this.email}
                    class="c-field c-field--label"
                    required
                    onInput={(e) => this.handleEmailChange(e)}
                  />
                </div>
              </label>

              <label class="o-form-element c-label">
                Password:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i class="fas fa-lock c-icon" />
                    <input
                      type={this.passwordVisible ? 'text' : 'password'}
                      value={this.password}
                      class="c-field"
                      required
                      minLength={6}
                      onInput={(e) => this.handlePasswordChange(e)}
                    />
                  </div>
                  <button
                    type="button"
                    class="c-button c-button--ghost-brand"
                    onClick={() => (this.passwordVisible = !this.passwordVisible)}>
                    {this.passwordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <blaze-button type="brand" full>
                Log In
                <span class="c-button__icon-right" aria-hidden>
                  <i class="fas fa-sign-in-alt" />
                </span>
              </blaze-button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </div>
    );
  }
}
