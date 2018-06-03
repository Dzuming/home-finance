import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

const DatePicker = ({ value, handleChange, label, ...props }) => {
  return (
    <TextField
      id="month"
      label={label}
      type="month"
      value={value}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
};

DatePicker.propTypes = {};

export default DatePicker;
