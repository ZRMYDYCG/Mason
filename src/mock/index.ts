import Mock from 'mockjs'
import Visualization from './modules/visualization.ts'

Mock.setup({
  timeout: '300'
})

const mocks = [...Visualization]

export function mockXHR(enableMock: boolean) {
  if (!enableMock) {
    return
  }

  let i: any
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
