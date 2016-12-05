import React from 'react';

import {Image} from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import Dehaze from 'material-ui/svg-icons/image/dehaze';
import FlatButton from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

const styles = {
  container: {
    textAlign: 'center'
  },
};

export default function Menu(props) {
  return (
    <div style={styles.container}>
      <AppBar
        title={<Image src="./DAO1901Last.png" alt="logo"/>}
        iconElementLeft={
          <IconButton onTouchTap={props.handleToggleSidebar}>
            <Dehaze />
          </IconButton>}
        iconElementRight={
          <FlatButton
            label="LOG IN"
            labelPosition="before"
            primary={true}
            style={styles.button}
            icon={<NavigationExpandMoreIcon />}
          />
        }
      />
    </div>
  )
}

Menu.propTypes = {};
