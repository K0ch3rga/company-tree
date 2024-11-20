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
      <div class="text-h3 title">
        {{ props.data.department_name }}
      </div>
      <q-card-section>
        <slot name="employee" />
      </q-card-section>
      <q-btn
        class="expand btn"
        @click.prevent.stop="showHideChildren"
        :icon="childrenHidden ? 'sys_s_unfold_more' : 'sys_s_unfold_less'"
      />
    </q-card>
  </div>
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
.wrapper {
  height: 58px;
  overflow-y: visible;
  cursor: pointer;
}
</style>
