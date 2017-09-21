import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navActions from '../actions/navActions';
import NavBar from '../components/NavBar'

class Navigation extends Component {
    state = {}
    openSideNav = () => {
        this
            .props
            .actions
            .openSideNav(true);
    }
    render() {
        return (<NavBar openSideNav={this.openSideNav}/>);
    }
}
Navigation.propTypes = {
    actions: PropTypes.object
}
function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
