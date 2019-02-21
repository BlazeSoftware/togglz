import { Component, Prop, State } from '@stencil/core';
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
  settings: any = {};

  firebaseUnsubscribe: any;
  onSettingsSnapshot: any;
  componentDidUnload() {
    this.onSettingsSnapshot();
    this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      if (!user.emailVerified) return this.history.push(`/verify?email=${user.email}`);

      this.user = user;

      const plansSnapshot = await store
        .collection('plans')
        .doc(this.user.uid)
        .get();

      const plan = plansSnapshot.data();

      const settingsRef = store.collection('settings').doc(this.user.uid);

      this.onSettingsSnapshot = settingsRef.onSnapshot((settingsSnapshot) => {
        this.settings = settingsSnapshot.data();
        if (plan.current === 'starter' && this.settings.apiCalls > 7500) {
          this.accountWarning.show();
        }
      });

      await settingsRef.get();
    });
  }

  render() {
    const apiCalls = this.settings.apiCalls || 0;
    let usageIndicator = 'info';
    if (apiCalls > 7500) usageIndicator = 'warning';
    if (apiCalls > 8500) usageIndicator = 'error';

    return (
      <div class="o-layout">
        <nav class="c-nav o-layout__sidebar">
          <span class="c-nav__content u-centered u-large c-heading">Togglz</span>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/dashboard">
            <i class="o-icon fa-fw fas fa-tachometer-alt" aria-hidden={true} /> Dashboard
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/account">
            <i class="o-icon fa-fw fas fa-user" aria-hidden={true} /> Account
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/plan">
            <i class="o-icon fa-fw fas fa-dollar-sign" aria-hidden={true} /> Plan
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/api">
            <i class="o-icon fa-fw fas fa-code" aria-hidden={true} /> API
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/contact-us">
            <i class="o-icon fa-fw far fa-comment" aria-hidden={true} /> Contact
          </stencil-route-link>
          <stencil-route-link
            anchorClass="c-nav__item c-nav__item--error"
            activeClass="c-nav__item--active"
            url="/logout">
            <i class="o-icon fa-fw fas fa-sign-out-alt" aria-hidden={true} /> Log out
          </stencil-route-link>
        </nav>
        <div class="o-layout__main u-window-box-medium">
          <blaze-alert ref={(alert) => (this.accountWarning = alert)} type={usageIndicator}>
            <i class="fa-fw fas fa-exclamation-circle" /> On the <strong class="u-text--loud">Starter</strong> plan you
            have 10,000 free API requests per month. You have used{' '}
            <strong class="u-text--loud">{apiCalls.toLocaleString('en-GB')}</strong>.{' '}
            <stencil-route-link anchorClass="c-link" url="/plan">
              Update to Pro.
            </stencil-route-link>
          </blaze-alert>
          <slot />
        </div>
      </div>
    );
  }
}
