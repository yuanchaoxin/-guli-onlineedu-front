import request from '@/utils/request'

export default{
  // 查询课程分类
  getSubjectList(current, size, teacherQuery) {
    return request({
      url: `/eduservice/subject/getAllSubjectTree`,
      method: 'get'
    })
  }
}
