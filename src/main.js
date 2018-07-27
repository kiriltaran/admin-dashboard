import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;
// need replace to config file
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
};

new Vue({
  router,
  created() {
    firebase.initializeApp(config);
  },
  render: h => h(App),
}).$mount('#app');
