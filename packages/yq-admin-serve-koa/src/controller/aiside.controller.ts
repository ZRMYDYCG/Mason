import type { Context } from 'koa'
import { ZhipuAI } from 'zhipuai-sdk-nodejs-v4'
import { ZHIPU_CONFIG } from '../config/'

const ai = new ZhipuAI({ apiKey: ZHIPU_CONFIG.apiKey })

class AisideController {
  async textConversation(ctx: Context) {
    const { messages } = ctx.request.body as any
    // 测试数据
    // const messages = [
    //   {
    //     role: 'user',
    //     content: '你好',
    //     imageUrl: '',
    //     videoUrlList: [],
    //     fileContentList: [],
    //   },
    // ] as any
    const data = await ai.createCompletions({
      model: 'glm-4-0520',
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
    for await (const buffer of data as any) {
      // 将数据逐个写入到http响应中
      ctx.res.write(buffer)
    }
  }
}

export default new AisideController()
