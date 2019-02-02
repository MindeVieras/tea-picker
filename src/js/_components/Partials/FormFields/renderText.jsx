
import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

const renderText = ({ input, label, type, meta: { touched, error, invalid }, ...otherProps }) => (
  <FormGroup>
    {label &&
      <Label>{ label }</Label>
    }
    <Input
      invalid={ invalid }
      type={ type }
      { ...input }
    />

    {error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
)

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
}

renderText.defaultProps = {
  label: null,
  type: 'text',
  meta: {}
}

export default renderText
