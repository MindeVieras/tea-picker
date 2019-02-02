
import { toastr } from 'react-redux-toastr'

import { memberConstants } from 'Constants'
import { memberService } from 'Services'

export const memberActions = {
  getList, create,
  delete: _delete
}

function getList() {
  return dispatch => {
    dispatch(request())

    memberService.getList()
      .then(res => {
        if (res.status === 200)
          dispatch(success(res.data))
        else
          dispatch(failure(res.message))
      })
  }

  function request() { return { type: memberConstants.GETLIST_REQUEST } }
  function success(members) { return { type: memberConstants.GETLIST_SUCCESS, members } }
  function failure(error) { return { type: memberConstants.GETLIST_FAILURE, error } }
}

function create(member) {
  return dispatch => {
    dispatch(success(member))
  }

  function success(member) { return { type: memberConstants.CREATE, member } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    memberService.delete(id)
      .then(res => {
        if (res.status === 200)
          dispatch(success(id))
        else
          dispatch(failure(id, res.message))
      })
  }

  function request(id) { return { type: memberConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: memberConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: memberConstants.DELETE_FAILURE, id, error } }
}
