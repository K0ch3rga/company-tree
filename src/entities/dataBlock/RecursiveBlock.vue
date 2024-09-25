<script setup lang="ts">
import { onMounted, onUpdated, ref, useTemplateRef } from 'vue'
import type { RecursiveDepartment } from '../department'
import { createPaths } from './model'

const props = defineProps<{ data: RecursiveDepartment }>()
const emits = defineEmits<{ resize: [] }>()

const parent = useTemplateRef<HTMLDivElement | null>('parent')
const children = useTemplateRef<HTMLDivElement[] | null>('children')
const paths = ref<string[]>([])

const hidden = ref<boolean>()
const hide = () => (hidden.value = true)
const show = () => (hidden.value = false)

const onShouldResize = () => {
  paths.value = createPaths(parent.value, children.value)
}

onMounted(() => {
  paths.value = createPaths(parent.value, children.value)
})
onUpdated(() => emits('resize'))
</script>
<template>
  <div class="wrapper">
    <div class="data" @click="hide" v-show="!hidden" ref="parent">
      {{ props.data.name }}
    </div>
    <svg view-box="0 0 100 100" v-show="!hidden">
      <path fill="none" stroke="lightgray" :d="path" v-for="path in paths" :key="path" />
    </svg>
    <div class="children" v-show="!hidden && props.data.children">
      <div v-for="node in props.data.children" :key="node.name" class="child" ref="children">
        <RecursiveBlock :data="node" @resize="onShouldResize" />
      </div>
    </div>
    <div v-show="hidden" class="hidden" @click="show">
      {{ (props.data.children?.length ?? 0) + 1 }}
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.data {
  width: fit-content;
  padding: 8px;
  border: solid 1px grey;
  border-radius: 8px;
}
.children {
  display: flex;
  flex-direction: row;
}
.child {
  display: flex;
  flex-direction: column;
}
.hidden {
  border-radius: 24px;
  border: solid 1px grey;
  min-width: 30px;
  padding: 2px;
  text-align: center;
}
svg {
  position: relative;
  width: 1px;
  height: 16px;
  overflow: visible;
  margin: 0;
}
</style>
