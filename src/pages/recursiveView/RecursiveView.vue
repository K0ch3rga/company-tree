<script setup lang="ts">
import RecursiveBlock from '@/entities/department/RecursiveBlock.vue'
import { getDepartments } from '@/entities/department'
import {
  departmentKeys,
  RecursifyDepartmentList,
  type RecursiveDepartment
} from '@/entities/department/Department'
import { onBeforeMount, ref } from 'vue'
import { getEmployees } from '@/entities/employee/api'

const recursiveDepartment = ref<RecursiveDepartment | null>()

onBeforeMount(() => {
  getDepartments(departmentKeys)
    .then((departments) => (recursiveDepartment.value = RecursifyDepartmentList(departments)[0]))
    .catch((e) => console.log(e))

  getEmployees()
    .then((e) => console.log(e))
    .catch((e) => console.log(e))
})
</script>
<template>
  <div v-if="!!recursiveDepartment">
    <RecursiveBlock :data="recursiveDepartment" />
  </div>
</template>
<style scoped></style>
