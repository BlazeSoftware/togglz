import { h, Component, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';
import services from '@/firebase/services';

@Component({
  tag: 'account-webhook',
})
export class Webhook {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  webhookUrl: string;

  @State()
  webhookSecret: string;

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @Method()
  async show(settings) {
    this.webhookUrl = settings.webhookUrl;
    this.webhookSecret = settings.webhookSecret;
    this.panel.show();
  }

  @Method()
  async close() {
    this.panel.close();
  }

  @Method()
  async reset() {
    this.webhookUrl = null;
    this.webhookSecret = null;
    this.panel.close();
    this.loading = false;
  }

  handleUrlChange(e) {
    this.webhookUrl = e.target.value;
  }

  handleSecretChange(e) {
    this.webhookSecret = e.target.value;
  }

  async save(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await services.updateWebhook(this);
      this.reset();
    } catch (error) {
      console.error(error);
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
          <form onSubmit={(e) => this.save(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Webhook</h2>
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
              <span>Ensure you've updated your listening endpoint if you change your webhook settings.</span>
              <label class="o-form-element c-label">
                URL:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i aria-hidden={true} class="fa-fw fas fa-globe c-icon" />
                    <input
                      type="url"
                      value={this.webhookUrl}
                      class="c-field"
                      disabled={this.loading}
                      onInput={(e) => this.handleUrlChange(e)}
                    />
                  </div>
                </div>
              </label>
              <label class="o-form-element c-label">
                Secret:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i aria-hidden={true} class="fa-fw fas fa-mask c-icon" />
                    <input
                      type="text"
                      value={this.webhookSecret}
                      class="c-field"
                      disabled={this.loading}
                      onInput={(e) => this.handleSecretChange(e)}
                    />
                  </div>
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--warning" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-save" />
                </span>
                Update
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
