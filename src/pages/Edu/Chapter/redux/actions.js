import {GET_ALL_COURSE, GET_CHAPTER_INFO, GET_LESSON_INFO} from "./constants";
import {reqGetCourse} from '@api/edu/course'
import {reqGetChapter} from '@api/edu/chapter'
import {reqGetLesson} from '@api/edu/lesson'

// 获取所有课程
function getAllCourseInfoSync (data) {
  return {type: GET_ALL_COURSE, data}
}

export function getAllCourseInfo() {
  return dispatch => {
    reqGetCourse().then(res => {
      dispatch(getAllCourseInfoSync(res))
    })
  }
}

// 获取课程对应的章节
function getChapterInfoSync (data) {
  return {type: GET_CHAPTER_INFO, data}
}

export function getChapterInfo(page, limit, courseId) {
  return dispatch => {
    reqGetChapter(page, limit, courseId).then(res => {
      dispatch(getChapterInfoSync(res))
    })
  }
}

// 获取章节对应的课时列表
function getLessonInfoSync (data) {
  return {type: GET_LESSON_INFO, data}
}

export function getLessonInfo(chapterId) {
  return dispatch => {
    reqGetLesson(chapterId).then(res => {
      dispatch(getLessonInfoSync({chapterId, res}))
    })
  }
}
