<script setup lang="ts">
const props = defineProps<{ ids: number[] }>()
const emits = defineEmits<{ show: [ids: number[]] }>()
</script>
<template>
  <div class="dot-wrapper">
    <div class="dot" @click="emits('show', ids)">{{ props.ids.length }}</div>
  </div>
</template>
<style scoped>
.dot {
  border-radius: 24px;
  border: solid 1px grey;
  min-width: 30px;
  padding: 2px;
  text-align: center;
}

.dot-wrapper {
  display: flex;
  align-items: center;
}
</style>
