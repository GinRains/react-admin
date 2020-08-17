import {
  reqGetSubject,
  reqGetSubjectChild
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_CHILD
} from "./constants";
/**
 * 获取课程列表数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

const getSubjectListChildSync = (list) => ({
  type: GET_SUBJECT_LIST_CHILD,
  data: list
})

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.total;
    });
  };
};

export const getSubjectListChild = parentId => {
  return dispatch => {
    return reqGetSubjectChild(parentId).then(response => {
      dispatch(getSubjectListChildSync(response))
      return response.total
    })
  }
}
