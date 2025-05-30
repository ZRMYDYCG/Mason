import Mock from 'mockjs'

/**
 * @description: 获取路径参数
 */
export function parameteUrl(url: string) {
  let json: any = {}
  if (/\?/.test(url)) {
    let urlString = url.substring(url.indexOf('?') + 1)
    let urlArray = urlString.split('&')
    for (let i = 0; i < urlArray.length; i++) {
      let urlItem = urlArray[i]
      let item = urlItem.split('=')
      // console.log(item);
      json[item[0]] = item[1]
    }
    return json
  }
  return {}
}

/**
 * @description: get请求从config.url获取参数，post从config.body中获取参数
 * */
export function paramObj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * @description: 数组去重
 * */
function ArrSet(Arr: any[], id: string): any[] {
  let obj: any = {}
  return Arr.reduce((setArr, item) => {
    obj[item[id]] ? '' : (obj[item[id]] = true && setArr.push(item))
    return setArr
  }, [])
}
/**
 * @description: min ≤ r ≤ max  随机数
 */
function RandomNumBoth(Min: any, Max: any) {
  let Range = Max - Min
  let Rand = Math.random()
  //四舍五入
  return Min + Math.round(Rand * Range)
}

//左中
export default [
  {
    url: '/bigscreen/countUserNum',
    type: 'get',
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          offlineNum: '@integer(50, 100)',
          alarmNum: '@integer(20, 100)',
          lockNum: '@integer(10, 50)',
          totalNum: 368
        }
      })
      a.data.onlineNum = a.data.totalNum - a.data.offlineNum - a.data.lockNum - a.data.alarmNum
      return a
    }
  },
  {
    url: '/bigscreen/countDeviceNum',
    type: 'get',
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          alarmNum: '@integer(100, 1000)',
          offlineNum: '@integer(0, 50)',
          totalNum: 698
        }
      })
      a.data.onlineNum = a.data.totalNum - a.data.offlineNum
      return a
    }
  },
  //左下
  {
    url: '/bigscreen/leftBottom',
    type: 'get',
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          'list|20': [
            {
              provinceName: '@province()',
              cityName: '@city()',
              countyName: '@county()',
              createTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              deviceId: '6c512d754bbcd6d7cd86abce0e0cac58',
              'gatewayno|+1': 10000,
              'onlineState|1': [0, 1]
            }
          ]
        }
      })
      return a
    }
  },
  //右上
  {
    url: '/bigscreen/alarmNum',
    type: 'get',
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          dateList: ['2021-11', '2021-12', '2022-01', '2022-02', '2022-03', '2022-04'],
          'numList|6': ['@integer(0, 1000)'],
          'numList2|6': ['@integer(0, 1000)']
        }
      })
      return a
    }
  },
  //右中
  {
    url: '/bigscreen/ranking',
    type: 'get',
    response: () => {
      let num = Mock.mock({ 'list|80': [{ value: '@integer(50,1000)', name: '@city()' }] }).list
      //   console.log("ranking",num);
      let newNum: any = [],
        numObj: any = {}
      num.map((item: any) => {
        if (!numObj[item.name] && newNum.length < 8) {
          numObj[item.name] = true
          newNum.push(item)
        }
      })
      let arr = newNum.sort((a: any, b: any) => {
        return b.value - a.value
      })
      let a = {
        success: true,
        data: arr
      }
      return a
    }
  },
  //右下
  {
    url: '/bigscreen/rightBottom',
    type: 'get',
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          'list|40': [
            {
              alertdetail: '@csentence(5,10)',
              'alertname|1': ['水浸告警', '各种报警'],
              alertvalue: '@float(60, 200)',
              createtime: '2022-04-19 08:38:33',
              deviceid: null,
              'gatewayno|+1': 10000,
              phase: 'A1',
              sbInfo: '@csentence(10,18)',
              'terminalno|+1': 100,
              provinceName: '@province()',
              cityName: '@city()',
              countyName: '@county()'
            }
          ]
        }
      })
      return a
    }
  },
  //安装计划
  {
    url: '/bigscreen/installationPlan',
    type: 'get',
    response: () => {
      let num = RandomNumBoth(26, 32)
      const a = Mock.mock({
        ['category|' + num]: ['@city()'],
        ['barData|' + num]: ['@integer(10, 100)']
      })
      let lineData = [],
        rateData = []
      for (let index = 0; index < num; index++) {
        let lineNum = Mock.mock('@integer(0, 100)') + a.barData[index]
        lineData.push(lineNum)
        let rate = a.barData[index] / lineNum
        rateData.push((rate * 100).toFixed(0))
      }
      a.lineData = lineData
      a.rateData = rateData
      return {
        success: true,
        data: a
      }
    }
  },
  {
    url: '/bigscreen/centerMap',
    type: 'get',
    response: (options: any) => {
      let params = parameteUrl(options.url)
      //不是中国的时候
      if (params.regionCode && !['china'].includes(params.regionCode)) {
        const a = Mock.mock({
          success: true,
          data: {
            'dataList|100': [
              {
                name: '@city()',
                value: '@integer(1, 1000)'
              }
            ],
            regionCode: params.regionCode //-代表中国
          }
        })
        return a
      } else {
        const a = Mock.mock({
          success: true,
          data: {
            'dataList|12': [
              {
                name: '@province()',
                value: '@integer(1, 1100)'
              }
            ],
            regionCode: 'china'
          }
        })
        // 去重
        a.data.dataList = ArrSet(a.data.dataList, 'name')
        return a
      }
    }
  }
]
