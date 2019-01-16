export interface AlertMessage {
  type?: string;
  message?: any;
  action?: {
    url: string;
    text: string;
  };
}

const messages = (email: string) => ({
  default: {
    type: 'error',
    message: "Oops, sorry about this but something went wrong. Please contact us and we'll do our best to help.",
  },
  'auth/invalid-email': {
    type: 'error',
    message: 'Please use a valid email address.',
  },
  'auth/email-already-in-use': {
    type: 'info',
    message: 'This email already has an account. Would you like to ',
    action: {
      url: `/forgot?email=${email}`,
      text: 'reset your password?',
    },
  },
  'auth/user-not-found': {
    type: 'error',
    message: "We don't have any accounts that match that email address.",
    action: {
      url: `/join?email=${email}`,
      text: 'Create a new account',
    },
  },
  'auth/wrong-password': {
    type: 'info',
    message: "The password you've used is incorrect. Would you like to ",
    action: {
      url: `/forgot?email=${email}`,
      text: 'reset your password?',
    },
  },
  'auth/weak-password': {
    type: 'error',
    message: 'Your password is not strong enough. It must be at least 6 characters long.',
  },
  'auth/too-many-requests': {
    type: 'warning',
    message: 'We have detected too many attempts to login from this device. Please try again later.',
  },
  'auth/user-disabled': {
    type: 'warning',
    message: "Your account has been disabled. Please contact us and we'll do our best to help you.",
  },
  'auth/expired-action-code': {
    type: 'warning',
    message: 'The verify link we emailed you has expired.',
    action: {
      url: `/verify?email=${email}`,
      text: 'Re-send verification email',
    },
  },
  'auth/invalid-action-code': {
    type: 'warning',
    message: 'This verification code is invalid, you may have already used it.',
    action: {
      url: `/verify?resend=true&email=${email}`,
      text: 'Re-send verification email',
    },
  },
  'auth/missing-action-code': {
    type: 'error',
    message: 'No verification code supplied.',
  },
});

export const getAlertMessage = (errCode: string, email: string): AlertMessage =>
  messages(email)[errCode] || messages(email).default;
