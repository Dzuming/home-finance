import React from 'react';
import PropTypes from 'prop-types';
import { setStatusColor } from '../helpers/Status';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  withStyles,
} from 'material-ui';

const styles = theme => ({
  isOverdraw: {
    color: theme.status.warning,
  },
  assumptionWrapper: {
    padding: '15px 0',
  },
});

const MonthlyAssumption = ({
  assumptions,
  changeAssumptionDate,
  date,
  classes,
}) => {
  return (
    <React.Fragment>
      <Grid container spacing={0} className={classes.assumptionWrapper}>
        <TextField
          id="month"
          label="Assumption date"
          type="month"
          value={date}
          onChange={changeAssumptionDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography type="body2" gutterBottom align="center">
                Assumption
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography type="body2" gutterBottom align="center">
                percentage
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography type="body2" gutterBottom align="center">
                Value
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography type="body2" gutterBottom align="center">
                Limit
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {assumptions.map(assumption => (
        <Grid
          key={assumption.id}
          container
          spacing={0}
          className={setStatusColor(
            assumption.limit - assumption.value,
            '',
            classes.isOverdraw,
          )}
        >
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="body2" align="center">
                  {assumption.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="body2" align="center">
                  {assumption.percentage}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="body2" align="center">
                  {assumption.value} zł
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography color="inherit" type="body2" align="center">
                  {assumption.limit} zł
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
};

MonthlyAssumption.propTypes = {
  date: PropTypes.string.isRequired,
  assumptions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MonthlyAssumption);
