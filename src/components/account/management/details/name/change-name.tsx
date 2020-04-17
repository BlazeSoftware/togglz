import { h, Component, Event, EventEmitter, State, Prop, Method } from '@stencil/core';
import { AlertMessage, getAlertMessage } from '@/firebase/alert-messages';
import services from '@/firebase/services';
import { ACTIONS } from '@/firebase/profile/update';

@Component({
  tag: 'account-change-name',
})
export class ChangeName {
  alert: any;
  panel: any;

  @Prop()
  user: any = {};

  @Event({ eventName: 'profileChange' })
  onProfileChange: EventEmitter;

  @State()
  loading: boolean;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  displayName: string;

  @Method()
  async show() {
    this.displayName = this.user.displayName;
    this.panel.show();
  }

  @Method()
  async close() {
    this.panel.close();
  }

  @Method()
  async reset() {
    this.panel.close();
    this.alert.close();
    this.loading = false;
    this.displayName = '';
  }

  handleNameChange(e) {
    this.displayName = e.target.value;
  }

  async changeName(e) {
    e.preventDefault();

    this.loading = true;
    try {
      await services.updateProfile(ACTIONS.NAME, this);
      this.onProfileChange.emit(this.user);
      this.reset();
    } catch (error) {
      console.error(error);
      this.alertMsg = getAlertMessage(error.code, this.user.email);
      this.alert.show();
      this.loading = false;
    }
  }

  render() {
    return (
      <blaze-drawer position="right" dismissible ref={(drawer) => (this.panel = drawer)}>
        <button type="button" class="c-button c-button--close" onClick={() => this.panel.close()}>
          ×
        </button>
        <blaze-card>
          <form onSubmit={(e) => this.changeName(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Change name</h2>
            </blaze-card-header>
            <blaze-card-body>
              <blaze-alert ref={(alert) => (this.alert = alert)} type={this.alertMsg.type}>
                <div>{this.alertMsg.message}</div>
                <div>
                  {this.alertMsg.action && (
                    <stencil-route-link
                      url={this.alertMsg.action.url}
                      anchorClass="c-link"
                      anchorRole="link"
                      anchorTitle={this.alertMsg.action.text}>
                      {this.alertMsg.action.text}
                    </stencil-route-link>
                  )}
                </div>
              </blaze-alert>
              <label class="c-label o-form-element">
                Name:
                <div class="o-field o-field--icon-left">
                  <i aria-hidden={true} class="fa-fw fas fa-tag c-icon" />
                  <input
                    type="text"
                    value={this.displayName}
                    class="c-field c-field--label"
                    required
                    disabled={this.loading}
                    onInput={(e) => this.handleNameChange(e)}
                  />
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--success" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-save" />
                </span>
                Save name
              </button>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </blaze-drawer>
    );
  }
}
