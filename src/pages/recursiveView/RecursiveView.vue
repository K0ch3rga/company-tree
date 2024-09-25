<script setup lang="ts">
import RecursiveBlock from '@/entities/dataBlock/RecursiveBlock.vue'
import { getDepartments } from '@/entities/department'
import { RecursifyDepartmentList, type RecursiveDepartment } from '@/entities/department/Department'
import { onBeforeMount, ref } from 'vue'

const recursiveDepartment = ref<RecursiveDepartment | null>()

onBeforeMount(() => {
  getDepartments()
    .then((departments) => (recursiveDepartment.value = RecursifyDepartmentList(departments)[0]))
    .catch((e) => console.log(e))
})
</script>
<template>
  <div v-if="!!recursiveDepartment">
    <RecursiveBlock :data="recursiveDepartment" />
  </div>
</template>
<style scoped></style>
