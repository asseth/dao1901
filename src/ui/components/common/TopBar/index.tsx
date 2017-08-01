import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
import styles from './styles.css'

export default class TopBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={() => this.toggle()}/>
          <NavbarBrand
            href="/"
            className={styles['navbar-brand']}
          >
            <img src="static/Dao1901Logo.png" alt="logo" />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className={styles['navbar-nav']} navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/proposal_submission">Proposal Submission</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/vote">Vote</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/admin">Admin</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

TopBar.contextTypes = {
  router: PropTypes.object
}