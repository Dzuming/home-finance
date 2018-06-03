import React from 'react';
import { DragSource } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';

const DragAssumptionTypes = ({
  connectDragSource,
  isDragging,
  assumptionType,
}) => {
  return (
    <div>
      {connectDragSource(
        <div style={{ opacity: isDragging ? 0.5 : 1 }}>
          {assumptionType.name}
        </div>,
      )}
    </div>
  );
};

const cardSource = {
  beginDrag({ assumptionType }) {
    return {
      id: assumptionType.id,
      name: assumptionType.name,
      type: 'assumptionType',
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

export default DragSource(BOARD, cardSource, collect)(DragAssumptionTypes);