import { backend } from '@/shared/api'
import type { Employee } from '..'

// &filters=[${filters?.map((a) => `[${a.map((v) => `"${v}"`).join(',')}]`).join(',')}]
export const getEmployees = (fields: string[] = ['*']): Promise<Employee[]> =>
  backend
    .get(`/api/resource/Employee?fields=[${fields.map((v) => `"${v}"`).join(',')}]`)
    .then((r) => r.data.data)
    .then((r) => r as Employee[])
    .catch((e) => Promise.reject(e))

export const getEmployeePic = (url: string) =>
  backend
    .get(url, { responseType: 'blob' })
    .then((r) => r.data)
    .then((b) => URL.createObjectURL(b))
