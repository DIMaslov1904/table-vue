<template>
  <tbody class="table__body">
    <slot></slot>
  </tbody>
</template>

<style scoped lang="scss">
.table {
  @media (max-width: 768px) {
    &__body {
      display: grid;
      gap: 32px
    }
  }
}
</style>