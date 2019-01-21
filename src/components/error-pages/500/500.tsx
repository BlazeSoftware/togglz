import { Component } from '@stencil/core';

@Component({
  tag: 'app-broken',
})
export class Broken {
  render() {
    return (
      <div class="o-container o-container--small u-window-box-xlarge u-centered">
        <div style={{ 'font-size': '4em' }}>💣</div>
        <h2 class="u-heading">Sorry, something went wrong and we're not sure what.</h2>
        <a class="c-link" href="/">
          Go back to the home page
        </a>
      </div>
    );
  }
}
