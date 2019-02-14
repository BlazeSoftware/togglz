import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'contact-us',
})
export class ContactUs {
  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  settings: any = {};

  @State()
  loading: boolean = true;

  alertSending: any;
  alertSent: any;
  alertError: any;

  @State()
  sending: boolean;

  @State()
  email: string;

  @State()
  from: string;

  @State()
  message: string = '';

  handleEmailChange(e) {
    this.email = e.target.value;
  }

  handleFromChange(e) {
    this.from = e.target.value;
  }

  handleMessageChange(e) {
    this.message = e.target.value;
  }

  async sendMessage(e) {
    e.preventDefault();

    this.alertSending.show();
    setTimeout(() => this.alertSending.close(), 4000);

    // Call email service
    try {
      const response = await fetch('https://us-central1-blaze-togglz.cloudfunctions.net/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          from: this.from,
          message: this.message,
        }),
      });

      if (!response.ok) throw await response.text();
      this.messageSent();
    } catch (error) {
      console.error(error);
      this.alertError.show();
    }
  }

  messageSent() {
    this.alertSent.show();
    setTimeout(() => this.alertSent.close(), 4000);
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;
      this.email = this.user.email;
      this.from = this.user.displayName;
      this.loading = false;
    });
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Contact Us" />
        <h2 class="c-heading">Contact Us</h2>
        <div class="o-container o-container--small">
          <form onSubmit={(e) => this.sendMessage(e)}>
            <label class="c-label o-form-element">
              Email address:
              <div class="o-field o-field--icon-left">
                <i class="fa-fw fas fa-at c-icon" />
                <input
                  type="email"
                  value={this.email}
                  class="c-field c-field--label"
                  required
                  onInput={(e) => this.handleEmailChange(e)}
                />
              </div>
            </label>

            <label class="c-label o-form-element">
              Name:
              <div class="o-field o-field--icon-left">
                <i class="fa-fw fas fa-user c-icon" />
                <input
                  value={this.from}
                  class="c-field c-field--label"
                  required
                  onInput={(e) => this.handleFromChange(e)}
                />
              </div>
            </label>

            <label class="c-label o-form-element">
              Message:
              <textarea
                class="c-field c-field--label"
                placeholder="Write your message here..."
                required
                maxLength={5000}
                onInput={(e) => this.handleMessageChange(e)}
                value={this.message}
              />
              <div role="tooltip" class="c-hint">
                {this.message.length} of 5000
              </div>
            </label>
            <div class="u-letter-box-xlarge">
              <button class="c-button c-button--brand c-button--block">
                Send message
                <span class="c-button__icon-right" aria-hidden={true}>
                  <i class="fa-fw far fa-paper-plane" />
                </span>
              </button>
            </div>
          </form>
        </div>
        <blaze-alerts position="topright">
          <blaze-alert ref={(alert) => (this.alertSending = alert)} type="info">
            Sending message...
          </blaze-alert>
          <blaze-alert ref={(alert) => (this.alertSent = alert)} type="success">
            Message sent, thank you
          </blaze-alert>
          <blaze-alert ref={(alert) => (this.alertError = alert)} type="error">
            Failed to send message. Try{' '}
            <a
              class="c-link"
              href="&#109;&#097;&#105;&#108;&#116;&#111;:&#104;&#101;&#108;&#108;&#111;&#064;&#116;&#111;&#103;&#103;&#108;&#122;&#046;&#099;&#111;&#109;">
              emailing us directly
            </a>
            .
          </blaze-alert>
        </blaze-alerts>
      </nav-page>
    );
  }
}
