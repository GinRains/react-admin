import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";

// 获取所有章节列表
export function reqGetChapterList(page, limit, courseId) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      courseId
    }
  });
}

// 新增章节接口
export function reqAddChapter(courseId, title) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      courseId,
      title
    }
  })
}

// 更新章节接口
export function reqUpdateChapter(chapterId, title) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      chapterId,
      title
    }
  })
}

// 删除章节接口
export function reqDelChapter(chapterId) {
  return request({
    url: `${BASE_URL}/remove/${chapterId}`,
    method: "DELETE"
  })
}

// 批量删除章节接口
export function reqDelMoreChapter(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList
    }
  })
}
