import { h, Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'api-docs',
})
export class ApiDocs {
  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

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
      this.loading = false;

      const settingsRef = store.collection('settings').doc(this.user.uid);

      this.onSettingsSnapshot = settingsRef.onSnapshot((settingsSnapshot) => {
        this.settings = settingsSnapshot.data();
      });

      await settingsRef.get();
    });
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Using the API" />
        <h2 class="c-heading">Using the API</h2>
        <how-to-use apiKey={this.settings.webAPIKey} />
      </nav-page>
    );
  }
}
