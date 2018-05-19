import React from 'react';
import { DropTarget } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';

const cell = {
  height: '200px',
  backgroundColor: 'red',
};

const DropBoard = ({ connectDropTarget, canDrop, isOver }) => {
  const isActive = canDrop && isOver;
  return connectDropTarget(
    <div style={cell}>{isActive ? 'Release to drop' : 'Drag a box here'}</div>,
  );
};

const boxTarget = {
  drop() {
    return { name: 'BOARD' };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),

  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget(BOARD, boxTarget, collect)(DropBoard);
