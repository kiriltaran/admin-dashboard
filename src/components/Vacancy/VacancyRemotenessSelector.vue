<template>
  <el-select
    :value="value"
    class="selector"
    @change="onChange">
    <el-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"/>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      options: ['100км', '200км', '500км', '1000км', 'больше 1000км'],
    };
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.selector {
  width: 100%;
}
</style>
