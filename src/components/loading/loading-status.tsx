import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'loading-status',
  shadow: true,
  styleUrl: 'loading.scss',
})
export class Loading {
  @Prop()
  status: string;

  render() {
    return <span class={this.status} />;
  }
}
