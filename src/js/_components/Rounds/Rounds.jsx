
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, ListGroup, ListGroupItem, Spinner, Button, Alert } from 'reactstrap'

import { roundActions } from 'Actions'

/**
 * this is main Rounds component
 * @module Rounds
 * 
 */
class Rounds extends Component {

  /**
   * statistics constructor
   * @param {Object} props props to pass
   */
  constructor(props) {
    super(props)

  }

  componentDidMount(){
    const { dispatch, rounds: { items } } = this.props
    
    // try toload rounds from API only if state if empty
    if (!items || items.length === 0)
      dispatch(roundActions.getList())
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {

    const { rounds: { loading, items, error } } = this.props
    return (
      <Container>
        <h3>Round history</h3>
        {loading &&
          <Spinner color="dark" />
        }

        {items &&
          <ListGroup id="rounds_list">
            {items.map(r =>
              <ListGroupItem
                className="d-flex justify-content-between align-items-center"
                key={ r._id }
              >
                <span className="member-name mr-3">
                  { r.makerName }
                </span>
                <Button
                  onClick={ () => this.addToParticipants(r._id) }
                  color="danger"
                  size="sm"
                  title="Add member to participants"
                >Delete</Button>
              </ListGroupItem>
            )}
          </ListGroup>        
        }

        {error &&
          <Alert color="danger">{ error }</Alert>
        }
      </Container>
    )
  }
}

Rounds.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rounds: PropTypes.object
}

Rounds.defaultProps = {
  rounds: {}
}

function mapStateToProps(state) {
  const { rounds } = state
  return { rounds }
}

export default connect(mapStateToProps)(Rounds)
