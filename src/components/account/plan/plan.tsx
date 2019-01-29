import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-plan',
})
export class Plan {
  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  plan: any = {};

  @State()
  loading: boolean = true;

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      this.user = user;

      const planRef = store.collection('plan').doc(this.user.uid);

      planRef.onSnapshot((planSnapshot) => {
        this.plan = planSnapshot.data();
      });

      const planSnapshot = await planRef.get();
      this.plan = planSnapshot.data();

      this.loading = false;
    });
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Plan" />
        <h2 class="c-heading">Plan</h2>
        <div>
          {this.loading && (
            <div class="u-centered u-super o-page-loading">
              <loading-status status="loading" />
            </div>
          )}
          {!this.loading && <pricing-overview plan={this.plan.current} />}
        </div>
      </nav-page>
    );
  }
}
