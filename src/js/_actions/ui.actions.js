
import { uiConstants } from 'Constants'

export const uiActions = {
  modalOpen, modalClose
}


/*
 * Ui Modals Open/Close
 * calls modalOpen, modalClose
 */

function modalOpen(modal_id) {
  return dispatch => {
    dispatch(open(modal_id))
  }

  function open(modal_id) { return { type: uiConstants.MODAL_OPEN, modal_id } }
}

function modalClose(modal_id) {
  return dispatch => {
    dispatch(close(modal_id))
  }

  function close(modal_id) { return { type: uiConstants.MODAL_CLOSE, modal_id } }
}
