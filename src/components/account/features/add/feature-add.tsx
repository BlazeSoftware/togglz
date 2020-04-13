import { h, Component, State, Prop, Method } from '@stencil/core';
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

  @State()
  conditions: Array<any> = [];

  @Method()
  async show() {
    this.panel.show();
  }

  @Method()
  async close() {
    this.panel.close();
  }

  @Method()
  async reset() {
    this.panel.close();
    this.alert.close();
    this.loading = false;
    this.name = '';
    this.key = '';
    this.type = 'boolean';
    this.activeValue = '';
    this.inactiveValue = '';
    this.conditions = [];
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
      console.error(error);
      this.alertMsg = getAlertMessage(error.code);
      this.alert.show();
      this.loading = false;
    }
  }

  addCondition() {
    this.conditions = [...this.conditions, { operator: '=' }];
  }

  removeCondition(i: number) {
    this.conditions.splice(i, 1);
    this.conditions = [...this.conditions];
  }

  handleConditionChange(e, editIndex: number, property: string) {
    this.conditions[editIndex][property] = e.target.value;
    this.conditions = [...this.conditions];
  }

  renderConditions() {
    return (
      <fieldset class="o-fieldset">
        <legend class="o-fieldset__legend">Conditions:</legend>
        {this.conditions.map((condition, i) => (
          <div class="o-grid o-grid--center o-grid--no-gutter">
            <div class="o-grid__cell">
              <div class="c-input-group u-small u-letter-box-medium">
                <div class="o-field">
                  <input
                    class="c-field u-text--mono"
                    value={condition.prop}
                    onInput={(e) => this.handleConditionChange(e, i, 'prop')}
                    required
                    placeholder="property"
                  />
                </div>
                <div class="o-field">
                  <select
                    class="c-field u-text--mono u-text--loud"
                    onChange={(e) => this.handleConditionChange(e, i, 'operator')}
                    required>
                    <option value="=" selected={condition.operator === '='}>
                      equals
                    </option>
                    <option value="!=" selected={condition.operator === '!='}>
                      is not
                    </option>
                    <option value="<" selected={condition.operator === '<'}>
                      {'<'}
                    </option>
                    <option value="<=" selected={condition.operator === '<='}>
                      {'<='}
                    </option>
                    <option value=">" selected={condition.operator === '>'}>
                      {'>'}
                    </option>
                    <option value=">=" selected={condition.operator === '>='}>
                      {'>='}
                    </option>
                  </select>
                </div>
                <div class="o-field">
                  <input
                    class="c-field u-text--mono"
                    value={condition.value}
                    onInput={(e) => this.handleConditionChange(e, i, 'value')}
                    required
                    placeholder="value"
                  />
                </div>
              </div>
            </div>
            <div class="o-grid__cell o-grid__cell--width-10 u-right o-actions">
              <button
                type="button"
                class="c-button c-button--nude c-button--delete"
                aria-label="Delete condition"
                onClick={() => this.removeCondition(i)}>
                <i aria-hidden={true} class="fa-fw far fa-trash-alt" />
              </button>
            </div>
          </div>
        ))}
        <div class="u-letter-box-small">
          <a class="c-link u-small" onClick={() => this.addCondition()}>
            <i aria-hidden={true} class="fa-fw fas fa-plus" /> Add condition
          </a>
        </div>
      </fieldset>
    );
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
                  <i aria-hidden={true} class="fa-fw fas fa-tag c-icon" />
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
                  <i aria-hidden={true} class="fa-fw fas fa-key c-icon" />
                  <input
                    type="text"
                    value={this.key}
                    class="c-field c-field--label u-text--mono u-large"
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
                        <i aria-hidden={true} class="fa-fw fas fa-toggle-on c-icon" />
                        <input
                          type="text"
                          value={this.activeValue}
                          class="c-field c-field--label u-text--mono u-large"
                          required={this.type === 'multivariate'}
                          disabled={this.loading}
                          onChange={(e) => this.handleActiveValueChange(e)}
                        />
                      </div>
                    </label>
                    <label class="c-label o-form-element">
                      Inactive:
                      <div class="o-field o-field--icon-left">
                        <i aria-hidden={true} class="fa-fw fas fa-toggle-off c-icon" />
                        <input
                          type="text"
                          value={this.inactiveValue}
                          class="c-field c-field--label u-text--mono u-large"
                          required={this.type === 'multivariate'}
                          disabled={this.loading}
                          onChange={(e) => this.handleInactiveValueChange(e)}
                        />
                      </div>
                    </label>
                  </div>
                )}
              </fieldset>
              {this.renderConditions()}
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--success c-button--block" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-star-of-life" />
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
