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
    message: 'This email already has an account.',
    action: {
      url: `/reset-password?email=${email}`,
      text: ' Would you like to reset your password?',
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
    message: "The password you've used is incorrect.",
    action: {
      url: `/reset-password?email=${email}`,
      text: 'Would you like to reset your password?',
    },
  },
  'auth/weak-password': {
    type: 'error',
    message: 'Your password is not strong enough. It must be at least 6 characters long.',
  },
  'auth/password-changed': {
    type: 'success',
    message: 'Password updated.',
  },
  'auth/verified': {
    type: 'success',
    message: 'Account successfully updated! Please wait whilst we take you to your dashboard.',
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
      text: 'Re-send verification email.',
    },
  },
  'auth/invalid-action-code': {
    type: 'warning',
    message: 'This code is invalid, you may have already used it.',
    action: {
      url: `/verify?send=true&email=${email}`,
      text: 'Re-send email.',
    },
  },
  'auth/missing-action-code': {
    type: 'error',
    message: 'No verification code supplied.',
  },
  'auth/argument-error': {
    type: 'error',
    message: 'Please fill out all required fields.',
  },
  'storage/document-exists': {
    type: 'error',
    message: 'Feature keys must be unique, please use a different value for your key.',
  },
  'plans/upgrading': {
    type: 'info',
    message: 'We are updating your plan...',
  },
  'plans/upgraded': {
    type: 'success',
    message: 'Plan upgraded to Pro.',
  },
});

export const getAlertMessage = (errCode: string, email?: string): AlertMessage =>
  messages(email)[errCode] || messages(email).default;
