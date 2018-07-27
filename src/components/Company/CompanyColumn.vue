<template>
  <div 
    v-loading="loading" 
    class="company-column">
    <company-form
      v-if="isShowingForm"
      :form-data="companyId ? company : null"
      @save="onSaveForm"/>
    <template v-if="isShowingInfo">
      <company-info
        :company="company" 
        class="company-info mb-20" 
        @edit="onEdit"/>
      <div class="vacancies">
        <div class="vacancies-header mb-10">
          <el-row 
            type="flex" 
            justify="space-between">
            <div class="title">Вакансии</div>
            <el-button 
              type="primary" 
              size="mini">Добавить</el-button>
          </el-row>
        </div>
        <div 
          :style="{height: vacanciesHeight + 'px'}" 
          class="vacancies-list">
          <vacancy-tile 
            v-for="vacancy in 10"
            :key="vacancy.id" 
            class="list-item"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import api from '@/api';
import CompanyInfo from '@/components/Company/CompanyInfo.vue';
import CompanyForm from '@/components/Company/CompanyForm.vue';
import VacancyTile from '@/components/Vacancy/VacancyTile.vue';

export default {
  components: {
    VacancyTile,
    CompanyInfo,
    CompanyForm,
  },
  props: {
    companyId: {
      type: String,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      vacanciesHeight: 0,
      company: null,
      loading: false,
      isShowingInfo: false,
      isShowingForm: false,
    };
  },
  watch: {
    companyId: {
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
    calculateVacanciesHeight() {
      if (this.companyId) {
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
    async onSaveForm(data) {
      try {
        if (this.companyId === '') {
          await api.createCompany(data);
          this.$emit('new-company');
        } else {
          await api.updateCompany(this.companyId, data);
          this.showInfo();
        }
      } catch (e) {
        window.console.log(e);
      }
    },
    async loadCompany(companyId) {
      try {
        this.loading = true;
        this.company = await api.fetchCompanyById(companyId);
      } catch (e) {
        window.console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async showInfo() {
      await this.loadCompany(this.companyId);
      this.isShowingInfo = true;
      this.isShowingForm = false;
      await this.calculateVacanciesHeight();
    },
    showForm() {
      this.isShowingInfo = false;
      this.isShowingForm = true;
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

