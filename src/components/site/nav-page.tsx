import { h, Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'nav-page',
})
export class NavPage {
  accountWarning: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  plan: any = {};

  firebaseUnsubscribe: any;
  onPlansSnapshot: any;
  componentDidUnload() {
    this.onPlansSnapshot();
    this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      if (!user.emailVerified) return this.history.push(`/verify?email=${user.email}`);

      this.user = user;

      const plansRef = store.collection('plans').doc(this.user.uid);
      this.onPlansSnapshot = plansRef.onSnapshot((plansSnapshot) => {
        this.plan = plansSnapshot.data();
        if (this.plan.current === 'starter' && this.plan.apiCalls > 7500) {
          this.accountWarning.show();
        }
      });
      await plansRef.get();
    });
  }

  render() {
    const apiCalls = this.plan.apiCalls || 0;
    let usageIndicator = 'info';
    if (apiCalls > 7500) usageIndicator = 'warning';
    if (apiCalls > 8500) usageIndicator = 'error';

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
        <blaze-alerts position="bottomright">
          <blaze-alert dismissible ref={(alert) => (this.accountWarning = alert)} type={usageIndicator}>
            <i aria-hidden={true} class="fa-fw fas fa-exclamation-circle" /> On the{' '}
            <strong class="u-text--loud">Starter</strong> plan you have 10,000 free API requests per month. You have
            used <strong class="u-text--loud">{apiCalls.toLocaleString('en-GB')}</strong>.
            <div>
              <stencil-route-link anchorClass="c-link" url="/plan">
                Update to Pro.
              </stencil-route-link>
            </div>
          </blaze-alert>
        </blaze-alerts>
      </div>
    );
  }
}
