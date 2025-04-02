import http from '@/api'

/**
 * 左上--设备内总览
 * */
export const countDeviceNum = (param: any = {}) => {
  return http.get<any>('/bigscreen/countDeviceNum', param)
}

/**
 * 左中--用户总览
 * */
export const countUserNum = (param: any = {}) => {
  return http.get<any>('/bigscreen/countUserNum', param)
}

/**
 * 左下--设备提醒
 * */
export const leftBottom = (param: any = {}) => {
  return http.get<any>('/bigscreen/leftBottom', param)
}

/**
 * 中上--地图
 * */
export const centerMap = (param: any = {}) => {
  return http.get<any>('/bigscreen/centerMap', param)
}

/**
 * 中下--安装计划
 * */
export const installationPlan = (param: any = {}) => {
  return http.get<any>('/bigscreen/installationPlan', param)
}

/**
 * 右上--报警次数
 * */
export const alarmNum = (param: any = {}) => {
  return http.get<any>('/bigscreen/alarmNum', param)
}

/**
 * 右中--报警排名
 * */
export const ranking = (param: any = {}) => {
  return http.get<any>('/bigscreen/ranking', param)
}

/**
 * 右下--设备状态
 * */
export const rightBottom = (param: any = {}) => {
  return http.get<any>('/bigscreen/rightBottom', param)
}
