<template>
  <div class="auth">
    <el-card class="auth-panel">
      <el-alert 
        v-if="error" 
        :title="error.message"
        type="error"
        show-icon
        @close="onCloseError" 
      />
      <signin-form @signin="onSignin"/>
    </el-card>
  </div>
</template>

<script>
import api from '@/api';
import SigninForm from '@/components/Auth/SigninForm.vue';

export default {
  components: {
    SigninForm,
  },
  data() {
    return {
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
