<script setup>
import IconLoading from '@/components/icons/IconLoading.vue'
</script>

<template>
  <tr>
    <td colspan="30"><IconLoading class="loading"/></td>
  </tr>
</template>

<style scoped lang="scss">
.loading {
  display: block;
  width: 50px;
  max-height: 50px;
  margin: 0 auto;
}
</style>