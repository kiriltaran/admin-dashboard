<template>
  <div class="vacancy-column">
    <vacancy-form 
      v-if="isShowingForm"
      :form-data="vacancyId ? vacancy : null"
      @submit="onSubmit"/>
    <vacancy-info v-if="isShowingInfo"/>
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
      default() {
        return null;
      },
    },
    companyId: {
      type: String,
      default() {
        return null;
      },
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
        this.vacancy = await api.fetchVacancy(vacancyId);
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
    async onSubmit(data) {
      try {
        if (this.vacancyId === '') {
          await api.createVacancy(this.companyId, data);
          this.$emit('new-vacancy');
        } else {
          await api.updateVacancy(this.vacancyId, data);
          this.showInfo();
        }
      } catch (e) {
        window.console.log(e);
      }
    },
  },
};
</script>
