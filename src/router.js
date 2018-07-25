import Vue from 'vue';
import Router from 'vue-router';

import AuthPage from '@/views/AuthPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
  ],
});
