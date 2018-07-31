<template>
  <el-select
    :value="value"
    :multiple="true"
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
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      options: [
        'ADR',
        'Рефрижератор',
        'Манипулятор',
        'Эвакуатор',
        'Автовоз',
        'Негабарит',
        'Перевозка животных',
        'Зерновоз',
        'Сцепка',
        'Полуприцеп',
        'Миксер',
        'Гидроборт',
        'Экспедитор',
        'Охранник',
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


