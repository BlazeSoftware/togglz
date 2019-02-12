import { Component, Prop, State } from '@stencil/core';
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

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      this.user = user;
      this.loading = false;

      const settingsRef = store.collection('settings').doc(this.user.uid);

      settingsRef.onSnapshot((settingsSnapshot) => {
        this.settings = settingsSnapshot.data();
      });

      await settingsRef.get();
    });
  }

  render() {
    const apiKey = this.settings.webAPIKey || '<web-API-key>';

    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Using the API" />
        <h2 class="c-heading">Using the API</h2>
        <section>
          <p class="c-paragraph">Using the feature toggles you've created couldn't be easier.</p>
          <p class="c-paragraph">
            The API currently only has one <strong class="u-text--loud">GET</strong> end point:
          </p>
          <p class="c-paragraph">
            <a
              href={`https://us-central1-blaze-togglz.cloudfunctions.net/features/${apiKey}`}
              class="c-link"
              target="_blank">
              <code class="u-code u-code--multiline">
                {`https://us-central1-blaze-togglz.cloudfunctions.net/features/${apiKey}`}
              </code>
            </a>
          </p>
          <p class="c-paragraph u-text--quiet">The code on the end is your web API key.</p>

          <h3 class="c-heading">Environments filter</h3>
          <p class="c-paragraph">
            You can request active feature toggles per environment by adding the <code class="u-code">environment</code>{' '}
            query string parameter:
          </p>
          <p class="c-paragraph u-text--quiet">Example:</p>
          <p class="c-paragraph">
            <a
              href={`https://us-central1-blaze-togglz.cloudfunctions.net/features/${apiKey}?environment=development`}
              class="c-link"
              target="_blank">
              <code class="u-code u-code--multiline">{`.../features/${apiKey}?environment=development`}</code>
            </a>
          </p>
        </section>
        <section>
          <h3 class="c-heading">Successful responses</h3>
          <p class="c-paragraph">
            If web API key is correct you will receive an object of feature keys with their respective values.
          </p>
          <p class="c-paragraph u-text--quiet">Example:</p>
          <code class="u-code u-code--multiline">{`{
  boolean_feature: true,
  multivariate_feature: 'something'
}`}</code>
          <p class="c-paragraph">
            <strong class="u-text--loud">Boolean</strong> features will{' '}
            <strong class="u-text--loud">only appear</strong> in the response if they are{' '}
            <strong class="u-text--loud">active</strong>.
          </p>
          <p class="c-paragraph">
            <strong class="u-text--loud">Multivariate</strong> features{' '}
            <strong class="u-text--loud">will always</strong> appear in the response with their values changing
            depending on their state.
          </p>
        </section>
        <section>
          <h3 class="c-heading">Error responses</h3>
          <p class="c-paragraph">
            <strong class="u-text--loud">400 Bad Request:</strong> No API key was specified in the request the URL.
          </p>
          <p class="c-paragraph">
            <strong class="u-text--loud">403 Forbidden:</strong> Free API limit of 10,000 requests reached. You should
            upgrade your plan.
          </p>
          <p class="c-paragraph">
            <strong class="u-text--loud">404 Not Found:</strong> Provided API key doesn't exist.
          </p>
        </section>
      </nav-page>
    );
  }
}
