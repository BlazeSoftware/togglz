import '@blaze/atoms';
import { h, Component } from '@stencil/core';

@Component({
  tag: 'home-page',
})
export class HomePage {
  modal: any;

  renderAboutSection(icon: string, heading: string, body: any) {
    return (
      <section class="o-grid__cell o-grid__cell--width-50 u-letter-box-xlarge">
        <div class="o-grid o-grid--center o-grid--wrap">
          <div class="o-grid__cell o-grid__cell--width-20">
            <i aria-hidden={true} class={`fa-fw ${icon} fa-3x`} />
          </div>
          <div class="o-grid__cell o-grid__cell--width-80">
            <h2 class="c-heading">{heading}</h2>
          </div>
          <div class="o-grid__cell o-grid__cell--width-80 o-grid__cell--offset-20">
            <p class="c-paragraph">{body}</p>
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div>
        <stencil-route-title pageTitle="Togglz - Feature toggle service for websites and apps." />
        <div class="o-hero">
          <section class="o-container o-container--large">
            <div class="o-grid o-grid--wrap o-grid--xsmall-full  o-grid--small-full o-grid--medium-full">
              <div class="o-grid__cell u-large u-centered">
                <h1 class="c-heading u-super c-title">Togglz</h1>
                <blaze-toggle class="u-super" toggled type="brand" />
                <h2 class="c-heading u-medium c-tagline">Feature toggle service for websites and apps</h2>
                <div class="u-letter-box-large o-container o-container--xsmall">
                  <stencil-route-link url="/login" anchorClass="c-button c-button--brand c-button--block">
                    Login
                  </stencil-route-link>
                </div>
              </div>
              <div class="o-grid__cell">
                <account-join />
              </div>
            </div>
          </section>
        </div>

        <div class="o-blurb">
          <section class="o-container o-container--medium">
            <p class="c-paragraph">
              Togglz provides feature management and reliable API services to help you drive continuous development and
              deliver new functionality to your users safely without the need to update code.
            </p>
          </section>
        </div>

        <div class="o-benefits">
          <section class="o-container o-container--large o-grid o-grid--wrap o-grid--no-gutter o-grid--xsmall-full o-grid--small-full o-grid--medium-full">
            {this.renderAboutSection(
              'fas fa-rocket',
              'Continuously Deploy',
              'Unblock your CI pipeline by de-coupling your deployments and releases. Continuously deploy and then manage the release separately.'
            )}
            {this.renderAboutSection(
              'fas fa-tasks',
              'Feature Management',
              'Manage all your features from one central location; add, toggle, edit and delete features from the dashboard.'
            )}
            {this.renderAboutSection(
              'fas fa-sitemap',
              'Multivariate Support',
              'Provide your own custom values per the active and inactive states for each of your feature toggles.'
            )}
            {this.renderAboutSection(
              'fas fa-code-branch',
              'Conditional Rules',
              'Create multiple conditions that must be satisfied before a feature toggle is activated.'
            )}
            {this.renderAboutSection(
              'fas fa-project-diagram',
              'Webhooks',
              'Using Webhooks you can build your own integrations that subscribe to feature toggle changes.'
            )}
            {this.renderAboutSection(
              'fas fa-server',
              'Multiple Environments',
              'Produce different configurations of your site or app dependant on environment. If you want you can turn everything on in Test but only a selection of features in Live.'
            )}
            {this.renderAboutSection(
              'fas fa-signal',
              'Stable and Scalable',
              "Togglz is hosted on Google's cloud infrastructure which maintains high availability and scalability when things start to grow."
            )}
            {this.renderAboutSection(
              'fas fa-dollar-sign',
              'Free and Pro Plans',
              'Get started for free, and as your needs grow upgrade to our Pro account for unlimited traffic, features and environments.'
            )}
          </section>
        </div>

        <div class="o-steps">
          <h2 class="c-heading u-super u-centered">How To Use</h2>

          <div class="o-grid o-grid--center o-grid--wrap u-letter-box-large">
            <div class="o-grid__cell o-grid__cell--width-20">
              <i aria-hidden={true} class="fa-fw fas fa-user-plus u-xlarge" />
            </div>
            <div class="o-grid__cell o-grid__cell--width-80">
              <span class="u-xlarge">Step 1</span>
            </div>
            <div class="o-grid__cell o-grid__cell--offset-20">
              <stencil-route-link url="/join" anchorClass="c-link">
                Create an account
              </stencil-route-link>
            </div>
          </div>

          <div class="o-grid o-grid--center o-grid--wrap u-letter-box-large">
            <div class="o-grid__cell o-grid__cell--width-20">
              <i aria-hidden={true} class="fa-fw fas fa-toggle-on u-xlarge" />
            </div>
            <div class="o-grid__cell o-grid__cell--width-80">
              <span class="u-xlarge">Step 2</span>
            </div>
            <div class="o-grid__cell o-grid__cell--offset-20">Add feature toggles</div>
          </div>

          <div class="o-grid o-grid--center o-grid--wrap u-letter-box-large">
            <div class="o-grid__cell o-grid__cell--width-20">
              <i aria-hidden={true} class="fa-fw fas fa-code u-xlarge" />
            </div>
            <div class="o-grid__cell o-grid__cell--width-80">
              <span class="u-xlarge">Step 3</span>
            </div>
            <div class="o-grid__cell o-grid__cell--offset-20">
              <a class="c-link" onClick={() => this.modal.show()}>
                Integrate into your app
              </a>
            </div>
          </div>
        </div>

        <div class="o-example u-window-box-large">
          <div class="o-example__content">
            <code class="u-text--mono">
              <pre>{`const res = await fetch('<Togglz-API>');
const features = await res.json();

if (features.myNewThing) {
  // ...new feature code
}`}</pre>
            </code>
          </div>
        </div>

        <footer class="u-centered u-small u-letter-box-super">
          {new Date().getFullYear()} &copy; Blaze Software Engineering Ltd.
        </footer>

        <blaze-modal ref={(modal) => (this.modal = modal)} dismissible full>
          <blaze-card>
            <blaze-card-header>
              <h2 class="c-heading">Using the API</h2>
            </blaze-card-header>
            <blaze-card-body>
              <how-to-use />
            </blaze-card-body>
            <blaze-card-footer>
              <div class="u-right">
                <button
                  class="c-button c-button--info"
                  onClick={() => {
                    this.modal.close();
                  }}>
                  Close
                </button>
              </div>
            </blaze-card-footer>
          </blaze-card>
        </blaze-modal>
      </div>
    );
  }
}
