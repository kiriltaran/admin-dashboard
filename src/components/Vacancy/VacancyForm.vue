<template>
  <el-form 
    ref="vacancyForm" 
    :model="vacancyForm"
    :rules="rules"
  >
    <el-form-item 
      label="Название вакансии" 
      prop="title">
      <el-input v-model="vacancyForm.title"/>
    </el-form-item>
    <el-form-item 
      label="Категория" 
      prop="category">
      <el-input v-model="vacancyForm.category" />
    </el-form-item>
    <el-form-item 
      label="Специализация" 
      prop="specialization">
      <el-input v-model="vacancyForm.specialization"/>
    </el-form-item>
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
    <div class="vacancy-description mb-20">
      <div class="label mb-10">Описание вакансии</div>
      <wysiwyg v-model="vacancyForm.description"/>
    </div>
    <el-button 
      type="primary"
      size="medium"
      class="submit-btn" 
      @click="onSubmit">Сохранить</el-button>
  </el-form>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  components: {
    VueEditor,
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
        specialization: '',
        location: '',
        remoteness: '',
        salary: '',
        description: '',
        status: '',
      },
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: 'Обязательное поле для заполнения',
        //   },
        // ],
        // tin: [
        //   {
        //     required: true,
        //     message: 'Обязательное поле для заполнения',
        //   },
        // ],
        // phone: [
        //   {
        //     required: true,
        //     message: 'Обязательное поле для заполнения',
        //   },
        // ],
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
          this.$emit('save', this.vacancyForm);
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


