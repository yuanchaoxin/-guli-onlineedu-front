import request from '@/utils/request'

export default{
  // 添加课程信息
  addCourseInfo(courseInfoVo) {
    return request({
      url: `/eduservice/course/addCourse`,
      method: 'post',
      data: courseInfoVo
    })
  },
  // 获取所有讲师
  getAllTeacher() {
    return request({
      url: `/eduservice/eduteacher/findAll`,
      method: 'get'
    })
  },
  // 根据id获取课程信息
  getCourseInfoById(courseId) {
    return request({
      url: `/eduservice/course/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  // 更新课程信息
  updateCourseInfoById(courseInfoVo) {
    return request({
      url: `/eduservice/course/updateCourse`,
      method: 'post',
      data: courseInfoVo
    })
  }
}
