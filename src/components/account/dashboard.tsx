import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-dashboard',
})
export class Dashboard {
  @Prop()
  history: RouterHistory;

  componentDidLoad() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) return this.history.push('/login');
      if (!user.emailVerified) return this.history.push(`/verify?email=${user.email}`);
    });
  }

  render() {
    return (
      <div class="u-letter-box-super u-pillar-box-small u-centered">
        <h2 class="u-heading">Dashboard</h2>
      </div>
    );
  }
}
