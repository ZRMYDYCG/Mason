/**
 * kafka 集群列表相关
 */

import http from '../index.ts'

enum KafkaApiEnum {
  GET_ALL_CLUSTER = '/dipper/monitor/api/v1/kafka_manager/getAllCluster',
  REGISTER_CLUSTER = '/dipper/monitor/api/v1/kafka_manager/registerCluster',
  SET_CURRENT_CLUSTER = '/dipper/monitor/api/v1/kafka_manager/setCurrentCluster',
  DELETE_CLUSTER = '/dipper/monitor/api/v1/kafka_manager/deleteCluster',
  UPDATE_CLUSTER = '/dipper/monitor/api/v1/kafka_manager/updateCluster',
  ZOOKEEPER_CLUSTER_VIEW = '/dipper/monitor/api/v1/kafka/broker/zookeeper_list'
}

/**
 * 获取所有Kafka集群列表
 */
export const getAllKafkaCluster = () => {
  return http.get(KafkaApiEnum.GET_ALL_CLUSTER)
}

/**
 * 注册集群
 */
export const registerCluster = (clusterData: any) => {
  return http.post(KafkaApiEnum.REGISTER_CLUSTER, clusterData)
}

/**
 * 设置当前集群
 */
export const setCurrentCluster = (clusterData: any) => {
  return http.post(KafkaApiEnum.SET_CURRENT_CLUSTER, clusterData)
}

/**
 * 删除集群
 */
export const deleteCluster = (clusterData: any) => {
  return http.post(KafkaApiEnum.DELETE_CLUSTER, clusterData)
}

/**
 * 编辑集群
 */
export const updateCluster = (clusterData: any) => {
  return http.post(KafkaApiEnum.UPDATE_CLUSTER, clusterData)
}

/**
 * 获取Zookeeper集群视图信息
 */
export const getZookeeperClusterView = () => {
  return http.get(KafkaApiEnum.ZOOKEEPER_CLUSTER_VIEW)
}
