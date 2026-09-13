/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module '*.mdx' {
  import type { Component } from 'vue'

  export const meta:
    | {
        title?: string
        description?: string
        category?: string
        updatedAt?: string
        readingTime?: string
        owner?: string
        order?: number
      }
    | undefined

  const component: Component
  export default component
}
