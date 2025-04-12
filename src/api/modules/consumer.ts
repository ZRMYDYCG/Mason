/**
 * kafka consumer 相关 API
 */

import http from '../index.ts'

export enum ConsumerApiEnum {
  TOPIC_LIST = '/dipper/monitor/api/v1/kafka_topic/topic_list',
  LIST_GROUP_NAMES = '/dipper/monitor/api/v1/kafka/group_list/list_group_names',
  LIST_GROUP_VIEW = '/dipper/monitor/api/v1/kafka/group_list/list_group_view',
  DYNAMIC_GROUP_VIEW = '/dipper/monitor/api/v1/kafka/group_list/dynamic_group_view',
  GROUP_DETAIL = '/dipper/monitor/api/v1/kafka/group_operator/group_detail',
  REGISTER_GROUP = '/dipper/monitor/api/v1/kafka/group_operator/register_group',
  UNREGISTER_GROUP = '/dipper/monitor/api/v1/kafka/group_operator/unregister_group',
  GROUP_HISTORY = '/dipper/monitor/api/v1/kafka/group_operator/group_history',
  UPDATE_GROUP = '/dipper/monitor/api/v1/kafka/group_operator/update_group'
}

/**
 * 获取所有主题列表
 */
export const getTopicList = () => {
  return http.get(ConsumerApiEnum.TOPIC_LIST)
}

/**
 * 查看所有group名称
 */
export const listGroupNames = () => {
  return http.get(ConsumerApiEnum.LIST_GROUP_NAMES)
}

/**
 * 获取指定主题下的所有消费组列表
 */
export const listGroupsViewApi = (listGroupView: any) => {
  console.info('调用接口查询消费组数据:', listGroupView)
  return http.post(ConsumerApiEnum.LIST_GROUP_VIEW, listGroupView)
}

/**
 * 获取指定消费组的详细信息
 */
export const groupDetailApi = (groupShowReq: any) => {
  console.info('获取指定消费组的详细信息:', groupShowReq)
  return http.post(ConsumerApiEnum.GROUP_DETAIL, groupShowReq)
}

/**
 * 动态查看所有group名称
 */
export const dynamicGroupViewApi = () => {
  return http.get(ConsumerApiEnum.DYNAMIC_GROUP_VIEW)
}

/**
 * 注册 topic 与消费组的关系
 */
export const registerTopicGroup = (groupRegisterEntry: any) => {
  return http.post(ConsumerApiEnum.REGISTER_GROUP, groupRegisterEntry)
}

/**
 * 取消注册 topic 与消费组的关系
 */
export const unRegisterTopicGroupApi = (groupUnRegister: any) => {
  return http.post(ConsumerApiEnum.UNREGISTER_GROUP, groupUnRegister)
}

/**
 * 获取指定消费组的历史信息
 */
export const groupHistoryApi = (groupUnRegister: any) => {
  return http.post(ConsumerApiEnum.GROUP_HISTORY, groupUnRegister)
}

/**
 * 消费组编辑
 */
export const updateTopicGroupApi = (groupUnRegister: any) => {
  return http.post(ConsumerApiEnum.UPDATE_GROUP, groupUnRegister)
}
