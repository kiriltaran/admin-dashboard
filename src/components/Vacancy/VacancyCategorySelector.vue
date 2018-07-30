<template>
  <el-select
    :value="value"
    class="selector"
    @change="onChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
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
      options: [
        {
          value: 'A1',
          label: 'A1',
        },
        {
          value: 'A',
          label: 'A',
        },
        {
          value: 'B1',
          label: 'B1',
        },
        {
          value: 'B',
          label: 'B',
        },
        {
          value: 'BE',
          label: 'BE',
        },
        {
          value: 'C1',
          label: 'C1',
        },
        {
          value: 'C',
          label: 'C',
        },
        {
          value: 'CE',
          label: 'CE',
        },
        {
          value: 'C1E',
          label: 'C1E',
        },
        {
          value: 'D1',
          label: 'D1',
        },
        {
          value: 'D',
          label: 'D',
        },
        {
          value: 'D1E',
          label: 'D1E',
        },
        {
          value: 'DE',
          label: 'DE',
        },
        {
          value: 'T',
          label: 'T',
        },
      ],
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


