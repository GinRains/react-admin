import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const MOCK_URL = "http://localhost:8787/admin/edu/subject"

// 获取一级课程分类
export function reqGetSubject(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

// 获取二级课程分类
export function reqGetSubjectChild(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET"
  })
}

// 添加课程
export function reqAddSubject({subjectname: title, parentid: parentId}) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId
    }
  })
}

// 更新课程
export function reqUpdateSubject(id, title) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      id,
      title
    }
  })
}

// 删除课程
export function reqDeleteSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE"
  })
}
