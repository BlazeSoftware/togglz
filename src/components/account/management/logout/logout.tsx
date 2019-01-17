import { Component, State } from '@stencil/core';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-logout',
})
export class Logout {
  @State()
  loggedOut: boolean;

  componentDidLoad() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.loggedOut = true;
      });
  }

  render() {
    return (
      <div class="u-letter-box-super u-pillar-box-small u-centered">
        <div style={{ 'font-size': '4em' }}>👋</div>
        {!this.loggedOut ? (
          <h2 class="u-heading">Logging out....</h2>
        ) : (
          <div>
            <h2 class="u-heading">Logged out.</h2>
            <p class="c-paragraph u-text--quiet">See you soon!</p>
            <p class="c-paragraph">
              <stencil-route-link url={'/'} anchorClass="c-link">
                Go back to the home page
              </stencil-route-link>
            </p>
            <p class="c-paragraph">
              <stencil-route-link url={'/login'} anchorClass="c-link">
                Log in again
              </stencil-route-link>
            </p>
          </div>
        )}
      </div>
    );
  }
}
