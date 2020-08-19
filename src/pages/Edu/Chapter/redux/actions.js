import {reqGetAllCourse} from '@api/edu/course'
import {reqGetChapterList} from '@api/edu/chapter'
import {reqGetLessonList} from '@api/edu/lesson'
import {GET_ALL_COURSE, GET_CHAPTER_INFO, GET_LESSON_INFO} from './constants'

// 获取所有课程列表
function getAllCourseSync (data) {
  return {type: GET_ALL_COURSE, data}
}

export function getAllCourse() {
  return dispatch => {
    reqGetAllCourse().then(response => {
      dispatch(getAllCourseSync(response))
    })
  }
}

// 获取当前页章节列表
function getChapterInfoSync (data) {
  return {type: GET_CHAPTER_INFO, data}
}

export function getChapterInfo(page, limit, courseId) {
  return dispatch => {
    reqGetChapterList(page, limit, courseId).then(response => {
      dispatch(getChapterInfoSync(response))
    })
  }
}

// 获取当前章节课时列表
function getLessonInfoSync (data) {
  return {type: GET_LESSON_INFO, data}
}

export function getLessonInfo(chapterId) {
  return dispatch => {
    reqGetLessonList(chapterId).then(response => {
      dispatch(getLessonInfoSync({response, chapterId}))
    })
  }
}
