import {
  reqGetSubject,
  reqGetSubjectChild,
  reqUpdateSubject,
  reqDeleteSubject
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_CHILD,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from "./constants";

// 获取一级课程列表
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return {code: 200};
    });
  };
};

// 获取二级课程列表
const getSubjectListChildSync = (list) => ({
  type: GET_SUBJECT_LIST_CHILD,
  data: list
})

export const getSubjectListChild = parentId => {
  return dispatch => {
    return reqGetSubjectChild(parentId).then(response => {
      dispatch(getSubjectListChildSync(response))
      return response.total
    })
  }
}

// 更新课程分类数据，发送请求让redux存储最新的数据
const updateSubjectSync = data => ({
  type: UPDATE_SUBJECT,
  data
})

export const updateSubject = (id, title) => {
  return dispatch => {
    return reqUpdateSubject(id, title).then(response => {
      dispatch(updateSubjectSync({id, title}))
      return {code: 200}
    })
  }
}

// 删除课程分类数据
const deleteSubjectSync = data => ({
  type: DELETE_SUBJECT,
  data
})

export const deleteSubject = (id) => {
  return dispatch => {
    return reqDeleteSubject(id).then(response => {
      dispatch(deleteSubjectSync(id))
      return {code: 200}
    })
  }
}
