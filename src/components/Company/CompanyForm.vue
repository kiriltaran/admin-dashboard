<template>
  <el-form 
    ref="companyForm" 
    :model="companyForm"
    :rules="rules"
    label-position="top"
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
    <croppa 
      v-model="croppa" 
      :width="150"
      :height="150"
    />
    <el-form-item 
      label="Информация о компании" 
      prop="description">
      <wysiwyg v-model="companyForm.description"/>
    </el-form-item>
    <el-button 
      type="primary"
      class="submit-btn" 
      @click="onSubmit">
      Сохранить
    </el-button>
    <el-button
      v-if="formData"
      class="cancel-btn" 
      @click="onCancel">
      Отмена
    </el-button>
  </el-form>
</template>

<script>
import api from '@/api';
import { VueEditor } from 'vue2-editor';

const COMPANY_DEFAULT = {
  name: '',
  tin: '',
  address: '',
  phone: '',
  website: '',
  logo: '',
  description: '',
};

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
      croppa: {},
      companyForm: { ...COMPANY_DEFAULT },
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
  watch: {
    formData: {
      handler() {
        this.initForm();
      },
      immediate: true,
    },
  },
  methods: {
    async uploadLogo() {
      try {
        const { name, type } = this.croppa.getChosenFile();
        const blob = await this.croppa.promisedBlob(type, 0.8);
        this.companyForm.logo = await api.uploadLogo(name, blob);
      } catch (e) {
        throw e;
      }
    },
    onSubmit() {
      this.$refs.companyForm.validate(async valid => {
        if (valid) {
          try {
            await this.uploadLogo();
            this.$emit('submit', this.companyForm);
            this.$refs.companyForm.resetFields();
          } catch (e) {
            window.console.log(e);
          }
        }
      });
    },
    onCancel() {
      this.$emit('cancel');
    },
    initForm() {
      this.companyForm = this.formData ? { ...this.formData } : COMPANY_DEFAULT;
    },
  },
};
</script>
