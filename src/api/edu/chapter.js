import request from '@/utils/request'

export default{
  // 查询章节和小节
  getChapterVideoList(courseId) {
    return request({
      url: `/eduservice/chapter/getAllChapterTree/${courseId}`,
      method: 'get'
    })
  }
}
