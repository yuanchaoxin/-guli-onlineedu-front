import request from '@/utils/request'

export default{
  // 查询章节和小节
  getChapterVideoList(courseId) {
    return request({
      url: `/eduservice/chapter/getAllChapterTree/${courseId}`,
      method: 'get'
    })
  },
  // 添加章节
  addChapter(chapter) {
    return request({
      url: `/eduservice/chapter/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  // 根据id查询章节
  getChapterById(chapterId) {
    return request({
      url: `/eduservice/chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },
  // 添加章节
  updateChapter(chapter) {
    return request({
      url: `/eduservice/chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/${chapterId}`,
      method: 'delete'
    })
  }
}
