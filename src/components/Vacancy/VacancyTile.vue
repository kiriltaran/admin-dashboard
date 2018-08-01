<template>
  <el-card 
    :body-style="{padding: '10px'}"
    class="vacancy-tile"
  >
    <div class="tile-header mb-10">
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
      <div class="time label"><i class="el-icon-time"/> 3 дня</div>
    </div>
    <div class="salary mb-10">{{ vacancy.salary }}</div>
    <div class="title mb-10">{{ vacancy.title }}</div>
    <div 
      :class="isActive ? '':'hidden'" 
      class="status">
      <div class="label">статус</div>
      <vacancy-status-selector 
        v-model="status" 
        class="status-selector"/>
      <el-button 
        type="primary"
        @click="onClickChangeStatus">Изменить</el-button>
    </div>
  </el-card>
</template>

<script>
import VacancyStatusSelector from '@/components/Vacancy/VacancyStatusSelector.vue';

export default {
  components: {
    VacancyStatusSelector,
  },
  props: {
    vacancy: {
      type: Object,
      default() {
        return null;
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      status: 'regular',
    };
  },
  watch: {
    vacancy: {
      handler() {
        this.initStatus();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initStatus() {
      this.status = this.vacancy.status;
    },
    onClickChangeStatus() {
      this.$emit('change-status', this.status);
    },
  },
};
</script>

<style lang="scss" scoped>
.vacancy-tile {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
}

.tile-header {
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

.status {
  height: 50px;
  transition: all 0.3s linear;
  &-selector {
    margin-right: 10px;
  }
}

.hidden {
  height: 0;
  opacity: 0;
}
</style>

