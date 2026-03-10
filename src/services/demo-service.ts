import { BaseService } from './base-service'
import type { PageReq } from '@/http/core/types'

export interface Demo {
    id: number
    title: string
    content: string
    author: string
    status: boolean
    createdAt: string
    updatedAt: string
}

// Demo 列表请求参数
export interface DemoListReq extends PageReq {
    keyword?: string
}

export class DemoService extends BaseService<Demo, DemoListReq> {
    // 如果有其他特殊请求，如启用、停用、下单等定制化的请求，那在 DemoService 类中定义即可，其他模块参考 demo 实现即可
    protected getPrefix(): string {
        return 'demo'
    }
}

export const demoService = new DemoService()