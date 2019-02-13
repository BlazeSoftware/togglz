import { Component, State, Prop, Method } from '@stencil/core';
import slug from 'slug';
import services from '@/firebase/services';
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

  @State()
  type: string = 'boolean';

  @State()
  activeValue: string;

  @State()
  inactiveValue: string;

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
    this.type = 'boolean';
    this.activeValue = '';
    this.inactiveValue = '';
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

  handleTypeChange(e) {
    this.type = e.target.value;
  }

  handleActiveValueChange(e) {
    this.activeValue = e.target.value;
  }

  handleInactiveValueChange(e) {
    this.inactiveValue = e.target.value;
  }

  async create(e) {
    e.preventDefault();
    this.loading = true;
    try {
      await services.addFeature(this.user, this);
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
              <fieldset class="o-fieldset">
                <legend class="o-fieldset__legend">Type:</legend>
                <label class="c-label c-field c-field--choice" aria-label="Boolean">
                  <div class="o-grid o-grid--no-gutter">
                    <div class="o-grid__cell o-grid__cell--width-10">
                      <input
                        type="radio"
                        name="type"
                        value="boolean"
                        checked={this.type === 'boolean'}
                        onClick={(e) => this.handleTypeChange(e)}
                      />
                    </div>
                    <div class="o-grid__cell">
                      Boolean
                      <div class="u-small u-text--quiet">
                        Active flags will return <strong class="u-text--loud">true</strong>.
                      </div>
                    </div>
                  </div>
                </label>
                <label class="c-label c-field c-field--choice" aria-label="Multivariate">
                  <div class="o-grid o-grid--no-gutter">
                    <div class="o-grid__cell o-grid__cell--width-10">
                      <input
                        type="radio"
                        name="type"
                        value="multivariate"
                        checked={this.type === 'multivariate'}
                        onClick={(e) => this.handleTypeChange(e)}
                      />
                    </div>
                    <div class="o-grid__cell">
                      Multivariate
                      <div class="u-small u-text--quiet">
                        Set your own <strong class="u-text--loud">custom</strong> values.
                      </div>
                    </div>
                  </div>
                </label>
                {this.type === 'multivariate' && (
                  <div>
                    <label class="c-label o-form-element">
                      Active:
                      <div class="o-field o-field--icon-left">
                        <i class="fa-fw fas fa-toggle-on c-icon" />
                        <input
                          type="text"
                          value={this.activeValue}
                          class="c-field c-field--label u-text--mono"
                          required={this.type === 'multivariate'}
                          disabled={this.loading}
                          onChange={(e) => this.handleActiveValueChange(e)}
                        />
                      </div>
                    </label>
                    <label class="c-label o-form-element">
                      Inactive:
                      <div class="o-field o-field--icon-left">
                        <i class="fa-fw fas fa-toggle-off c-icon" />
                        <input
                          type="text"
                          value={this.inactiveValue}
                          class="c-field c-field--label u-text--mono"
                          required={this.type === 'multivariate'}
                          disabled={this.loading}
                          onChange={(e) => this.handleInactiveValueChange(e)}
                        />
                      </div>
                    </label>
                  </div>
                )}
              </fieldset>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--success c-button--block" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
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
