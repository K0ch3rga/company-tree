<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Department } from './Department'

const props = defineProps<{ data: Department }>()
</script>
<template>
  <Handle type="target" class="target" :position="Position.Left" />
  <q-card flat>
    <div class="text-h3 title">
      {{ props.data.department_name }}
    </div>
    <q-card-section>
      <slot name="employee" />
    </q-card-section>
  </q-card>
</template>
<style scoped>
.q-card {
  border: solid 1px lightgray;
  border-radius: 8px;
  width: 150px;
}
.title {
  padding: 8px 10px;
  padding-bottom: 0;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
}
</style>
