import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router';
import { Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Nav from './containers/Navigation';
import List from './containers/List';
import Spending from './containers/Spending';
import Profit from './containers/Profit';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import './index.scss';
import 'normalize.css';
import withSpinner from './helpers/withSpinner';
import compose from 'recompose/compose';
import history from './helpers/history';
import Homepage from './containers/Homepage';
import 'typeface-roboto';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Router history={history}>
          <Grid container spacing={0}>
            <Grid item lg={12}>
              <Route path="/Login" component={Login} />
            </Grid>
            <Grid item xs={12} lg={2}>
              {isAuthenticated && <List />}
            </Grid>
            <Grid item xs={12} lg={10}>
              {isAuthenticated && <Nav />}
              <Switch>
                <PrivateRoute
                  exact
                  isAuthenticated={isAuthenticated}
                  path="/"
                  component={Homepage}
                />
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  path="/Profit"
                  component={Profit}
                />
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  path="/Spending"
                  component={Spending}
                />
                <Redirect exact from="/" to="/Login" />
              </Switch>
            </Grid>
          </Grid>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  return { isAuthenticated: state.login.isAuthenticated };
}

export default compose(withSpinner, connect(mapStateToProps, null))(App);
