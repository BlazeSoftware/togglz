import '@blaze/atoms';
import { Component } from '@stencil/core';

@Component({
  tag: 'home-page',
})
export class HomePage {
  renderAboutSection(icon: string, heading: string, body: any) {
    return (
      <section class="o-grid__cell o-grid__cell--width-50 u-letter-box-xlarge">
        <div class="o-grid o-grid--center o-grid--wrap">
          <div class=" o-grid__cell o-grid__cell--width-20">
            <i class={`fa-fw ${icon} fa-3x`} />
          </div>
          <div class=" o-grid__cell o-grid__cell--width-80">
            <h2 class="c-heading">{heading}</h2>
          </div>
          <div class=" o-grid__cell o-grid__cell--width-80 o-grid__cell--offset-20">
            <p class="c-paragraph">{body}</p>
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div>
        <div class="o-hero">
          <section class="o-container o-container--large">
            <h1 class="c-heading u-super c-title">Togglz</h1>
            <blaze-toggle class="u-super" toggled type="brand" />
            <h2 class="c-heading u-medium u-text--quiet c-tagline">Feature toggle service for websites and apps</h2>
            <div class="u-letter-box-large u-small u-text--loud">
              <stencil-route-link url="/login" anchorClass="c-link u-pillar-box-medium">
                Login
              </stencil-route-link>
              <span aria-hidden={true} class="u-text--quiet u-small">
                &bull;
              </span>
              <stencil-route-link url="/join" anchorClass="c-link u-pillar-box-medium">
                Join
              </stencil-route-link>
            </div>
          </section>
        </div>

        <div class="o-blurb">
          <section class="o-container o-container--large">
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

        <footer class="u-centered u-small u-text--quiet u-letter-box-super">
          {new Date().getFullYear()} &copy; Blaze Software Engineering Ltd.
        </footer>
      </div>
    );
  }
}
