import Joi from 'joi'

export const userSearchSchema = Joi.object({
  username: Joi.string().allow('').empty(''),
  pageSize: Joi.number().required(),
  pageNo: Joi.number().required(),
  deptId: Joi.number().allow(null).empty(1)
})

export const userUpdateSchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().required(),
  roleId: Joi.number().required(),
  deptId: Joi.number(), // 默认100
  name: Joi.string().allow('').empty(''),
  email: Joi.string().allow('').empty(''),
  phone: Joi.string().allow('').empty(''),
  remark: Joi.string().allow('').empty('')
})

export const userCreateSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  roleId: Joi.number().required(),
  deptId: Joi.number(),
  name: Joi.string().allow('').empty(''),
  email: Joi.string().allow('').empty(''),
  phone: Joi.string().allow('').empty(''),
  remark: Joi.string().allow('').empty('')
})
