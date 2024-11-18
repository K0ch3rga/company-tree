<script setup lang="ts">
import { getDepartments } from '@/entities/department'
import { departmentKeys, type DepartmentNode } from '@/entities/department'
import { onBeforeMount, ref } from 'vue'
import { getEmployees } from '@/entities/employee/api'
import { VueFlow, type Node, type Edge, useVueFlow, type NodeMouseEvent } from '@vue-flow/core'
import { createNodes } from '@/entities/department/model/createNodes'
import { DepartmentCard } from '@/entities/department'
import type { Employee } from '@/entities/employee'
import EmployeeList from '@/entities/employee/EmployeeList.vue'
import { employeeKeys } from '@/entities/employee/Employee'
import ChildlessDepartmentCard from '@/entities/department/ChildlessDepartmentCard.vue'

const { onNodeClick } = useVueFlow()

const nodes = ref<Node<DepartmentNode>[]>([])
const edges = ref<Edge[]>([])
const employees = ref<Employee[]>([])
const xCenter = window.innerWidth / 2 - 75

onBeforeMount(async () => {
  await getDepartments(departmentKeys)
    .then((departments) => ([nodes.value, edges.value] = createNodes(departments)))
    .catch((e) => console.log(e))
  await getEmployees(employeeKeys)
    .then((e) => (employees.value = e))
    .catch((e) => console.log(e))
})

onNodeClick((e: NodeMouseEvent) => {
  e.node.data.expanded = !e.node.data.expanded
})
</script>
<template>
  <div onresize="updateCenter">
    <VueFlow :nodes="nodes" :edges="edges" :default-viewport="{ zoom: 1, x: xCenter, y: 0 }">
      <template #node-department="data">
        <DepartmentCard :data="data.data">
          <template #employee>
            <div v-if="!data.data.expanded"></div>
            <EmployeeList
              v-else
              :employees="employees.filter((v) => v.department == data.data.name)"
            />
          </template>
        </DepartmentCard>
      </template>
      <template #node-stacked_department="data">
        <ChildlessDepartmentCard :data="data.data">
          <template #employee>
            <div v-if="!data.data.expanded"></div>
            <EmployeeList
              v-else
              :employees="employees.filter((v) => v.department == data.data.name)"
            />
          </template>
        </ChildlessDepartmentCard>
      </template>
    </VueFlow>
  </div>
</template>
<style scoped>
.vue-flow {
  height: 100vh;
  width: 100vw;
}
</style>
