import {getInfo, getMenu} from '@api/acl/login'
import {GET_USER_INFO, GET_MENU_LIST} from "./constants"

// 获取用户信息
function getUserInfoSync(data) {
  return {type: GET_USER_INFO, data}
}

export function getUserInfo() {
  return dispatch => {
    return getInfo().then(res => {
      dispatch(getUserInfoSync(res))
    })
  }
}

// 获取菜单权限信息
function getMenuListSync(data) {
  return {type: GET_MENU_LIST, data}
}

export function getMenuList() {
  return dispatch => {
    return getMenu().then(res => {
      dispatch(getMenuListSync(res))
    })
  }
}
