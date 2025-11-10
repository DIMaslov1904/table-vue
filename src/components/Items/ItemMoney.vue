<script setup>
import { ref, watch } from 'vue';
import InputMoney from '@/components/InputMoney.vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
});

const item = defineModel();
const emit = defineEmits(['change']);
const isInput = ref(false);

const getMoney = () => item.value ? new Intl.NumberFormat("ru").format(item.value) + 'р.' : null;

watch(item, (val) => emit('change', val))
</script>

<template>
    <div class="wrapper" @click="!disabled && (isInput=true)">
    <InputMoney v-if="isInput" v-model="item" @blur="isInput=false" />
    <span v-else>{{ getMoney() }}</span>
</div>
</template>

<style scoped>
.wrapper {
    display: block;
    width: 100px;
    min-height: 1em;
    cursor: text;
    overflow: hidden;
}
</style>
