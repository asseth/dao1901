import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Owned from './Owned';
import Members from './Members';
import Votes from './Dao1901Votes/Votes';
import Web3 from './Web3';

export default function App() {
  return (
    <Col xs={10} xsOffset={1} className="m-top-30">
      <Row>
        <Col xs={6} md={4}>
          <Image src="./DAO1901Last.png" alt="logo" responsive />
        </Col>
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
