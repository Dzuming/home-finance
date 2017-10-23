import React from 'react';
import {Component} from 'react';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Nav from './containers/Navigation';
import List from './containers/List';
import Table from './containers/Table';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import './index.scss';
import 'normalize.css';
class App extends Component {
  render() {
    const {isAuthenticated} = this.props;
    return (
      <div>
        <BrowserRouter>
          <Grid container spacing={0}>
            <Grid item lg={12}>
              <Route path="/Login" component={Login}/>
            </Grid>
            <Grid item xs={12} lg={2}>
              {isAuthenticated && <List/>}
            </Grid>
            <Grid item xs={12} lg={10}>
              {isAuthenticated &&< Nav />}
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/Profit"
                component={Table}/>
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/Spending"
                component={Table}/>
            </Grid>
          </Grid>
        </BrowserRouter>
      </div>
    );
  }
}
App.propTypes = {
  isAuthenticated: PropTypes.bool
};
function mapStateToProps(state) {
  return {isAuthenticated: state.login.isAuthenticated};
}
export default connect(mapStateToProps, null)(App);
