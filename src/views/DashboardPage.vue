<template>
  <div 
    v-loading="loading" 
    class="dashboard">
    <div class="col-1 col">
      <companies-list/>
    </div>
    <div class="col-2 col">
      <company-column 
        v-if="isShowingCompanyColumn"/>
    </div>
    <div class="col-3 col">
      <vacancy-column v-if="isShowingVacancyColumn"/>
    </div>   
  </div>
</template>

<script>
import CompaniesList from '@/components/Company/CompaniesList.vue';
import CompanyColumn from '@/components/Company/CompanyColumn.vue';
import VacancyColumn from '@/components/Vacancy/VacancyColumn.vue';

export default {
  components: {
    CompaniesList,
    CompanyColumn,
    VacancyColumn,
  },
  computed: {
    loading() {
      return this.$store.getters.LOADING;
    },
    activeCompanyId() {
      return this.$store.getters.ACTIVE_COMPANY_ID;
    },
    activeVacancyId() {
      return this.$store.getters.ACTIVE_VACANCY_ID;
    },
    isShowingCompanyColumn() {
      return this.activeCompanyId !== null;
    },
    isShowingVacancyColumn() {
      return this.activeVacancyId !== null;
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
  min-width: 450px;
  max-width: 500px;
}

.col-2 {
  min-width: 500px;
  max-width: 600px;
}

.col-3 {
  min-width: 400px;
  width: 100%;
}
</style>
