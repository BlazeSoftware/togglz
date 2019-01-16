import '@blaze/atoms';
import { Component } from '@stencil/core';
import '@stencil/router';

@Component({
  tag: 'home-page',
})
export class HomePage {
  render() {
    return (
      <div class="o-home-page u-centered u-absolute-center">
        <h1 class="c-heading u-super">Togglz</h1>
        <blaze-toggle class="u-super" type="brand" />
        <h2 class="c-heading u-medium u-text--quiet c-tagline">Feature toggle service for websites and apps</h2>
      </div>
    );
  }
}
