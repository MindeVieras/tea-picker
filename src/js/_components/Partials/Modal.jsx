
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
    const { modalId, dispatch, onClose } = this.props
    
    if (typeof onClose === 'function')
      onClose()
    else
      dispatch(uiActions.modalClose(modalId))
  }

  render() {

    const {
      children, modalId, modals,
      title, size, buttons, cancelButton
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
          {cancelButton && <Button color="secondary" onClick={ this.handleClose }>Cancel</Button>}
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
  onClose: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
  buttons: PropTypes.array,
  cancelButton: PropTypes.bool
}

Modal.defaultProps = {
  onClose: null,
  title: null,
  size: 'sm',
  buttons: [],
  cancelButton: true
}

function mapStateToProps(state) {
  const { modals } = state.ui
  return {
    modals
  }
}

export default connect(mapStateToProps)(Modal)
