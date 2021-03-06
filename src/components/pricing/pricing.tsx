import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'pricing-overview',
})
export class Pricing {
  @Prop()
  plan: string;

  @Event()
  upgrade: EventEmitter;

  @Event()
  downgrade: EventEmitter;

  @Event()
  join: EventEmitter;

  render() {
    return (
      <div class="o-container o-container--large">
        <div class="o-grid o-grid--wrap o-grid--xsmall-full o-grid--small-full o-grid--medium-full o-grid--large-fit">
          <div class="o-grid__cell o-grid__cell--width-50">
            <div class="c-card">
              <header class="c-card__header">
                <h2 class="c-heading">Starter</h2>
                <br />
                <h3 class="c-heading">Best for individuals</h3>
                <div class="u-super">$0/mo</div>
                {this.plan === 'starter' ? (
                  <blaze-badge type="success">current plan</blaze-badge>
                ) : (
                  <blaze-badge type="brand">free</blaze-badge>
                )}
              </header>
              <div class="c-card__body">
                <div class="u-small">Includes:</div>
                <ul class="c-list c-list--unstyled">
                  <li class="o-feature c-list__item">
                    <i aria-hidden={true} class="o-icon u-text--quiet fa-fw far fa-check-circle" />
                    10 feature toggles
                  </li>
                  <li class="o-feature c-list__item">
                    <i aria-hidden={true} class="o-icon u-text--quiet fa-fw far fa-check-circle" />2 environments
                  </li>
                  <li class="o-feature c-list__item">
                    <i aria-hidden={true} class="o-icon u-text--quiet fa-fw far fa-check-circle" />
                    10,000 API requests per month
                  </li>
                </ul>
              </div>
              <footer class="c-card__footer c-card__footer--block">
                <div class="c-input-group">
                  {!this.plan && (
                    <button class="c-button c-button--block c-button--success" onClick={() => this.join.emit()}>
                      Join
                    </button>
                  )}
                  {this.plan === 'pro' && (
                    <button class="c-button c-button--block" onClick={() => this.downgrade.emit()}>
                      Downgrade
                    </button>
                  )}
                </div>
              </footer>
            </div>
          </div>

          <div class="o-grid__cell o-grid__cell--width-50">
            <div class="c-card">
              <header class="c-card__header">
                <h2 class="c-heading">Pro</h2>
                <br />
                <h3 class="c-heading">More traffic, more environments</h3>
                <div class="u-super">$199/mo</div>
                {this.plan === 'pro' ? (
                  <blaze-badge type="success">current plan</blaze-badge>
                ) : (
                  <blaze-badge type="info">more power</blaze-badge>
                )}
              </header>
              <div class="c-card__body">
                <div class="u-small">
                  Includes <span class="u-text--loud">Starter</span>, plus:
                </div>
                <ul class="c-list c-list--unstyled">
                  <li class="o-feature c-list__item">
                    <i aria-hidden={true} class="o-icon u-text--quiet fa-fw far fa-check-circle" />
                    Unlimited feature toggles
                  </li>
                  <li class="o-feature c-list__item">
                    <i aria-hidden={true} class="o-icon u-text--quiet fa-fw far fa-check-circle" />
                    Unlimited environments
                  </li>
                  <li class="o-feature c-list__item">
                    <i aria-hidden={true} class="o-icon u-text--quiet fa-fw far fa-check-circle" />
                    Unlimited API requests
                  </li>
                </ul>
              </div>
              <footer class="c-card__footer c-card__footer--block">
                <div class="c-input-group">
                  {this.plan === 'starter' && (
                    <button class="c-button c-button--block c-button--info" onClick={() => this.upgrade.emit()}>
                      Upgrade
                    </button>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
