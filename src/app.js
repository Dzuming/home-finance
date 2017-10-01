import React from 'react';
import {Component} from 'react';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Grid from 'material-ui/Grid';
import Nav from './containers/Navigation';
import List from './containers/List';
import Table from './containers/Table';
import './index.scss';
import 'normalize.css';
export default class App extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={createHistory()}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={2}>
              <List/>
            </Grid>

            <Grid item xs={12} lg={10}>
              <Nav/>
              <Route exact path="/Profit" component={Table}/>
              <Route path="/Spending" component={Table}/>
            </Grid>
          </Grid>
        </ConnectedRouter>
      </div>
    );
  }
}
