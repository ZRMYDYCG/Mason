/**
 * kafka 节点负载
 */

import http from '../index.ts'

enum KafkaHostLoadApiEnum {
  BROKER_NAME_LIST = '/dipper/monitor/api/v1/kafka/broker/brokerNameList',
  ONE_NODE_REAL_INFO = '/dipper/monitor/api/v1/node_load/one_node_real_info',
  ONE_NODE_CHART_HISTORY = '/dipper/monitor/api/v1/node_load/oneNodeChartHistoryInfo'
}

/**
 * 获取Kafka Broker列表信息
 */
export const brokerNameList = () => {
  return http.get(KafkaHostLoadApiEnum.BROKER_NAME_LIST)
}

/**
 * 获取节点的简要信息
 */
export const oneNodeRealInfoApi = (oneNodeInfoReq: any) => {
  return http.post(KafkaHostLoadApiEnum.ONE_NODE_REAL_INFO, oneNodeInfoReq)
}

/**
 * 获取某个节点的jxm监控历史信息
 */
export const oneNodeChartHistoryInfoApi = (oneNodeChartReq: any) => {
  return http.post(KafkaHostLoadApiEnum.ONE_NODE_CHART_HISTORY, oneNodeChartReq)
}
