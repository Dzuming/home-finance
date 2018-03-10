import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography, withStyles } from 'material-ui';
import Budget from './Budget';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = () => ({
  red: {
    color: '#F44336'
  },
  green: {
    color: '#4CAF50'
  }
});

class Homepage extends Component {
  valueStatus = (value, success, alert) => value > 0 ? success : alert;

  render () {
    const {budget, classes} = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Card>
              <CardContent className={this.valueStatus(budget, classes.green, classes.red)}>
                <Typography color="inherit" type="display2" gutterBottom align="center">
                  Budget
                </Typography>
                <Typography color="inherit" type="display2" align="center">
                  <Budget/>
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

Homepage.propTypes = {
  budget: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  budget: state.budget,
});

export default compose(connect(mapStateToProps, null), withStyles(styles))(Homepage);
