import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, withStyles } from 'material-ui';
import { bindActionCreators, compose } from 'redux';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';

const styles = () => ({
  red: {
    color: '#F44336',
  },
});

class Assumption extends Component {
  valueStatus = (value, success, alert) => (value > 0 ? success : alert);

  componentDidMount() {
    this.props.actions.fetchAssumptions();
  }

  render() {
    const { assumptions, classes } = this.props;
    return (
      <React.Fragment>
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
            className={this.valueStatus(assumption, '', classes.red)}
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
  }
}

Assumption.propTypes = {
  actions: PropTypes.shape({
    fetchAssumptions: PropTypes.func.isRequired,
  }),
  assumptions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  assumptions: state.assumptions,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Assumption);
