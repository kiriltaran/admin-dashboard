<template>
  <div class="companies">
    <div class="companies-head">
      <el-row 
        type="flex" 
        justify="space-between">
        <span class="head-title">Компании</span>
        <el-button 
          type="primary" 
          @click="onClickNew">Добавить</el-button>
      </el-row>
      <el-input 
        v-model="search"
        class="search" 
        placeholder="Введите название или ИНН"
      />
    </div>
    <ul 
      :style="{height: listHeight + 'px'}"
      class="companies-list">
      <li 
        v-for="company in companiesList" 
        :key="company.id"
        :class="activeCompanyId === company.id ? 'active' : ''"
        class="list-item"
        @click="onClickCompany(company.id)">
        {{ company.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import sortBy from 'lodash.sortby';

export default {
  data() {
    return {
      search: '',
      listHeight: 0,
    };
  },
  computed: {
    companiesList() {
      const result = [];
      Object.keys(this.companies).forEach(el => {
        if (
          this.companies[el].name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          this.companies[el].tin.includes(this.search)
        ) {
          result.push({ ...this.companies[el], id: el });
        }
      });
      return sortBy(result, 'name');
    },
    companies() {
      return this.$store.getters.COMPANIES;
    },
    activeCompanyId() {
      return this.$store.getters.ACTIVE_COMPANY_ID;
    },
  },
  mounted() {
    this.calculateListHeight();
  },
  methods: {
    calculateListHeight() {
      const headHeight = document.getElementsByClassName('companies-head')[0]
        .clientHeight;
      const mainHeight =
        document.getElementsByClassName('main')[0].clientHeight - 40;
      this.listHeight = mainHeight - headHeight;
    },
    onClickNew() {
      this.$store.dispatch('setActiveCompanyId', '');
      this.$store.dispatch('setActiveVacancyId', null);
    },
    onClickCompany(id) {
      this.$store.dispatch('setActiveCompanyId', id);
      this.$store.dispatch('setActiveVacancyId', null);
      this.$store.dispatch('loadVacancies', id);
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
  padding: 0 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
}

.active {
  color: #fff;
  background-color: #409eff;
  &:hover {
    background-color: #66b1ff;
  }
}
</style>
