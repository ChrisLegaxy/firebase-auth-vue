import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next('/profile');
        } else {
          next();
        }
      });
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        console.log('Please Login to Continue');
        next('/');
      }
    });
  } else {
    next();
  }
});

export default router;
