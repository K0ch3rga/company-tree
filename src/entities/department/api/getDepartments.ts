import type { Department } from '../Department'

const url = 'http://10.249.15.68:8000/'
const api_key = '97a2b7629f76124'
const api_secret = '143bbb963f024a7'

export const getDepartments = (): Promise<Department[]> =>
  fetch(`${url}api/resource/Department?fields=["*"]`, {
    headers: { Authorization: `token ${api_key}:${api_secret}` }
  })
    .then((r) => (r.ok ? r : Promise.reject(r.status)))
    .then((r) => r.json())
    .then((r) => r.data)
    .then((r) => r as Department[])
    .catch((e) => Promise.reject(e))
