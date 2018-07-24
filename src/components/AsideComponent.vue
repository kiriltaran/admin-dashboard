<template>
  <el-aside 
    width="350px" 
    class="aside">
    <div class="aside-head">
      <span class="title">Компании</span>
      <el-button type="primary">Добавить</el-button>
    </div>
    <el-input 
      v-model="search" 
      placeholder="Введите название компании или ИНН"/>
    <div class="list-wrapper">
      <ul class="company-list">
        <li 
          v-for="company in companies" 
          :key="company.id"
          class="list-item">
          {{ company.username }}
        </li>
      </ul>
    </div>
  </el-aside>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      search: '',
      companies: [],
    };
  },
  mounted() {
    this.loadCompanies();
  },
  methods: {
    async loadCompanies() {
      try {
        this.companies = await api.loadCompanies();
      } catch (e) {
        window.console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  border-right: 2px solid #eee;
  padding: 20px 10px;
  &-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      align-self: center;
      font-size: 24px;
    }
  }
}

.list-wrapper {
  padding-top: 20px;
}

.list-item {
  display: block;
  font-size: 20px;
  height: 40px;
}
</style>


