<template>
  <div class="vacancy-column">
    <vacancy-form 
      v-if="isEditing"
      @submit="onSubmit"
      @cancel="onCancel"
    />
    <vacancy-info 
      v-if="!isEditing" 
      @edit="onEdit"
    />
  </div>
</template>


<script>
import VacancyForm from '@/components/Vacancy/VacancyForm.vue';
import VacancyInfo from '@/components/Vacancy/VacancyInfo.vue';

export default {
  components: {
    VacancyForm,
    VacancyInfo,
  },
  computed: {
    activeVacancyId() {
      return this.$store.getters.ACTIVE_VACANCY_ID;
    },
    isEditing() {
      return this.$store.getters.IS_VACANCY_EDITING;
    },
  },
  watch: {
    activeVacancyId: {
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
    showInfo() {
      this.$store.dispatch('setIsVacancyEditing', false);
    },
    showForm() {
      this.$store.dispatch('setIsVacancyEditing', true);
    },
    onEdit() {
      this.showForm();
    },
    onSubmit(data) {
      if (this.activeVacancyId === '') {
        this.$store.dispatch('createVacancy', data);
      } else {
        this.$store.dispatch('updateVacancy', data);
      }
    },
    onCancel() {
      this.showInfo();
    },
  },
};
</script>
