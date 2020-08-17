import {
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_CHILD
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
      return action.data;
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
    default:
      return prevState;
  }
}
