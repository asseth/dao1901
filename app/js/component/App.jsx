import React, {Component, PropTypes} from 'react';
import Menu from './Menu';
import {Col} from 'react-bootstrap';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import {deepOrange500} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Link, browserHistory} from 'react-router'
import Owned from './Owned';
import Members from './Members';
import Votes from './Dao1901Votes/VotesContainer';
import Web3 from './Web3';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';


// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const styles = {
  container: {
    textAlign: 'center'
  },
};
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggleSidebar = ::this.handleToggleSidebar;
    this.state = {
      sidebar: false,
    };
  }

  handleToggleSidebar() {
    this.setState({sidebar: !this.state.sidebar});
  }

  pushRoute(path) {
    this.handleToggleSidebar();
    this.context.router.push(`/${path}`);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Menu handleToggleSidebar={this.handleToggleSidebar}/>
          <Drawer
            docked={false}
            width={200}
            open={this.state.sidebar}
            onRequestChange={(sidebar) => this.setState({sidebar})}
          >
            <MenuItem onTouchTap={() => this.pushRoute('home')}>Home</MenuItem>
            <MenuItem onTouchTap={() => this.pushRoute('members')}>Members Management</MenuItem>
            <MenuItem onTouchTap={() =>  this.pushRoute('votes')}>Organize a vote</MenuItem>
            <MenuItem onTouchTap={() =>  this.pushRoute('owned')}>Owned</MenuItem>
            <MenuItem onTouchTap={() =>  this.pushRoute('web3')}>Connection Infos</MenuItem>
            <MenuItem onTouchTap={() =>  this.pushRoute('aboutus')}>About Us</MenuItem>
          </Drawer>
          <Col xs={10} xsOffset={1} className="m-top-30">
            <div className="content">
              {this.props.children}
            </div>
          </Col>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
{/*
 export default function App() {
 return (
 <Col xs={10} xsOffset={1} className="m-top-30">

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

 */
}
App.contextTypes = {
  router: PropTypes.object.isRequired
};
