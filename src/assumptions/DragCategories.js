import React from 'react';
import { DragSource } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';

const DragCategories = ({ connectDragSource, isDragging, name }) => {
  return (
    <div>
      {connectDragSource(
        <div style={{ opacity: isDragging ? 0.5 : 1 }}>{name}</div>,
      )}
    </div>
  );
};

const cardSource = {
  beginDrag({ name }) {
    return {
      name,
      type: 'category',
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(BOARD, cardSource, collect)(DragCategories);
