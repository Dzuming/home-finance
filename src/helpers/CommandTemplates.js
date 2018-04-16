import React from 'react';
import { IconButton } from 'material-ui';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import DeleteIcon from 'material-ui-icons/Delete';
import NoteAddIcon from 'material-ui-icons/NoteAdd';
/* eslint-disable */
const CommandTemplate = {
  add: ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Add row">
      <NoteAddIcon />
    </IconButton>
  ),
  edit: ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
      <EditIcon />
    </IconButton>
  ),
  delete: ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Delete row">
      <DeleteIcon />
    </IconButton>
  ),
  commit: ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
      <SaveIcon />
    </IconButton>
  ),
  cancel: ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
      <CancelIcon />
    </IconButton>
  ),
};

export default CommandTemplate;
