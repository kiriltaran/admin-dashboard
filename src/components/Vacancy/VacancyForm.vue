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
      prop="location">
      <el-input v-model="vacancyForm.location" />
    </el-form-item>
    <el-form-item 
      label="Удаленность рейсов от гаража" 
      prop="remoteness">
      <el-input v-model="vacancyForm.remoteness"/>
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
    <el-button 
      type="primary"
      size="medium"
      class="submit-btn" 
      @click="onSubmit">Сохранить</el-button>
  </el-form>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import VacancyCategorySelector from '@/components/Vacancy/VacancyCategorySelector.vue';
import VacancySpecializationSelector from '@/components/Vacancy/VacancySpecializationSelector.vue';

export default {
  components: {
    VueEditor,
    VacancyCategorySelector,
    VacancySpecializationSelector,
  },
  props: {
    formData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      vacancyForm: {
        title: '',
        category: '',
        specialization: [],
        location: '',
        remoteness: '',
        salary: '',
        description: '',
        status: '',
      },
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
  mounted() {
    this.initForm();
  },
  methods: {
    onSubmit() {
      this.$refs.vacancyForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.vacancyForm);
          this.$refs.vacancyForm.resetFields();
        }
      });
    },
    initForm() {
      if (this.formData) {
        this.vacancyForm = { ...this.formData };
      }
    },
  },
};
</script>


