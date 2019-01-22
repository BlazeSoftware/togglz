import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'nav-page',
})
export class NavPage {
  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      if (!user.emailVerified) return this.history.push(`/verify?email=${user.email}`);

      this.user = user;
    });
  }

  render() {
    return (
      <div class="o-layout">
        <nav class="c-nav o-layout__sidebar">
          <span class="c-nav__content u-centered u-large u-text--loud">Togglz</span>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/dashboard">
            <i class="o-icon fas fa-tachometer-alt" aria-hidden /> Dashboard
          </stencil-route-link>
          <stencil-route-link anchorClass="c-nav__item" activeClass="c-nav__item--active" url="/account">
            <i class="o-icon fas fa-user" aria-hidden /> Account
          </stencil-route-link>
          <stencil-route-link
            anchorClass="c-nav__item c-nav__item--error"
            activeClass="c-nav__item--active"
            url="/logout">
            <i class="o-icon fas fa-sign-out-alt" aria-hidden /> Log out
          </stencil-route-link>
        </nav>
        <div class="o-layout__main u-window-box-medium">
          <slot />
        </div>
      </div>
    );
  }
}
