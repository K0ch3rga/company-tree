<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { VueFlow, type Edge, useVueFlow, type NodeMouseEvent, type NodeProps } from '@vue-flow/core'
import {
  getDepartments,
  departmentKeys,
  type DepartmentNode,
  type DepartmentNodeData,
  type DepartmentNodeEvents,
  ChildlessDepartmentCard,
  DepartmentCard
} from '@/entities/department'
import { getEmployees, type Employee, EmployeeList, employeeKeys } from '@/entities/employee'
import { createNodes, treeWidthMap } from './model'

const { getOutgoers, updateNode, findNode, onNodeClick } = useVueFlow()

const nodes = ref<DepartmentNode[]>([])
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

const onChangeVisibility = (department: string, hide: boolean) => {
  const node = findNode(department)
  const isHidden = !hide
  updateNode(department, {
    data: { ...node?.data, isHidden: hide }
  } as Partial<DepartmentNode>)
  const recursive = (branch: string) => {
    updateNode(branch, {
      hidden: !isHidden
    } as Partial<DepartmentNode>)
    getOutgoers(branch).forEach((n) => recursive(n.id))
  }
  getOutgoers(department).forEach((n) => recursive(n.id))
  // shift positions
  if (node?.parentNode) {
    const hiddenWidth = (treeWidthMap.get(department) ?? 150) - 150
    let shiftDirection = hide ? 1 : -1
    getOutgoers(node?.parentNode).forEach((n) => {
      if (n.id == department) {
        shiftDirection *= -1
      } else {
        n.position.x += (hiddenWidth / 2) * shiftDirection
      }
    })
  }
}
</script>
<template>
  <div onresize="updateCenter">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :default-viewport="{ zoom: 1, x: xCenter, y: -40 }"
      :nodes-draggable="false"
    >
      <template
        #node-department="data: NodeProps<DepartmentNodeData, DepartmentNodeEvents, string>"
      >
        <DepartmentCard
          :data="data.data"
          :children-hidden="data.data.isHidden"
          @change-visibility="onChangeVisibility"
        >
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
