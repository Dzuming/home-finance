import React from 'react';
import { Card, CardContent, Grid, Typography } from 'material-ui';

const OverallAssumptions = ({ overallAssumptions }) => (
  <React.Fragment>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography type="body2" gutterBottom align="center">
              Assumption
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography type="body2" gutterBottom align="center">
              Value
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    {overallAssumptions.map(assumption => (
      <Grid key={assumption.id} container spacing={0}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography color="inherit" type="body2" align="center">
                {assumption.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography color="inherit" type="body2" align="center">
                {assumption.value} zł
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    ))}
  </React.Fragment>
);

OverallAssumptions.propTypes = {};

export default OverallAssumptions;
