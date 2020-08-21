import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取所有课时列表
export function reqGetLesson(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET"
  });
}

// 获取七牛云上传token
export function reqGetVideoToken() {
  return request({
    url: "/uploadtoken",
    method: "GET"
  })
}

// 新增课时
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
