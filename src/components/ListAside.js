import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

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
    <Hidden mdDown>
      <div className={classes.root}>

        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Inbox"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon/>
            </ListItemIcon>
            <ListItemText primary="Drafts"/>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem button>
            <ListItemText primary="Trash"/>
          </ListItem>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Spam"/>
          </ListItem>
        </List>
      </div>
    </Hidden>
  );
}

ListAside.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListAside);