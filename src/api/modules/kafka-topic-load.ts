import http from '../index.ts'

enum TopicListApiEnum {
  TOPIC_LIST = '/dipper/monitor/api/v1/kafka_topic/topic_list'
}
/**
 * 获取所有主题列表
 */
export const getTopicListApi = () => {
  return http.get(TopicListApiEnum.TOPIC_LIST)
}

/**
 * 获取指定主题jxm信息
 * @param topicNames
 * @returns
 */
export const topicsLoadJmxApi = (params: { topicNames: string }) => {
  return http.get('/dipper/monitor/api/v1/topic_load/topicsLoadJmx', params)
}

/**
 * 获取指定主题获取某个topic的jxm监控历史信息信息
 */
export const oneTopicChartInfoApi = (oneTopicChartReq: any) => {
  return http.post('/dipper/monitor/api/v1/topic_load/oneTopicChartInfo', oneTopicChartReq)
}
