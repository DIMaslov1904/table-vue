<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel()
const focusMe = ref(null)
onMounted(() => {
    focusMe?.value?.focus()
})
</script>

<template>
    <input class="input" type="number"  v-model="model" ref="focusMe">
</template>

<style scoped lang="scss">
.input {
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    font-size: inherit;
    background-color: transparent;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}
</style>