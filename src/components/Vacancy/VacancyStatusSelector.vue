<template>
  <el-select
    :value="value"
    class="status-selector"
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
    };
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>

