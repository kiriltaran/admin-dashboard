<template>
  <el-form 
    ref="companyForm" 
    :model="companyForm"
    :rules="rules"
  >
    <el-form-item 
      label="Название компании" 
      prop="name">
      <el-input v-model="companyForm.name"/>
    </el-form-item>
    <el-form-item 
      label="ИНН" 
      prop="tin">
      <el-input v-model="companyForm.tin" />
    </el-form-item>
    <el-form-item 
      label="Адрес" 
      prop="address">
      <el-input v-model="companyForm.address"/>
    </el-form-item>
    <el-form-item 
      label="Контактный телефон" 
      prop="phone">
      <el-input 
        v-model="companyForm.phone" 
        type="number"/>
    </el-form-item>
    <el-form-item 
      label="Веб-сайт" 
      prop="website">
      <el-input v-model="companyForm.website"/>
    </el-form-item>
    <div class="company-description mb-20">
      <div class="label mb-10">Информация о компании</div>
      <wysiwyg v-model="companyForm.description"/>
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
      companyForm: {
        name: '',
        tin: '',
        address: '',
        phone: '',
        website: '',
        description: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
        tin: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
        phone: [
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
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.companyForm);
          this.$refs.companyForm.resetFields();
        }
      });
    },
    initForm() {
      if (this.formData) {
        this.companyForm = { ...this.formData };
      }
    },
  },
};
</script>


