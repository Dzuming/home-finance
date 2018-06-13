import React from 'react';
import { DragSource } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import DragList from '../components/commons/DragList';

const DragCategories = ({ connectDragSource, isDragging, category }) => {
  return (
    <div>
      {connectDragSource(
        <div>
          <DragList element={category} isDragging={isDragging} />
        </div>,
      )}
    </div>
  );
};

const cardSource = {
  beginDrag({ category }) {
    return {
      id: category.id,
      name: category.name,
      type: 'category',
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(BOARD, cardSource, collect)(DragCategories);
