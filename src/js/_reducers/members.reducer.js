
import { memberConstants } from 'Constants'

const initialState = {
  selected_user: {
    loading: false,
    err: false,
    user: {}
  },
  list: {}
}

export function members(state = initialState, action) {
  switch (action.type) {

  case memberConstants.GETLIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case memberConstants.GETLIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.members
      }
    }
  case memberConstants.GETLIST_FAILURE:
    return {
      ...state,
      list: {
        error: action.error
      }
    }

  case memberConstants.CREATE:
    return {
      ...state,
      list: {
        ...state.list,
        items: [ action.member, ...state.list.items ]
      }
    }

  case memberConstants.DELETE_REQUEST:
    // add 'deleting:true' property to user being deleted
    return {
      ...state,
      list: {
        items:
          state.list.items.map(user =>
            user.id === action.id
              ? { ...user, deleting: true }
              : user

          )
      }
    }
  case memberConstants.DELETE_SUCCESS:
    // remove deleted user from state
    return {
      ...state,
      list: {
        items: state.list.items.filter(user => user.id !== action.id)
      }
    }
  case memberConstants.DELETE_FAILURE:
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    return {
      ...state,
      list: {
        items: state.list.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error }
          }

          return user
        })
      }
    }

  case memberConstants.ADD_TO_PARTICIPANTS:
    return {
      ...state,
      list: {
        items: state.list.items.map(member => {
          if (member._id === action.id) {
            // return member with participant property
            return { ...member, participant: action.index }
          }
          return member
        })
      }
    }

  case memberConstants.REMOVE_FROM_PARTICIPANTS:
    return {
      ...state,
      list: {
        items: state.list.items.map(member => {
          if (member._id === action.id) {
            // make copy of member without participant property
            const { participant, ...memberCopy } = member
            // return copy of member
            return { ...memberCopy }
          }
          return member
        })
      }
    }
    
  case memberConstants.REMOVE_ALL_PARTICIPANTS:
    return {
      ...state,
      list: {
        items: state.list.items.map(member => {
          // make copy of member without participant property
          const { participant, ...memberCopy } = member
          // return copy of member
          return { ...memberCopy }
        })
      }
    }
      
  default:
    return state
  }
}
