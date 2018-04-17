import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  input: {
    display: 'none',
  },
});

const RaisedButton = ({ classes, text, color, clickMethod }) => {
  return (
    <Button
      onClick={clickMethod}
      raised
      color={color}
      className={classes.button}
    >
      {text}
    </Button>
  );
};

RaisedButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  clickMethod: PropTypes.func,
};

export default withStyles(styles)(RaisedButton);
