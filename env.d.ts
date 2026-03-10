/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="unplugin-vue-router/runtime" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
readonly VITE_APP_NAME: string
}

interface ImportMeta {
readonly env: ImportMetaEnv
readonly VITE_NUMBER_DEMO: number
readonly VITE_BOOLEAN_DEMO: boolean
}