import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as revenueActions from '../actions/revenueActions';

class Revenue extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchRevenue();
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
  revenue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const mapStateToProps = state => ({
  revenue: state.revenue,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(revenueActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
