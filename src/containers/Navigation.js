import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navActions from '../actions/navActions';
import NavBar from '../components/NavBar';
import { AppBar, Grid } from 'material-ui';

class Navigation extends Component {
  state = {};
  openSideNav = () => {
    this.props.actions.openSideNav(true);
  };

  render() {
    return (
      <AppBar position="static" color="primary">
        <Grid
          container
          spacing={0}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={9}>
            <NavBar openSideNav={this.openSideNav} />
          </Grid>
          <Grid item xs={3} container justify="flex-end" />
        </Grid>
      </AppBar>
    );
  }
}

Navigation.propTypes = {
  actions: PropTypes.object,
  classes: PropTypes.object,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(navActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
