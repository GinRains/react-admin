import {
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_CHILD,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细课程数据
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return {
        ...action.data
      };
    case GET_SUBJECT_LIST_CHILD:
      const items = prevState.items,
        itemsChild = action.data.items
      // 如果二级分类有数据，则添加到item的children属性
      itemsChild.length && items.forEach(item => {
        if(item._id === itemsChild[0].parentId) {
          item.children = itemsChild
        }
      })
      return {
        ...prevState,
      }
    case UPDATE_SUBJECT:
      const {title, id} = action.data
      prevState.items.forEach(item => {
        if(item._id === id) {
          item.title = title
          return void 0
        }

        const items = item.children
        items.forEach(item => {
          if(item._id === id) {
            item.title = title
            return void 0
          }
        })
      })

      return {
        ...prevState
      }
    case DELETE_SUBJECT:
      prevState.items.forEach((item, index) => {
        if(item._id === action.data) {
          prevState.items.splice(index, 1)

          return void 0
        }

        const items = item.children
        items.length && items.forEach((item, index) => {
          if(item._id === action.data) {
            items.splice(index, 1)

            return void 0
          }
        })
      })

      return {
        ...prevState,
        items: [...prevState.items]
      }
    default:
      return prevState;
  }
}
