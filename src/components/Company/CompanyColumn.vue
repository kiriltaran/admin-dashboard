<template>
  <div class="company-column">
    <company-form
      v-if="isShowingForm"
      :form-data="companyId ? company : null"
      @submit="onSubmit"
      @cancel="onCancel"
    />
    <template v-if="isShowingInfo">
      <company-info
        :company="company" 
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
            :is-active="id===vacancyId"
            class="list-item"
            @click.native="onClickVacancy(id)"
            @change-status="onChangeStatus"/>
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
      default: '',
    },
    vacancyId: {
      type: String,
      default: '',
    },
    vacancies: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      vacanciesHeight: 0,
      company: null,
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
    onSubmit(data) {
      this.$emit('submit', data);
      this.showInfo();
    },
    onCancel() {
      this.showInfo();
    },
    async loadCompany(companyId) {
      try {
        this.company = await api.fetchCompany(companyId);
      } catch (e) {
        window.console.log(e);
      }
    },
    async showInfo() {
      await this.loadCompany(this.companyId);
      this.isShowingInfo = true;
      this.isShowingForm = false;
      this.$nextTick(() => this.calculateVacanciesHeight());
    },
    showForm() {
      this.isShowingInfo = false;
      this.isShowingForm = true;
    },
    onClickNewVacancy() {
      this.$emit('click-new');
    },
    onClickVacancy(id) {
      this.$emit('select-vacancy', id);
    },
    onChangeStatus(status) {
      this.$emit('change-status', status);
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

