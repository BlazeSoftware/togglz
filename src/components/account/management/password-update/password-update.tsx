import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-update-password',
})
export class UpdatePassword {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  loading: boolean;

  @State()
  password: string;

  @State()
  passwordVisible: boolean = false;

  @State()
  alertMsg: AlertMessage = {};

  handlePasswordChange(e) {
    this.password = e.target.value;
  }

  passwordChanged() {
    this.alertMsg = {
      type: 'success',
      message: <span>Password successfully updated! Please wait whilst we take you to your dashboard.</span>,
    };
    this.alert.show();
    setTimeout(() => this.history.push('/dashboard'), 5000);
  }

  async updatePassword(e) {
    e.preventDefault();
    this.loading = true;
    try {
      await firebase.auth().confirmPasswordReset(this.history.location.query.oobCode, this.password);
      this.passwordChanged();
    } catch (error) {
      console.error(error);
      this.loading = false;
      this.alertMsg = getAlertMessage(error.code, this.password);
      this.alert.show();
    }
  }

  async componentDidLoad() {
    if (!this.history.location.query.oobCode) throw { code: 'auth/missing-action-code' };

    try {
      await firebase.auth().checkActionCode(this.history.location.query.oobCode);
    } catch (error) {
      console.error(error);
      this.loading = true;
      this.alertMsg = getAlertMessage(error.code);
      this.alertMsg.action.url = '/reset-password';
      this.alert.show();
    }
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Change password" />
        <blaze-card>
          <form onSubmit={(e) => this.updatePassword(e)}>
            <blaze-card-header>
              <h2 class="c-heading">New password</h2>
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
              <button class="c-button c-button--block c-button--success" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fas fa-save" />
                </span>
                Save password
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </div>
    );
  }
}
