import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 用于测试的 Pinia Store
 * 使用组合式 API 风格编写，与 Vue3 的组合式 API 保持一致
 */ 
export const useDemoStore = defineStore(
    'demoStore', // Store 唯一标识
    () => {
        const counter = ref<number>(0)

        const increment = () => {
            counter.value++
        }

        return {
            counter,
            increment
        }
    },
    {
        persist: true
    }
)
