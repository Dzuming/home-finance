import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';

function withSpinner(WrappedComponent) {
  class SpinnerElement extends React.Component {
    render() {
      return (
        <div>
          {this.props.loading > 0 && <Spinner />}
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  SpinnerElement.propTypes = {
    loading: PropTypes.number.isRequired,
  };

  function mapStateToProps(state) {
    return {
      loading: state.api.loading,
    };
  }

  return connect(mapStateToProps, null)(SpinnerElement);
}

export default withSpinner;
