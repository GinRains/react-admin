import {GET_ALL_COURSE, GET_CHAPTER_INFO, GET_LESSON_INFO} from './constants'

const initChapterInfo = {
  allChapterList: [],
  chapterInfo: {
    total: 0,
    items: []
  }
}
export default function chapter (prevState = initChapterInfo, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      return {
        ...prevState,
        allChapterList: action.data
      }
    case GET_CHAPTER_INFO:
      action.data.items.forEach(item => {
        item.children = []
      })

      return {
        ...prevState,
        chapterInfo: action.data
      }
    case GET_LESSON_INFO:
      const chapter = [...prevState.chapterInfo.items]
      chapter.forEach(item => {
        if(item._id === action.data.chapterId) {
          item.children = action.data.response
        }
      })

      return {
        ...prevState,
        chapterInfo: {
          total: prevState.chapterInfo.total,
          items: chapter
        }
      }
    default:
      return prevState
  }
}
