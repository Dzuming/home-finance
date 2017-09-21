import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
//import Button from 'material-ui/Button';
import ListAside from './ListAside'
const styles = {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
};

class DrawerList extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <div>
        <Drawer open={this.state.right} onRequestClose={this.toggleDrawer('right', false)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}>
          <ListAside />
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerList);