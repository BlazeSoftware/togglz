import { h, Component, State, Prop, Method } from '@stencil/core';
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
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  featureSnapshot: any;

  @State()
  active: boolean;

  @Method()
  async show(featureSnapshot) {
    this.featureSnapshot = featureSnapshot;
    this.isActive();
    this.panel.show();
  }

  @Method()
  async close() {
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

  isActive() {
    const feature = this.featureSnapshot.data();
    this.active = feature.active;
    Object.keys(feature.environments).forEach((env) => (this.active = feature.environments[env] ? true : this.active));
  }

  render() {
    return (
      <blaze-drawer position="right" dismissible ref={(panel) => (this.panel = panel)}>
        <button type="button" class="c-button c-button--close" onClick={() => this.panel.close()}>
          ×
        </button>
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading">Delete feature</h2>
          </blaze-card-header>
          <blaze-card-body>
            {this.featureSnapshot && (
              <div>
                {this.active && <span class="u-text--highlight">This feature is active.</span>}
                <p class="c-paragraph u-text--quiet">
                  By deleting this feature it will no longer be accessible via the API and condition statements within
                  your site or app may stop behaving correctly.
                </p>
                <p class="c-paragraph u-text--loud">Are you sure you want to delete?</p>
                <p class="c-paragraph">
                  <div class="u-text--quiet">Feature: </div>
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
            <button
              class="c-button c-button--block c-button--error"
              disabled={this.loading}
              onClick={(e) => this.delete(e)}>
              <span class="c-button__icon-left" aria-hidden={true}>
                <i aria-hidden={true} class="fa-fw far fa-trash-alt" />
              </span>
              Delete feature
            </button>
          </blaze-card-footer>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
