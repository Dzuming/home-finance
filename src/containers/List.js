import React, { Component } from 'react';
import Hidden from 'material-ui/Hidden';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navActions from '../actions/navActions';
import ListAside from '../components/ListAside';
import DrawerList from '../components/DrawerList';
class List extends Component {
  state = {};
  closeSideNav = () => {
    this.props.actions.openSideNav(false);
  };
  render() {
    return (
      <div>
        <Hidden mdDown>
          <ListAside />
        </Hidden>
        <DrawerList
          closeSideNav={this.closeSideNav}
          isOpen={this.props.isOpen}
        />
      </div>
    );
  }
}
List.propTypes = {
  actions: PropTypes.object,
  isOpen: PropTypes.bool,
};
function mapStateToProps(state) {
  return {
    isOpen: state.nav.isOpen ? state.nav.isOpen : false,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(navActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
