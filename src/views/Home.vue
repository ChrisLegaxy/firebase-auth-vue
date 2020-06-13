<template>
  <main style="height: 100%">
    <v-container style="height: 100%">
      <v-row style="height: 100%" align="center" justify="center">
        <v-col>
          <div class="text-center title green--text my-7">Firebase Authentication Vue 🥳</div>
          <div id="firebaseui-auth-container"></div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import 'firebaseui/dist/firebaseui.css';

export default {
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          this.$router.push('/profile');
          // return true;
        },
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/profile',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: 'https://policies.google.com/terms?hl=en-US',
      // Privacy policy url/callback.
      privacyPolicyUrl: 'https://policies.google.com/privacy?hl=en-US',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>

<style lang="scss">
#firebaseui-auth-container {
  .firebaseui-idp-list {
    padding: 0;
    margin-bottom: 24px;
  }
}
</style>
