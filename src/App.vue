<template>
  <div id="app">
    <el-container class="app-container">
      <header-component :user="user"/>
      <el-container>
        <transition name="el-fade-in-linear">
          <aside-component 
            v-if="user" 
            mode="in-out"/>
        </transition>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import HeaderComponent from '@/components/HeaderComponent.vue';
import AsideComponent from '@/components/AsideComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    AsideComponent,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        this.$router.push({ path: '/' });
      } else {
        this.$router.push({ path: '/auth' });
      }
    });
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-container {
  flex-grow: 1;
  flex-direction: column;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.logo-icon {
  vertical-align: middle;
}
</style>
