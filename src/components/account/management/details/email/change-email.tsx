import { Component, Event, EventEmitter, State, Prop, Method } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-change-email',
})
export class ChangeEmail {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @Prop()
  history: RouterHistory;

  @Event({ eventName: 'profileChange' })
  onProfileChange: EventEmitter;

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  password: string;

  @State()
  passwordVisible: boolean = false;

  @State()
  email: string;

  @Method()
  show() {
    this.email = this.user.email;
    this.panel.show();
  }

  @Method()
  close() {
    this.panel.close();
  }

  @Method()
  reset() {
    this.panel.close();
    this.alert.close();
    this.loading = false;
    this.password = '';
    this.email = '';
  }

  handlepasswordChange(e) {
    this.password = e.target.value;
  }

  handleEmailChange(e) {
    this.email = e.target.value;
  }

  async changeEmail(e) {
    e.preventDefault();

    this.loading = true;
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(this.user.email, this.password);
      await this.user.reauthenticateAndRetrieveDataWithCredential(credentials);
      await this.user.updateEmail(this.email);
      this.history.push(`/verify?send=true&email=${this.email}`);
    } catch (error) {
      console.log(error);
      this.alertMsg = getAlertMessage(error.code, this.user.email);
      this.alert.show();
      this.loading = false;
    }
  }

  render() {
    return (
      <blaze-drawer position="right" dismissible ref={(drawer) => (this.panel = drawer)}>
        <button type="button" class="c-button c-button--close" onClick={() => this.panel.close()}>
          ×
        </button>
        <blaze-card>
          <form onSubmit={(e) => this.changeEmail(e)}>
            <blaze-card-header>
              <h2 class="c-heading u-gradient-text">Change email</h2>
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
              <label class="o-form-element c-label">
                Password:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i aria-hidden={true} class="fa-fw fas fa-lock c-icon" />
                    <input
                      type={this.passwordVisible ? 'text' : 'password'}
                      value={this.password}
                      class="c-field"
                      required
                      disabled={this.loading}
                      minLength={6}
                      onInput={(e) => this.handlepasswordChange(e)}
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
              <label class="c-label o-form-element">
                Email address:
                <div class="o-field o-field--icon-left">
                  <i aria-hidden={true} class="fa-fw fas fa-at c-icon" />
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
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--success" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-save" />
                </span>
                Save email
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
