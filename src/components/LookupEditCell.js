import React from 'react';
import PropTypes from 'prop-types';
import {TableCell} from 'material-ui';
import {DropDownMenu} from '@devexpress/dx-react-grid-material-ui';
import {withStyles} from 'material-ui/styles';
const styles = theme => ({
  commandButton: {
    minWidth: '40px'
  },
  lookupEditCell: {
    verticalAlign: 'middle',
    paddingRight: theme.spacing.unit,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit
    }
  },
  dialog: {
    width: 'calc(100% - 16px)'
  }
});
const LookupEditCell = (({value, onValueChange, availableValues, classes}) => (
  <TableCell className={classes.lookupEditCell}>
    <DropDownMenu
      onItemClick={newValue => onValueChange(newValue)}
      defaultTitle={value}
      items={availableValues}/>
  </TableCell>
));
LookupEditCell.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
LookupEditCell.defaultProps = {
  value: undefined
};

export default withStyles(styles, {name: 'ControlledModeDemo'})(LookupEditCell);
