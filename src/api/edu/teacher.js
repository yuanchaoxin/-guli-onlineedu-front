import request from '@/utils/request'

export default{
  // 分页条件查询讲师
  getTeacherListPage(current, size, teacherQuery) {
    return request({
      url: `/eduservice/eduteacher/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
  // 根据id删除讲师
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/eduteacher/delete/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher(teacher) {
    return request({
      url: `/eduservice/eduteacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 获取讲师信息
  getTeacherInfoById(id) {
    return request({
      url: `/eduservice/eduteacher/get/${id}`,
      method: 'get'
    })
  },
  // 更新讲师
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/eduteacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }

}
