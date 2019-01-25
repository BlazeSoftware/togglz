import { Component, Prop, State, Listen } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-management',
})
export class Account {
  changeNamePopup: any;
  changeEmailPopup: any;
  changePasswordPopup: any;
  generateKeyPopup: any;
  deleteAccountPopup: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  displayName: string;

  @State()
  email: string;

  @State()
  settings: any = {};

  @State()
  loading: boolean = true;

  @Listen('profileChange')
  async onProfileChange({ detail }) {
    this.displayName = detail.displayName;
    this.email = detail.email;
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      this.user = user;
      this.displayName = user.displayName;
      this.email = user.email;
      this.loading = false;

      const settingsRef = store.collection('settings').doc(this.user.uid);

      settingsRef.onSnapshot((settingsSnapshot) => {
        this.settings = settingsSnapshot.data();
      });

      const settingsSnapshot = await settingsRef.get();
      this.settings = settingsSnapshot.data();
    });
  }

  renderInfoRow(label: string, value: string, popup?: any) {
    return (
      <div class="o-grid o-grid--center">
        <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">{label}:</label>
        <span class="o-grid__cell u-text--loud">
          {!this.loading && (
            <span>
              {value || <span class="u-text--normal u-text--highlight u-text--quiet">None set</span>}
              {popup && (
                <button class="c-edit-info c-button c-button--nude" onClick={() => popup.show()}>
                  <i class="fas fa-pencil-alt" />
                </button>
              )}
            </span>
          )}
        </span>
      </div>
    );
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Account" />
        <h2 class="c-heading">Account</h2>
        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Details</h3>
          </blaze-card-header>
          <blaze-card-body>
            {this.renderInfoRow('Name', this.user.displayName, this.changeNamePopup)}
            {this.renderInfoRow('Email', this.user.email, this.changeEmailPopup)}
            {this.renderInfoRow('Verified', 'Yes')}
            {this.renderInfoRow('Password', '**************', this.changePasswordPopup)}
            {this.renderInfoRow('Joined', this.user.metadata && this.user.metadata.creationTime)}
            {this.renderInfoRow('Last logged in', this.user.metadata && this.user.metadata.lastSignInTime)}
          </blaze-card-body>
        </blaze-card>

        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Development settings</h3>
          </blaze-card-header>
          <blaze-card-body>
            <div class="o-grid o-grid--top">
              <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">Authorised domains:</label>
              <span class="o-grid__cell u-text--loud">
                <ul class="c-list c-list--unstyled">
                  <li class="c-list__item">localhost</li>
                  <li class="c-list__item">togglz.com</li>
                </ul>
              </span>
            </div>
            <div class="o-grid o-grid--top">
              <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">Web API key:</label>
              <span class="o-grid__cell">
                <code class="u-code">{this.settings.webAPIKey}</code>
                <button class="c-edit-info c-button c-button--nude" onClick={() => this.generateKeyPopup.show()}>
                  <i class="fas fa-sync-alt" />
                </button>
              </span>
            </div>
          </blaze-card-body>
        </blaze-card>

        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Danger Zone</h3>
          </blaze-card-header>
          <blaze-card-body>
            <div class="o-grid o-grid--center">
              <span class="o-grid__cell o-grid__cell--width-20">
                <button
                  type="button"
                  class="c-button c-button--ghost-error"
                  onClick={() => this.deleteAccountPopup.show()}>
                  Delete account
                </button>
              </span>
              <label class="o-grid__cell u-text--quiet">
                Once you delete an account, that's it, there is no recovery.
              </label>
            </div>
          </blaze-card-body>
        </blaze-card>

        <account-change-name user={this.user} ref={(popup) => (this.changeNamePopup = popup)} />
        <account-change-email
          user={this.user}
          history={this.history}
          ref={(popup) => (this.changeEmailPopup = popup)}
        />
        <account-change-password user={this.user} ref={(popup) => (this.changePasswordPopup = popup)} />
        <account-generate-key user={this.user} ref={(popup) => (this.generateKeyPopup = popup)} />
        <account-delete user={this.user} history={this.history} ref={(popup) => (this.deleteAccountPopup = popup)} />
      </nav-page>
    );
  }
}
