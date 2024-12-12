<script setup>
import { ref } from 'vue';
import TheModal from '@/components/TheModal.vue';
import HistoryList from '@/components/HistoryList.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
})

const isOpen = ref(false)

</script>

<template>
    <button class="table__btn" @click="isOpen=true">просмотреть</button>

    <TheModal v-model="isOpen">
      <HistoryList :id="id" />
    </TheModal>
</template>


<style scoped lang="scss">
.table {
  &__btn {
    border: none;
    background-color: rgb(var(--primary-color));
    color: #fff;
    transition: background-color 0.3s ease;
    padding: 7px;

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        background-color: rgb(var(--active-color));
      }
    }

    @media (min-width: 769px) {
      width: 100%;
    }
  }
}
</style>