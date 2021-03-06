import { h, Component, Prop } from '@stencil/core';
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
            <stencil-route url="/account" component="account-management" />
            <stencil-route url="/environments" component="account-environments" />
            <stencil-route url="/plan" component="account-plan" />
            <stencil-route url="/api" component="api-docs" />
            <stencil-route url="/docs" component="help-docs" />
            <stencil-route url="/contact-us" component="contact-us" />
            <stencil-route url="/action" component="account-oob" />
            <stencil-route url="/verify" component="account-verify" />
            <stencil-route url="/complete" component="account-complete" />
            <stencil-route url="/reset-password" component="account-reset-password" />
            <stencil-route url="/update-password" component="account-update-password" />
            <stencil-route url="/recover-email" component="account-recover-email" />
            <stencil-route url="/500" component="app-broken" />
            <stencil-route url="/logout" component="account-logout" />
            <stencil-route component="page-not-found" />
          </stencil-route-switch>
        </stencil-router>
      </div>
    );
  }
}
