import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-management',
})
export class Account {
  changePasswordPopup: any;
  deleteAccountPopup: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      this.user = user;
    });
  }

  render() {
    return (
      <nav-page history={this.history}>
        <stencil-route-title pageTitle="Account" />
        <h2 class="c-heading">Account</h2>
        <h3 class="c-heading">Personal details</h3>
        Account info to go here
        <h4 class="c-heading">Passwords</h4>
        <button type="button" class="c-button c-button--brand" onClick={() => this.changePasswordPopup.show()}>
          Change password
        </button>
        <h3 class="c-heading">Environments</h3>
        Do these go here? or should there be a settings page also?
        <button type="button" class="c-button c-button--error" onClick={() => this.deleteAccountPopup.show()}>
          Delete account
        </button>
        <account-change-password
          user={this.user}
          ref={(changePassword) => (this.changePasswordPopup = changePassword)}
        />
        <account-delete
          user={this.user}
          history={this.history}
          ref={(deleteAccount) => (this.deleteAccountPopup = deleteAccount)}
        />
      </nav-page>
    );
  }
}
