
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import Header from './_components/Partials/Header'
import MemberPicker from './_components/MemberPicker'
import Rounds from './_components/Rounds'
import Error404 from './_components/404'

import { history } from 'Helpers'
import { memberActions } from 'Actions'

/**
 * this is main App component
 * @module App
 * 
 */
class App extends Component {
  
  /**
   * constructor description
   * @param {Object} props props to pass
   */
  constructor(props) {
    super(props)

    // Get all members
    props.dispatch(memberActions.getList())
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {

    return (
      <Router history={ history }>
        <Fragment>
          <Header />
          <Container fluid className="pt-3 pb-3" id="main-wrapper">
            <Switch>
              <Route exact path="/" component={ MemberPicker } />
              <Route path="/rounds" component={ Rounds } />
              <Route component={ Error404 } />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(App)
