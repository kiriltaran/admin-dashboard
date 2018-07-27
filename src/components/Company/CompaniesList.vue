<template>
  <div class="companies">
    <div class="companies-head">
      <el-row 
        type="flex" 
        justify="space-between">
        <span class="title">Компании</span>
        <el-button type="primary">Добавить</el-button>
      </el-row>
      <el-input 
        v-model="search"
        class="search" 
        placeholder="Введите название компании или ИНН"/>
    </div>
    <ul 
      :style="{height: listHeight + 'px'}"
      class="companies-list">
      <li 
        v-for="company in companies" 
        :key="company.id"
        class="list-item">
        {{ company.username }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      search: '',
      companies: [],
      listHeight: 0,
    };
  },
  mounted() {
    const headHeight = document.getElementsByClassName('companies-head')[0]
      .clientHeight;
    const mainHeight =
      document.getElementsByClassName('main')[0].clientHeight - 40;
    this.listHeight = mainHeight - headHeight;
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
.companies {
  &-head {
    margin-bottom: 10px;
    .title {
      align-self: center;
    }

    .search {
      margin-top: 10px;
    }
  }

  &-list {
    overflow: auto;
  }
}

.list-item {
  display: block;
  height: 40px;
}
</style>


