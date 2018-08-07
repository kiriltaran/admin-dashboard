import api from '@/api';
import router from '@/router';
import Raven from 'raven-js';

export default {
  state: {
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload ? { ...payload } : null;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload ? { ...payload } : null;
    },
  },
  actions: {
    async signin({ commit }, payload) {
      try {
        await api.auth.signin(payload.email, payload.password);
      } catch (e) {
        commit('SET_ERROR', e);
      }
    },
    async signout({ commit }) {
      try {
        await api.auth.signout();
      } catch (e) {
        commit('SET_ERROR', e);
      }
    },
    async setUser({ commit }, payload) {
      try {
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
      } catch (e) {
        commit('SET_ERROR', e);
      }
    },
    setError({ commit }, payload) {
      commit('SET_ERROR', payload);
    },
  },
  getters: {
    USER(state) {
      return state.user;
    },
    LOADING(state) {
      return state.loading;
    },
    ERROR(state) {
      return state.error;
    },
  },
};
