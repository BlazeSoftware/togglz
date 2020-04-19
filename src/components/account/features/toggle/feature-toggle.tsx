import { h, Component, Prop, State } from '@stencil/core';
import services from '@/firebase/services';

@Component({
  tag: 'feature-toggle',
})
export class FeatureToggle {
  @Prop()
  user: any;

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

  async toggleFeature(active: boolean) {
    this.status = 'loading';

    try {
      await services.toggleFeature(this, active);
      this.active = active;
      this.status = 'loaded';
    } catch (e) {
      this.status = '';
    }
  }

  render() {
    return (
      <blaze-toggle
        onChanged={({ detail: active }) => this.toggleFeature(active)}
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
