import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Col, Image, Row, Well} from 'react-bootstrap';
import Owned from './Owned';
import Members from './Members';
import Votes from './Dao1901Votes/VotesContainer';
import Web3 from './Web3';
export default function App() {
  return (
    <Col xs={10} xsOffset={1} className="m-top-30">
      {/*<Row>
        <Col xs={6} md={4}>
        </Col>
      </Row>*/}

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="./DAO1901Last.png" alt="logo"/>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>

      <Row>
        <Well>
          <p>{`hello ${'adress'}`}</p>
          <p>{`Your balance is: `}</p>
          <p>{`You are connected on: `}</p>
        </Well>
      </Row>

      <Row className="m-top-30">
        <Web3 />
        <hr />
      </Row>

      <Row>
        <Owned />
        <hr />
      </Row>

      <Row>
        <Votes />
        <hr />
      </Row>

      <Row>
        <Members />
      </Row>
    </Col>
  );
}
