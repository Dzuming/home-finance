import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography, withStyles } from 'material-ui';
import Budget from './Budget';
import Revenue from './Revenue';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { setStatusColor } from '../helpers/Status';

const styles = theme => ({
  isOverdraw: {
    color: theme.status.warning,
  },
  isProfit: {
    color: theme.status.success,
  },
});

class Homepage extends Component {
  render() {
    const { budget, revenue, classes } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Card>
            <CardContent
              className={setStatusColor(
                budget,
                classes.isProfit,
                classes.isOverdraw,
              )}
            >
              <Typography type="display3" gutterBottom align="center">
                Budget
              </Typography>
              <Typography color="inherit" type="display2" align="center">
                <Budget />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent
              className={setStatusColor(
                revenue,
                classes.isProfit,
                classes.isOverdraw,
              )}
            >
              <Typography type="display3" gutterBottom align="center">
                Current revenue
              </Typography>
              <Typography color="inherit" type="display2" align="center">
                <Revenue />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Homepage.propTypes = {
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  revenue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  budget: state.budget,
  revenue: state.revenue,
});

export default compose(connect(mapStateToProps, null), withStyles(styles))(
  Homepage,
);
