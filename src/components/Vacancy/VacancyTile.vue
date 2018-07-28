<template>
  <el-card 
    :body-style="{padding: '10px'}"
    class="vacancy-tile"
    @click.native="onClick">
    <div class="tile-header mb-10">
      <div class="options label">D,  ADR,  Киев + 200 км</div>
      <div class="time label"><i class="el-icon-time"/> 3 дня</div>
    </div>
    <div class="salary mb-10">23 152 руб</div>
    <div class="title mb-10">Название вакансии длинное в две стороки, водитель-дальнобойщик</div>
    <div 
      :class="isShowingStatus ? '':'hidden'" 
      class="status">
      <div class="label">статус</div>
      <el-select 
        v-model="status" 
        size="mini"
        class="status-selector">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button 
        size="mini" 
        type="primary">Обновить</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      status: 'regular',
      statusOptions: [
        {
          value: 'unpublished',
          label: 'неопубликована',
        },
        {
          value: 'regular',
          label: 'обычный',
        },
        {
          value: 'top',
          label: 'топ',
        },
      ],
      isShowingStatus: false,
    };
  },
  methods: {
    onClick() {
      this.isShowingStatus = !this.isShowingStatus;
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

.salary {
  font-size: 20px;
}

.status {
  height: 50px;
  transition: all 0.3s linear;
  &-selector {
    width: 150px;
    margin-right: 10px;
  }
}

.hidden {
  height: 0;
  opacity: 0;
}
</style>

