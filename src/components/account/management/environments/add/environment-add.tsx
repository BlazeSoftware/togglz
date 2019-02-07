import { Component, State, Prop, Method } from '@stencil/core';
import slug from 'slug';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';
import services from '@/firebase/services';

@Component({
  tag: 'account-add-environment',
})
export class AddEnvironment {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  environment: string;

  handleEnvironmentChange(e) {
    this.environment = slug(e.target.value, {
      lower: true,
      replacement: '_',
    });
  }

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
    this.environment = null;
    this.panel.close();
    this.loading = false;
  }

  async addEnvironment(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await services.addEnvironment(this.user, this.environment);
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
          <form onSubmit={(e) => this.addEnvironment(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Add environment</h2>
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
              </blaze-alert>{' '}
              <label class="c-label o-form-element">
                Environment name:
                <div class="o-field o-field--icon-left">
                  <i class="fa-fw fas fa-server c-icon" />
                  <input
                    type="text"
                    value={this.environment}
                    class="c-field c-field--label"
                    required
                    disabled={this.loading}
                    onChange={(e) => this.handleEnvironmentChange(e)}
                  />
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--success" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fa-fw fas fa-save" />
                </span>
                Save environment
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
