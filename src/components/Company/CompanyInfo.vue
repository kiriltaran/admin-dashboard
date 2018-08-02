<template>
  <div class="company-info">
    <el-button 
      type="primary" 
      icon="el-icon-edit-outline"
      class="edit-btn"
      @click="onClickEdit"/>
    <el-row 
      type="flex" 
      justify="space-between">
      <div class="info">
        <div class="info-item mb-20">
          <div class="label">Название компании</div>
          <div class="value">{{ company.name }}</div>
        </div>
        <div class="info-item mb-20">
          <div class="label">ИНН</div>
          <div class="value">{{ company.tin }}</div>
        </div>
        <div class="info-item mb-20">
          <div class="label">Адрес</div>
          <div class="value">{{ company.address ? company.address : '-' }}</div>
        </div>
        <div class="info-item mb-20">
          <div class="label">Контактный телефон</div>
          <div class="value">{{ company.phone ? company.phone : '-' }}</div>
        </div>
        <div class="info-item mb-20">
          <div class="label">Веб-сайт</div>
          <div class="value">
            <a
              v-if="company.website" 
              :href="company.website" 
              target="_blank">{{ company.website }}</a>
            <template v-else>-</template>
          </div>
        </div>
      </div>
      <div class="company-logo">
        <img 
          src="https://via.placeholder.com/150x150" 
          class="logo-icon">
      </div>
    </el-row>
    <div 
      :class="isFullDesc ? 'full':''" 
      class="company-description" 
      v-html="company.description"/>
    <el-button 
      type="text" 
      @click="onToggleDescription">
      {{ isFullDesc ? 'Свернуть' : 'Развернуть' }}
    <i :class="isFullDesc ?'el-icon-arrow-up' : 'el-icon-arrow-down' "/></el-button>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isFullDesc: false,
    };
  },
  methods: {
    onClickEdit() {
      this.$emit('edit');
    },
    onToggleDescription() {
      this.isFullDesc = !this.isFullDesc;
    },
  },
};
</script>

<style lang="scss" scoped>
.company-info {
  position: relative;
}

.edit-btn {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.company-logo {
  display: flex;
  .logo-icon {
    align-self: center;
  }
}

.company-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.full {
  -webkit-line-clamp: initial;
}
</style>
