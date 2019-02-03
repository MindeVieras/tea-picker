
import { SubmissionError } from 'redux-form'

import { memberActions, uiActions } from 'Actions'
import { memberService } from 'Services'
import { uiConstants } from 'Constants'

function submit(values, dispatch, form) {

  const { member: { _id } } = form

  return memberService.update(_id, values)
    .then(res => {
      const { status, data, errors } = res

      // Response success
      if (status >= 200 && status < 300) {

        dispatch(memberActions.update(data))
          // close member create modal
        dispatch(uiActions.modalClose(uiConstants.MODAL_MEMBER_EDIT))

      }

      // Client errors
      else if (status > 400 && status < 500 && errors) {
        // trow submision errors to redux form fields
        throw new SubmissionError(errors)
      }
    })
}

export default submit
