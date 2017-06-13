import React from 'react';
import PropTypes from 'prop-types';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import './styles.scss';

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
            href="/"><img src="images/DAO1901Last.png" alt="logo" className="" /></NavbarBrand> {/*<img src="images/DAO1901Last.png" alt="logo" className="" />*/}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/proposal_submission">Proposal Submission</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/vote">Vote</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin">Admin</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
/*
 TopBar.contextTypes = {
 router: PropTypes.object.isRequired
 };
 */