/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_CONNECTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
