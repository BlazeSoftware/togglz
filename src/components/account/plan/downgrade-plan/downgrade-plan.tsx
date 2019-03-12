import { Component, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-downgrade-plan',
})
export class DowngradePlan {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @Method()
  show() {
    this.reset();
    this.panel.show();
  }

  @Method()
  close() {
    this.panel.close();
  }

  @Method()
  reset() {
    this.panel.close();
    this.alert.close();
    this.loading = false;
  }

  async downgrade(e) {
    this.loading = true;

    e.preventDefault();
    this.alertMsg = getAlertMessage('plans/updating');
    this.alert.show();

    try {
      await fetch(`/plans/subscriptions/${this.user.uid}`, {
        method: 'DELETE',
        mode: 'cors',
      });
    } catch (e) {
      this.alertMsg = {
        type: 'error',
        message: e,
      };
      this.alert.show();
    }
  }

  render() {
    return (
      <blaze-drawer position="right" dismissible ref={(drawer) => (this.panel = drawer)}>
        <button type="button" class="c-button c-button--close" onClick={() => this.panel.close()}>
          ×
        </button>
        <blaze-card>
          <form onSubmit={(e) => this.downgrade(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Downgrade to Starter</h2>
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
              <p class="c-paragraph u-text--loud">Are you sure you want to downgrade?</p>
              <p class="c-paragraph">
                No features or environments will be deleted, however your API requests will be limited.
              </p>
              <p class="c-paragraph u-text--quiet u-small">
                It is recommended you update your site or app appropriately before downgrading.
              </p>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--warning" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-arrow-down" />
                </span>
                Switch to Starter plan
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
