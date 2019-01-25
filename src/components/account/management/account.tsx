import { Component, Prop, State, Listen } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-management',
})
export class Account {
  changeNamePopup: any;
  changeEmailPopup: any;
  changePasswordPopup: any;
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
      console.log(user);
      this.displayName = user.displayName;
      this.email = user.email;
      this.loading = false;
    });
  }

  renderInfoRow(label: string, value: string, popup?: any) {
    return (
      <div class="o-grid o-grid--no-gutter o-grid--center">
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
            <div class="o-grid o-grid--no-gutter o-grid--center">
              <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">Web API key:</label>
              <span class="o-grid__cell">
                <code class="u-code">8324ujr329ru08au38423d3wesad</code>
              </span>
            </div>

            <div class="o-grid o-grid--no-gutter o-grid--top">
              <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">Authorised domains:</label>
              <span class="o-grid__cell u-text--loud">
                <ul class="c-list c-list--unstyled">
                  <li class="c-list__item">localhost</li>
                  <li class="c-list__item">togglz.com</li>
                </ul>
              </span>
            </div>
          </blaze-card-body>
          <blaze-card-footer>
            <button type="button" class="c-button c-button--brand">
              <span class="c-button__icon-left" aria-hidden>
                <i class="fas fa-key" />
              </span>
              Generate new key
            </button>
          </blaze-card-footer>
        </blaze-card>

        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Danger Zone</h3>
          </blaze-card-header>
          <blaze-card-body>
            <div class="o-grid o-grid--no-gutter o-grid--center">
              <span class="o-grid__cell o-grid__cell--width-20">
                <button
                  type="button"
                  class="c-button c-button--ghost-error"
                  onClick={() => this.deleteAccountPopup.show()}>
                  Delete account
                </button>
              </span>
              <label class="o-grid__cell u-text--quiet">Once you delete an account, there is no recovery.</label>
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
        <account-delete user={this.user} history={this.history} ref={(popup) => (this.deleteAccountPopup = popup)} />
      </nav-page>
    );
  }
}
