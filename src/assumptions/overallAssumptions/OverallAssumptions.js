import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { makeGetOverallAssumption } from '../../selectors/assumptions';
import * as assumptionActions from '../../actions/assumptionActions';
import { connect } from 'react-redux';
import { Card, CardContent, Grid, Typography } from 'material-ui';
import CardList from '../../components/commons/CardList';

class OverallAssumptions extends Component {
  componentDidMount() {
    this.props.actions.fetchOverallAssumptions();
  }

  render() {
    const { overallAssumptions } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <CardList name={'Assumption'} gridSize={6} />
          <CardList name={'Value'} gridSize={6} />
        </Grid>
        {overallAssumptions.map((assumption, index) => (
          <Grid key={index} container spacing={0}>
            <CardList name={assumption.name} gridSize={6} />
            <CardList name={`${assumption.value} zł`} gridSize={6} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }
}

OverallAssumptions.propTypes = {
  actions: PropTypes.shape({
    fetchOverallAssumptions: PropTypes.Func
  }),
  overallAssumptions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  overallAssumptions: makeGetOverallAssumption(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OverallAssumptions);
