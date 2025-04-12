/**
 * kafka topic 相关
 */

import http from '../index.ts'

enum TopicListApiEnum {
  TOPIC_LIST = '/dipper/monitor/api/v1/kafka_topic/topic_list',
  TOPIC_STAT = '/dipper/monitor/api/v1/kafka_topic/topic_stat',
  CREATE_TOPIC = '/dipper/monitor/api/v1/kafka_operator/create_topic',
  TOPIC_LIST_PAGE = '/dipper/monitor/api/v1/kafka_topic/topic_list_page',
  TOPICS_LIST = '/dipper/monitor/api/v1/kafka_topic/topics_list',
  TOPICS_APPOINT_DETAIL = '/dipper/monitor/api/v1/kafka_operator/topics_appoint_detail',
  SHOW_LATEST_DATA = '/dipper/monitor/api/v1/kafka/topic_data/show_latest_data',
  SHOW_RANGE_TIME_DATA = '/dipper/monitor/api/v1/kafka/topic_data/show_range_time_data',
  SHOW_RANGE_OFFSET_DATA = '/dipper/monitor/api/v1/kafka/topic_data/show_range_offset_data',
  PRODUCER_DATA = '/dipper/monitor/api/v1/kafka_producer/producer_data',
  REBUILD_TOPIC = '/dipper/monitor/api/v1/topic_rebuild/rebuild_topic',
  TOPIC_DILATATION = '/dipper/monitor/api/v1/kafka_operator/topic_dilatation',
  TOPIC_DELETE = '/dipper/monitor/api/v1/kafka_operator/topic_delete',
  TOPIC_REAL_TIME_NUM = '/dipper/monitor/api/v1/kafka/topic_data/topic_real_time_num',
  TOPICLOG_NUM_HISTORY = '/dipper/monitor/api/v1/kafka/topic_data/topicLogNumHistory'
}

/**
 * 获取所有主题列表
 */
export const getTopicList = () => {
  return http.get(TopicListApiEnum.TOPIC_LIST)
}

/**
 * 获取topic总数和消费组总数
 */
export const getTopicStat = () => {
  return http.get(TopicListApiEnum.TOPIC_STAT)
}

/**
 * 创建新主题
 */
export const createTopic = (kafkaCreateTopicReq: any) => {
  return http.post(TopicListApiEnum.CREATE_TOPIC, kafkaCreateTopicReq)
}

/**
 * 分页获取主题列表
 */
export const topicListPage = (pageInfo: any) => {
  console.info('topic列表参数:', pageInfo)
  return http.post(TopicListApiEnum.TOPIC_LIST_PAGE, pageInfo)
}

/**
 * 获取指定主题详情
 */
export const topicsList = (topicNames: any) => {
  return http.get(TopicListApiEnum.TOPICS_LIST, topicNames)
}

/**
 * 获取指定主题详情
 */
export const topicsAppointDetail = (params: { topicName: string }) => {
  console.info('获取topic详情:', params)
  return http.get(TopicListApiEnum.TOPICS_APPOINT_DETAIL, params)
}

/**
 * 获取指定主题的日志信息
 */
export const showLatestData = (kafkaShowLatestDataReq: any) => {
  // 直接在这里设置你需要的超时时间（例如：5000 毫秒）
  return http.post(TopicListApiEnum.SHOW_LATEST_DATA, kafkaShowLatestDataReq)
}

/**
 * 获取指定时间范围主题的日志信息
 */
export const showRangeTimeData = (showRangeTimeDataReq: any) => {
  return http.post(TopicListApiEnum.SHOW_RANGE_TIME_DATA, showRangeTimeDataReq)
}

/**
 * 获取指定offset范围主题的日志信息
 */
export const showRangeOffsetData = (showRangeOffsetDataReq: any) => {
  return http.post(TopicListApiEnum.SHOW_RANGE_OFFSET_DATA, showRangeOffsetDataReq)
}

/**
 * 往指定主题中发送数据
 */
export const producerDataApi = (kafkaProducerDataRequest: any) => {
  return http.post(TopicListApiEnum.PRODUCER_DATA, kafkaProducerDataRequest)
}

/**
 * 重建主题
 */
export const rebuildTopicApi = (kafkaCreateTopicReq: any) => {
  return http.post(TopicListApiEnum.REBUILD_TOPIC, kafkaCreateTopicReq)
}

/**
 * 主题扩容
 */
export const topicDilatationApi = (topicDilatationReq: any) => {
  return http.post(TopicListApiEnum.TOPIC_DILATATION, topicDilatationReq)
}

/**
 * 删除主题
 */
export const deleteTopicApi = (params: { topicName: string }) => {
  return http.get(TopicListApiEnum.TOPIC_DELETE, params)
}

/**
 * 数据实时统计
 */
export const topicRealTimeNumApi = (topicRealTimeNumReq: any) => {
  return http.post(TopicListApiEnum.TOPIC_REAL_TIME_NUM, topicRealTimeNumReq)
}

/**
 * 数据实时统计
 */
export const topicLogNumHistoryApi = (topicLogNumHistoryReq: any) => {
  return http.post(TopicListApiEnum.TOPICLOG_NUM_HISTORY, topicLogNumHistoryReq)
}

/**
 * 获取模块能关联到的任务列表
 */
export const fetchModelMonitorOptionsApi = (modelTaskRelationReq: any) => {
  return http.post(
    '/dipper/monitor/api/v1/module_task/fetchModelMonitorOptions',
    modelTaskRelationReq
  )
}

/**
 * 监控关联，关联到指定的任务
 */
export const updateTopicOptionsApi = (updateModuleTaskRelation: any) => {
  return http.post(
    '/dipper/monitor/api/v1/module_task/updateTopicOptions',
    updateModuleTaskRelation
  )
}
