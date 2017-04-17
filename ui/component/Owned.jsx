import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class OwnedComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      balance: '',
      newOwner: ''
    };
    this.changeOwner = ::this.changeOwner;
  }

  componentWillMount() {
    Owned.owner()
      .then((address) => this.setState({owner: address}))
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        // Get owner (msg.sender) balance
        if (this.state.owner !== '0x') {
          web3.eth.getBalance(this.state.owner, (e, r) => {
            this.setState({balance: !e ? web3.fromWei(r, "ether").toString() : e.message})
          })
        }
      })
  }

  changeOwner() {
    console.log('this.state.newOwner', this.state.newOwner, 'this.state.owner', this.state.owner);
    Owned.changeOwner.sendTransaction(this.state.newOwner, {from: this.state.owner, gas: 200000})
      .then((e, r) => console.log(e, r))
      .catch((e) => {throw new Error(e)})
  }

  handleChangeChangeOwner(event) {
    const value = event.target.value;
    this.setState({newOwner: value});
  }

  render() {
    console.log('newOwner',this.state.newOwner);
    return (
      <div className="Dao1901Members">
        <h2>Owner</h2>
        <dl>
          <dt>Owner</dt>
          <dd>Owned.owner(): {this.state.owner} / balance: {this.state.balance}</dd>
        </dl>

        <TextField
          hintText="Hint Text"
          onChange={(event) => this.handleChangeChangeOwner(event)}
        /><br />

        <FlatButton
          label="Submit"
          onClick={this.changeOwner}
        />
      </div>
    );
  }
}
