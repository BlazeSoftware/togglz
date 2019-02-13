import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'account-oob-action',
})
export class Action {
  @Prop()
  history: RouterHistory;

  componentDidLoad() {
    if (!this.history.location.query.oobCode || !this.history.location.query.mode) {
      return this.history.push('/');
    }

    const code = this.history.location.query.oobCode;

    switch (this.history.location.query.mode) {
      case 'resetPassword':
        return this.history.push(`/update-password?oobCode=${code}`);
      case 'verifyEmail':
        return this.history.push(`/complete?oobCode=${code}`);
      case 'recoverEmail':
        return this.history.push(`/recover-email?oobCode=${code}`);
      default:
        return this.history.push('/');
    }
  }
}
