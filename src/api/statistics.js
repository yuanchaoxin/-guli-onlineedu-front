import request from '@/utils/request'

export default{
  // 生成统计数据
  createStatisticsDailyByDay(day) {
    return request({
      url: '/statisticsservice/statistics/createStatisticsDailyByDay/' + day,
      method: 'post'
    })
  },
  // 获取统计数据
  getStatisticsDailyData(statisticsDailyVo) {
    return request({
      url: '/statisticsservice/statistics/getStatisticsDailyData',
      method: 'post',
      data: statisticsDailyVo
    })
  }
}
