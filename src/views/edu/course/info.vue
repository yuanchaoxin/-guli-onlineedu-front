<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>

        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">

          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>

        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">

        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'ossservice/oss/upload'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>

      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' // 引入组件

export default ({
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        // title: '',
        // subjectId: '', // 二级分类id
        // subjectParentId: '', // 一级分类id
        // teacherId: '',
        // lessonNum: 0,
        // description: '',
        // cover: '/static/01.jpg',
        // price: 0
      },
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
      BASE_API: process.env.BASE_API, // 接口API地址
      courseId: ''
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id

      this.getCourseInfoById()
    } else {
      this.courseInfo = {}
      this.courseInfo = {
        title: '',
        subjectId: '', // 二级分类id
        subjectParentId: '', // 一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg',
        price: 0
      }
      this.getAllSubject()
    }

    // 初始化所有讲师
    this.getTeacherList()
  },
  methods: {
    // 根据id获取课程信息
    getCourseInfoById() {
      course.getCourseInfoById(this.courseId)
        .then(response => {
          this.courseInfo = {}
          this.courseInfo = response.data.courseInfoVo

          console.log('courseInfo :')
          console.log(this.courseInfo.subjectParentId)
          console.log('courseInfo :')
          subject.getSubjectList().then(response => {
            this.subjectOneList = response.data.list
            for (var i = 1; i < this.subjectOneList.length; i++) {
              var subjectOne = this.subjectOneList[i]
              console.log(subjectOne.id)
              console.log('id :')
              console.log(this.courseInfo.subjectParentId)
              if (subjectOne.id === this.courseInfo.subjectParentId) {
                console.log(1234)
                this.subjectTwoList = subjectOne.children
              }
            }
          })
        })
    },
    // 上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    // 上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    subjectLevelOneChanged(value) {
      this.courseInfo.subjectId = ''
      console.log(111)
      for (var i = 0; i < this.subjectOneList.length; i++) {
        var subjectOne = this.subjectOneList[i]
        if (subjectOne.id === value) {
          this.subjectTwoList = subjectOne.children

          break
        }
      }
    },
    getAllSubject() {
      subject.getSubjectList()
        .then(response => {
          this.subjectOneList = response.data.list
        })
    },
    // 保存课程并下一步
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo)
        .then(response => {
          // 成功提示
          this.$message({
            type: 'success',
            message: '添加课程成功'
          })

          // 跳转到下一步
          this.$router.push({ 'path': '/course/chapter/' + response.data.courseId })
        })
    },
    getTeacherList() {
      course.getAllTeacher()
        .then(response => {
          this.teacherList = response.data.items
        })
    }
  }
})
</script>
