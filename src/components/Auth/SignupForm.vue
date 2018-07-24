<template>
  <el-form 
    ref="signupForm" 
    :model="signupForm" 
    :rules="rules"
    status-icon >
    <el-form-item 
      label="Email" 
      prop="email">
      <el-input 
        v-model="signupForm.email" 
        type="email"/>
    </el-form-item>
    <el-form-item 
      label="Пароль" 
      prop="password">
      <el-input 
        v-model="signupForm.password" 
        type="password"/>
    </el-form-item>
    <el-button 
      type="primary" 
      plain 
      class="submit"
      @click="validateForm" 
    >Регистрация</el-button>
  </el-form> 
</template>

<script>
export default {
  data() {
    return {
      signupForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: 'Обязательное поле для заполнения',
          },
        ],
        password: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
          },
        ],
      },
    };
  },
  methods: {
    validateForm() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          this.$emit('signup', this.signupForm);
          this.$refs.signupForm.resetFields();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.submit {
  display: block;
  width: 150px;
  margin: 0 auto;
}
</style>


