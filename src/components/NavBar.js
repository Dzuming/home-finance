import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';

const styles = () => ({
  root: {
    width: '100%'
  }
});

function NavBar (props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>

      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            aria-label="Menu"
            onClick={props.openSideNav}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
        <Typography type="title" color="inherit">
          Home finance
        </Typography>
      </Toolbar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  openSideNav: PropTypes.func
};

export default withStyles(styles)(NavBar);
