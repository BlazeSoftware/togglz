import '@blaze/atoms';
import { Component, State } from '@stencil/core';

@Component({
  tag: 'home-page',
})
export class HomePage {
  @State()
  color: string;

  onToggle() {
    const colors = ['default', 'brand', 'info', 'success', 'error', 'warning'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    return (
      <div class="o-home-page u-centered u-absolute-center u-large">
        <h1 class="c-heading u-super">Togglz</h1>
        <blaze-toggle class="u-super" type={this.color} toggled onChange={() => this.onToggle()} />
        <h2 class="c-heading u-medium u-text--quiet c-tagline">Feature toggle service for websites and apps</h2>
        <div class="u-letter-box-super u-small">
          <stencil-route-link url="/login" anchorClass="c-link u-pillar-box-medium">
            Login
          </stencil-route-link>
          <span aria-hidden class="u-text--quiet u-small">
            &bull;
          </span>
          <stencil-route-link url="/join" anchorClass="c-link u-pillar-box-medium">
            Join
          </stencil-route-link>
        </div>
        <div class="u-small u-text--quiet">
          <i class="fas fa-exclamation-triangle" />
          <div class="u-letter-box--small">Under construction</div>
        </div>
      </div>
    );
  }
}
