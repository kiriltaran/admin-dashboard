<template>
  <div class="company-column">
    <company-form
      v-if="isEditing"
      @submit="onSubmit"
      @cancel="onCancel"
    />
    <template v-if="!isEditing">
      <company-info
        class="company-info mb-20" 
        @edit="onEdit"
      />
      <div class="vacancies">
        <div class="vacancies-header mb-10">
          <el-row 
            type="flex" 
            justify="space-between">
            <div class="title">Вакансии</div>
            <el-button 
              type="primary" 
              @click="onClickNewVacancy"
            >Добавить</el-button>
          </el-row>
        </div>
        <div 
          :style="{height: vacanciesHeight + 'px'}" 
          class="vacancies-list">
          <vacancy-tile 
            v-for="(vacancy, id) in vacancies"
            :key="id"
            :vacancy="vacancy"
            :is-active="id===activeVacancyId"
            class="list-item"
            @click.native="onClickVacancy(id)"
            @change-status="onChangeStatus"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import CompanyInfo from '@/components/Company/CompanyInfo.vue';
import CompanyForm from '@/components/Company/CompanyForm.vue';
import VacancyTile from '@/components/Vacancy/VacancyTile.vue';

export default {
  components: {
    VacancyTile,
    CompanyInfo,
    CompanyForm,
  },
  data() {
    return {
      vacanciesHeight: 0,
    };
  },
  computed: {
    activeCompanyId() {
      return this.$store.getters.ACTIVE_COMPANY_ID;
    },
    activeVacancyId() {
      return this.$store.getters.ACTIVE_VACANCY_ID;
    },
    vacancies() {
      return this.$store.getters.VACANCIES;
    },
    isEditing() {
      return this.$store.getters.IS_COMPANY_EDITING;
    },
  },
  watch: {
    activeCompanyId: {
      handler(value) {
        if (value === '') {
          this.showForm();
        } else if (value) {
          this.showInfo();
        }
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit(data) {
      if (this.activeCompanyId === '') {
        this.$store.dispatch('createCompany', data);
      } else {
        this.$store.dispatch('updateCompany', data);
      }
    },
    calculateVacanciesHeight() {
      if (this.activeCompanyId) {
        const infoHeight =
          document.getElementsByClassName('company-info')[0].clientHeight +
          document.getElementsByClassName('vacancies-header')[0].clientHeight +
          40;
        const mainHeight =
          document.getElementsByClassName('main')[0].clientHeight - 40;
        this.vacanciesHeight = mainHeight - infoHeight;
      }
    },
    onEdit() {
      this.showForm();
    },
    onCancel() {
      this.showInfo();
    },
    showInfo() {
      this.$store.dispatch('setIsCompanyEditing', false);
      this.$nextTick(() => this.calculateVacanciesHeight());
    },
    showForm() {
      this.$store.dispatch('setIsCompanyEditing', true);
    },
    onClickNewVacancy() {
      this.$store.dispatch('setActiveVacancyId', '');
    },
    onClickVacancy(id) {
      this.$store.dispatch('setActiveVacancyId', id);
    },
    onChangeStatus(status) {
      this.$store.dispatch('updateVacancy', { status });
    },
  },
};
</script>

<style lang="scss" scoped>
.vacancies {
  &-header {
    .title {
      font-size: 18px;
    }
  }
  &-list {
    padding-right: 10px;
    overflow: auto;
    .list-item {
      margin-bottom: 10px;
    }
  }
}
</style>
