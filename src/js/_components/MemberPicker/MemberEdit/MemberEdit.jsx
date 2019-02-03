
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'reactstrap'

import { renderText } from 'Partials'
import submit from './submit'

class MemberEdit extends Component {

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

MemberEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  member: PropTypes.object
}

MemberEdit.defaultProps = {
  error: null,
  submitting: false,
  member: null
}

MemberEdit = connect()(MemberEdit)

export default reduxForm({
  form: 'member_edit_form'
  // validate
})(MemberEdit)
