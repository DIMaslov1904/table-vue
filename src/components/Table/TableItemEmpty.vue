<template>
  <tr class="table__item">
    <td class="table__row" colspan="30" >
      Данные отсутствуют
    </td>
  </tr>
</template>

<style scoped lang="scss">
.table {
  &__row {
    padding: 20px 30px;

    @media (min-width: 769px) {
      border: 1px solid #dddddd;
    }
  }

  @media (max-width: 768px) {
    &__item {
      border: 1px solid #dddddd;
      padding: 25px 15px;
    }
  }
}
</style>