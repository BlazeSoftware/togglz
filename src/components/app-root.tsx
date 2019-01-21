import { Component, Prop } from '@stencil/core';
import '@stencil/router';
import { RouterHistory } from '@stencil/router';
import '@blaze/atoms';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @Prop()
  history: RouterHistory;

  render() {
    return (
      <div class="u-text">
        <stencil-router scrollTopOffset={0}>
          <stencil-route-switch>
            <stencil-route url="/" component="home-page" exact={true} />
            <stencil-route url="/login" component="account-login" />
            <stencil-route url="/join" component="account-join" />
            <stencil-route url="/dashboard" component="account-dashboard" />
            <stencil-route url="/action" component="account-oob-action" />
            <stencil-route url="/verify" component="account-verify" />
            <stencil-route url="/complete" component="account-complete" />
            <stencil-route url="/reset" component="account-reset-password" />
            <stencil-route url="/password" component="account-password" />
            <stencil-route url="/feature/add" component="feature-add" />
            <stencil-route url="/500" component="app-broken" />
            <stencil-route url="/logout" component="account-logout" />
            <stencil-route component="page-not-found" />
          </stencil-route-switch>
        </stencil-router>
      </div>
    );
  }
}
