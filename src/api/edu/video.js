import request from '@/utils/request'

export default{
  // 添加小节
  addVideo(video) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data: video
    })
  },
  // 根据id查询小节
  getVideoById(videoId) {
    return request({
      url: `/eduservice/video/getVideoInfo/${videoId}`,
      method: 'get'
    })
  },
  // 添加小节
  updateVideo(video) {
    return request({
      url: `/eduservice/video/updateVideo`,
      method: 'post',
      data: video
    })
  },
  deleteVideo(videoId) {
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'delete'
    })
  },
  deleteAliyunvod(videoId) {
    return request({
      url: `/vodservice/video/deleteAliyunVideoById/${videoId}`,
      method: 'delete'
    })
  }
}
