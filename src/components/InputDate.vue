<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel()
const focusMe = ref(null)
onMounted(() => {
    focusMe?.value?.focus()
})
</script>

<template>
    <input class="input" type="date"  v-model="model" ref="focusMe" />
</template>

<style scoped lang="scss">
.input {
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    height: 1em;
    background-color: transparent;
}
</style>