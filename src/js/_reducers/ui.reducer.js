
import { uiConstants } from 'Constants'

const initialState = {
  modals: {}
}

export function ui(state = initialState, action) {
  switch (action.type) {

  case uiConstants.MODAL_OPEN:
    return {
      ...state,
      modals: {
        ...state.modals,
        [action.modal_id]: true
      }
    }
  case uiConstants.MODAL_CLOSE:
    return {
      ...state,
      modals: {
        ...state.modals,
        [action.modal_id]: false
      }
    }

  default:
    return state
  }
}
