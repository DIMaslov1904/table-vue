<script setup>
import TableWrap from '@/components/Table/TableWrap.vue'
import TableHead from '@/components/Table/TableHead.vue'
import TableBody from '@/components/Table/TableBody.vue'
import TableItem from '@/components/Table/TableItem.vue'
import TableItemEmpty from '@/components/Table/TableItemEmpty.vue'
import TableItemLoading from '@/components/Table/TableItemLoading.vue'

import { sortTable } from '@/utils/sorting'
import range from '@/utils/range'
import { onMounted, ref, watch } from 'vue';

const API = TABLE_VUE_API()


const newDate = new Date();

const nowYear = newDate.getFullYear();

const sorting = ref('')
const sortingName = ref('Сортировка')
const loading = ref(true)
const selectYear = ref(nowYear)
const selectMonth = ref(newDate.getMonth())
const columns = ref([])
const items = ref([])
const yearOptions = [...range(2000, nowYear)];
const monthOptions = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

async function getList(isMounted=false) {
  sorting.value = ''
  loading.value = true;
  const data = await API.getTableData({ year: selectYear.value, month: selectMonth.value + 1}, isMounted);
  columns.value = data.columns;
  items.value = data.items;
  loading.value = false;
}

async function Add() {
  const newItem = await API.createRow({ year: selectYear.value, month: selectMonth.value + 1, day: newDate.getDate()});
  items.value.unshift(newItem)
}

watch([selectYear, selectMonth], getList)
watch(sorting, () => {
  sortTable(items.value, sorting.value, columns.value)
  if (sorting.value) {
    sortingName.value = columns.value.find((item) => item.name === sorting.value.replace('_down', '').replace('_up', ''))?.title;
  } else {
    sortingName.value = 'Сортировка';
  }
})

async function Mounted() {
  getList(true)
}

onMounted(Mounted)
</script>

<template>
  <div class="app">
    <div class="actions">
      <div class="actions__group">
        <select class="select" v-model="selectYear">
          <option v-for="year in yearOptions" :value="year">{{ year }}</option>
        </select>

        <select class="select" v-model="selectMonth">
          <option v-for="(month, i) in monthOptions" :value="i">{{ month }}</option>
        </select>
      </div>

      <div class="actions__group">
        <button class="btn" @click="getList">Обновить</button>
        <button class="btn" @click="Add">Добавить</button>
      </div>
    </div>

    <TableWrap>
      <TableHead :columns="columns" v-model="sorting" :sortingName="sortingName" />
      <TableBody>
        <TableItemEmpty v-if="!items.length && !loading" />
        <TableItemLoading v-else-if="loading" />
        <TableItem v-else v-for="item in items" :key="item.id" :columns="columns" :item="item" :loading="loading" />
      </TableBody>
    </TableWrap>
  </div>
</template>

<style scoped lang="scss">
.app {
  max-width: 1140px;
  padding: 15px;
  margin: 0 auto;
}


.actions {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

.actions__group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  background-color: rgb(var(--primary-color));
  color: #fff;
  cursor: pointer;
  transition: background-color .2s;

  &:not(:disabled) {
    &:hover {
      background-color: rgb(var(--active-color));
    }
  }
}

.select {
  min-height: 35px;
  padding: 5px 10px;
  border: 1px solid #000;
  background: #fff;
  cursor: pointer;
  transition: background-color .2s;
  outline: none;

  &:hover {
    border-color: rgb(var(--active-color));
  }
}
</style>
