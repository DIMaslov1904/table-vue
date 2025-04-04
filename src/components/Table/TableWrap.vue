<template>
  <div class="table__wrap-scroll">
    <table class="table">
      <slot></slot>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table {

  width: 1110px;
  border: 1px solid rgb(var(--border-color));
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;

  &__wrap-scroll {
    width: 100%;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    & {
      width: 100%;
      border: none;
    }
  }
}
</style>