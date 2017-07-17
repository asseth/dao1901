import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import './styles.css';

export default class TopBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = ::this.handleClick;
    this.toggle = ::this.toggle;
    this.state = {
      isOpen: false
    }
  }

  handleClick(path) {
    //console.log(this.context);
    //console.log('path', path);
    //this.context.router.push(path);
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
          <NavbarToggler right onClick={this.toggle}/>
          <NavbarBrand
            href="/"
            styleName="navbar-brand"
          >
            <img src="images/Dao1901Logo.png" alt="logo" />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav styleName="navbar-nav" navbar>
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
};