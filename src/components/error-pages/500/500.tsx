import { h, Component } from '@stencil/core';

@Component({
  tag: 'app-broken',
})
export class Broken {
  render() {
    return (
      <div class="o-container o-container--small u-window-box-xlarge u-centered">
        <stencil-route-title pageTitle="500" />
        <h2 class="c-heading">Sorry, something went wrong.</h2>
        <div>
          <a class="c-link" href="/">
            Go back to the home page
          </a>
        </div>
      </div>
    );
  }
}
