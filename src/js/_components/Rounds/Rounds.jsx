
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  Container, Button, Alert, Badge,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

import { Spinner } from 'Partials'
import { roundActions } from 'Actions'

/**
 * this is main Rounds component
 * @module Rounds
 * 
 */
class Rounds extends Component {

  componentDidMount(){
    const { dispatch, rounds: { items } } = this.props
    
    // try toload rounds from API only if state if empty
    if (!items || items.length === 0)
      dispatch(roundActions.getList())
  }

  onRoundDelete(id) {
    const { dispatch } = this.props
    dispatch(roundActions.delete(id))
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
        
        <h3 className="mb-3">Round history</h3>

        {loading &&
          <Spinner color="dark" />
        }

        {items &&
          <ListGroup>
            {items.map(r =>
              <ListGroupItem
                className="mb-3 shadow-sm rounded"
                key={ r._id }
              >
                {r.deleting &&
                  <Spinner inline color="warning" />
                }
                <ListGroupItemHeading className="d-flex justify-content-between align-items-center mb-3">
                  <span>{ r.makerName }</span>
                  <small>{ moment(r.createdAt).format('DD/MM/YY hh:mmA') }</small>
                </ListGroupItemHeading>
                <ListGroupItemText className="h6">
                  {r.participants.map((p, i) =>
                    <Badge
                      key={ i }
                      className="mr-2 mb-2 p-2"
                      color={ p === r.makerName ? 'success' : 'secondary' }
                    >{ p }</Badge>
                  )}
                </ListGroupItemText>
                <Button
                  onClick={ () => this.onRoundDelete(r._id) }
                  color="danger"
                  size="sm"
                  title="Add member to participants"
                  className="float-right"
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
