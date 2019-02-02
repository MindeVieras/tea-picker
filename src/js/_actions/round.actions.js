
import { roundConstants } from 'Constants'
import { roundService } from 'Services'

export const roundActions = {
  pickMaker, clearMaker, addMember,
  removeMember, removeAllMembers,
  getList, delete: _delete
}

function pickMaker(participants) {
  return dispatch => {
    dispatch(request())

    roundService.pickMaker({ participants })
      .then(res => {
        if (res.status === 200) {
          dispatch(success(res.data))
          dispatch(addRound(res.data))
          dispatch(clearRound())
        }
        else
          dispatch(failure(res.message))

      })
  }

  function request() { return { type: roundConstants.GET_MAKER_REQUEST } }
  function success(round) { return { type: roundConstants.GET_MAKER_SUCCESS, round } }
  function addRound(round) { return { type: roundConstants.ADD_ROUND, round } }
  function clearRound() { return { type: roundConstants.REMOVE_ALL_MEMBERS } }
  function failure(error) { return { type: roundConstants.GET_MAKER_FAILURE, error } }
}

function clearMaker() {
  return dispatch => {
    dispatch(clear())
  }

  function clear() { return { type: roundConstants.CLEAR_MAKER } }
}

function addMember(id, index = 0) {
  return dispatch => {
    dispatch(add(id, index))
  }

  function add(id, index) { return { type: roundConstants.ADD_MEMBER, id, index } }
}

function removeMember(id) {
  return dispatch => {
    dispatch(remove(id))
  }

  function remove(id) { return { type: roundConstants.REMOVE_MEMBER, id } }
}

function removeAllMembers() {
  return dispatch => {
    dispatch(remove())
  }

  function remove() { return { type: roundConstants.REMOVE_ALL_MEMBERS } }
}

function getList() {
  return dispatch => {
    dispatch(request())

    roundService.getList()
      .then(res => {
        if (res.status === 200)
          dispatch(success(res.data))
        else
          dispatch(failure(res.message))
      })
  }

  function request() { return { type: roundConstants.GETLIST_REQUEST } }
  function success(rounds) { return { type: roundConstants.GETLIST_SUCCESS, rounds } }
  function failure(error) { return { type: roundConstants.GETLIST_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    roundService.delete(id)
      .then(res => {
        if (res.status === 200)
          dispatch(success(id))
        else
          dispatch(failure(id, res.message))
      })
  }

  function request(id) { return { type: roundConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: roundConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: roundConstants.DELETE_FAILURE, id, error } }
}
