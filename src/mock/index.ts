import Mock from 'mockjs'
import Visualization from './modules/visualization.ts'
import Dashboard from './modules/dashboard.ts'
import System from './modules/system.ts'

Mock.setup({
  timeout: '300'
})

const mocks = [...Visualization, ...Dashboard, ...System]

export function mockXHR(enableMock: boolean) {
  if (!enableMock) {
    return
  }

  let i: any
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
