<script setup>
import { ref, watch } from 'vue';
import InputText from '@/components/InputText.vue';

const item = defineModel()
const emit = defineEmits(['change']);
const isInput = ref(false)
let timerID = null;
watch(item, (val) => emit('change', val))
</script>

<template>
    <InputText v-if="isInput" v-model="item" @blur="isInput=false" />
    <span v-else @click="isInput=true" class="table__text">{{ item }}</span>
</template>

<style scoped>
.table__text {
    display: block;
    min-width: 100%;
    min-height: 1em;
    cursor: text;
}
</style>