import React from 'react';
import { DragSource } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import DragList from '../components/commons/DragList';

const DragAssumptionTypes = ({
  connectDragSource,
  isDragging,
  assumptionType,
}) => {
  return (
    <div>
      {connectDragSource(
        <div>
          <DragList element={assumptionType} isDragging={isDragging} />
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
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(BOARD, cardSource, collect)(DragAssumptionTypes);
