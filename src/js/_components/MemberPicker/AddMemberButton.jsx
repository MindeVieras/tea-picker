
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { FaPlus } from 'react-icons/fa'

import { Modal } from 'Partials'
import { MemberForm } from './MemberForm'

import { uiConstants } from 'Constants'
import { uiActions } from 'Actions'

class AddMemberButton extends Component {

  constructor(props) {
    super(props)

    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.props.dispatch(uiActions.modalOpen(uiConstants.MODAL_MEMBER_CREATE))
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {

    return (
      <Fragment>

        <Button
          onClick={ this.openModal }
          color="success"
          size="sm"
          title="Add new member"
        ><FaPlus /></Button>

        <Modal
          modalId={ uiConstants.MODAL_MEMBER_CREATE }
          title="Add new member"
          size="sm"
          buttons={[<Button color="primary" form="member_form">Save</Button>]}
        >
          <MemberForm />
        </Modal>

      </Fragment>
    )
  }
}

AddMemberButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AddMemberButton)
