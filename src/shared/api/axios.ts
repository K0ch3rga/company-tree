import axios from 'axios'
import { BACKEND_CONNECTION } from '../config'

const api_key = '97a2b7629f76124'
const api_secret = '143bbb963f024a7'

export const backend = axios.create({
  baseURL: BACKEND_CONNECTION,
  headers: {
    Authorization: `token ${api_key}:${api_secret}`
  }
})
