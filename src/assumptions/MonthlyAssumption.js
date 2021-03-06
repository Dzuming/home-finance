import React, { Component } from 'react';
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
import moment from 'moment/moment';
import { makeGetMonthlyAssumption } from '../helpers/selectors';
import { bindActionCreators, compose } from 'redux';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';

const styles = theme => ({
  isOverdraw: {
    color: theme.status.warning,
  },
  assumptionWrapper: {
    padding: '15px 0',
  },
});

class MonthlyAssumption extends Component {
  state = {
    date: '',
  };
  changeAssumptionDate = event => {
    const date = event.target.value;
    this.setState({ date });
  };

  componentDidMount() {
    this.setState({ date: moment().format('YYYY-MM') });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      this.props.actions.fetchAssumptions(this.state.date);
    }
  }

  render() {
    const { classes, monthlyAssumption } = this.props;
    const { date } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.assumptionWrapper}>
          <TextField
            id="month"
            label="Assumption date"
            type="month"
            value={date}
            onChange={this.changeAssumptionDate}
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
        {monthlyAssumption.map(assumption => (
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
  }
}

MonthlyAssumption.propTypes = {
  actions: PropTypes.shape({
    fetchAssumptions: PropTypes.Func,
  }),
  monthlyAssumption: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  monthlyAssumption: makeGetMonthlyAssumption(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MonthlyAssumption);
