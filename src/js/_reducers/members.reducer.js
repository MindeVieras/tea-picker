
import { memberConstants, roundConstants } from 'Constants'

const initialState = {
  loading: false,
  items: null,
  error: null
}

export function members(state = initialState, action) {
  switch (action.type) {

  case memberConstants.GETLIST_REQUEST:
    return {
      loading: true
    }
  case memberConstants.GETLIST_SUCCESS:
    return {
      items: action.members
    }
  case memberConstants.GETLIST_FAILURE:
    return {
      error: action.error
    }

  case memberConstants.CREATE:
    return {
      items: [ action.member, ...state.items ]
    }

  case memberConstants.UPDATE:
    return {
      items: state.items.map(m => {
        if (m._id === action.member._id) {
          const { ...mCopy } = m
          return { ...mCopy, ...action.member }
        }
        return m
      })
    }
    
  case memberConstants.DELETE_REQUEST:
    return {
      items: state.items.map(m => m._id === action.id ? { ...m, deleting: true } : m)
    }
  case memberConstants.DELETE_SUCCESS:
    // remove deleted member from state
    return {
      items: state.items.filter(m => m._id !== action.id)
    }
  case memberConstants.DELETE_FAILURE:
    // remove 'deleting:true' property and add 'deleteError:[error]' property to member
    return {
      items: state.items.map(m => {
        if (m._id === action.id) {
          // make copy of member without 'deleting:true' property
          const { deleting, ...mCopy } = m
          // return copy of member with 'deleteError:[error]' property
          return { ...mCopy, deleteError: action.error }
        }

        return m
      })
    }

  case roundConstants.ADD_MEMBER:
    return {
      items: state.items.map(m => {
        if (m._id === action.id) {
          // return member with participant property
          return { ...m, participant: action.index }
        }
        return m
      })
    }

  case roundConstants.REMOVE_MEMBER:
    return {
      items: state.items.map(m => {
        if (m._id === action.id) {
          // make copy of member without participant property
          const { participant, ...mCopy } = m
          // return copy of member
          return { ...mCopy }
        }
        return m
      })
    }
    
  case roundConstants.REMOVE_ALL_MEMBERS:
    return {
      items: state.items.map(m => {
        // make copy of member without participant property
        const { participant, ...mCopy } = m
        // return copy of member
        return { ...mCopy }
      })
    }
      
  default:
    return state
  }
}
