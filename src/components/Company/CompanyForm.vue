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
      <el-input 
        v-model="companyForm.tin" 
        type="number"/>
    </el-form-item>
    <el-form-item 
      label="Адрес" 
      prop="address.address"
    >
      <company-address
        v-model="companyForm.address"
        :address="companyForm.address.address"
      />
    </el-form-item>
    <el-form-item 
      label="Контактный телефон" 
      prop="phone">
      <vue-tel-input 
        v-model="companyForm.phone"
        :placeholder="phonePlaceholder"
        :class="isValidPhone ? 'success' : ''"
        @onInput="onInputPhone"
      />
    </el-form-item>
    <el-form-item 
      label="Веб-сайт" 
      prop="website">
      <el-input v-model="companyForm.website"/>
    </el-form-item>
    <div class="logo-item">
      <croppa
        v-show="isShowingCroppa" 
        v-model="croppa"
        :width="150"
        :height="150"
        remove-button-color="#409eff"
        class="croppa"
      />
      <div 
        v-show="!isShowingCroppa" 
        class="prev"
      >
        <div 
          class="icon-wrapper" 
          @click="onClickRemoveLogo">
          <svg 
            viewBox="0 0 1024 1024" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            width="15" 
            height="15" 
            class="icon-remove">
            <path 
              d="M511.921231 0C229.179077 0 0 229.257846 0 512 0 794.702769 229.179077 1024 511.921231 1024 794.781538 1024 1024 794.702769 1024 512 1024 229.257846 794.781538 0 511.921231 0ZM732.041846 650.633846 650.515692 732.081231C650.515692 732.081231 521.491692 593.683692 511.881846 593.683692 502.429538 593.683692 373.366154 732.081231 373.366154 732.081231L291.761231 650.633846C291.761231 650.633846 430.316308 523.500308 430.316308 512.196923 430.316308 500.696615 291.761231 373.523692 291.761231 373.523692L373.366154 291.918769C373.366154 291.918769 503.453538 430.395077 511.881846 430.395077 520.349538 430.395077 650.515692 291.918769 650.515692 291.918769L732.041846 373.523692C732.041846 373.523692 593.447385 502.547692 593.447385 512.196923 593.447385 521.412923 732.041846 650.633846 732.041846 650.633846Z" 
              fill="#409eff"/>
          </svg>
        </div>
        <img 
          :src="companyForm.logo" 
          alt="prev-logo"
          class="prev-logo"
        >
      </div>
    </div>
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
      v-if="activeCompany"
      class="cancel-btn" 
      @click="onCancel">
      Отмена
    </el-button>
  </el-form>
</template>

<script>
import api from '@/api';
import CompanyAddress from '@/components/Address.vue';
import { VueEditor } from 'vue2-editor';

const COMPANY_DEFAULT = {
  name: '',
  tin: '',
  address: {
    address: '',
  },
  phone: '',
  website: '',
  logo: '',
  description: '',
};

export default {
  components: {
    CompanyAddress,
    VueEditor,
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value && !this.isValidPhone) {
        callback(new Error('Введите корректный номер телефона'));
      }
      callback();
    };

    return {
      croppa: {},
      companyForm: { ...COMPANY_DEFAULT },
      phonePlaceholder: '',
      isValidPhone: true,
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
          {
            min: 10,
            max: 10,
            message: 'Количество символов должно быть равно 10',
          },
        ],
        phone: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
          { validator: validatePhone },
        ],
      },
    };
  },
  computed: {
    isShowingCroppa() {
      return !this.companyForm.logo;
    },
    activeCompany() {
      return this.$store.getters.ACTIVE_COMPANY;
    },
  },
  watch: {
    activeCompany: {
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
    async uploadLogo() {
      const file = this.croppa.getChosenFile();
      if (file) {
        const blob = await this.croppa.promisedBlob(file.type, 0.8);
        this.companyForm.logo = await api.company.uploadLogo(file.name, blob);
      }
    },
    onSubmit() {
      this.$refs.companyForm.validate(async valid => {
        if (valid) {
          try {
            await this.uploadLogo();
            this.$emit('submit', { ...this.companyForm });
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
      this.companyForm = this.activeCompany
        ? { ...this.activeCompany }
        : COMPANY_DEFAULT;
    },
    onClickRemoveLogo() {
      this.companyForm.logo = '';
    },
    onInputPhone({ isValid, country }) {
      this.phonePlaceholder = `+${country.dialCode}...`;
      this.isValidPhone = isValid;
    },
  },
};
</script>

<style lang="scss">
.prev {
  width: 150px;
  position: relative;
  &-logo {
    width: 100%;
  }
  .icon-wrapper {
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    filter: drop-shadow(-2px 2px 2px rgba(0, 0, 0, 0.7));
    z-index: 10;
    border: 2px solid #fff;
    .icon-remove {
      position: absolute;
    }
  }
}

.vue-tel-input {
  border-radius: 4px !important;
  border: 1px solid #dcdfe6 !important;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: none !important;
  .dropdown {
    padding: 0 0 0 15px;
    z-index: 999;
    ul {
      width: 370px;
    }
  }
  input {
    color: #606266;
    font-size: 14px;
  }
}

.success {
  border-color: #67c23a !important;
}
</style>
