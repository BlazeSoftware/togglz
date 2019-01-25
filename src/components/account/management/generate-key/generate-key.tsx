import { Component, State, Prop, Method } from '@stencil/core';
import { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

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
  show() {
    this.panel.show();
  }

  @Method()
  close() {
    this.panel.close();
  }

  @Method()
  reset() {
    this.panel.close();
    this.loading = false;
  }

  async generateKey(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await store
        .collection('settings')
        .doc(this.user.uid)
        .set({
          webAPIKey: new Array(20)
            .fill(undefined)
            .map(() => 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 36)))
            .join(''),
        });
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
              <p class="c-paragraph u-text--highlight">Generating a new key will invalidate the old one.</p>
              <p class="c-paragraph">
                Once you generate a new key, you will have to update your site or app to use the new key.
              </p>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--warning" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fas fa-sync-alt" />
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
