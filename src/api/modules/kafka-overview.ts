/**
 * kafka overview
 */

import http from '../index.ts'

enum KafkaOverviewApiEnum {
  KAFKA_RUNTIME_INFO = '/dipper/monitor/api/v1/kafka_view/kafka_time',
  KAFKA_STAT = '/dipper/monitor/api/v1/kafka_view/kafka_stat',
  NODE_STABILIZE = '/dipper/monitor/api/v1/kafka_view/node_stabilize',
  TOPIC_TOP10 = '/dipper/monitor/api/v1/kafka_view/topic_top10',
  KAFKA_CONNECTIVITY = '/dipper/monitor/api/v1/kafka_view/kafka_connectivity',
  ZK_CONNECTIVITY = '/dipper/monitor/api/v1/kafka_view/zk_connectivity',
  BROKER_NAME_LIST = '/dipper/monitor/api/v1/kafka/broker/brokerNameList',
  NODE_INFORMATION = '/dipper/monitor/api/v1/kafka_view/node_information',
  EXECUTE_ZK_CLI_API = '/dipper/monitor/api/v1/kafka_view/executeZkCliApi',
  UPDATE_BROKER_CONFIG = '/dipper/monitor/api/v1/kafka/broker/updateBrokerConfig'
}

/**
 * 获取Kafka集群运行时信息
 */
export const getKafkaRuntimeInfo = () => {
  return http.get(KafkaOverviewApiEnum.KAFKA_RUNTIME_INFO)
}

/**
 * Kafka节点统计
 */
export const kafkaStat = () => {
  return http.get(KafkaOverviewApiEnum.KAFKA_STAT)
}

/**
 * 集群节点状态
 */
export const nodeStabilize = () => {
  return http.get(KafkaOverviewApiEnum.NODE_STABILIZE)
}

/**
 * Topic Top10 统计
 */
export const topicTop10 = () => {
  return http.get(KafkaOverviewApiEnum.TOPIC_TOP10)
}

/**
 * Kafka节点连通性校验
 */
export const kafkaConnectivity = (pageInfo: any) => {
  console.info('kafka节点连通性校验:', pageInfo)
  return http.post(KafkaOverviewApiEnum.KAFKA_CONNECTIVITY, pageInfo)
}

/**
 * ZK节点连通性
 */
export const zkConnectivity = () => {
  return http.get(KafkaOverviewApiEnum.ZK_CONNECTIVITY)
}

/**
 * 获取Kafka Broker列表信息
 */
export const brokerNameList = () => {
  return http.get(KafkaOverviewApiEnum.BROKER_NAME_LIST)
}

/**
 * 获取节点的简要信息
 */
export const nodeInformation = (pageInfo: any) => {
  return http.post(KafkaOverviewApiEnum.NODE_INFORMATION, pageInfo)
}

/**
 * 模拟执行zkCli.sh命令
 */
export const executeZkCliApi = (zkNode: any) => {
  return http.post(KafkaOverviewApiEnum.EXECUTE_ZK_CLI_API, zkNode)
}

/**
 * 更新broker单个节点配置信息
 */
export const updateBrokerConfigApi = (brokerConfReq: any) => {
  return http.post(KafkaOverviewApiEnum.UPDATE_BROKER_CONFIG, brokerConfReq)
}
