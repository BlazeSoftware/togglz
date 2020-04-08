import { h, Component, Prop } from '@stencil/core';

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
            The API currently only has one <span class="u-text--italic">POST</span> end point:
          </p>
          <p class="c-paragraph">
            <a href={`https://www.togglz.com/features/${this.apiKey}`} class="c-link" target="_blank">
              <span>
                {'https://www.togglz.com/features/'}
                <span class="u-text--italic">{this.apiKey}</span>
              </span>
            </a>
          </p>
          <p class="c-paragraph u-text--quiet u-text--italic">The code on the end is your web API key.</p>

          <h3 class="c-heading">Environments Filter</h3>
          <p class="c-paragraph">
            You can request active feature toggles per environment by adding the <code class="u-code">environment</code>{' '}
            query string parameter:
          </p>
          <p class="c-paragraph u-text--quiet u-text--italic">Example:</p>
          <p class="c-paragraph">
            <a
              href={`https://www.togglz.com/features/${this.apiKey}?environment=development`}
              class="c-link"
              target="_blank">
              <span>
                .../features/{this.apiKey}
                <span class="u-text--italic">?environment=development</span>
              </span>
            </a>
          </p>
        </section>
        <section>
          <h3 class="c-heading">Conditional Toggles</h3>
          <p class="c-paragraph">
            You can add conditions to each toggle. All conditions must be met for a toggle to respond as active.
          </p>
          <p class="c-paragraph">To supply information POST a JSON body to the above endpoint.</p>
          <p class="c-paragraph u-text--quiet u-text--italic">Example:</p>
          <code class="u-code u-code--multiline">{`{
  "country": "United Kingdom",
  "age": 37
}`}</code>
          <p class="c-paragraph">
            Any toggle with matching conditions (or no conditions) will return their active value.
          </p>
          <p class="c-paragraph">
            For instance a toggle where it's only condition was <code class="u-code">age > 30</code> would return
            active.
          </p>
          <p class="c-paragraph u-text--italic">All conditions must be met for a toggle to return it's active state.</p>
          <p class="c-paragraph">
            If an example toggle had 2 conditions: <code class="u-code">age > 30</code> and{' '}
            <code class="u-code">country = Canada</code>, it would return inactive.
          </p>
          <p class="c-paragraph u-text--quiet u-text--italic">Example behaviour based on the above request body:</p>
          <table class="c-table u-high">
            <thead class="c-table__head">
              <tr class="c-table__row c-table__row--heading">
                <th class="c-table__cell">Example Feature</th>
                <th class="c-table__cell">Conditions</th>
                <th class="c-table__cell">Expected behaviour</th>
              </tr>
            </thead>
            <tbody class="c-table__body">
              <tr class="c-table__row">
                <td class="c-table__cell">Updated styles</td>
                <td class="c-table__cell u-text--italic">none</td>
                <td class="c-table__cell">active</td>
              </tr>
              <tr class="c-table__row">
                <td class="c-table__cell">New login page</td>
                <td class="c-table__cell">
                  <code class="u-code">age > 30</code>
                </td>
                <td class="c-table__cell">active</td>
              </tr>
              <tr class="c-table__row">
                <td class="c-table__cell">Welcome banner</td>
                <td class="c-table__cell">
                  <code class="u-code">age > 30 &amp; country = Canada</code>
                </td>
                <td class="c-table__cell">inactive</td>
              </tr>
              <tr class="c-table__row">
                <td class="c-table__cell">Contact form</td>
                <td class="c-table__cell">
                  <code class="u-code">color = red</code>
                </td>
                <td class="c-table__cell">inactive</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h3 class="c-heading">Successful Responses</h3>
          <p class="c-paragraph">
            If web API key is correct you will receive an object of feature keys with their respective values.
          </p>
          <p class="c-paragraph u-text--quiet u-text--italic">Example:</p>
          <code class="u-code u-code--multiline">{`{
  boolean_feature: true,
  multivariate_feature: 'something'
}`}</code>
          <p class="c-paragraph">
            <span class="u-text--italic">Boolean</span> features will <span class="u-text--italic">only appear</span> in
            the response if they are <span class="u-text--italic">active</span>.
          </p>
          <p class="c-paragraph">
            <span class="u-text--italic">Multivariate</span> features <span class="u-text--italic">will always</span>{' '}
            appear in the response with their values changing depending on their state.
          </p>
        </section>
        <section>
          <h3 class="c-heading">Error Responses</h3>
          <p class="c-paragraph">
            <span class="u-text--italic">400 Bad Request:</span> No API key was specified in the request the URL.
          </p>
          <p class="c-paragraph">
            <span class="u-text--italic">403 Forbidden:</span> Free API limit of 10,000 requests reached. You should
            upgrade your plan.
          </p>
          <p class="c-paragraph">
            <span class="u-text--italic">404 Not Found:</span> Provided API key doesn't exist.
          </p>
        </section>
      </div>
    );
  }
}
