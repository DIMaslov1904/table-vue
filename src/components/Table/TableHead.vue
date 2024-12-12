<script setup>
import { ref } from 'vue';
import {  getCleanName } from '@/utils/sorting'

const props = defineProps({
  columns: {
    type: Object,
    required: true
  },
  sortingName: {
    type: String,
    required: true
  },
})

const sorting = defineModel()

const isOpen = ref(false)

function setSorting(name) {
  const {cleanName, isDown} = getCleanName(sorting.value)
  sorting.value = name + (cleanName === name ? (isDown ? '_up': '_down' ): '_down')
}

function getClass(name) {
  if (name === 'history') return 'table__title_no-sorting'
  const {cleanName, isDown} = getCleanName(sorting.value)
  return cleanName === name ? ((isDown) ? 'table__title_down': 'table__title_up') : ''
}

function getStyle(item) {
  if (item.width) return `min-width: ${item.width}px;`
  return ''
}
</script>

<template>
  <thead :class="{'table__head':true, 'table__head_open': isOpen}" @click="isOpen = !isOpen" :style="{'--sorting': `'${sortingName}'`}">
    <tr>
      <th v-for="item in columns" :key="item.name" :class="['table__title', getClass(item.name)]" :style="getStyle(item)" @click="setSorting(item.name)" >{{ item.title }}</th>
    </tr>
  </thead>
</template>

<style scoped lang="scss">
.table {
  &__head {
    --padding: 5px;
    --arrow-size: 5px;
  }

  &__title {
    position: relative;
    padding: var(--padding);
    font-weight: bold;

    @media (min-width: 769px) {
      border: 1px solid rgb(var(--border-color));
      color: #fff;
      background-color: rgb(var(--primary-color));
    }
    
    &::after {
      content: ''; 
      display: block;
      position: absolute;
      right: var(--arrow-size);
      top: 50%;
      border: var(--arrow-size) solid transparent;
      border-top: var(--arrow-size) solid currentColor;
      opacity: 0;
    }

    &_down, &_up {
      background-color: rgb(var(--active-color));
    }

    &_down::after {
      opacity: 1;
    }

    &_up::after {
      border: var(--arrow-size) solid transparent;
      border-bottom: var(--arrow-size) solid currentColor;
      border-top: none;
      opacity: 1;
    }

    &:not(.table__title_no-sorting) {
      padding-right: calc(var(--padding)*2 + var(--arrow-size)*2);
      cursor: pointer;
      @media (min-width: 769px) {
        &:hover {
          background-color: rgb(var(--active-color));

          &::after {
            opacity: 1;
          }
        }
      }
    }

    &_no-sorting {
      pointer-events: none;
    }

    @media (max-width: 768px) {
      text-align: start;
      padding: 15px 10px;
      width: 100%;
      background-color: #fff;
      &:not(:last-child) {
        border-bottom: 1px solid rgb(var(--border-color));
      }
    }
  }

  @media (max-width: 768px) {
    &__head {
      position: relative;
      display: block;
      margin-bottom: 12px;

      &::before {
        content: var(--sorting);
        display: block;
        padding: 10px 15px;
        cursor: pointer;
        border: 1px solid rgb(var(--border-color));
        background-color: #fff;
      }

      &::after {
        content: ''; 
        display: block;
        position: absolute;
        right: var(--arrow-size);
        top: 18px;
        border: var(--arrow-size) solid transparent;
        border-top: var(--arrow-size) solid currentColor;
      }

      tr {
        height: 0;
        display: grid;
        justify-items: start;
        overflow: hidden;
      }
      &_open {
        tr {
          height: auto;
          border: 1px solid rgb(var(--border-color));
          border-top: none;
        }

        &::after {
          border: var(--arrow-size) solid transparent;
          border-bottom: var(--arrow-size) solid currentColor;
          border-top: none;
        }
      }
    }
  }
}
</style>