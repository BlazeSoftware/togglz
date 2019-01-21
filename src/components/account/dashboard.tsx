import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-dashboard',
})
export class Dashboard {
  alert: any;
  addFeatureDrawer: any;
  deleteFeatureModal: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  features: Array<any> = [];

  @State()
  loading: boolean = true;

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      if (!user.emailVerified) return this.history.push(`/verify?email=${user.email}`);

      this.user = user;

      const featuresQuery = store
        .collection('features')
        .where('owner', '==', this.user.uid)
        .orderBy('created', 'desc');

      featuresQuery.onSnapshot((featuresSnapshot) => {
        this.features = featuresSnapshot.docs;
      });

      const featuresSnapshot = await featuresQuery.get();

      this.features = featuresSnapshot.docs;
      this.loading = false;
    });
  }

  renderRow(featureSnapshot) {
    const feature = featureSnapshot.data();

    return (
      <tr class="c-table__row" key={featureSnapshot.ref.id}>
        <td class="c-table__cell">{feature.name}</td>
        <td class="c-table__cell">
          <code class="u-text--mono">{feature.key}</code>
        </td>
        <td class="c-table__cell u-center-block">
          <div class="u-center-block__content u-center-block__content--vertical">
            <feature-toggle feature={featureSnapshot} />
          </div>
        </td>
        <td class="c-table__cell">
          <button
            type="button"
            class="c-button c-button--nude c-tooltip c-tooltip--right"
            aria-label="Delete feature"
            onClick={() => this.deleteFeatureModal.show(featureSnapshot)}>
            <i class="far fa-trash-alt" />
          </button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <feature-delete ref={(deleteFeature) => (this.deleteFeatureModal = deleteFeature)} />
        <feature-add user={this.user} ref={(addFeature) => (this.addFeatureDrawer = addFeature)} />
        <div class="o-container o-container--large u-window-box-medium">
          <blaze-card>
            <blaze-card-header>
              <h2 class="c-heading">Dashboard</h2>
            </blaze-card-header>
            {this.loading ? (
              <blaze-card-body>
                <div class="u-centered u-super">⏳</div>
              </blaze-card-body>
            ) : (
              <blaze-card-body>
                {this.features.length > 0 ? (
                  <table class="c-table">
                    <thead class="c-table__head">
                      <tr class="c-table__row c-table__row--heading">
                        <th class="c-table__cell">Feature</th>
                        <th class="c-table__cell">Key</th>
                        <th class="c-table__cell">Status</th>
                        <th class="c-table__cell">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="c-table__body">{this.features.map((f) => this.renderRow(f))}</tbody>
                  </table>
                ) : (
                  <div class="u-centered">
                    <div class="u-super">😢</div>
                    <h3 class="u-heading">You don't have any feature toggles</h3>
                    <button class="c-button c-button--ghost-brand" onClick={() => this.addFeatureDrawer.show()}>
                      <span class="c-button__icon-left" aria-hidden>
                        <i class="fas fa-star-of-life" />
                      </span>
                      Add feature
                    </button>
                  </div>
                )}
              </blaze-card-body>
            )}
            <blaze-card-footer>
              <div class="c-dashboard-controls">
                {this.features.length > 0 && (
                  <div class="u-letter-box-small">
                    <button class="c-button c-button--ghost-brand" onClick={() => this.addFeatureDrawer.show()}>
                      <span class="c-button__icon-left" aria-hidden>
                        <i class="fas fa-star-of-life" />
                      </span>
                      Add feature
                    </button>
                  </div>
                )}
                <div class="u-letter-box-small">
                  <stencil-route-link url={`/reset?email=${this.user.email}`} anchorClass="c-link">
                    <i class="fas fa-lock" aria-hidden /> Change password
                  </stencil-route-link>
                </div>
                <div class="u-letter-box-small">
                  <stencil-route-link url="/logout" anchorClass="c-link">
                    <i class="fas fa-sign-out-alt" aria-hidden /> Log out
                  </stencil-route-link>
                </div>
              </div>
            </blaze-card-footer>
          </blaze-card>
        </div>
      </div>
    );
  }
}
