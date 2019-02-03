
import { SubmissionError } from 'redux-form'

import { memberActions, uiActions } from 'Actions'
import { memberService } from 'Services'
import { uiConstants } from 'Constants'

function submit(values, dispatch, form) {

  return memberService.create(values)
    .then(res => {
      const { status, data, errors } = res
      
      // Response success
      if (status > 200 && status < 300) {
        
        const formId = form.form

        if (formId === 'member_form')
          dispatch(memberActions.create(data))
        else if (formId === 'member_edit_form')
          dispatch(memberActions.update(data))
        
          // close member create modal
        dispatch(uiActions.modalClose(uiConstants.MODAL_MEMBER_CREATE))

      }

      // Client errors
      else if (status > 400 && status < 500 && errors) {
        // trow submision errors to redux form fields
        throw new SubmissionError(errors)
      }
    })
}

export default submit
