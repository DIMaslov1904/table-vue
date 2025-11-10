<script setup>
import { ref, watch } from 'vue';
import InputDate from '@/components/InputDate.vue';
import { formatDate } from '@/utils/formatDate';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
});
const item = defineModel();
const emit = defineEmits(['change']);
const isInput = ref(false);

const getDate = () => formatDate(item.value);

watch(item, (val) => emit('change', val))
</script>

<template>
    <div class="wrapper" @click="!disabled && (isInput=true)">
        <InputDate v-if="isInput" v-model="item" @blur="isInput=false" />
        <span v-else>{{ getDate() }}</span>
    </div>

</template>

<style scoped>
.wrapper {
    width: 110px;
    min-height: 1em;
    cursor: text;
}
</style>
