
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'reactstrap'
import { FaAngleRight } from 'react-icons/fa'

import { memberActions } from 'Actions'

import { renderText } from 'Partials'
import submit from './submit'

class MemberEditForm extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount () {

    // Set initial form values
    const { initialize, member: { name, email } } = this.props
    initialize({ name, email })
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {
    
    const { handleSubmit } = this.props

    return (
      <Form id="member_edit_form" onSubmit={ handleSubmit(submit) }>
        <Field
          name="name"
          component={ renderText }
          label="Member name"
        />
        <Field
          name="email"
          type="text"
          component={ renderText }
          label="Member email"
        />
      </Form>
    )
  }
}

MemberEditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  member: PropTypes.object
}

MemberEditForm.defaultProps = {
  error: null,
  submitting: false,
  member: null
}

MemberEditForm = connect()(MemberEditForm)

export default reduxForm({
  form: 'member_edit_form'
  // validate
})(MemberEditForm)