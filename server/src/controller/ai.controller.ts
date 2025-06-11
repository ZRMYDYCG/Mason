import { ZhipuAI } from 'zhipuai-sdk-nodejs-v4'

const apiKey = '9d700a70f0208b56cb0a0664660af421.gApGtUezofH3mLJ7'

class AiController {
  /**
   * 文生文
   */
  async createCompletions(ctx: any) {
    const { messages } = ctx.request.body
    console.log(messages)
    const data: any = await ai.createCompletions({
      model: 'glm-4-flash',
      messages: messages,
      stream: true,
      tools: [
        {
          type: 'web_search',
          web_search: {
            enable: true,
            search_result: true,
          },
        },
      ],
    })
    ctx.status = 200
    // 编译异步可迭代对象返回给前端
    for await (const buffer of data) {
      ctx.res.write(buffer) // 将数据逐个写入到http响应中
    }
    ctx.res.end() // 确保响应结束
  }

  /**
   * 文生图
   */
  async createImages(ctx: any) {
    const { prompt } = ctx.request.body

    if (!prompt) {
      ctx.status = 400 // 设置适当的错误状态码
      ctx.body = { error: '提示不能为空' }
      return
    }

    const imageData: any = await ai.createImages({
      model: 'cogview-3-flash',
      prompt,
    })
    ctx.send({
      url: imageData.data[0].url,
    })
  }
}

const ai = new ZhipuAI({ apiKey })

export default new AiController()
