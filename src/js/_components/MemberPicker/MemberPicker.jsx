
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Alert, Spinner } from 'reactstrap'

import MemberList from './MemberList'
import Round from './Round'

class MemberPicker extends Component {

  constructor(props) {
    super(props)
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {
    
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
      </Fragment>
    )
  }
}

MemberPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  members: PropTypes.object
}

MemberPicker.defaultProps = {
  members: {}
}

function mapStateToProps(state) {
  const { members } = state
  return {
    members: members.list
  }
}

export default connect(mapStateToProps)(MemberPicker)
