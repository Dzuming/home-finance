import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  MenuItem,
  Select,
} from 'material-ui';

const LookupEditCell = (({value, onValueChange, availableValues}) => (
  <TableCell>
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}>{availableValues.map(item => (
      <MenuItem key={item} value={item}>{item}</MenuItem>))}
    </Select>
  </TableCell>
));
LookupEditCell.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
};
LookupEditCell.defaultProps = {
  value: undefined,
};

export default LookupEditCell;
