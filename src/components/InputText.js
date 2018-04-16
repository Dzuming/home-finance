import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
const InputText = ({ type, classes, label, changeMethod }) => {
  return (
    <TextField
      type={type}
      label={label}
      onChange={changeMethod}
      className={classes.textField}
    />
  );
};

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  changeMethod: PropTypes.func.isRequired,
};
export default withStyles(styles)(InputText);
