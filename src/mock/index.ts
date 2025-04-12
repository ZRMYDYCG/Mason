import Mock from 'mockjs'
import Auth from './modules/auth.ts'

Mock.setup({
  timeout: '300'
})

const mocks = [...Auth]

export function mockXHR(enableMock: boolean) {
  if (!enableMock) {
    return
  }

  let i: any
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
