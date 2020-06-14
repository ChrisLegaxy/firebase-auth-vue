import Vue from 'vue';
import axios from 'axios';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebaseConfig from '../firebase.config';

/** Vue Variable */
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/** Initialize Firebase */
firebase.initializeApp(firebaseConfig);

/** New Vue Instance */
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
