
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal as BsModal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import { uiActions } from 'Actions'

class Modal extends Component {

  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    const { modalId, dispatch } = this.props
    dispatch(uiActions.modalClose(modalId))
  }

  render() {

    const {
      children, modalId, modals,
      title, size, buttons
    } = this.props

    let isOpen = false

    Object.keys(modals).map(key => {
      if (key === modalId) {
        isOpen = modals[modalId]
      }
    })
    
    return (
      <BsModal size={ size } isOpen={ isOpen } toggle={ this.handleClose }>
        {title &&
          <ModalHeader toggle={ this.handleClose }>{ title }</ModalHeader>
        }
        <ModalBody>
          { children }
        </ModalBody>
        <ModalFooter>
          {buttons.map((b, i) => <Fragment key={ i }>{ b }</Fragment> )}
          <Button color="secondary" onClick={ this.handleClose }>Cancel</Button>
        </ModalFooter>
      </BsModal>
    )
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalId: PropTypes.string.isRequired,
  modals: PropTypes.object.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  buttons: PropTypes.array
}

Modal.defaultProps = {
  title: null,
  size: 'sm',
  buttons: []
}

function mapStateToProps(state) {
  const { modals } = state.ui
  return {
    modals
  }
}

export default connect(mapStateToProps)(Modal)
