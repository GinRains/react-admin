import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取所有课时列表
export function reqGetLesson(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET"
  });
}
