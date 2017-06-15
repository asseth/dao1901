import React, {Component} from 'react'
import {Button, Form, FormControl, Input} from 'reactstrap'
import {checkMembershipWorker} from '../../../../redux/dao/daoSaga'

/**
 * Check membership
 * @returns {XML}
 * @constructor
 */
export default class CheckMembershipForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMember: "",
      memberAddressToCheck: ""
    }
    this.checkMembership = ::this.checkMembership
    this.handleChange = ::this.handleChange
  }

  checkMembership(e) {
    e.preventDefault()
    console.log('isMember', this.state.isMember, this.state.memberAddressToCheck)
    let isMember = checkMembershipWorker(this.state.memberAddressToCheck)
    console.log('isMember',isMember(), this.state.isMember)
  }

  handleChange(event) {
    this.setState({memberAddressToCheck: event.target.value});
  }

  render() {
    return (
      <div>
        <Form>
          <Input
            id="memberAddressToCheck"
            name="memberAddressToCheck"
            onChange={this.handleChange}
            placeholder="Enter an address"
            type="text"
            value={this.state.memberAddressToCheck}
          />
          <Button
            block
            color="primary"
            name="checkMembership"
            onClick={this.checkMembership}
            outline
            size="lg"
            type="submit"
          >
            {'Check Membership'}
          </Button>
          <p>{`isMember: ${this.state.isMember}`}</p>
        </Form>
      </div>
    )
  }
}
