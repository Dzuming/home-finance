import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';

const cell = {
  height: '200px',
  backgroundColor: 'red',
};

class DropBoard extends Component {
  state = {
    category: '',
    assumptionType: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isDropped) {
      return {
        category: () => this.setState({ category: prevProps.item.name }),
        assumptionType: () =>
          this.setState({ assumptionType: prevProps.item.name }),
      }[prevProps.item.type]();
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    const { category, assumptionType } = this.state;

    return connectDropTarget(
      <div>
        <div style={cell}>{category}</div>
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
