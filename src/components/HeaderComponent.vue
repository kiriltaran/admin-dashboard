<template>
  <el-header class="header">
    <el-row 
      type="flex" 
      justify="space-between">
      <a 
        href="/" 
        class="logo">
        <img 
          src="@/assets/logo.svg" 
          class="logo-icon">
      </a>
      <div 
        v-if="user" 
        class="user">
        
        <el-dropdown 
          trigger="click" 
          @command="handleCommand">
          <div class="user-email">{{ user.email }} <i class="el-icon-arrow-down dropdown-icon"/></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="signout">Выход</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </el-header>
</template>

<script>
import api from '@/api';

export default {
  props: {
    user: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'signout':
          this.signout();
          break;

        default:
          break;
      }
    },
    async signout() {
      try {
        await api.auth.signout();
      } catch (e) {
        window.console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #40a0ff49;
  line-height: 60px;
  border-bottom: 2px solid #409eff;
}

.logo-icon {
  width: 90px;
  vertical-align: middle;
}

.user {
  display: flex;
  justify-content: space-between;
  min-width: 180px;
  &-email {
    cursor: pointer;
  }
}

.dropdown-icon {
  cursor: pointer;
  outline: none;
}
</style>
