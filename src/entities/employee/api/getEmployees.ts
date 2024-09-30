import { backend } from '@/shared/api'
import type { Employee } from '..'

export const getEmployees = (): Promise<Employee[]> =>
  backend
    .get('/api/resource/Employee?fields=["*"]')
    .then((r) => r.data.data)
    .then((r) => r as Employee[])
    .catch((e) => Promise.reject(e))
