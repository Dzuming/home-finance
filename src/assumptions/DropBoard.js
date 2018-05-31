import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import CardList from '../components/commons/CardList';
import { Grid } from 'material-ui';

class DropBoard extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isDropped) {
      return {
        [prevProps.item.type]: () =>
          this.props.handleDraggedElementChange(
            [prevProps.item.type],
            prevProps.item,
          ),
      }[prevProps.item.type]();
    }
  }

  render() {
    const { connectDropTarget, assumptionType, category, date } = this.props;
    return connectDropTarget(
      <div>
        <Grid container spacing={0}>
          <CardList name={'Date'} gridSize={4} />
          <CardList name={'AssumptionType'} gridSize={4} />
          <CardList name={'Category'} gridSize={4} />
        </Grid>
        <Grid container spacing={0}>
          <CardList name={date} gridSize={4} />
          <CardList name={assumptionType.name} gridSize={4} />
          <CardList name={category.name} gridSize={4} />
        </Grid>
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
