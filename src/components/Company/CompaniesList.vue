<template>
  <div 
    v-loading="loading" 
    class="companies">
    <div class="companies-head">
      <el-row 
        type="flex" 
        justify="space-between">
        <span class="head-title">Компании</span>
        <el-button 
          type="primary" 
          size="mini"
          @click="onClickNew">Добавить</el-button>
      </el-row>
      <el-input 
        v-model="search"
        class="search" 
        placeholder="Введите название или ИНН"/>
    </div>
    <ul 
      :style="{height: listHeight + 'px'}"
      class="companies-list">
      <li 
        v-for="(company, id) in companies" 
        :key="id"
        class="list-item"
        @click="onClickCompany(id)">
        {{ company.name }}
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
      loading: false,
    };
  },
  mounted() {
    this.initListHeight();
    this.loadCompanies();
  },
  methods: {
    async loadCompanies() {
      try {
        this.loading = true;
        this.companies = await api.fetchCompanies();
      } catch (e) {
        window.console.log(e);
      } finally {
        this.loading = false;
      }
    },
    initListHeight() {
      const headHeight = document.getElementsByClassName('companies-head')[0]
        .clientHeight;
      const mainHeight =
        document.getElementsByClassName('main')[0].clientHeight - 40;
      this.listHeight = mainHeight - headHeight;
    },
    onClickNew() {
      this.$emit('new-company');
    },
    onClickCompany(data) {
      this.$emit('select-company', data);
    },
  },
};
</script>

<style lang="scss" scoped>
.companies {
  &-head {
    margin-bottom: 10px;
    .head-title {
      align-self: center;
      font-size: 20px;
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
  line-height: 40px;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
}
</style>


