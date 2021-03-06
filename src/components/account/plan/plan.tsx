import { h, Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';

declare const Stripe: any;

@Component({
  tag: 'account-plan',
})
export class Plan {
  downgradePopup: any;
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

  stripe = Stripe('pk_live_Z2Ilgh9ZSq2I7Azr0H3LCcxH', {
    betas: ['checkout_beta_4'],
  });

  async upgrade() {
    this.alert.close();

    const result = await this.stripe.redirectToCheckout({
      items: [{ plan: 'plan_EWQBmPfIRIShgL', quantity: 1 }],
      successUrl: 'https://www.togglz.com/plan?upgraded=true',
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

  onPlansSnapshot: any;
  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.onPlansSnapshot();
    this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;

      const planRef = store.collection('plans').doc(this.user.uid);

      this.onPlansSnapshot = planRef.onSnapshot((planSnapshot) => {
        this.plan = planSnapshot.data();
        if (this.plan && this.plan.current === 'pro' && this.history.location.query.upgraded) {
          this.alertMsg = getAlertMessage('plans/upgraded');
          this.alert.show();
        }
        this.alert.close();
        this.downgradePopup.close();
      });

      await planRef.get();
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
          {!this.loading && (
            <pricing-overview
              onUpgrade={() => this.upgrade()}
              onDowngrade={() => this.downgradePopup.show()}
              plan={this.plan.current}
            />
          )}
        </div>
        <account-downgrade-plan user={this.user} ref={(panel) => (this.downgradePopup = panel)} />
      </nav-page>
    );
  }
}
