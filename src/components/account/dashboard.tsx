import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-dashboard',
})
export class Dashboard {
  addFeaturePopup: any;
  editFeaturePopup: any;
  deleteFeaturePopup: any;
  changePasswordPopup: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  plan: any = {};

  @State()
  settings: any = {};

  @State()
  features: Array<any> = [];

  @State()
  loading: boolean = true;

  @State()
  selectedEnvironment: string;

  firebaseUnsubscribe: any;
  onFeaturesSnapshot: any;
  componentDidUnload() {
    this.onFeaturesSnapshot();
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;

      const settingsSnapshot = await store
        .collection('settings')
        .doc(this.user.uid)
        .get();
      this.settings = settingsSnapshot.data();

      const plansSnapshot = await store
        .collection('plans')
        .doc(this.user.uid)
        .get();
      this.plan = plansSnapshot.data();

      const featuresQuery = store
        .collection('features')
        .where('owner', '==', this.user.uid)
        .orderBy('created', 'desc');

      this.onFeaturesSnapshot = featuresQuery.onSnapshot((featuresSnapshot) => {
        this.features = featuresSnapshot.docs;
      });

      await featuresQuery.get();
      this.loading = false;
    });
  }

  handleEnvironmentChange(e) {
    this.loading = true;
    this.selectedEnvironment = e.target.value;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  renderEnvironmentChooser() {
    let environments =
      this.settings.environments &&
      this.settings.environments.map((environment) => (
        <option value={environment} selected={this.selectedEnvironment === environment}>
          {environment}
        </option>
      ));

    return (
      <label class="u-small">
        Environment:
        <select class="c-field" onChange={(e) => this.handleEnvironmentChange(e)}>
          <option value="" selected={this.selectedEnvironment === null}>
            defaults
          </option>
          {environments}
        </select>
      </label>
    );
  }

  renderRows() {
    return this.features.map((featureSnapshot) => {
      const feature = featureSnapshot.data();

      return (
        <tr class="c-table__row" key={featureSnapshot.ref.id}>
          <td class="c-table__cell">{feature.name}</td>
          <td class="c-table__cell u-display-medium-up">
            <code class="u-code">{feature.key}</code>
          </td>
          <td class="c-table__cell u-display-medium-up">
            {feature.multivariate ? (
              <span>
                <i class="fa-fw fas fa-sitemap u-gradient-text" /> Multivariate
              </span>
            ) : (
              <span>
                <i class="fa-fw fas fa-power-off u-gradient-text u-gradient-text--warning" /> Boolean
              </span>
            )}
          </td>
          <td class="c-table__cell c-table__cell--center u-center-block">
            <div class="u-center-block__content u-center-block__content--vertical">
              <feature-toggle featureSnapshot={featureSnapshot} selectedEnvironment={this.selectedEnvironment} />
            </div>
          </td>
          <td class="c-table__cell c-table__cell--center o-actions">
            <button
              type="button"
              class="c-button c-button--nude c-button--edit"
              aria-label="Edit feature"
              onClick={() => this.editFeaturePopup.show(featureSnapshot)}>
              <i class="fa-fw fas fa-edit" />
            </button>
            <button
              type="button"
              class="c-button c-button--nude c-button--delete"
              aria-label="Delete feature"
              onClick={() => this.deleteFeaturePopup.show(featureSnapshot)}>
              <i class="fa-fw far fa-trash-alt" />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Dashboard" />
        <h2 class="c-heading u-gradient-text">Dashboard</h2>
        <div>
          <div class="u-letter-box-small o-grid o-grid--no-gutter o-grid--bottom">
            <div class="o-grid__cell o-grid__cell--width-40">
              {!this.loading && this.features.length > 0 && this.renderEnvironmentChooser()}
            </div>
            <div class="o-grid__cell u-right">
              {!this.loading && this.features.length > 0 && (
                <button
                  class="c-button c-button--success c-button--add-feature u-small"
                  onClick={() => this.addFeaturePopup.show()}
                  disabled={this.features.length >= 10 && this.plan.current === 'starter'}>
                  <span class="c-button__icon-left" aria-hidden={true}>
                    <i class="fa-fw fas fa-star-of-life" />
                  </span>
                  Add feature
                </button>
              )}
              {this.features.length >= 10 && this.plan.current === 'starter' && (
                <div class="u-small u-text--quiet">Upgrade to Pro</div>
              )}
            </div>
          </div>
          {this.loading && (
            <div class="u-centered u-super o-page-loading">
              <loading-status status="loading" />
            </div>
          )}
          {!this.loading && this.features.length > 0 && (
            <table class="c-table">
              <thead class="c-table__head">
                <tr class="c-table__row c-table__row--heading">
                  <th class="c-table__cell">Feature</th>
                  <th class="c-table__cell u-display-medium-up">Key</th>
                  <th class="c-table__cell u-display-medium-up">Type</th>
                  <th class="c-table__cell c-table__cell--center">Status</th>
                  <th class="c-table__cell c-table__cell--center">Actions</th>
                </tr>
              </thead>
              <tbody class="c-table__body">{this.renderRows()}</tbody>
            </table>
          )}
          {!this.loading && this.features.length == 0 && (
            <div class="u-centered u-letter-box-super">
              <div class="u-super">😢</div>
              <h3 class="c-heading">You don't have any feature toggles</h3>
              <button class="c-button c-button--ghost-success" onClick={() => this.addFeaturePopup.show()}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i class="fa-fw fas fa-star-of-life" />
                </span>
                Add feature
              </button>
            </div>
          )}
          <feature-add user={this.user} ref={(addFeature) => (this.addFeaturePopup = addFeature)} />
          <feature-edit user={this.user} ref={(editFeature) => (this.editFeaturePopup = editFeature)} />
          <feature-delete ref={(deleteFeature) => (this.deleteFeaturePopup = deleteFeature)} />
        </div>
      </nav-page>
    );
  }
}
