<script setup lang="ts">
import { getDepartments } from '@/entities/department'
import {
  departmentKeys,
  type Department,
  type RecursiveDepartment
} from '@/entities/department/Department'
import { onBeforeMount, ref } from 'vue'
import { getEmployees } from '@/entities/employee/api'
import { VueFlow, type Node, type Edge } from '@vue-flow/core'
import { createNodes } from '@/entities/department/model/createNodes'

const recursiveDepartment = ref<RecursiveDepartment | null>()
const nodes = ref<Node<Department>[]>([])
const edges = ref<Edge[]>([])

onBeforeMount(async () => {
  await getDepartments(departmentKeys)
    .then((departments) => ([nodes.value, edges.value] = createNodes(departments)))
    .catch((e) => console.log(e))
  getEmployees()
    .then((e) => console.log(e))
    .catch((e) => console.log(e))
})
</script>
<template>
  <div class="flow-wrapper">
    <VueFlow :nodes="nodes" :edges="edges"></VueFlow>
  </div>
</template>
<style scoped>
.flow-wrapper {
  height: 100%;
  width: 100%;
}
.vue-flow {
  height: 100vh;
  width: 100vw;
}
</style>
