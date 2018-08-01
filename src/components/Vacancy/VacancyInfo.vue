<template>
  <div class="vacancy-info">
    <div class="edit-wrapper mb-20">
      <el-button 
        type="primary" 
        icon="el-icon-edit-outline"
        class="edit-btn"
        @click="onClickEdit"/>
    </div>
    <div class="info-main mb-20">
      <div class="main-header mb-10">
        <div class="options label">
          <div class="options-item">{{ vacancy.category }},</div>
          <div class="options-item">
            <template 
              v-for="item in vacancy.specialization" >
              {{ item }},
            </template>
          </div>
          <div class="options-item">{{ vacancy.location }},</div>
          <div class="options-item">+{{ vacancy.remoteness }} км</div>
        </div>
        <div class="time label"><i class="el-icon-time"/> {{ vacancy.createdTime | vacancyTime }}д</div>
      </div>
      <div class="salary mb-10">{{ vacancy.salary }}</div>
      <div class="title">{{ vacancy.title }}</div>
    </div>
    <div 
      class="info-description" 
      v-html="vacancy.description"/>
  </div>
</template>

<script>
import getVacancyTime from '@/helpers';

export default {
  filters: {
    vacancyTime: value => getVacancyTime(value),
  },
  props: {
    vacancy: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    onClickEdit() {
      this.$emit('edit');
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-wrapper {
  text-align: right;
}
.info-main {
  padding: 40px 20px;
  background-color: rgba(0, 0, 0, 0.05);
}

.main-header {
  display: flex;
  justify-content: space-between;
}

.options {
  &-item {
    display: inline-block;
    margin-right: 5px;
  }
}

.time {
  text-align: right;
  min-width: 60px;
}

.salary {
  font-size: 20px;
}

.info-description {
  list-style-position: inside;
}
</style>

