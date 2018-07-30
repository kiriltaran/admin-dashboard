<template>
  <div class="vacancy-info">
    <div class="info-main mb-20">
      <div class="main-header mb-10">
        <div class="options label">{{ vacancy.category }},  {{ vacancy.specialization }}, {{ vacancy.location }} +{{ vacancy.remoteness }} км</div>
        <div class="time label"><i class="el-icon-time"/> 3 дня</div>
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
export default {
  props: {
    vacancy: {
      type: Object,
      default() {
        return null;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.info-main {
  padding: 40px 20px;
  background-color: rgba(0, 0, 0, 0.05);
}

.main-header {
  display: flex;
  justify-content: space-between;
}

.salary {
  font-size: 20px;
}

.info-description {
  list-style-position: inside;
}
</style>

