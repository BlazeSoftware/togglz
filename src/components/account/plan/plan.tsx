import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';
import { AlertMessage } from '@/firebase/alert-messages';

declare const Stripe: any;

@Component({
  tag: 'account-plan',
})
export class Plan {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  user: any = {};

  @State()
  plan: any = {};

  @State()
  loading: boolean = true;

  stripe = Stripe('pk_test_umI4vlS4g2bIOudlru0PcU0w', {
    betas: ['checkout_beta_4'],
  });

  async upgrade() {
    this.alert.close();

    const result = await this.stripe.redirectToCheckout({
      items: [{ plan: 'plan_ERAHeqIAYD8I1q', quantity: 1 }],
      successUrl: 'https://www.togglz.com/plan',
      cancelUrl: 'https://www.togglz.com/plan',
      clientReferenceId: this.user.uid,
    });

    if (result.error) {
      this.alertMsg = {
        type: 'error',
        message: result.error.message,
      };
      this.alert.show();
    }
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      this.user = user;

      const planRef = store.collection('plans').doc(this.user.uid);

      planRef.onSnapshot((planSnapshot) => {
        this.plan = planSnapshot.data();
      });

      const planSnapshot = await planRef.get();
      this.plan = planSnapshot.data();

      if (!this.plan) await planRef.set({ current: 'starter' });

      this.loading = false;
    });
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Plan" />
        <h2 class="c-heading">Plan</h2>
        <div>
          <blaze-alert ref={(alert) => (this.alert = alert)} type={this.alertMsg.type}>
            <div>{this.alertMsg.message}</div>
            <div>
              {this.alertMsg.action && (
                <stencil-route-link
                  url={this.alertMsg.action.url}
                  anchorClass="c-link"
                  anchorRole="link"
                  anchorTitle={this.alertMsg.action.text}>
                  {this.alertMsg.action.text}
                </stencil-route-link>
              )}
            </div>
          </blaze-alert>
          {this.loading && (
            <div class="u-centered u-super o-page-loading">
              <loading-status status="loading" />
            </div>
          )}
          {!this.loading && <pricing-overview onUpgrade={() => this.upgrade()} plan={this.plan.current} />}
        </div>
      </nav-page>
    );
  }
}
