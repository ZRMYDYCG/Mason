import { api } from '@/http'
import type { PageData, PageReq } from '@/http/core/types'

export abstract class BaseService<T, Q extends PageReq> {
    // 获取资源名，由子类实现
    protected abstract getPrefix(): string

    // 分页查询列表
    public getList(params: Q): Promise<PageData<T>> {
        return api.get(`/${this.getPrefix()}`, { params })
    }

    // 获取详情
    public getDetail(id: number): Promise<T> {
        return api.get(`/${this.getPrefix()}/${id}`)
    }

    // 创建
    public create(data: Partial<T>): Promise<T> {
        return api.post(`/${this.getPrefix()}`, data)
    }

    // 更新
    public update(id: number, data: Partial<T>): Promise<T> {
        return api.put(`/${this.getPrefix()}/${id}`, data)
    }

    // 删除
    public delete(id: number): any {
        return api.delete(`/${this.getPrefix()}/${id}`)
    }
}