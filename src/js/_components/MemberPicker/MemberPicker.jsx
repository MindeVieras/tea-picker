
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, Col, Alert, Spinner, Button } from 'reactstrap'

import Modal from 'Partials'
import MemberList from './MemberList'
import Round from './Round'
import { uiConstants } from 'Constants'
import { roundActions, uiActions } from 'Actions'

class MemberPicker extends Component {

  constructor(props) {
    super(props)

    this.onTeaPickerModalClose = this.onTeaPickerModalClose.bind(this)
  }

  onTeaPickerModalClose() {
    
    const { dispatch } = this.props
    dispatch(uiActions.modalClose(uiConstants.MODAL_TEA_MAKER))
    dispatch(roundActions.clearMaker())
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {
    
    const { maker } = this.props
    const { loading, items, error } = this.props.members
    let memberListItems, participants

    if (items) {
      memberListItems = items.filter(m => !m.participant)
      participants = items.filter(m => m.participant)
    }

    return (
      <Fragment>
        {loading &&
          <Spinner color="dark" />
        }
        {items &&
          <Row>
            <Col sm="4">
              <MemberList members={ memberListItems } />
            </Col>
            <Col>
              <Round participants={ participants } />
            </Col>
          </Row>
        } 
        {error &&
          <Alert color="danger">{ error }</Alert>
        }

        <Modal
          modalId={ uiConstants.MODAL_TEA_MAKER }
          title="Tea maker"
          size="sm"
          buttons={[<Button color="success" onClick={ this.onTeaPickerModalClose }>Done</Button>]}
          cancelButton={ false }
          onClose={ this.onTeaPickerModalClose }
        >
          <div>
            {maker.makerName &&
              <Fragment>
                <h3>{ maker.makerName }</h3>
                <p><b>Total participants:</b> { maker.participants.length }</p>
                <p><b>Date:</b> { moment(maker.createdAt).format('Do MMMM YYYY') }</p>
                <p><b>Time:</b> { moment(maker.createdAt).format('h:mma') }</p>
              </Fragment>
            }
          </div>
        </Modal>

      </Fragment>
    )
  }
}

MemberPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  members: PropTypes.object,
  maker: PropTypes.object
}

MemberPicker.defaultProps = {
  members: {},
  maker: {}
}

function mapStateToProps(state) {
  const { members, maker } = state
  return { members, maker }
}

export default connect(mapStateToProps)(MemberPicker)
