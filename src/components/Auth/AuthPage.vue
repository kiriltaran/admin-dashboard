<template>
  <div class="auth">
    <el-card class="auth-panel">
      <el-tabs 
        v-model="activeTab"
        :stretch="true">
        <el-tab-pane 
          label="Вход" 
          name="signin">
          <el-alert 
            v-if="error" 
            :title="error.message"
            type="error"
            show-icon
            @close="onCloseError" 
          />
          <signin-form @signin="onSignin"/>
        </el-tab-pane>
        <el-tab-pane 
          label="Регистрация" 
          name="signup">
          <el-alert 
            v-if="error" 
            :title="error.message"
            type="error"
            show-icon
            @close="onCloseError" 
          />
          <signup-form @signup="onSignup"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import api from '@/api';
import SignupForm from '@/components/Auth/SignupForm.vue';
import SigninForm from '@/components/Auth/SigninForm.vue';

export default {
  components: {
    SignupForm,
    SigninForm,
  },
  data() {
    return {
      activeTab: 'signin',
      error: '',
    };
  },
  methods: {
    async onSignin({ email, password }) {
      try {
        await api.signin(email, password);
      } catch (e) {
        this.error = e;
      }
    },
    async onSignup({ email, password }) {
      try {
        await api.signup(email, password);
      } catch (e) {
        this.error = e;
      }
    },
    onCloseError() {
      this.error = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100%;
  display: flex;
  justify-content: center;
  &-panel {
    align-self: center;
    width: 400px;
  }
}
</style>
