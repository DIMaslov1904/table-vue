<script setup>
import { ref } from 'vue';
import ItemText from '@/components/Items/ItemText.vue';
import ItemDate from '@/components/Items/ItemDate.vue';
import ItemSelect from '@/components/Items/ItemSelect.vue';
import ItemHistory from '@/components/Items/ItemHistory.vue';
import ItemMoney from '@/components/Items/ItemMoney.vue';

const API = TABLE_VUE_API()

const props = defineProps({
  columns: {
    type: Object,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
  }
})

const isChange = ref(false)

function updateItem(name, value) {
  isChange.value = true
}
async function saveItem() {
  const res = await API.updateItem(props.item.id, props.item)
  isChange.value = false
}
</script>

<template>
  <tr :class="['table__row', {'table__row_cnahged':isChange}]">
    <td v-for="elem in columns" :class="{'table__col': true, 'table__col_no-padding': elem.type === 'history', 'table__col_no-active': loading}" :data-title="elem.title">
      <ItemHistory v-if="elem.type === 'history'" :id="item.id" />
      <ItemDate v-else-if="elem.type === 'date'" v-model="item[elem.name]" @change="val => updateItem(elem.name, val)"/>
      <ItemSelect v-else-if="elem.type === 'select'" v-model="item[elem.name]" :options="elem.options" @change="val => updateItem(elem.name, val)"/>
      <ItemMoney v-else-if="elem.type === 'money'" v-model="item[elem.name]" @change="val => updateItem(elem.name, val)"/>
      <ItemText v-else v-model="item[elem.name]" @change="val => updateItem(elem.name, val)"/>
    </td>
    <td v-if="isChange" class="table__save-col">
      <button class="table__save-btn" @click="saveItem()">Сохранить</button>
    </td>
  </tr>
</template>

<style scoped lang="scss">
.table {
  &__row {
    &_cnahged  td{
      background-color: #ffb579;
    }
  }
  @media (min-width: 769px) {
    &__row:hover .table__col {
      background-color: #f2f2f2;
    }
  }

  &__save-col {
    position: relative;
    width: 0;
    height: 0;
    padding:0;
  }

  &__save-btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding:0 5px;
    white-space: nowrap;
    cursor: pointer;

    border: 1px solid rgb(var(--primary-color));
    background-color: #fff;
    color: rgb(var(--primary-color));
    transition: filter .3s;
    padding: 7px;

    &:hover {
      filter: brightness(.9);
    }
  }
  
  &__col {
    padding: 5px 10px;
    @media (min-width: 769px) {
      background-color: #fff;

      &_no-padding {
        padding: 0;
      }
    }

    &_no-active {
      pointer-events: none;
      opacity: 0.5;
    }

    @media (min-width: 769px) {
      border: 1px solid rgb(var(--border-color));
    }
  }

  @media (max-width: 768px) {
    &__row {
      display: grid;
      gap: 12px;
      border: 1px solid rgb(var(--border-color));
      padding: 25px 15px;
      background-color: #fff;
    }

    &__col {
      position: relative;
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 12px;
      align-items: center;
      justify-items: start;

      &::before {
        content: attr(data-title);

      }
    }
  }
}
</style>