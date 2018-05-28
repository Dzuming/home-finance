import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';

const cell = {
  height: '200px',
  backgroundColor: 'red',
};

class DropBoard extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isDropped) {
      return {
        [prevProps.item.type]: () =>
          this.props.handleDraggedElementChange(
            [prevProps.item.type],
            prevProps.item.name,
          ),
      }[prevProps.item.type]();
    }
  }

  render() {
    const { connectDropTarget, assumptionType, category, date } = this.props;

    return connectDropTarget(
      <div>
        <div style={cell}>{category}</div>
        <div style={cell}>{date}</div>
        <div style={cell}>{assumptionType}</div>
      </div>,
    );
  }
}

const boxTarget = {
  drop() {
    return { name: 'BOARD' };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  item: monitor.getItem(),
  isDropped: monitor.didDrop(),
  getDropResult: monitor.getDropResult(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget(BOARD, boxTarget, collect)(DropBoard);
