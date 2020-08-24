import {GET_ALL_COURSE} from './constants'
import {reqGetAllCourse} from '@api/edu/course'

// 获取所有课程
function getAllCourseListSync (data) {
  return {type: GET_ALL_COURSE, data}
}

export function getAllCourseList() {
  return dispatch => {
    reqGetAllCourse()
      .then(res => {
        dispatch(getAllCourseListSync(res))
      })
  }
}
