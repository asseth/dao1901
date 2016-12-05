import React, {Component, PropTypes} from 'react';
import Menu from './Menu';
import {Col} from 'react-bootstrap';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import {deepOrange500} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import {Divider} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            <Divider inset={true} />
            <MenuItem onTouchTap={() =>  this.pushRoute('aboutdev')}>About The Dev Team</MenuItem>
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

App.contextTypes = {
  router: PropTypes.object.isRequired
};
