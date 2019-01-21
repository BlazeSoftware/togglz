import { Component } from '@stencil/core';

@Component({
  tag: 'page-not-found',
})
export class PageNotFound {
  render() {
    return (
      <div class="o-container o-container--small u-window-box-xlarge u-centered">
        <div style={{ 'font-size': '4em' }}>🤷</div>
        <h2 class="u-heading">Oops, that page doesn't exist!</h2>
        <a class="c-link" href="/">
          Go back to the home page
        </a>
      </div>
    );
  }
}
