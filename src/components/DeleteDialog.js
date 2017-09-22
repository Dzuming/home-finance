import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui';
import {
  Grid,
  TableView,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
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
const DeleteDialog = ({rows, columns, deletingRows, classes, cancelDelete, deleteRows}) => {
  return (
    <Dialog
      open={!!deletingRows.length}
      onRequestClose={cancelDelete}
      classes={{
        paper: classes.dialog
    }}>
      <DialogTitle>Delete Row</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete the following row?
        </DialogContentText>
        <Grid
          rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
          columns={columns}>
          <TableView/>
          <TableHeaderRow/>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete} color="primary">Cancel</Button>
        <Button onClick={deleteRows} color="accent">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
DeleteDialog.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  deletingRows: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  deleteRows: PropTypes.func.isRequired
};
export default withStyles(styles)(DeleteDialog);
