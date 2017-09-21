import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
//import Button from 'material-ui/Button';
import ListAside from './ListAside';
const styles = {
  list: {
    width: 250,
    flex: 'initial'
  }
};

function DrawerList(props) {
  const classes = props.classes;
  return (
    <div>
      <Drawer open={props.isOpen} onRequestClose={props.closeSideNav}>
        <div
          className={classes.list}
          tabIndex={0}
          role="button"
          onClick={props.closeSideNav}>
          <ListAside/>
        </div>
      </Drawer>
    </div>
  );
}

DrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
  closeSideNav: PropTypes.func,
  isOpen: PropTypes.bool
};

export default withStyles(styles)(DrawerList);
