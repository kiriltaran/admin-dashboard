<template>
  <div class="dashboard">
    <div class="col-1 col">
      <companies-list 
        @new-company="onNewCompany" 
        @select-company="onSelectCompany"/>
    </div>
    <div class="col-2 col">
      <company-column 
        v-if="isShowingCompanyColumn" 
        :company-id="companyId" />
    </div>
    <div class="col-3 col">
      <!-- <vacancy-info/> -->
    </div>   
  </div>
</template>

<script>
import CompaniesList from '@/components/Company/CompaniesList.vue';
import CompanyColumn from '@/components/Company/CompanyColumn.vue';

export default {
  components: {
    CompaniesList,
    CompanyColumn,
  },
  data() {
    return {
      companyId: null,
      vacancyId: null,
    };
  },
  computed: {
    isShowingCompanyColumn() {
      return this.companyId !== null;
    },
  },
  methods: {
    onNewCompany() {
      this.companyId = '';
    },
    onSelectCompany(companyId) {
      this.companyId = companyId;
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


