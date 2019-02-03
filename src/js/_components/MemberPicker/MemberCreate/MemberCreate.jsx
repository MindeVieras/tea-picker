
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'reactstrap'

import { renderText } from 'Partials'
import submit from './submit'

class MemberCreate extends Component {

  constructor(props) {
    super(props)

  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {
    
    const { handleSubmit } = this.props

    return (
      <Form id="member_form" onSubmit={ handleSubmit(submit) }>
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

MemberCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool
}

MemberCreate.defaultProps = {
  error: null,
  submitting: false
}

MemberCreate = connect()(MemberCreate)

export default reduxForm({
  form: 'member_form',
  initialValues: {
    name: '',
    email: ''
  },
  // validate
})(MemberCreate)
