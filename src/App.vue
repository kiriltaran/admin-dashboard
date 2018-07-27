<template>
  <div id="app" >
    <header-component :user="user"/>
    <el-main class="main">
      <transition name="el-fade-in-linear">
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
      containerHeight: 0,
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

#app {
  display: flex;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
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

.main {
  display: flex;
}
</style>
