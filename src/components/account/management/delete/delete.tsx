import { Component, State, Prop, Method } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-delete',
})
export class DeleteAccount {
  alert: any;
  panel: any;

  @Prop()
  history: RouterHistory;

  @Prop()
  user: any = {};

  @State()
  alertMsg: AlertMessage = {};

  @State()
  currentPassword: string;

  @State()
  currentPasswordVisible: boolean = false;

  @State()
  loading: boolean;

  @Method()
  show() {
    this.panel.show();
  }

  @Method()
  close() {
    this.panel.close();
  }

  handleCurrentPasswordChange(e) {
    this.currentPassword = e.target.value;
  }

  async deleteAccount(e) {
    e.preventDefault();

    this.loading = true;
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(this.user.email, this.currentPassword);
      await this.user.reauthenticateAndRetrieveDataWithCredential(credentials);

      const featuresSnapshot = await store
        .collection('features')
        .where('owner', '==', this.user.uid)
        .get();

      const batch = store.batch();
      featuresSnapshot.forEach((f) => {
        batch.delete(f.ref);
      });
      await batch.commit();

      await this.user.delete();
      await firebase.auth().signOut();
      this.history.push('/');
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
          <form onSubmit={(e) => this.deleteAccount(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Delete account</h2>
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
              <p class="c-paragraph u-text--highlight">Deleting your account is a permanent action.</p>
              <p class="c-paragraph u-text--quiet u-small">
                If you delete your account all information we hold about you will be destroyed, all your feature toggles
                will be deleted and we will not be able to provide you with any support.
              </p>
              <label class="o-form-element c-label">
                Re-enter your password to confirm:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i class="fas fa-lock c-icon" />
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
                    onClick={() => (this.currentPasswordVisible = !this.currentPasswordVisible)}>
                    {this.currentPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <div class="c-input-group">
                <button
                  class="c-button c-button--block c-button--error"
                  disabled={this.loading}
                  onClick={(e) => this.deleteAccount(e)}>
                  Delete
                </button>
                <button
                  type="button"
                  class="c-button c-button--block"
                  disabled={this.loading}
                  onClick={() => this.panel.close()}>
                  Cancel
                </button>
              </div>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
