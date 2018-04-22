import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography } from 'material-ui';

class Assumption extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography type="display3" gutterBottom align="center">
                  Assumption
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography type="display3" gutterBottom align="center">
                  percentage
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography type="display3" gutterBottom align="center">
                  Value
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="display2" align="center">
                  334
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="display2" align="center">
                  445
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="display2" align="center">
                  445
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Assumption.propTypes = {};

export default Assumption;
