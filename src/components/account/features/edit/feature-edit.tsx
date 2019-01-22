import { Component, State, Prop, Method } from '@stencil/core';
import slug from 'slug';
import { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'feature-edit',
})
export class FeatureEdit {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  alertMsg: AlertMessage = {};

  @State()
  name: string;

  @State()
  key: string;

  @State()
  loading: boolean;

  @State()
  featureSnapshot: any;

  @Method()
  show(featureSnapshot) {
    this.featureSnapshot = featureSnapshot;
    this.name = this.featureSnapshot.data().name;
    this.key = this.featureSnapshot.data().key;
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
    this.name = '';
    this.key = '';
  }

  handleNameChange(e) {
    this.name = e.target.value;
  }

  handleKeyChange(e) {
    this.key = slug(e.target.value, {
      lower: true,
      replacement: '_',
    });
  }

  async edit(e) {
    e.preventDefault();
    this.loading = true;
    try {
      const existingFeatures = await store
        .collection('features')
        .where('owner', '==', this.user.uid)
        .where('key', '==', this.key)
        .get();

      if (
        !existingFeatures.empty &&
        !(existingFeatures.docs.length === 1 && existingFeatures.docs[0].ref.id == this.featureSnapshot.ref.id)
      )
        throw { code: 'storage/document-exists' };

      await this.featureSnapshot.ref.update({
        name: this.name,
        key: this.key,
      });
      this.reset();
    } catch (error) {
      console.log(error);
      this.alertMsg = getAlertMessage(error.code);
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
          <form onSubmit={(e) => this.edit(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Edit feature</h2>
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
              <label class="c-label o-form-element">
                Name:
                <div class="o-field o-field--icon-left">
                  <i class="fas fa-tag c-icon" />
                  <input
                    type="text"
                    value={this.name}
                    class="c-field c-field--label"
                    required
                    disabled={this.loading}
                    onInput={(e) => this.handleNameChange(e)}
                  />
                </div>
              </label>

              <label class="c-label o-form-element">
                Key:
                <div class="o-field o-field--icon-left">
                  <i class="fas fa-key c-icon" />
                  <input
                    type="text"
                    value={this.key}
                    class="c-field c-field--label u-text--mono"
                    required
                    disabled={this.loading}
                    onChange={(e) => this.handleKeyChange(e)}
                  />
                  <div role="tooltip" class="c-hint">
                    Feature keys must be unique
                  </div>
                  {this.featureSnapshot.data().active && (
                    <div>
                      <p class="c-paragraph u-text--highlight">This feature is still active.</p>
                      <p class="c-paragraph u-text--quiet u-small">
                        Editing the key on an active feature might cause condition statements within your site or app to
                        stop behaving correctly.
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--success c-button--block" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fas fa-save" />
                </span>
                Save changes
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
