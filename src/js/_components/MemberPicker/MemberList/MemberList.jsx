
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FaAngleRight } from 'react-icons/fa'

import { uiActions, roundActions } from 'Actions'
import { uiConstants } from 'Constants'
import AddMemberButton from '../AddMemberButton'

import Modal from 'Partials'
import MemberForm from '../MemberForm'

class MemberList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedMember: null,
      participantCount: 1
    }
  }

  onMemberEditClick(member) {
    this.setState({
      selectedMember: member
    })
    this.props.dispatch(uiActions.modalOpen(uiConstants.MODAL_MEMBER_EDIT))
  }

  onMemberDeleteClick(id) {
    console.log(id)
    this.props.dispatch(uiActions.modalClose(uiConstants.MODAL_MEMBER_EDIT))
  }

  addToParticipants(id) {
    this.setState({
      participantCount: this.state.participantCount + 1
    })
    const { dispatch } = this.props

    dispatch(roundActions.addMember(id, this.state.participantCount))
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {
    
    const { members } = this.props
    const { selectedMember } = this.state
    
    return (
      <div id="sidebar_wrapper">
        <header className="mb-3 d-flex align-items-center">
          <h5 className="mb-0 mr-3">Members</h5>
          <AddMemberButton />
        </header>
        <ListGroup id="members_list">
          {members.map(m =>
            <ListGroupItem
              className="d-flex justify-content-between align-items-center"
              key={ m._id }
            >
              <span
                className="member-name mr-3"
                onClick={ () => this.onMemberEditClick(m) }
              >
                { m.name }
              </span>
              <Button
                onClick={ () => this.addToParticipants(m._id) }
                color="info"
                size="sm"
                title="Add member to participants"
              ><FaAngleRight /></Button>
            </ListGroupItem>
          )}
        </ListGroup>
        {selectedMember &&
          <Modal
            modalId={ uiConstants.MODAL_MEMBER_EDIT }
            title={ `Edit "${selectedMember.name}"` }
            size="sm"
            buttons={[
              <Button color="danger" onClick={ () => this.onMemberDeleteClick(selectedMember._id) }>Delete</Button>,
              <Button color="primary" form="member_edit_form">Save</Button>
            ]}
          >
            <MemberForm />
          </Modal>
        }
      </div>
    )
  }
}

MemberList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired
}

export default connect()(MemberList)
