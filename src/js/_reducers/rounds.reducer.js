
import { roundConstants } from 'Constants'

const initialState = {
  items: []
}

export function rounds(state = initialState, action) {
  switch (action.type) {

  case roundConstants.GETLIST_REQUEST:
    return {
      loading: true
    }
  case roundConstants.GETLIST_SUCCESS:
    return {
      items: action.rounds
    }
  case roundConstants.GETLIST_FAILURE:
    return {
      error: action.error
    }

  case roundConstants.ADD_ROUND:
    return {
      items: [ action.round, ...state.items ]
    }
    
  case roundConstants.DELETE_REQUEST:
    return {
      items: state.items.map(r => r._id === action.id ? { ...r, deleting: true } : r)
    }
  case roundConstants.DELETE_SUCCESS:
    // remove deleted round from state
    return {
      items: state.items.filter(r => r._id !== action.id)
    }
  case roundConstants.DELETE_FAILURE:
    // remove 'deleting:true' property and add 'deleteError:[error]' property to round
    return {
      items: state.items.map(r => {
        if (r._id === action.id) {
          // make copy of round without 'deleting:true' property
          const { deleting, ...rCopy } = r
          // return copy of round with 'deleteError:[error]' property
          return { ...rCopy, deleteError: action.error }
        }

        return r
      })
    }
      
  default:
    return state
  }
}
