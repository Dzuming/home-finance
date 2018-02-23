import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#161616',
    opacity: '0.8',
    zIndex: '50'
  }
});

function Spinner (props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      loader...
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);
