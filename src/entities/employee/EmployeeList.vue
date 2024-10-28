<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getEmployeePic } from './api/getEmployees'
import type { Employee } from './Employee'

const props = defineProps<{ employees: Employee[] }>()
const avatars = ref<string[]>([])
onBeforeMount(async () => {
  await Promise.all(
    props.employees.map(async (e) => (e.image ? await getEmployeePic(e.image) : ''))
  ).then((r) => (avatars.value = r))
})
</script>
<template>
  <div
    v-for="(employee, index) in props.employees"
    :key="employee.employee_number"
    class="employee-list-item"
  >
    <q-avatar size="24px" color="primary" text-color="white">
      <img
        v-if="!!employee.image && !!avatars?.[index]"
        width="24"
        height="24"
        :src="avatars[index]"
      />
      <q-spinner-tail v-else-if="!!employee.image && !avatars?.[index]" :thickness="7" size="xs" />
      <span v-else>{{ employee.first_name.charAt(0) }}</span>
    </q-avatar>
    <div>{{ employee.first_name }}</div>
  </div>
</template>
<style scoped>
.employee-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
