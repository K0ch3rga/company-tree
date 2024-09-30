import { backend } from '@/shared/api'

import type { Department } from '../Department'

export const getDepartments = async (
  fields: string[] = ['*'],
  filters: string[][] = [['Department', 'disabled', '=', '0']]
): Promise<Department[]> =>
  backend
    .get(
      `/api/resource/Department?fields=[${fields.map((v) => `"${v}"`).join(',')}]&filters=[${filters?.map((a) => `[${a.map((v) => `"${v}"`).join(',')}]`).join(',')}]`
    )
    .then((r) => r.data.data)
    .then((r) => r as Department[])
    .catch((e) => Promise.reject(e))
