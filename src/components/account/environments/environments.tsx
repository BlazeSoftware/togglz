import { h, Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-environments',
})
export class Account {
  addEnvironmentPopup: any;
  editEnvironmentPopup: any;
  deleteEnvironmentPopup: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  plan: any = {};

  @State()
  settings: any = {};

  @State()
  loading: boolean = true;

  onSettingsSnapshot: any;
  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.onSettingsSnapshot();
    this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;

      const plansSnapshot = await store.collection('plans').doc(this.user.uid).get();
      this.plan = plansSnapshot.data();

      const settingsRef = store.collection('settings').doc(this.user.uid);

      this.onSettingsSnapshot = settingsRef.onSnapshot((settingsSnapshot) => {
        this.settings = settingsSnapshot.data();
        this.loading = false;
      });

      await settingsRef.get();
    });
  }

  renderEnvironments() {
    const environments = this.settings.environments || [];
    const rows = environments.map((environment) => (
      <tr class="c-table__row">
        <td class="c-table__cell">{environment}</td>
        <td class="c-table__cell c-table__cell--center o-actions">
          <button
            class="c-button c-button--nude c-button--edit"
            aria-label="Edit environment"
            onClick={() => this.editEnvironmentPopup.show(environment)}>
            <i aria-hidden={true} class="fa-fw fas fa-edit" />
          </button>
          <button
            class="c-button c-button--nude c-button--delete"
            aria-label="Remove environment"
            onClick={() => this.deleteEnvironmentPopup.show(environment)}>
            <i aria-hidden={true} class="fa-fw far fa-trash-alt" />
          </button>
        </td>
      </tr>
    ));
    rows.unshift(
      <tr class="c-table__row">
        <td class="c-table__cell">defaults</td>
        <td class="c-table__cell c-table__cell--center">-</td>
      </tr>
    );

    return (
      <table class="c-table u-high">
        <thead class="c-table__head">
          <tr class="c-table__row c-table__row--heading">
            <th class="c-table__cell">Name</th>
            <th class="c-table__cell c-table__cell--center">Actions</th>
          </tr>
        </thead>
        <tbody class="c-table__body">{rows}</tbody>
      </table>
    );
  }

  render() {
    const environments = this.settings.environments || [];

    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Environments" />
        <h2 class="c-heading">Environments</h2>
        {this.loading && (
          <div class="u-centered u-super o-page-loading">
            <loading-status status="loading" />
          </div>
        )}
        {!this.loading && (
          <div class="o-grid o-grid--no-gutter">
            <div class="o-grid__cell u-right u-letter-box-small">
              <button
                class="c-button c-button--success u-small"
                aria-label="Add new environment"
                onClick={() => this.addEnvironmentPopup.show()}
                disabled={environments.length >= 2 && this.plan.current === 'starter'}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-star-of-life" />
                </span>
                Add <span class="u-display-none u-display-initial@medium">new environment</span>
              </button>
              {environments.length >= 2 && this.plan.current === 'starter' && (
                <div class="u-small u-text--quiet">Upgrade to Pro</div>
              )}
            </div>
          </div>
        )}
        {!this.loading && this.renderEnvironments()}

        <account-add-environment user={this.user} ref={(popup) => (this.addEnvironmentPopup = popup)} />
        <account-edit-environment user={this.user} ref={(popup) => (this.editEnvironmentPopup = popup)} />
        <account-delete-environment user={this.user} ref={(popup) => (this.deleteEnvironmentPopup = popup)} />
      </nav-page>
    );
  }
}
