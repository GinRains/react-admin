import {GET_ALL_COURSE} from './constants'

const initCourseInfo = {
  courseList: []
}
export default function reducer (prevState = initCourseInfo, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      const course_arr = action.data.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      })

      return {
        ...prevState,
        courseList: course_arr
      }
    default:
      return prevState
  }
}
