<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel()
const focusMe = ref(null)
onMounted(() => {
    focusMe?.value?.focus()
})
</script>

<template>
    <input class="input" type="text"  v-model="model" ref="focusMe" size="2">
</template>

<style scoped lang="scss">
.input {
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    font-size: inherit;
    background-color: transparent;
}
</style>