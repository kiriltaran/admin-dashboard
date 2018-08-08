import api from '@/api';

export default {
  state: {
    vacancies: {},
    activeVacancyId: null,
    isVacancyEditing: false,
  },
  mutations: {
    SET_VACANCIES(state, payload) {
      state.vacancies = { ...payload };
    },
    SET_ACTIVE_VACANCY_ID(state, payload) {
      state.activeVacancyId = payload;
    },
    SET_IS_VACANCY_EDITING(state, payload) {
      state.isVacancyEditing = payload;
    },
  },
  actions: {
    async loadVacancies({ commit }, payload) {
      try {
        commit('SET_LOADING', true, { root: true });
        const vacancies = await api.vacancy.getList(payload);
        commit('SET_VACANCIES', vacancies);
      } catch (e) {
        commit('SET_ERROR', e, { root: true });
      } finally {
        commit('SET_LOADING', false, { root: true });
      }
    },
    setActiveVacancyId({ commit }, payload) {
      commit('SET_ACTIVE_VACANCY_ID', payload);
    },
    async createVacancy({ commit, dispatch, state, rootGetters }, payload) {
      try {
        commit('SET_LOADING', true, { root: true });
        await api.vacancy.create(rootGetters.ACTIVE_COMPANY_ID, payload);
        await dispatch('loadVacancies', rootGetters.ACTIVE_COMPANY_ID);
        commit('SET_ACTIVE_VACANCY_ID', Object.keys(state.vacancies).pop());
        commit('SET_IS_VACANCY_EDITING', false);
        commit('SET_NOTIFICATION', 'Вакансия создана', { root: true });
      } catch (e) {
        commit('SET_ERROR', e, { root: true });
      } finally {
        commit('SET_LOADING', false, { root: true });
      }
    },
    async updateVacancy({ commit, dispatch, state, rootGetters }, payload) {
      try {
        commit('SET_LOADING', true, { root: true });
        await api.vacancy.update(state.activeVacancyId, payload);
        await dispatch('loadVacancies', rootGetters.ACTIVE_COMPANY_ID);
        commit('SET_IS_VACANCY_EDITING', false);
        commit('SET_NOTIFICATION', 'Вакансия изменена', { root: true });
      } catch (e) {
        commit('SET_ERROR', e, { root: true });
      } finally {
        commit('SET_LOADING', false, { root: true });
      }
    },
    setIsVacancyEditing({ commit }, payload) {
      commit('SET_IS_VACANCY_EDITING', payload);
    },
  },
  getters: {
    VACANCIES(state) {
      return state.vacancies;
    },
    ACTIVE_VACANCY_ID(state) {
      return state.activeVacancyId;
    },
    ACTIVE_VACANCY(state) {
      return state.activeVacancyId
        ? state.vacancies[state.activeVacancyId]
        : null;
    },
    IS_VACANCY_EDITING(state) {
      return state.isVacancyEditing;
    },
  },
};
