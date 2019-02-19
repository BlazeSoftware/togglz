import { Component, State, Prop, Method } from '@stencil/core';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-change-password',
})
export class ChangePassword {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  currentPassword: string;

  @State()
  newPassword: string;

  @State()
  currentPasswordVisible: boolean = false;

  @State()
  passwordVisible: boolean = false;

  @Method()
  show() {
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
    this.currentPassword = '';
    this.newPassword = '';
  }

  handleCurrentPasswordChange(e) {
    this.currentPassword = e.target.value;
  }

  handleNewPasswordChange(e) {
    this.newPassword = e.target.value;
  }

  async changePassword(e) {
    e.preventDefault();

    this.loading = true;
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(this.user.email, this.currentPassword);
      await this.user.reauthenticateAndRetrieveDataWithCredential(credentials);
      await this.user.updatePassword(this.newPassword);
      this.reset();
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
          <form onSubmit={(e) => this.changePassword(e)}>
            <blaze-card-header>
              <h2 class="c-heading u-gradient-text">Change password</h2>
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
                Current:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i class="fa-fw fas fa-lock c-icon" />
                    <input
                      type={this.currentPasswordVisible ? 'text' : 'password'}
                      value={this.currentPassword}
                      class="c-field"
                      required
                      disabled={this.loading}
                      minLength={6}
                      onInput={(e) => this.handleCurrentPasswordChange(e)}
                    />
                  </div>
                  <button
                    type="button"
                    class="c-button c-button--ghost-brand"
                    disabled={this.loading}
                    onClick={() => (this.currentPasswordVisible = !this.currentPasswordVisible)}>
                    {this.currentPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
              <label class="o-form-element c-label">
                New:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i class="fa-fw fas fa-lock c-icon" />
                    <input
                      type={this.passwordVisible ? 'text' : 'password'}
                      value={this.newPassword}
                      class="c-field"
                      required
                      disabled={this.loading}
                      minLength={6}
                      onInput={(e) => this.handleNewPasswordChange(e)}
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
              <button class="c-button c-button--block c-button--success" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i class="fa-fw fas fa-save" />
                </span>
                Save password
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
