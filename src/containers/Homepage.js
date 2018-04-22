import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography, withStyles } from 'material-ui';
import Budget from './Budget';
import Revenue from './Revenue';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = () => ({
  red: {
    color: '#F44336',
  },
  green: {
    color: '#4CAF50',
  },
});

class Homepage extends Component {
  valueStatus = (value, success, alert) => (value > 0 ? success : alert);

  render() {
    const { budget, revenue, classes } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Card>
            <CardContent
              className={this.valueStatus(budget, classes.green, classes.red)}
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
              className={this.valueStatus(revenue, classes.green, classes.red)}
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
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  budget: state.budget,
  revenue: state.revenue,
});

export default compose(connect(mapStateToProps, null), withStyles(styles))(
  Homepage,
);
