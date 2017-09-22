import React from 'react';
import {IconButton} from 'material-ui';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import DeleteIcon from 'material-ui-icons/Delete';
import NoteAddIcon from 'material-ui-icons/NoteAdd';
const CommandTemplate = {
  add: onClick => (
    <IconButton onClick={onClick} title="Add row">
      <NoteAddIcon/>
    </IconButton>
  ),
  edit: onClick => (
    <IconButton onClick={onClick} title="Edit row">
      <EditIcon/>
    </IconButton>
  ),
  delete: onClick => (
    <IconButton onClick={onClick} title="Delete row">
      <DeleteIcon/>
    </IconButton>
  ),
  commit: onClick => (
    <IconButton onClick={onClick} title="Save changes">
      <SaveIcon/>
    </IconButton>
  ),
  cancel: onClick => (
    <IconButton color="accent" onClick={onClick} title="Cancel changes">
      <CancelIcon/>
    </IconButton>
  )
};

export default CommandTemplate;
