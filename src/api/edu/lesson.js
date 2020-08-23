import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取所有课时列表
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET"
  });
}

export function reqGetUploadToken() {
  return request({
    url: "/uploadtoken",
    method: "GET"
  })
}

export function reqAddLesson({chapterId, title, free, video}) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      chapterId,
      title,
      free,
      video
    }
  })
}

// 批量删除课时接口
export function reqDelMoreLesson(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList
    }
  })
}
