import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import packageJson from '../../package.json';

const styles = {
  header: {
    marginBottom: '0',
    lineHeight: '0',
  },
};
const Logo = props => {
  const classes = props.classes;
  return (
    <div>
      <Link to="/">
        <h2 className={classes.header}>Home Finance</h2>
      </Link>
      <small>{packageJson.version}</small>
    </div>
  );
};
Logo.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Logo);
