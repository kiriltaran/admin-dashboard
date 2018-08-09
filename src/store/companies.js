import api from '@/api';

export default {
  state: {
    companies: {},
    activeCompanyId: null,
    isCompanyEditing: false,
  },
  mutations: {
    SET_COMPANIES(state, payload) {
      state.companies = { ...payload };
    },
    SET_ACTIVE_COMPANY_ID(state, payload) {
      state.activeCompanyId = payload;
    },
    SET_IS_COMPANY_EDITING(state, payload) {
      state.isCompanyEditing = payload;
    },
  },
  actions: {
    setCompanies({ commit }, payload) {
      commit('SET_COMPANIES', payload);
    },
    setActiveCompanyId({ commit }, payload) {
      commit('SET_ACTIVE_COMPANY_ID', payload);
    },
    async createCompany({ commit, dispatch, state }, payload) {
      try {
        commit('SET_LOADING', true, { root: true });
        await api.company.create(payload);
        commit('SET_ACTIVE_COMPANY_ID', Object.keys(state.companies).pop());
        await dispatch('loadVacancies', state.activeCompanyId, { root: true });
        commit('SET_IS_COMPANY_EDITING', false);
        commit('SET_NOTIFICATION', 'Компания создана', { root: true });
      } catch (e) {
        commit('SET_ERROR', e, { root: true });
      } finally {
        commit('SET_LOADING', false, { root: true });
      }
    },
    async updateCompany({ commit, dispatch, state }, payload) {
      try {
        commit('SET_LOADING', true, { root: true });
        await api.company.update(state.activeCompanyId, payload);
        await dispatch('loadVacancies', state.activeCompanyId, { root: true });
        commit('SET_IS_COMPANY_EDITING', false);
        commit('SET_NOTIFICATION', 'Компания изменена', { root: true });
      } catch (e) {
        commit('SET_ERROR', e, { root: true });
      } finally {
        commit('SET_LOADING', false, { root: true });
      }
    },
    setIsCompanyEditing({ commit }, payload) {
      commit('SET_IS_COMPANY_EDITING', payload);
    },
  },
  getters: {
    COMPANIES(state) {
      return state.companies;
    },
    ACTIVE_COMPANY_ID(state) {
      return state.activeCompanyId;
    },
    ACTIVE_COMPANY(state) {
      return state.activeCompanyId
        ? state.companies[state.activeCompanyId]
        : null;
    },
    IS_COMPANY_EDITING(state) {
      return state.isCompanyEditing;
    },
  },
};
