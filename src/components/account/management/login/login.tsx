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
  loading: boolean;

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

  async login(e) {
    e.preventDefault();
    this.loading = true;
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
      console.log(this.history.location.query.url);
      if (user.emailVerified) {
        debugger;
        const url = this.history.location.query.url || '/dashboard';
        return this.history.push(url);
      }
      return this.history.push(`/verify?email=${user.email}`);
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.alertMsg = getAlertMessage(error.code, this.email);
      this.alert.show();
    }
  }

  firebaseUnsubscribe: any;
  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          const url = this.history.location.query.url || '/dashboard';
          return this.history.push(url);
        }
        return this.history.push(`/verify?email=${user.email}`);
      }
      this.firebaseUnsubscribe();
    });
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Login" />
        <blaze-card>
          <form onSubmit={(e) => this.login(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Log In</h2>
            </blaze-card-header>
            <blaze-card-body>
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
              <label class="c-label o-form-element">
                Email address:
                <div class="o-field o-field--icon-left">
                  <i class="fas fa-at c-icon" />
                  <input
                    type="email"
                    value={this.email}
                    class="c-field c-field--label"
                    disabled={this.loading}
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
                      disabled={this.loading}
                      required
                      minLength={6}
                      onInput={(e) => this.handlePasswordChange(e)}
                    />
                  </div>
                  <button
                    type="button"
                    class="c-button c-button--ghost-brand"
                    disabled={this.loading}
                    onClick={() => (this.passwordVisible = !this.passwordVisible)}>
                    {this.passwordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--brand" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fas fa-sign-in-alt" />
                </span>
                Log In
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </div>
    );
  }
}
