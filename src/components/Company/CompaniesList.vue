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
        placeholder="Введите название или ИНН"/>
    </div>
    <ul 
      :style="{height: listHeight + 'px'}"
      class="companies-list">
      <li 
        v-for="(company, id) in companies" 
        :key="id"
        :class="companyId === id ? 'active' : ''"
        class="list-item"
        @click="onClickCompany(id)">
        {{ company.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    companies: {
      type: Object,
      default() {
        return {};
      },
    },
    companyId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
      listHeight: 0,
    };
  },
  mounted() {
    this.initListHeight();
  },
  methods: {
    initListHeight() {
      const headHeight = document.getElementsByClassName('companies-head')[0]
        .clientHeight;
      const mainHeight =
        document.getElementsByClassName('main')[0].clientHeight - 40;
      this.listHeight = mainHeight - headHeight;
    },
    onClickNew() {
      this.$emit('click-new');
    },
    onClickCompany(id) {
      this.$emit('select-company', id);
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


