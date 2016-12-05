import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
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
        title="Title"
        iconElementLeft={
          <IconButton onTouchTap={props.handleToggleSidebar}>
            <NavigationClose />
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
