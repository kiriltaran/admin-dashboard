import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import wysiwyg from 'vue-wysiwyg';
import Croppa from 'vue-croppa';
import VueTelInput from 'vue-tel-input';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-wysiwyg/dist/vueWysiwyg.css';
import 'vue-croppa/dist/vue-croppa.css';
import 'vue-tel-input/dist/vue-tel-input.css';

import App from './App.vue';
import router from './router';
import store from './store';

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.VUE_APP_SENTRY_DSN, {
    release: process.env.VUE_APP_RELEASE_VERSION,
    environment:
      process.env.VUE_APP_SENTRY_ENV === 'stage' ? 'stage' : 'production',
  })
    .addPlugin(RavenVue, Vue)
    .install();
}

Vue.use(ElementUI, { size: 'medium', locale });
Vue.use(wysiwyg, {
  hideModules: {
    code: true,
    image: true,
    table: true,
    separator: true,
    justifyLeft: true,
    justifyCenter: true,
    justifyRight: true,
  },
});
Vue.use(Croppa);
Vue.use(VueTelInput);

Vue.config.productionTip = false;

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
};

new Vue({
  created() {
    firebase.initializeApp(config);
    this.observeUser();
    this.observeCompanies();
  },
  methods: {
    observeUser() {
      firebase.auth().onAuthStateChanged(async user => {
        this.$store.dispatch('setUser', user);
      });
    },
    observeCompanies() {
      firebase
        .database()
        .ref('companies')
        .on(
          'value',
          snapshot => {
            this.$store.dispatch('setCompanies', snapshot.val());
          },
          e => {
            this.$store.dispatch('setError', e);
          },
        );
    },
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
