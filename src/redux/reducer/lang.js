import {SET_LANG} from '../constants/lang'

const initLang = navigator.language.slice(0, 2)
export default function lang(prevState = initLang, action) {
  switch (action.type) {
    case SET_LANG:
      return action.data
    default:
      return prevState
  }
}
