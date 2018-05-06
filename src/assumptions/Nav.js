import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui';

const Nav = ({ currentTab, handleTabChange }) => (
  <Tabs value={currentTab} onChange={handleTabChange}>
    <Tab label="Monthly assumption" />
    <Tab label="Overall assumption" />
    <Tab label="Add assumption" />
  </Tabs>
);

Nav.propTypes = {
  currentTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default Nav;
