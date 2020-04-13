import { h, Component, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';
import services from '@/firebase/services';

@Component({
  tag: 'account-generate-key',
})
export class GenerateKey {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @Method()
  async show() {
    this.panel.show();
  }

  @Method()
  async close() {
    this.panel.close();
  }

  @Method()
  async reset() {
    this.panel.close();
    this.loading = false;
  }

  async generateKey(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await services.generateKey(this.user);
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
          <form onSubmit={(e) => this.generateKey(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Generate key</h2>
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
              <span>Generating a new key will invalidate the old one.</span>
              <p class="c-paragraph">
                Once you generate a new key, you will have to update your site or app to use the new key.
              </p>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--warning" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-sync-alt" />
                </span>
                Generate key
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
