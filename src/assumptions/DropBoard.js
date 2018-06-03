import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import CardList from '../components/commons/CardList';
import { Grid } from 'material-ui';
import DatePicker from '../components/commons/DatePicker';

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
    const {
      connectDropTarget,
      assumptionType,
      category,
      period,
      handleDateChange,
    } = this.props;
    return connectDropTarget(
      <div>
        <Grid container spacing={0}>
          <CardList name={'Date'} gridSize={3} />
          <CardList name={'percentage'} gridSize={3} />
          <CardList name={'AssumptionType'} gridSize={3} />
          <CardList name={'Category'} gridSize={3} />
        </Grid>
        <Grid container spacing={0}>
          <CardList gridSize={3}>
            {' '}
            <DatePicker
              value={period}
              handleChange={handleDateChange}
              fullWidth
            />
          </CardList>
          <CardList gridSize={3}>test</CardList>
          <CardList name={assumptionType.name} gridSize={3} />
          <CardList name={category.name} gridSize={3} />
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
