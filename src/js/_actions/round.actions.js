
import { roundConstants } from 'Constants'
import { roundService } from 'Services'

export const roundActions = {
  pickMaker, addMember,
  removeMember, removeAllMembers
}

function pickMaker(participants) {
  return dispatch => {
    dispatch(request())

    roundService.pickMaker({ participants })
      .then(res => {
        console.log(res)
        // dispatch(success(maker))
        dispatch(clearRound())
        // if (res.ack == 'ok') {
        //   dispatch(success(maker))
        //   dispatch(success(maker))
        // } else {
        //   dispatch(failure(id, res.msg))
        //   toastr.error('Error', res.msg, { timeOut: 3000 })
        // }
      })
  }

  function request() { return { type: roundConstants.GET_MAKER_REQUEST } }
  function success(name) { return { type: roundConstants.GET_MAKER_SUCCESS, name } }
  function clearRound() { return { type: roundConstants.REMOVE_ALL_MEMBERS } }
  function failure(error) { return { type: roundConstants.GET_MAKER_FAILURE, error } }
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
