
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FaTimes } from 'react-icons/fa'

import { roundActions } from 'Actions'

class Round extends Component {

  constructor(props) {
    super(props)
  }

  onMemberEditClick(member) {
    console.log(member)
  }

  removeFromParticipants(id) {
    const { dispatch } = this.props
    dispatch(roundActions.removeMember(id))
  }

  pickTeaMaker(participants) {

    const { dispatch } = this.props
    const names = participants.map(p => {
      return p.name
    })
    dispatch(roundActions.pickMaker(names))
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {

    const { participants } = this.props
    
    return (
      <div id="round_wrapper">
        <header className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Participants</h4>
          <Button
            color="success"
            disabled={ participants.length < 1 }
            onClick={ () => this.pickTeaMaker(participants) }
          >
            Pick Tea Maker
          </Button>
        </header>
        <ListGroup>
          {participants.map(p =>
            <ListGroupItem
              className="d-flex justify-content-between align-items-center"
              key={ p._id }
            >
              <span
                className="mr-3"
                onClick={ this.onMemberEditClick }
              >
                { p.name }
              </span>
              <Button
                onClick={ () => this.removeFromParticipants(p._id) }
                color="info"
                size="sm"
              ><FaTimes /></Button>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }
}

Round.propTypes = {
  dispatch: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired
}

export default connect()(Round)
