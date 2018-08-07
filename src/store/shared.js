import api from '@/api';
import router from '@/router';
import Raven from 'raven-js';

export default {
  state: {
    user: null,
    loading: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    async signin({}, payload) {
      await api.auth.signin(payload.email, payload.password);
    },
    async signout() {
      await api.auth.signout();
    },
    async setUser({ commit }, payload) {
      if (payload) {
        const role = await api.auth.getUserRole(payload.uid);
        if (role === 'admin') {
          commit('SET_USER', payload);
          Raven.setUserContext({
            id: payload.uid,
            email: payload.email,
          });
          router.push({ path: '/' });
        } else {
          await api.auth.signout();
        }
      } else {
        commit('SET_USER', payload);
        router.push({ path: '/auth' });
      }
    },
  },
  getters: {
    USER(state) {
      return state.user;
    },
    LOADING(state) {
      return state.loading;
    },
  },
};
