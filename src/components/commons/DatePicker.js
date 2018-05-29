import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

const DatePicker = ({ value, handleChange }) => {
  return (
    <TextField
      id="month"
      label="Assumption date"
      type="month"
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

DatePicker.propTypes = {};

export default DatePicker;
