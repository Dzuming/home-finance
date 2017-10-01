import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router-dom';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Logo from './Logo';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  }
});

function ListAside(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <List>
        <ListSubheader>
          <Logo/>
        </ListSubheader>
        <ListItem button component={Link} to="Profit">
          <ListItemText primary="Profit"/>
        </ListItem>
        <ListItem button component={Link} to="Spending">
          <ListItemText primary="Spending"/>
        </ListItem>
      </List>
    </div>
  );
}

ListAside.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListAside);
