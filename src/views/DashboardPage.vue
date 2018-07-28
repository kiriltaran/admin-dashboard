<template>
  <div class="dashboard">
    <div class="col-1 col">
      <companies-list 
        :companies="companies"
        @click-new="onClickNewCompany" 
        @select-company="onSelectCompany"/>
    </div>
    <div class="col-2 col">
      <company-column 
        v-if="isShowingCompanyColumn" 
        :company-id="companyId"
        :vacancies="vacancies"
        @click-new="onClickNewVacancy"
        @new-company="onNewCompany" />
    </div>
    <div class="col-3 col">
      <vacancy-column
        v-if="isShowingVacancyColumn" 
        :company-id="companyId"
        :vacancy-id="vacancyId"
        @new-vacancy="onNewVacancy"/>
    </div>   
  </div>
</template>

<script>
import api from '@/api';
import CompaniesList from '@/components/Company/CompaniesList.vue';
import CompanyColumn from '@/components/Company/CompanyColumn.vue';
import VacancyColumn from '@/components/Vacancy/VacancyColumn.vue';

export default {
  components: {
    CompaniesList,
    CompanyColumn,
    VacancyColumn,
  },
  data() {
    return {
      companies: [],
      vacancies: [],
      companyId: null,
      vacancyId: null,
    };
  },
  computed: {
    isShowingCompanyColumn() {
      return this.companyId !== null;
    },
    isShowingVacancyColumn() {
      return this.vacancyId !== null;
    },
  },
  mounted() {
    this.loadCompanies();
  },
  methods: {
    async loadCompanies() {
      try {
        this.companies = await api.fetchCompanies();
      } catch (e) {
        window.console.log(e);
      }
    },
    async loadVacancies() {
      try {
        this.vacancies = await api.fetchVacancies(this.companyId);
      } catch (e) {
        window.console.log(e);
      }
    },
    onClickNewCompany() {
      this.companyId = '';
    },
    onClickNewVacancy() {
      this.vacancyId = '';
    },
    onSelectCompany(companyId) {
      this.companyId = companyId;
    },
    onNewCompany() {
      this.loadCompanies();
    },
    onNewVacancy() {
      this.loadVacancies();
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-grow: 1;
}
.col {
  border-right: 2px solid #eee;
  padding: 0 20px;
  &:first-child {
    padding-left: 5px;
    padding-right: 5px;
  }
  &:last-child {
    border-right: none;
  }
}

.col-1 {
  min-width: 250px;
  max-width: 300px;
}

.col-2 {
  min-width: 400px;
  max-width: 500px;
}
</style>


