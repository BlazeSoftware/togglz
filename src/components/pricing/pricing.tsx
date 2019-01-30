import { Component, Prop, Event, EventEmitter } from '@stencil/core';

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
      <div class="o-container o-container--medium">
        <div class="o-grid o-grid--wrap">
          <div class="o-grid__cell o-grid__cell--width-50">
            <div class="c-card">
              <header class="c-card__header">
                <h2 class="c-heading">
                  Starter
                  <div class="c-heading__sub">Best for individuals</div>
                </h2>
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
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    Personal account
                  </li>
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    30 feature toggles
                  </li>
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />3 authorised domains
                  </li>
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    Web API access
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
                <h2 class="c-heading">
                  Pro
                  <div class="c-heading__sub">For growing teams</div>
                </h2>
                <div class="u-super">$99/mo</div>
                {this.plan === 'pro' ? (
                  <blaze-badge type="success">current plan</blaze-badge>
                ) : (
                  <blaze-badge type="info">most popular</blaze-badge>
                )}
              </header>
              <div class="c-card__body">
                <div class="u-small">
                  Includes <span class="u-text--loud">Starter</span>, plus:
                </div>
                <ul class="c-list c-list--unstyled">
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    Unlimited teams
                  </li>
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    Unlimited feature toggles
                  </li>
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    Unlimited authorised domains
                  </li>
                  <li class="o-feature c-list__item">
                    <i class="o-icon u-text--quiet far fa-check-circle" />
                    Reporting
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
