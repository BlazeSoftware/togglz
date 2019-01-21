import { Component, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'feature-delete',
})
export class FeatureDelete {
  modal: any;
  alert: any;

  @Prop()
  user: any = {};

  @State()
  alertMsg: AlertMessage = {};

  @State()
  loading: boolean;

  @State()
  featureSnapshot: any;

  @Method()
  show(feature) {
    this.featureSnapshot = feature;
    this.modal.show();
  }

  @Method()
  close() {
    this.modal.close();
  }

  async delete(e) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.featureSnapshot.ref.delete();
      this.modal.close();
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.alertMsg = getAlertMessage(error.code);
      this.alert.show();
      this.loading = false;
    }
  }

  render() {
    return (
      <blaze-modal class="o-modal--small" dismissible ref={(modal) => (this.modal = modal)}>
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading u-xlarge">Delete feature</h2>
          </blaze-card-header>
          <blaze-card-body>
            <p class="c-paragraph">Are you sure you want to delete this feature?</p>
            <p class="c-paragraph">
              {this.featureSnapshot && (
                <div>
                  <span class="u-text--loud">{this.featureSnapshot.data().name}</span> :{' '}
                  <span class="u-text--mono">{this.featureSnapshot.data().key}</span>
                </div>
              )}
            </p>
          </blaze-card-body>
          <blaze-card-footer>
            <div class="c-input-group">
              <button
                class="c-button c-button--block c-button--error"
                disabled={this.loading}
                onClick={(e) => this.delete(e)}>
                Delete
              </button>
              <button class="c-button c-button--block" disabled={this.loading} onClick={() => this.modal.close()}>
                Cancel
              </button>
            </div>
          </blaze-card-footer>
        </blaze-card>
      </blaze-modal>
    );
  }
}
