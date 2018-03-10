import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography } from 'material-ui';

class Homepage extends Component {

  render () {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography type="display2" gutterBottom align="center">
                  Home finance
                </Typography>
                <Typography type="display2" align="center">
                  Budget
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography type="display2" gutterBottom align="center">
                  Home finance
                </Typography>
                <Typography type="display2" align="center">
                  Incomes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Homepage;
