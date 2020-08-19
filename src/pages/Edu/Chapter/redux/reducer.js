import {GET_ALL_COURSE, GET_CHAPTER_INFO, GET_LESSON_INFO} from "./constants";

const initChapter = {
  courseList: [],
  chapterInfo: {}
}
export default function chapter(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      prevState.courseList = action.data
      return {
        ...prevState
      }
    case GET_CHAPTER_INFO:
      prevState.chapterInfo = action.data
      prevState.chapterInfo.items.forEach(item => {
        item.children = []
      })

      return {
        ...prevState
      }
    case GET_LESSON_INFO:
      const newChapterList = [...prevState.chapterInfo.items]
      newChapterList.forEach(item => {
        if(item._id === action.data.chapterId) {
          item.children = action.data.res
        }
      })
      return {
        ...prevState,
        chapterInfo: {
          total: prevState.chapterInfo.total,
          items: newChapterList
        }
      }
    default:
      return prevState
  }
}
