<script setup>
import { watch } from 'vue';
import InputSelect from '@/components/InputSelect.vue';

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
})
const emit = defineEmits(['change']);
const item = defineModel()

watch(item, (val) => emit('change', val))
</script>

<template>
  <div class="wrapper">
    <InputSelect v-model="item" :options="options" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 1em;
  cursor: pointer;
}
</style>