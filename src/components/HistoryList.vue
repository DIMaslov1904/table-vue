<script setup>
import { onMounted, ref } from 'vue';
import { formatDate } from '@/utils/formatDate';

const API = TABLE_VUE_API()

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
})

const list = ref([])
async function getList() {
  list.value = await API.getHistory(props.id)
}
 
onMounted(getList)
</script>

<template>
    <ul class="list">
        <li>История строки <a :href="`/bitrix/admin/iblock_element_edit.php?IBLOCK_ID=18&type=documents&lang=ru&ID=${id}&find_section_section=0&WF=Y`" target="_blank" title="Перейти к данному элементу в административной части сайта">{{ id }}</a></li>
        <li v-for="item in list" class="item">
          <span class="strong">{{ item.name }} [{{ formatDate(item.date) }}]</span> - {{ item.text }}
        </li>
    </ul>
</template>

<style scoped lang="scss">
ul.list li {
  padding-left: 0;
  &:before {
  content: none;
}
}
.list {
    display: grid;
    gap: 24px;
    list-style: none;
    padding: 0;

}
.strong {
   font-weight: 600; 
}
</style>