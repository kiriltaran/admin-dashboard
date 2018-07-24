import Vue from 'vue';
import Router from 'vue-router';

import AuthPage from '@/components/Auth/AuthPage.vue';
import MainPage from '@/components/MainPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
  ],
});
