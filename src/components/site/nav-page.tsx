import { h, Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'nav-page',
})
export class NavPage {
  accountWarning: any;

  @Prop()
  history: RouterHistory;

  render() {
    return (
      <div class="o-layout">
        <nav class="c-nav o-layout__sidebar">
          <span class="c-nav__content u-centered u-large c-heading">Togglz</span>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/dashboard">
            <i aria-hidden={true} class="o-icon fa-fw fas fa-tachometer-alt" /> Dashboard
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/account">
            <i aria-hidden={true} class="o-icon fa-fw fas fa-user" /> Account
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/environments">
            <i aria-hidden={true} class="o-icon fa-fw fas fa-cube" /> Environments
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/plan">
            <i aria-hidden={true} class="o-icon fa-fw fas fa-dollar-sign" /> Plan
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/api">
            <i aria-hidden={true} class="o-icon fa-fw fas fa-code" /> API
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/contact-us">
            <i aria-hidden={true} class="o-icon fa-fw far fa-comment" /> Contact
          </stencil-route-link>
          <stencil-route-link
            anchorClass="c-nav__item c-nav__item--error"
            activeClass="c-nav__item--active"
            url="/logout">
            <i aria-hidden={true} class="o-icon fa-fw fas fa-sign-out-alt" /> Log out
          </stencil-route-link>
        </nav>
        <div class="o-layout__main u-window-box-medium">
          <slot />
        </div>
      </div>
    );
  }
}
