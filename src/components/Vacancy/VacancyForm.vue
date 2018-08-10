<template>
  <el-form 
    ref="vacancyForm" 
    :model="vacancyForm"
    :rules="rules"
    label-position="top"
  >
    <el-form-item 
      label="Название вакансии" 
      prop="title">
      <el-input v-model="vacancyForm.title"/>
    </el-form-item>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item 
          label="Категория" 
          prop="category">
          <vacancy-category-selector v-model="vacancyForm.category"/>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item 
          label="Специализация" 
          prop="specialization">
          <vacancy-specialization-selector v-model="vacancyForm.specialization"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item 
      label="Расположение гаража" 
      prop="location"
    >
      <vacancy-address
        v-model="vacancyForm.location"
        :address="vacancyForm.location.address"
        :only-city="true"
      />
    </el-form-item>
    <el-form-item 
      label="Удаленность рейсов от гаража" 
      prop="remoteness">
      <vacancy-remoteness-selector v-model="vacancyForm.remoteness"/>
    </el-form-item>
    <el-form-item 
      label="Зарплата" 
      prop="salary">
      <el-input v-model="vacancyForm.salary"/>
    </el-form-item>
    <el-form-item 
      label="Описание вакансии" 
      prop="description">
      <wysiwyg v-model="vacancyForm.description"/>
    </el-form-item>
    <vacancy-status-selector 
      v-model="vacancyForm.status" 
      class="status-selector"/>
    <el-button 
      type="primary"
      class="submit-btn" 
      @click="onSubmit">
      Сохранить
    </el-button>
    <el-button
      v-if="activeVacancy"
      class="cancel-btn" 
      @click="onCancel">
      Отмена
    </el-button>
  </el-form>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import VacancyAddress from '@/components/Address.vue';
import VacancyCategorySelector from '@/components/Vacancy/VacancyCategorySelector.vue';
import VacancySpecializationSelector from '@/components/Vacancy/VacancySpecializationSelector.vue';
import VacancyRemotenessSelector from '@/components/Vacancy/VacancyRemotenessSelector.vue';
import VacancyStatusSelector from '@/components/Vacancy/VacancyStatusSelector.vue';

const VACANCY_DEFAULT = {
  title: '',
  category: '',
  specialization: [],
  location: {
    address: '',
  },
  remoteness: '',
  salary: '',
  description: '',
  status: 'regular',
};

export default {
  components: {
    VueEditor,
    VacancyAddress,
    VacancyCategorySelector,
    VacancySpecializationSelector,
    VacancyRemotenessSelector,
    VacancyStatusSelector,
  },
  data() {
    return {
      vacancyForm: { ...VACANCY_DEFAULT },
      rules: {
        title: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
        category: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
        location: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
        remoteness: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
        salary: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
      },
    };
  },
  computed: {
    activeVacancy() {
      return this.$store.getters.ACTIVE_VACANCY;
    },
  },
  watch: {
    activeVacancy: {
      handler() {
        this.initForm();
      },
      immediate: true,
    },
  },
  mounted() {
    this.initForm();
  },
  methods: {
    onSubmit() {
      this.$refs.vacancyForm.validate(valid => {
        if (valid) {
          this.$emit('submit', { ...this.vacancyForm });
          this.$refs.vacancyForm.resetFields();
        }
      });
    },
    onCancel() {
      this.$emit('cancel');
    },
    initForm() {
      this.vacancyForm = this.activeVacancy
        ? { ...this.activeVacancy }
        : VACANCY_DEFAULT;
    },
  },
};
</script>

<style lang="scss" scoped>
.status-selector {
  margin-right: 10px;
}
</style>
