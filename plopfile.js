import pagePrompt from './plop-templates/page/prompt.js'
import componentPrompt from './plop-templates/component/prompt.js'
import storePrompt from './plop-templates/store/prompt.js'

export default function (plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  plop.setGenerator('page', pagePrompt)
  plop.setGenerator('component', componentPrompt)
  plop.setGenerator('store', storePrompt)
}
