/**
 * 配置层
 * 1）提供自定义配置，（如自定义请求拦截器，在请求头中添加 token；自定义响应拦截器，使用UI展示错误信息等；自定义请求基础路径、超时时间等）
 * 2）创建并导出 HttpClient 实例对象，以便 service 层使用
 */
import { HttpClient } from './core'
import type { AxiosRequestConfig } from 'axios'

// 自定义请求拦截处理函数
const customRequestOnFulfilled = (config: AxiosRequestConfig) => {
    const { headers = {} } = config
    headers.token = 'aaaaaa'
    return config
}

// 创建并导出 HttpClient 对象 api
export const api = new HttpClient({
    interceptor: {
        request: {
            onFulfilled: customRequestOnFulfilled,
        },
    },
})

// 导出 Axios 实例
export const instance = api.getInstance()


/**
 * export const api = new HttpClient()
 * 不同项目的差异化配置就在这个文件中实现。此外，该文件还导出了 Axios 的实例 instance。你可以拿着这个实例去做你想做的事，如文件上传下载等有个性化的东西。
 * */ 