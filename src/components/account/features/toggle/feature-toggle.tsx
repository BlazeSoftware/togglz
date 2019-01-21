import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'feature-toggle',
})
export class FeatureToggle {
  @Prop()
  feature: any;

  @State()
  _active: boolean;

  @State()
  status: string;

  componentWillLoad() {
    this._active = this.feature.data().active;
  }

  async toggleFeature(active) {
    this.status = 'loading';

    try {
      await this.feature.ref.update({
        active,
      });

      this._active = active;
      this.status = 'loaded';
    } catch (e) {
      this._active = !active;
      this.status = '';
    }
  }

  render() {
    return (
      <blaze-toggle onChange={({ detail }) => this.toggleFeature(detail)} type="success" toggled={this._active}>
        {this._active ? (
          <span>
            Active
            <loading-status status={this.status} />
          </span>
        ) : (
          <span class="u-text--quiet">
            Inactive
            <loading-status status={this.status} />
          </span>
        )}
      </blaze-toggle>
    );
  }
}
