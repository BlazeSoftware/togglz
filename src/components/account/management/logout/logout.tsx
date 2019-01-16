import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-logout',
})
export class Logout {
  @Prop()
  history: RouterHistory;

  componentDidLoad() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setTimeout(() => this.history.push('/'), 1000);
      });
  }

  render() {
    return (
      <div class="u-letter-box-super u-pillar-box-small u-centered">
        <div style={{ 'font-size': '4em' }}>👋</div>
        <h2 class="u-heading">Logging out....</h2>
        <div class="u-text--quiet">See you soon!</div>
      </div>
    );
  }
}
