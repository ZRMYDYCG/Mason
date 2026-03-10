import Mock from 'mockjs'
import { ApiResp } from '../src/http/core'
import { MockMethod } from 'vite-plugin-mock'

const demoList = Mock.mock({
  'list|100': [
    {
      'id|+1': 1,
      title: '@ctitle(5, 10)',
      content: '@cparagraph(1, 3)',
      author: '@name',
      status: '@boolean',
      createdAt: '@datetime',
      updatedAt: '@datetime',
    },
  ],
}).list

function success<T>(data: T): ApiResp<T> {
  return {
    code: 0,
    message: 'success',
    data,
  }
}

function error(message: string, code: number = 500): ApiResp<null> {
  return {
    code,
    message,
    data: null,
  }
}

const demoMock: MockMethod[] = [
  {
    url: '/api/demo',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const pageNum = parseInt(query.pageNum) || 1
      const pageSize = parseInt(query.pageSize) || 10
      const keyword = query.keyword || ''

      let filteredList = demoList
      if (keyword) {
        filteredList = demoList.filter(
          (item) =>
            item.title.includes(keyword) ||
            item.content.includes(keyword) ||
            item.author.includes(keyword),
        )
      }

      const start = (pageNum - 1) * pageSize
      const end = start + pageSize
      const list = filteredList.slice(start, end)

      return success({ list, total: filteredList.length })
    },
  },
  {
    url: '/api/demo/:id',
    method: 'get',
    timeout: 3000,
    response: ({ query }) => {
      const item = demoList.find((item) => item.id === parseInt(query.id))
      if (item) {
        return success(item)
      } else {
        return error('Item not found')
      }
    },
  },
  {
    url: '/api/demo',
    method: 'post',
    response: ({ body }) => {
      const newItem = {
        id: demoList.length + 1,
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      demoList.push(newItem)
      return success(newItem)
    },
  },
  {
    url: '/api/demo/:id',
    method: 'put',
    response: ({ query, body }) => {
      const index = demoList.findIndex((item) => item.id === parseInt(query.id))
      if (index !== -1) {
        demoList[index] = {
          ...demoList[index],
          ...body,
          updatedAt: new Date().toISOString(),
        }
        return success(demoList[index])
      } else {
        return error('Item not found')
      }
    },
  },
  {
    url: '/api/demo/:id',
    method: 'delete',
    response: ({ query }) => {
      const index = demoList.findIndex((item) => item.id === parseInt(query.id))
      if (index !== -1) {
        demoList.splice(index, 1)
        return success(null)
      } else {
        return error('Item not found')
      }
    },
  },
]

export default demoMock