import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";

// 获取所有课程列表
export function reqGetChapter(page, limit, courseId) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      courseId
    }
  });
}
