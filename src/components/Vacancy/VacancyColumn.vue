<template>
  <div class="vacancy-column">
    <vacancy-form 
      v-if="isShowingForm"
      :form-data="vacancyId ? vacancy : null"
      @submit="onSubmit"
      @cancel="onCancel"
    />
    <vacancy-info 
      v-if="isShowingInfo" 
      :vacancy="vacancy"
      @edit="onEdit"
    />
  </div>
</template>


<script>
import api from '@/api';
import VacancyForm from '@/components/Vacancy/VacancyForm.vue';
import VacancyInfo from '@/components/Vacancy/VacancyInfo.vue';

export default {
  components: {
    VacancyForm,
    VacancyInfo,
  },
  props: {
    vacancyId: {
      type: String,
      default: '',
    },
    companyId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      vacancy: null,
      isShowingInfo: false,
      isShowingForm: false,
    };
  },
  watch: {
    vacancyId: {
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
    async loadVacancy(vacancyId) {
      try {
        this.vacancy = await api.vacancy.getItem(vacancyId);
      } catch (e) {
        window.console.log(e);
      }
    },
    async showInfo() {
      await this.loadVacancy(this.vacancyId);
      this.isShowingInfo = true;
      this.isShowingForm = false;
    },
    showForm() {
      this.isShowingInfo = false;
      this.isShowingForm = true;
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
  },
};
</script>
