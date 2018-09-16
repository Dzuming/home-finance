import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setStatusColor } from '../../helpers/Status';
import { Card, CardContent, Grid, Typography, withStyles } from 'material-ui';
import { makeGetMonthlyAssumption } from '../../selectors/assumptions';
import { yearMonthFormatDate } from '../../helpers/format';
import { bindActionCreators, compose } from 'redux';
import * as assumptionActions from '../../actions/assumptionActions';
import { connect } from 'react-redux';
import DatePicker from '../../components/commons/DatePicker';
import CardList from '../../components/commons/CardList';

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
  handleDateChange = event => {
    const date = event.target.value;
    this.setState({ date });
  };

  componentDidMount() {
    this.setState({ date: yearMonthFormatDate });
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
          <DatePicker
            value={date}
            handleChange={this.handleDateChange}
            label={'assumption date'}
          />
        </Grid>
        <Grid container spacing={0}>
          <CardList name={'Assumption'} gridSize={3} />
          <CardList name={'Percentage'} gridSize={3} />
          <CardList name={'Value'} gridSize={3} />
          <CardList name={'Limit'} gridSize={3} />
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
            <CardList name={assumption.name} gridSize={3} />
            <CardList name={assumption.percentage} gridSize={3} />
            <CardList name={`${assumption.value} zł`} gridSize={3} />
            <CardList name={`${assumption.limit} zł`} gridSize={3} />
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
