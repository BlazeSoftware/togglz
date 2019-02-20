import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'how-to-use',
})
export class HowToUse {
  @Prop()
  apiKey: string = '<your-apikey>';

  render() {
    return (
      <div>
        <section>
          <p class="c-paragraph">Using the feature toggles you create couldn't be easier.</p>
          <p class="c-paragraph">
            The API currently only has one <strong class="u-text--loud">GET</strong> end point:
          </p>
          <p class="c-paragraph">
            <a
              href={`https://us-central1-blaze-togglz.cloudfunctions.net/features/${this.apiKey}`}
              class="c-link u-small"
              target="_blank">
              <span>
                {'https://us-central1-blaze-togglz.cloudfunctions.net/features/'}
                <span class="u-text--loud">{this.apiKey}</span>
              </span>
            </a>
          </p>
          <p class="c-paragraph u-text--quiet">The code on the end is your web API key.</p>

          <h3 class="c-heading u-gradient-text u-gradient-text--info">Environments Filter</h3>
          <p class="c-paragraph">
            You can request active feature toggles per environment by adding the <code class="u-code">environment</code>{' '}
            query string parameter:
          </p>
          <p class="c-paragraph u-text--quiet">Example:</p>
          <p class="c-paragraph">
            <a
              href={`https://us-central1-blaze-togglz.cloudfunctions.net/features/${
                this.apiKey
              }?environment=development`}
              class="c-link u-small"
              target="_blank">
              <span>
                .../features/<span class="u-text--loud">{this.apiKey}?environment=development</span>
              </span>
            </a>
          </p>
        </section>
        <section>
          <h3 class="c-heading u-gradient-text u-gradient-text--success">Successful Responses</h3>
          <p class="c-paragraph">
            If web API key is correct you will receive an object of feature keys with their respective values.
          </p>
          <p class="c-paragraph u-text--quiet">Example:</p>
          <code class="u-small u-code u-code--multiline">{`{
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
          <h3 class="c-heading u-gradient-text u-gradient-text--error">Error Responses</h3>
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
      </div>
    );
  }
}
