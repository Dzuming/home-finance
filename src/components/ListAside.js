import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Logo from './Logo';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Grid from 'material-ui/Grid';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as loginActions from '../actions/loginActions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  logoutIcon: {
    cursor: 'pointer',
  },
});

class ListAside extends Component {
  state = {};
  logout = () => {
    this.props.actions.logout().then(data => {
      if (!data.login.isAuthenticated) {
        this.props.history.push('/login');
      }
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <List>
          <ListSubheader disableSticky>
            <Grid container>
              <Grid item xs={10}>
                <Logo />
              </Grid>
              <Grid item xs={2}>
                <div onClick={this.logout} className={classes.logoutIcon}>
                  <ExitToApp />
                </div>
              </Grid>
            </Grid>
          </ListSubheader>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Homepage" />
          </ListItem>
          <ListItem button component={Link} to="Profit">
            <ListItemText primary="Profit" />
          </ListItem>
          <ListItem button component={Link} to="Spending">
            <ListItemText primary="Spending" />
          </ListItem>
        </List>
      </div>
    );
  }
}

ListAside.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return { isAuthenticated: state.login.isAuthenticated };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ListAside);
