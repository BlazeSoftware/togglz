import { h, Component, Prop, State, Listen } from '@stencil/core';
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
  webhookPopup: any;
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

  onSettingsSnapshot: any;
  onPlansSnapshot: any;
  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.onSettingsSnapshot();
    this.onPlansSnapshot();
    this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;
      this.displayName = user.displayName;
      this.email = user.email;
      this.loading = false;

      const plansRef = store.collection('plans').doc(this.user.uid);
      this.onPlansSnapshot = plansRef.onSnapshot((plansSnapshot) => {
        this.plan = plansSnapshot.data();
      });
      await plansRef.get();

      const settingsRef = store.collection('settings').doc(this.user.uid);
      this.onSettingsSnapshot = settingsRef.onSnapshot((settingsSnapshot) => {
        this.settings = settingsSnapshot.data();
      });
      await settingsRef.get();
    });
  }

  renderInfoRow(label: string, value: string, popup?: any) {
    return (
      <div class="o-grid o-grid--center o-grid--xsmall-full o-grid--small-full o-info-item">
        <label class="o-grid__cell o-grid__cell--width-25 u-text--quiet">{label}:</label>
        <span class="o-grid__cell">
          {!this.loading && (
            <span>
              {value || <span class="u-text--normal u-text--highlight u-text--quiet">None set</span>}
              {popup && (
                <a role="button" class="c-link u-display-inline-block u-pillar-box-medium" onClick={() => popup.show()}>
                  edit
                </a>
              )}
            </span>
          )}
        </span>
      </div>
    );
  }

  render() {
    const apiCalls = this.plan.apiCalls || 0;
    let usageIndicator = 'info';
    if (apiCalls > 7500) usageIndicator = 'warning';
    if (apiCalls > 8500) usageIndicator = 'error';

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
            <h3 class="c-heading">Web API settings:</h3>
          </blaze-card-header>
          <blaze-card-body>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full o-info-item">
              <label class="o-grid__cell o-grid__cell--width-25 u-text--quiet">API requests:</label>
              <span class="o-grid__cell">
                {this.plan.current === 'starter' && (
                  <span>
                    {apiCalls.toLocaleString('en-GB')} of your 10,000 monthly limit
                    <blaze-progress size="xsmall" rounded>
                      <blaze-progress-bar value={apiCalls / 100} type={usageIndicator} />
                    </blaze-progress>
                    <div class="u-small u-text--quiet">Upgrade your plan to Pro for unlimited requests</div>
                  </span>
                )}
                {this.plan.current === 'pro' && (
                  <span>
                    Unlimited{' '}
                    <span class="u-text--quiet u-small">({apiCalls.toLocaleString('en-GB') || 0} this month)</span>
                  </span>
                )}
              </span>
            </div>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full o-info-item">
              <label class="o-grid__cell o-grid__cell--width-25 u-text--quiet">Web API key:</label>
              <span class="o-grid__cell o-grid--width-75">
                <code class="u-code u-large">{this.settings.webAPIKey}</code>
              </span>
            </div>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full o-info-item">
              <div class="o-grid__cell o-grid__cell--offset-25">
                <a role="button" class="c-link" onClick={() => this.generateKeyPopup.show()}>
                  generate new key
                </a>
              </div>
            </div>
          </blaze-card-body>
        </blaze-card>

        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Webhook:</h3>
          </blaze-card-header>
          <blaze-card-body>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full o-info-item">
              <label class="o-grid__cell o-grid__cell--width-25 u-text--quiet">URL:</label>
              <span class="o-grid__cell">{this.settings.webhookUrl}</span>
            </div>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full o-info-item">
              <label class="o-grid__cell o-grid__cell--width-25 u-text--quiet">Secret:</label>
              <span class="o-grid__cell o-grid__cell--width-75">
                {this.settings.webhookSecret && <code class="u-code u-large">{this.settings.webhookSecret}</code>}
              </span>
            </div>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full">
              <div class="o-grid__cell o-grid__cell--offset-25">
                <a role="button" class="c-link" onClick={() => this.webhookPopup.show(this.settings)}>
                  edit webhook
                </a>
              </div>
            </div>
            <div class="o-grid o-grid--top o-grid--xsmall-full o-grid--small-full">
              <div class="o-grid__cell o-grid__cell--offset-25 u-small">
                <p class="c-paragraph">
                  When something happens to your features in Togglz we will send your webhook URL a POST request with a
                  payload of information about what happened.
                </p>
                <p class="c-paragraph">
                  Togglz will use the secret to hash the payload and send it in the <code class="u-code">X-Togglz</code>{' '}
                  header. To ensure the message came from Togglz you should hash the payload with this secret and
                  compare the result with the header value to ensure it's validity.
                </p>
              </div>
            </div>
          </blaze-card-body>
        </blaze-card>

        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Danger Zone</h3>
          </blaze-card-header>
          <blaze-card-body>
            <button
              type="button"
              class="c-button c-button--ghost c-button--error"
              onClick={() => this.deleteAccountPopup.show()}>
              Delete account
            </button>
            <div class="u-letter-box-small">
              <label class="u-text--quiet">Once you delete an account, that's it, there is no recovery.</label>
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
        <account-webhook user={this.user} ref={(popup) => (this.webhookPopup = popup)} />
        <account-delete user={this.user} history={this.history} ref={(popup) => (this.deleteAccountPopup = popup)} />
      </nav-page>
    );
  }
}
