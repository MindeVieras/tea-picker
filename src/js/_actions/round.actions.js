
import { memberConstants, roundConstants } from 'Constants'
import { roundService } from 'Services'

export const roundActions = {
  pickMaker,
  addToParticipants,
  removeFromParticipants,
  removeAllParticipants
}

function pickMaker(participants) {
  return dispatch => {
    dispatch(request())

    roundService.pickMaker({ participants })
      .then(res => {
        console.log(res)
        // if (res.ack == 'ok') {
        //   dispatch(success(maker))
        // } else {
        //   dispatch(failure(id, res.msg))
        //   toastr.error('Error', res.msg, { timeOut: 3000 })
        // }
      })
  }

  function request() { return { type: roundConstants.GET_MAKER_REQUEST } }
  function success(name) { return { type: roundConstants.GET_MAKER_SUCCESS, name } }
  function failure(error) { return { type: roundConstants.GET_MAKER_FAILURE, error } }
}

function addToParticipants(id, index = 0) {
  return dispatch => {
    dispatch(add(id, index))
  }

  function add(id, index) { return { type: memberConstants.ADD_TO_PARTICIPANTS, id, index } }
}

function removeFromParticipants(id) {
  return dispatch => {
    dispatch(remove(id))
  }

  function remove(id) { return { type: memberConstants.REMOVE_FROM_PARTICIPANTS, id } }
}

function removeAllParticipants() {
  return dispatch => {
    dispatch(remove())
  }

  function remove() { return { type: memberConstants.REMOVE_ALL_PARTICIPANTS } }
}
