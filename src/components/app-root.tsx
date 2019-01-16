import { Component, State, Prop } from '@stencil/core';
import '@stencil/router';
import { RouterHistory } from '@stencil/router';
import '@blaze/atoms';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @Prop()
  history: RouterHistory;

  @State()
  user: any;

  componentWillLoad() {
    firebase.auth().onAuthStateChanged((user: any) => (this.user = user));
  }

  render() {
    return (
      <div class="u-text">
        <stencil-router scrollTopOffset={0}>
          <stencil-route-switch>
            <stencil-route url="/" component="home-page" exact={true} />
            <stencil-route url="/login" component="account-login" />
            <stencil-route url="/join" component="account-join" />
            <stencil-route url="/dashboard" component="account-dashboard" />
            <stencil-route url="/verify" component="account-verify" />
            <stencil-route url="/complete" component="account-complete" />
            <stencil-route url="/500" component="app-broken" />
            <stencil-route url="/logout" component="account-logout" />
            <stencil-route component="page-not-found" />
          </stencil-route-switch>
        </stencil-router>
      </div>
    );
  }
}
