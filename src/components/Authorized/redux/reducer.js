import {GET_USER_INFO, GET_MENU_LIST} from "./constants"

const initUser = {

}
export default function user(prevState = initUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...prevState,
        ...action.data
      }
    case GET_MENU_LIST:
      return {
        ...prevState,
        ...action.data
      }
    default:
      return prevState
  }
}
