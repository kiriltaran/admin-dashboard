<template>
  <el-form 
    ref="signinForm" 
    :model="signinForm" 
    :rules="rules"
    status-icon >
    <el-form-item 
      label="Email" 
      prop="email">
      <el-input 
        v-model="signinForm.email" 
        type="email"
        @keyup.native.enter="onClickSubmit"/>
    </el-form-item>
    <el-form-item 
      label="Пароль" 
      prop="password">
      <el-input 
        v-model="signinForm.password" 
        type="password"
        @keyup.native.enter="onClickSubmit"/>
    </el-form-item>
    <el-button 
      type="primary" 
      plain 
      class="submit"
      @click="onClickSubmit"
    >Вход</el-button>
  </el-form> 
</template>

<script>
export default {
  data() {
    return {
      signinForm: {
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
    onClickSubmit() {
      this.$refs.signinForm.validate(valid => {
        if (valid) {
          this.$emit('signin', this.signinForm);
          this.$refs.signinForm.resetFields();
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
