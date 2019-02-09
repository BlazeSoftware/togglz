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
  addEnvironmentPopup: any;
  editEnvironmentPopup: any;
  deleteEnvironmentPopup: any;
  deleteAccountPopup: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  plan: any = {};

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

      const plansSnapshot = await store
        .collection('plans')
        .doc(this.user.uid)
        .get();
      this.plan = plansSnapshot.data();

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
      <div class="o-grid o-grid--center o-info-item">
        <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">{label}:</label>
        <span class="o-grid__cell">
          {!this.loading && (
            <span>
              {value || <span class="u-text--normal u-text--highlight u-text--quiet">None set</span>}
              {popup && (
                <button
                  class="c-edit-info c-button c-button--nude c-tooltip c-tooltip--right"
                  aria-label={`Edit ${label.toLowerCase()}`}
                  onClick={() => popup.show()}>
                  <i class="fa-fw fas fa-pencil-alt" />
                </button>
              )}
            </span>
          )}
        </span>
      </div>
    );
  }

  renderEnvironments() {
    const environments = this.settings.environments || [];
    const rows = environments.map((environment) => (
      <tr class="c-table__row">
        <td class="c-table__cell">{environment}</td>
        <td class="c-table__cell c-table__cell--center o-actions">
          <button
            class="c-button c-button--nude c-button--edit"
            aria-label="Edit environment"
            onClick={() => this.editEnvironmentPopup.show(environment)}>
            <i class="fa-fw fas fa-edit" />
          </button>
          <button
            class="c-button c-button--nude c-button--delete"
            aria-label="Remove environment"
            onClick={() => this.deleteEnvironmentPopup.show(environment)}>
            <i class="fa-fw far fa-trash-alt" />
          </button>
        </td>
      </tr>
    ));
    rows.unshift(
      <tr class="c-table__row">
        <td class="c-table__cell">defaults</td>
        <td class="c-table__cell c-table__cell--center">-</td>
      </tr>
    );

    return (
      <table class="c-table c-table--condensed">
        <thead class="c-table__head">
          <tr class="c-table__row c-table__row--heading">
            <th class="c-table__cell">Name</th>
            <th class="c-table__cell c-table__cell--center">Actions</th>
          </tr>
        </thead>
        <tbody class="c-table__body">{rows}</tbody>
      </table>
    );
  }

  render() {
    const environments = this.settings.environments || [];
    const apiCalls = this.settings.apiCalls || 0;
    let usageIndicator = 'info';
    if (apiCalls > 750) usageIndicator = 'warning';
    if (apiCalls > 850) usageIndicator = 'error';

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
            <div class="o-grid o-grid--no-gutter">
              <h3 class="o-grid__cell c-heading">Environments</h3>
              <div class="o-grid__cell u-right">
                <button
                  class="c-button c-button--ghost-success u-small"
                  aria-label="Add new environment"
                  onClick={() => this.addEnvironmentPopup.show()}
                  disabled={environments.length >= 2 && this.plan.current === 'starter'}>
                  <span class="c-button__icon-left" aria-hidden>
                    <i class="fa-fw fas fa-star-of-life" />
                  </span>
                  Add new environment
                </button>
                {environments.length >= 2 && this.plan.current === 'starter' && (
                  <div class="u-small u-text--quiet">Upgrade to Pro</div>
                )}
              </div>
            </div>
          </blaze-card-header>
          <blaze-card-body>{this.renderEnvironments()}</blaze-card-body>
        </blaze-card>

        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Development settings</h3>
          </blaze-card-header>
          <blaze-card-body>
            <div class="o-grid o-grid--top o-info-item">
              <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">Web API requests:</label>
              <span class="o-grid__cell">
                {this.plan.current === 'starter' && (
                  <span>
                    {apiCalls} of your 10,000 limit
                    <blaze-progress size="xsmall" rounded>
                      <blaze-progress-bar value={apiCalls / 100} type={usageIndicator} />
                    </blaze-progress>
                    <div class="u-small u-text--quiet">Upgrade your plan to Pro for unlimited requests</div>
                  </span>
                )}
                {this.plan.current === 'pro' && (
                  <span>
                    Unlimited <span class="u-text--quiet u-small">({this.settings.apiCalls || 0} this month)</span>
                  </span>
                )}
              </span>
            </div>
            <div class="o-grid o-grid--top o-info-item">
              <label class="o-grid__cell o-grid__cell--width-20 u-text--quiet">Web API key:</label>
              <span class="o-grid__cell">
                <code class="u-code">{this.settings.webAPIKey}</code>
                <button
                  class="c-edit-info c-button c-button--nude c-tooltip c-tooltip--right"
                  aria-label="Generate new web API key"
                  onClick={() => this.generateKeyPopup.show()}>
                  <i class="fa-fw fas fa-sync-alt" />
                </button>
                <div class="u-small u-text--quiet">
                  Treat this key as sensitive information. <span class="u-text--loud">Do not share it.</span>
                </div>
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
        <account-add-environment user={this.user} ref={(popup) => (this.addEnvironmentPopup = popup)} />
        <account-edit-environment user={this.user} ref={(popup) => (this.editEnvironmentPopup = popup)} />
        <account-delete-environment user={this.user} ref={(popup) => (this.deleteEnvironmentPopup = popup)} />
        <account-delete user={this.user} history={this.history} ref={(popup) => (this.deleteAccountPopup = popup)} />
      </nav-page>
    );
  }
}
