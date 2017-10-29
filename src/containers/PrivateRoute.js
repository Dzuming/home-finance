import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
class PrivateRoute extends Component {

  render() {
    const {component: Component, isAuthenticated,  ...rest} = this.props;
    return (
      <Route
      {...rest}
      render={(props) => isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
    )}  
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
export default PrivateRoute;
