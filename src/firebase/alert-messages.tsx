import '@stencil/router';

const messages = (email: string) => ({
  default: {
    type: 'error',
    message: (
      <span>Oops, sorry about this but something went wrong. Please contact us and we'll do our best to help.</span>
    ),
  },
  'auth/invalid-email': {
    type: 'error',
    message: <span>Please use a valid email address.</span>,
  },
  'auth/email-already-in-use': {
    type: 'info',
    message: [
      <div>This email already has an account.</div>,
      <div>
        Would you like to{' '}
        <stencil-route-link
          url={`/forgot/${email}`}
          anchorClass="c-link"
          anchorRole="link"
          anchorTitle="Reset password link">
          reset your password
        </stencil-route-link>
        ?
      </div>,
    ],
  },
  'auth/user-not-found': {
    type: 'error',
    message: (
      <span>
        We don't have any accounts that match that email address.{' '}
        <stencil-route-link
          url={`/join?email=${email}`}
          anchorClass="c-link"
          anchorRole="link"
          anchorTitle="Create account">
          Create a new account
        </stencil-route-link>
        .
      </span>
    ),
  },
  'auth/wrong-password': {
    type: 'info',
    message: [
      <div>The password you've used is incorrect.</div>,
      <div>
        Would you like to{' '}
        <stencil-route-link url="/forgot" anchorClass="c-link" anchorRole="link" anchorTitle="Reset password link">
          reset your password
        </stencil-route-link>
        ?
      </div>,
    ],
  },
  'auth/weak-password': {
    type: 'error',
    message: <span>Your password is not strong enough. It must be at least 6 characters long.</span>,
  },
  'auth/too-many-requests': {
    type: 'warning',
    message: <span>We have detected too many attempts to login from this device. Please try again later.</span>,
  },

  'auth/user-disabled': {
    type: 'warning',
    message: <span>Your account has been disabled. Please contact us and we'll do our best to help you.</span>,
  },
  'auth/expired-action-code': {
    type: 'warning',
    message: (
      <span>
        The verify link we emailed you has expired.{' '}
        <stencil-route-link
          url={`/verify?email=${email}`}
          anchorClass="c-link"
          anchorRole="link"
          anchorTitle="Re-send verificaiton email">
          Re-send verification email
        </stencil-route-link>
        .
      </span>
    ),
  },
  'auth/invalid-action-code': {
    type: 'warning',
    message: (
      <span>
        This verification code is invalid, you may have already used it.{' '}
        <stencil-route-link
          url={`/verify?resend=true&email=${email}`}
          anchorClass="c-link"
          anchorRole="link"
          anchorTitle="Re-send verificaiton email">
          Re-send verification email
        </stencil-route-link>{' '}
        and try again.
      </span>
    ),
  },
  'auth/missing-action-code': {
    type: 'error',
    message: <span>No verification code supplied.</span>,
  },
});

export interface AlertMessage {
  type?: string;
  message?: any;
}

export const getAlertMessage = (errCode: string, email: string): AlertMessage =>
  messages(email)[errCode] || messages(email).default;
