import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'feature-toggle',
})
export class FeatureToggle {
  @Prop()
  featureSnapshot: any;

  @Prop()
  selectedEnvironment: string;

  @State()
  initialActiveState: boolean;

  @State()
  active: boolean;

  @State()
  status: string;

  componentWillLoad() {
    const feature = this.featureSnapshot.data();
    this.initialActiveState = feature.active;
    if (this.selectedEnvironment) {
      this.initialActiveState = feature.environments[this.selectedEnvironment];
    }

    this.active = this.initialActiveState;
  }

  async toggleFeature(active) {
    this.status = 'loading';

    try {
      if (this.selectedEnvironment) {
        const feature = this.featureSnapshot.data();
        const environments = { ...feature.environments };
        environments[this.selectedEnvironment] = active;
        await this.featureSnapshot.ref.update({
          environments,
        });
      } else {
        await this.featureSnapshot.ref.update({
          active,
        });
      }

      this.active = active;
      this.status = 'loaded';
    } catch (e) {
      this.status = '';
    }
  }

  render() {
    return (
      <blaze-toggle
        onChange={({ detail }) => this.toggleFeature(detail)}
        type="success"
        toggled={this.initialActiveState}>
        {this.active ? (
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
