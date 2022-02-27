import request from '@/utils/request'

export default{
  // 查询课程分类
  getSubjectList() {
    return request({
      url: `/eduservice/subject/getAllSubjectTree`,
      method: 'get'
    })
  }
}
