import axios from 'axios'
import { BACKEND_CONNECTION } from '../config'

const api_key = 'fe9c7f83128d0b4'
const api_secret = 'fd674cf11600677'

export const backend = axios.create({
  baseURL: BACKEND_CONNECTION,
  headers: {
    Authorization: `token ${api_key}:${api_secret}`
  }
})
