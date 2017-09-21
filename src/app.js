import React from 'react';
import {Component} from 'react';
import Grid from 'material-ui/Grid';
import Nav from './containers/Navigation';
import List from './containers/List';
import Table from './containers/Table'
import './index.scss';
export default class App extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={2}>
            <List/>
          </Grid>
          <Grid item xs={12} lg={10}>
            <Nav/>
            <Table />
          </Grid>
        </Grid>
      </div>
    );
  }
}
