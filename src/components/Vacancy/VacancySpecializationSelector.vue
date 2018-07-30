<template>
  <el-select
    :value="value"
    :multiple="true"
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
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      options: [
        {
          value: 'adr',
          label: 'ADR',
        },
        {
          value: 'refrigerator',
          label: 'Рефрижератор',
        },
        {
          value: 'manipulator',
          label: 'Манипулятор',
        },
        {
          value: 'wrecker',
          label: 'Эвакуатор',
        },
        {
          value: 'autocart',
          label: 'Автовоз',
        },
        {
          value: 'outdoors',
          label: 'Негабарит',
        },
        {
          value: 'animals',
          label: 'Перевозка животных',
        },
        {
          value: 'graincarrier',
          label: 'Зерновоз',
        },
        {
          value: 'coupler',
          label: 'Сцепка',
        },
        {
          value: 'semitrailer',
          label: 'Полуприцеп',
        },
        {
          value: 'mixer',
          label: 'Миксер',
        },
        {
          value: 'taillift',
          label: 'Гидроборт',
        },
        {
          value: 'forwarder',
          label: 'Экспедитор',
        },
        {
          value: 'guard',
          label: 'Охранник',
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


