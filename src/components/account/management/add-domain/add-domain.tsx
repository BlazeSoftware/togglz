import { Component, State, Prop, Method } from '@stencil/core';
import firebase, { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-add-domain',
})
export class AddDomain {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  domain: string;

  handleDomainChange(e) {
    this.domain = e.target.value;
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
    this.domain = null;
    this.panel.close();
    this.loading = false;
  }

  async addDomain(e) {
    e.preventDefault();

    this.loading = true;
    if (this.domain === 'localhost') return this.reset();
    try {
      await store
        .collection('settings')
        .doc(this.user.uid)
        .update({
          domains: firebase.firestore.FieldValue.arrayUnion(this.domain),
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
          <form onSubmit={(e) => this.addDomain(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Add domain</h2>
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
                Domain name:
                <div class="o-field o-field--icon-left">
                  <i class="fa-fw fas fa-globe c-icon" />
                  <input
                    type="text"
                    value={this.domain}
                    class="c-field c-field--label"
                    required
                    disabled={this.loading}
                    onInput={(e) => this.handleDomainChange(e)}
                  />
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--success" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fa-fw fas fa-save" />
                </span>
                Save domain
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
