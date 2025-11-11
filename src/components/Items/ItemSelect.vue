<script setup>
import { watch } from 'vue';
import InputSelect from '@/components/InputSelect.vue';

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['change']);
const item = defineModel()

watch(item, (val) => emit('change', val))
</script>

<template>
  <div :class="['wrapper', {'disabled': disabled}]">
    <InputSelect v-model="item" :options="options" :disabled="disabled" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 1em;
  cursor: pointer;

  select:disabled {
    color: #000;
    opacity: 1;
  }

  &.disabled {
    cursor: default;
  }
}
</style>
