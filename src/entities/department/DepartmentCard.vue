<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import type { Department } from './Department'

const props = defineProps<{ data: Department; childrenHidden: boolean }>()
const emits = defineEmits<{ changeVisibility: [string, boolean] }>()
const { getOutgoers } = useVueFlow()
const children = getOutgoers(props.data.name)
const showHideChildren = () => emits('changeVisibility', props.data.name, !props.childrenHidden)
</script>
<template>
  <Handle type="target" class="target" :position="Position.Top" />
  <Handle v-if="children.length > 0" type="source" :position="Position.Bottom" />
  <div class="wrapper">
    <q-card flat>
      <div class="card-header">
        <div class="title text-h3">
          {{ props.data.department_name }}
        </div>
        <q-btn
          v-if="children.length > 0"
          flat
          :ripple="false"
          class="expand-btn q-pa-xs"
          @click.prevent.stop="showHideChildren"
          :icon="childrenHidden ? 'sys_s_unfold_more' : 'sys_s_unfold_less'"
        />
      </div>
      <q-card-section class="q-pa-sm">
        <slot name="employee" />
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
.q-card {
  border: solid 1px #b7bfd1;
  border-radius: 8px;
  width: 150px;
}
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.title {
  padding: 8px 10px;
  padding-bottom: 0;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
}
.wrapper {
  height: 54px;
  overflow-y: visible;
  cursor: pointer;
}
.expand-btn {
  border-radius: 8px;
  overflow-x: hidden;
}
.expand-btn:deep(.q-icon) {
  justify-content: end;
}
</style>
