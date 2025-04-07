<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
})

const model = defineModel()
</script>

<template>
  <select class="input" v-model="model">
    <option v-for="item in options" :key="item.id" :value="item.id">{{ item.label }}</option>
  </select>
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  font-size: inherit;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }
}
</style>