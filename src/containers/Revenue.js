import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as revenueActions from '../actions/revenueActions';

class Revenue extends Component {
  componentDidMount() {
    this.props.actions.fetchRevenue(this.props.date);
  }

  render() {
    const { revenue } = this.props;
    return <div>{revenue} zł</div>;
  }
}

Revenue.propTypes = {
  actions: PropTypes.shape({
    fetchRevenue: PropTypes.Func,
  }),
  revenue: PropTypes.number,
  date: PropTypes.string,
};
const mapStateToProps = state => ({
  revenue: state.revenue,
  date: '2018-04',
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(revenueActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
