import { Component, State, Prop, Method } from '@stencil/core';
import firebase, { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'account-delete-domain',
})
export class DeleteDomain {
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

  @Method()
  show(domain: string) {
    this.domain = domain;
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

  async deleteDomain(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await store
        .collection('settings')
        .doc(this.user.uid)
        .update({
          domains: firebase.firestore.FieldValue.arrayRemove(this.domain),
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
          <form onSubmit={(e) => this.deleteDomain(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Delete domain</h2>
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
              <p class="c-paragraph u-text--highlight">The API will no longer be accessible from this domain.</p>
              <p class="c-paragraph u-text--quiet u-small">
                You can only make requests to the API from trusted domains. Once deleted any requests from this domain
                will receive a 403 forbidden response.
              </p>
              <p class="c-paragraph u-text--loud">Are you sure you want to delete this domain?</p>
              <p class="c-paragraph">
                <div class="u-text--quiet">Name: </div>
                <span class="u-text--loud">{this.domain}</span>
              </p>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--error" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fa-fw far fa-trash-alt" />
                </span>
                Delete domain
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
