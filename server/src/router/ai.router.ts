import Router from 'koa-router'
import aiController from '../controller/ai.controller'

const aiRouter = new Router({ prefix: '/ai' })

/**
 * 文生文
 * */
aiRouter.post('/create-completions', aiController.createCompletions)

/**
 * 文生图
 * */
aiRouter.post('/create-image', aiController.createImages)

export default aiRouter
