<template>
  <div id="app" >
    <header-component :user="user"/>
    <el-main class="main">
      <transition 
        name="el-fade-in-linear" 
        mode="out-in">
        <router-view/>
      </transition>
    </el-main>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.observeAuth();
  },
  methods: {
    observeAuth() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;
        if (user) {
          this.$router.push({ path: '/' });
        } else {
          this.$router.push({ path: '/auth' });
        }
      });
    },
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar-thumb {
  background: #409eff;
  border-radius: 50px;
}

::-webkit-scrollbar {
  width: 6px;
}

body {
  font-size: 16px;
  font-family: 'Roboto Condensed', sans-serif;
}

#app {
  display: flex;
  height: 100vh;

  flex-direction: column;
}

.main {
  display: flex;
}

.label {
  font-size: 14px;
  color: #606266;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
