<template>
  <el-header>
    <el-row 
      type="flex" 
      justify="space-between">
      <a 
        href="/" 
        class="logo">
        <img 
          src="http://via.placeholder.com/100x50" 
          class="logo-icon">
      </a>
      <div 
        v-if="user" 
        class="user">
        <div class="user-title">
          <i class="el-icon-service"/>
          {{ user.email }}
        </div>
        <el-dropdown 
          trigger="click" 
          @command="handleCommand">
          <i class="el-icon-arrow-down dropdown-icon"/>
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
import firebase from 'firebase/app';

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
        await api.signout();
        const user = await firebase.auth().currentUser;
        console.log(user);
      } catch (e) {
        window.console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-between;
  min-width: 180px;

  &-title {
    font-size: 18px;
  }
}

.dropdown-icon {
  cursor: pointer;
  outline: none;
}
</style>


