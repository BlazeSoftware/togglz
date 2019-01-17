import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-verify',
})
export class Verify {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  complete: boolean;

  resend() {
    // todo: resend verification email
    this.complete = true;
    this.alert.show();
  }

  componentDidLoad() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return this.history.push('/login');
      }

      if (user.emailVerified) {
        return this.history.push('/dashboard');
      }

      if (!user.emailVerified && this.history.location.query.resend === 'true') {
        return user
          .sendEmailVerification()
          .then(() => {
            this.complete = true;
            this.alert.show();
          })
          .catch(() => this.history.push('/500'));
      }
    });
  }

  render() {
    const email = this.history.location.query.email;
    return (
      <div class="o-container o-container--xsmall u-letter-box-super">
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading">Verify email address</h2>
          </blaze-card-header>
          <blaze-card-body>
            <blaze-alert ref={(alert) => (this.alert = alert)} type="info">
              Verification email re-sent.
            </blaze-alert>
            <p class="u-paragraph">
              We've sent an email to {email ? <span class="u-text--loud">{email}</span> : <span>your inbox</span>}.
            </p>
            <p class="u-paragraph">Click on the link in the email and we'll get your account setup.</p>
            <p class="u-paragraph u-small">
              If you don't receive an email make sure you've checked your junk folder and hit the button below. Get in
              touch if you're having problems.
            </p>
          </blaze-card-body>
          <blaze-card-footer>
            <button
              class="c-button c-button--brand c-button--block"
              disabled={this.complete}
              onClick={() => this.resend()}>
              Re-send verification email
              <span class="c-button__icon-right" aria-hidden>
                <i class="fas fa-paper-plane" />
              </span>
            </button>
          </blaze-card-footer>
        </blaze-card>
      </div>
    );
  }
}
