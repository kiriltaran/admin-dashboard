<template>
  <div class="dashboard">
    <div class="col-1 col">
      <companies-list/>
    </div>
    <div class="col-2 col">
      <company-component/>
    </div>
    <div class="col-3 col">
      <company-component/>
    </div>   
  </div>
</template>

<script>
import CompaniesList from '@/components/Company/CompaniesList.vue';
import CompanyComponent from '@/components/Company/CompanyComponent.vue';

export default {
  components: {
    CompaniesList,
    CompanyComponent,
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
  &:last-child {
    border-right: none;
  }
}

.col-1 {
  padding: 0 5px;
  flex-grow: 1;
}

.col-2 {
  padding: 0 5px;
  flex-grow: 6;
}

.col-3 {
  padding: 0 5px;
  flex-grow: 6;
}
</style>


