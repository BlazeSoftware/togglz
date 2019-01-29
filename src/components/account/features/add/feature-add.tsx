import { Component, State, Prop, Method } from '@stencil/core';
import slug from 'slug';
import firebase, { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

@Component({
  tag: 'feature-add',
})
export class FeatureAdd {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  name: string;

  @State()
  key: string;

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

  async create(e) {
    e.preventDefault();
    this.loading = true;
    try {
      const existingFeature = await store
        .collection('features')
        .where('owner', '==', this.user.uid)
        .where('key', '==', this.key)
        .get();

      if (!existingFeature.empty) throw { code: 'storage/document-exists' };

      await store
        .collection('features')
        .doc()
        .set({
          name: this.name,
          key: this.key,
          active: false,
          owner: this.user.uid,
          created: firebase.firestore.FieldValue.serverTimestamp(),
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
          <form onSubmit={(e) => this.create(e)}>
            <blaze-card-header>
              <h2 class="c-heading">New feature</h2>
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
                  <i class="fa-fw fas fa-tag c-icon" />
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
                  <i class="fa-fw fas fa-key c-icon" />
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
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--success c-button--block" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden>
                  <i class="fa-fw fas fa-star-of-life" />
                </span>
                Create new feature
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
