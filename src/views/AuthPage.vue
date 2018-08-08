<template>
  <div class="auth">
    <el-card class="auth-panel">
      <el-alert 
        v-if="error" 
        :title="error"
        type="error"
        show-icon
        @close="onCloseError" 
      />
      <signin-form @signin="onSignin"/>
    </el-card>
  </div>
</template>

<script>
import SigninForm from '@/components/SigninForm.vue';

export default {
  components: {
    SigninForm,
  },
  computed: {
    error() {
      return this.$store.getters.ERROR_MESSAGE;
    },
  },
  methods: {
    onSignin({ email, password }) {
      this.$store.dispatch('signin', { email, password });
    },
    onCloseError() {
      this.$store.dispatch('setError', null);
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  &-panel {
    align-self: center;
    width: 400px;
  }
}
</style>
