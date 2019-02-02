
import { roundConstants } from 'Constants'

const initialState = {
  loading: false,
  name: null,
  error: null
}

export function maker(state = initialState, action) {
  switch (action.type) {

  case roundConstants.GET_MAKER_REQUEST:
    return {
      loading: true
    }
  case roundConstants.GET_MAKER_SUCCESS:
    return {
      name: action.name
    }
  case roundConstants.GET_MAKER_FAILURE:
    return {
      error: action.error
    }
      
  default:
    return state
  }
}
