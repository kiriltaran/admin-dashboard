import Vue from 'vue';
import Vuex from 'vuex';

import companies from './companies';
import vacancies from './vacancies';
import shared from './shared';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    companies,
    vacancies,
    shared,
  },
});
