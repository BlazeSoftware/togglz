import { Component, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'feature-delete',
})
export class FeatureDelete {
  panel: any;
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
  show(featureSnapshot) {
    this.featureSnapshot = featureSnapshot;
    this.panel.show();
  }

  @Method()
  close() {
    this.panel.close();
  }

  async delete(e) {
    e.preventDefault();
    this.loading = true;
    try {
      await this.featureSnapshot.ref.delete();
      this.panel.close();
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
      <blaze-drawer position="right" dismissible ref={(panel) => (this.panel = panel)}>
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading u-xlarge">Delete feature</h2>
          </blaze-card-header>
          <blaze-card-body>
            {this.featureSnapshot && (
              <div>
                {this.featureSnapshot.data().active && (
                  <p class="c-paragraph u-text--highlight">This feature is still active.</p>
                )}
                <p class="c-paragraph u-text--quiet u-small">
                  By deleting this feature it will no longer be accessible via the API and condition statements within
                  your site or app may stop behaving correctly.
                </p>
                <p class="c-paragraph u-text--loud">Are you sure you want to delete this feature?</p>
                <p class="c-paragraph">
                  <div class="u-text--quiet">Name: </div>
                  <span class="u-text--loud">{this.featureSnapshot.data().name}</span>
                </p>
                <p class="c-paragraph">
                  <div class="u-text--quiet">Key: </div>
                  <span class="u-text--loud">{this.featureSnapshot.data().key}</span>
                </p>
              </div>
            )}
          </blaze-card-body>
          <blaze-card-footer>
            <div class="c-input-group">
              <button
                class="c-button c-button--block c-button--error"
                disabled={this.loading}
                onClick={(e) => this.delete(e)}>
                Delete
              </button>
              <button class="c-button c-button--block" disabled={this.loading} onClick={() => this.panel.close()}>
                Cancel
              </button>
            </div>
          </blaze-card-footer>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
