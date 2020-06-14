<template>
  <div style="height: 100%">
    <v-container style="height: 100%">
      <v-row
        style="height: 100%"
        align-center
        justify-center
      >
        <v-col class="d-flex flex-column align-center justify-center">
          <div class="my-10 text-center">
            Welcome! {{ displayName }}
            <br>
            Provider: {{ provider }}
          </div>
          <v-btn
            color="primary"
            @click="signOut"
          >
            Sign Out
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      displayName: '',
      provider: '',
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.displayName = user.displayName;
      this.provider = user.providerData[0].providerId;
    });
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      return this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped></style>
