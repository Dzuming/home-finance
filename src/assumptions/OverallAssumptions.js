import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { makeGetOverallAssumption } from '../helpers/selectors';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';
import { Card, CardContent, Grid, Typography } from 'material-ui';

class OverallAssumptions extends Component {
  componentDidMount() {
    this.props.actions.fetchOverallAssumptions();
  }

  render() {
    const { overallAssumptions } = this.props;
    return (
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
        {overallAssumptions.map((assumption, index) => (
          <Grid key={index} container spacing={0}>
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
  }
}

OverallAssumptions.propTypes = {
  actions: PropTypes.shape({
    fetchOverallAssumptions: PropTypes.Func,
  }),
  overallAssumptions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  overallAssumptions: makeGetOverallAssumption(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverallAssumptions);
