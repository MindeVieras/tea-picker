
import React, { Component } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink
} from 'reactstrap'

/**
 * this is main Header component
 * @module Header
 * 
 */
class Header extends Component {
  
  /**
   * header constructor
   * @param {Object} props props to pass
   */
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    // bind events to this
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  /**   
   * render DOM
   * @private
   * @return {Markup} return HTML
   */
  render() {
    return (
      <Navbar color="light" light expand="sm" fixed="top" className="shadow-sm">
        <NavbarBrand tag={ RouterNavLink } exact to="/">Tea Round Picker</NavbarBrand>
        <NavbarToggler onClick={ this.toggle } />
        <Collapse isOpen={ this.state.isOpen } navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={ RouterNavLink } to="/rounds">Rounds</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Header
