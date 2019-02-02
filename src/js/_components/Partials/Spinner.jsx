
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Spinner as BsSpinner } from 'reactstrap'

const Spinner = ({ inline, ...otherProps }) => {

  return (
    <div className={classNames({
      'spinner-wrapper': true,
      'inline': inline
    })}>
      <BsSpinner { ...otherProps } />
    </div>
  )
}

Spinner.propTypes = {
  inline: PropTypes.bool
}

Spinner.defaultProps = {
  inline: false
}

export default Spinner
