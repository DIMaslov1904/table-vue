<script setup>
import { onMounted, ref } from 'vue';
import API from '@/api/api'
import { formatDate } from '@/utils/formatDate';


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
        <li>История строки {{ id }}</li>
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