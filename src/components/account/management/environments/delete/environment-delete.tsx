import { Component, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';
import services from '@/firebase/services';

@Component({
  tag: 'account-delete-environment',
})
export class DeleteEnvironment {
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

  @Method()
  show(environment: string) {
    this.environment = environment;
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

  async deleteEnv(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await services.deleteEnvironment(this.user, this.environment);
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
          <form onSubmit={(e) => this.deleteEnv(e)}>
            <blaze-card-header>
              <h2 class="c-heading u-gradient-text u-gradient-text--error">Delete environment</h2>
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
              <span class="u-gradient-text u-gradient-text--warning">
                The API will stop returning any feature toggles for this environment.
              </span>
              <p class="c-paragraph u-text--quiet u-small">
                Once deleted any requests for this environment will receive an empty response.
              </p>
              <p class="c-paragraph u-text--loud">Are you sure you want to delete this environment?</p>
              <p class="c-paragraph">
                <div class="u-text--quiet">Name: </div>
                <span class="u-text--loud">{this.environment}</span>
              </p>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--error" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw far fa-trash-alt" />
                </span>
                Delete environment
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
