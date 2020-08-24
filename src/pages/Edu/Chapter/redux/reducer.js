import {
  GET_ALL_COURSE,
  GET_CHAPTER_INFO,
  GET_LESSON_INFO,
  DELETE_MORE_CHAPTER,
  DELETE_MORE_LESSON} from './constants'

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
    case DELETE_MORE_CHAPTER:
      const chapterIdList = action.idList
      const {total: chap_total, items: chap_items} = {...prevState.chapterInfo}
      chap_items.forEach((item, index) => {
        if(chapterIdList.includes(item._id)) {
          chap_items.splice(index, 1)
        }
      })

      return {
        ...prevState,
        chapterInfo: {
          total: chap_total,
          items: [...chap_items]
        }
      }
    case DELETE_MORE_LESSON:
      const lessonIdList = action.idList
      const {total: less_total, items: less_items} = {...prevState.chapterInfo}
      less_items.forEach(items => {
        items.children = items.children.filter(item => !lessonIdList.includes(item._id))
      })

      return {
        ...prevState,
        chapterInfo: {
          total: less_total,
          items: less_items
        }
      }
    default:
      return prevState
  }
}
