// @flow

import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import CardList from '../../components/commons/CardList';
import { Grid, TextField } from 'material-ui';
import DatePicker from '../../components/commons/DatePicker';
import type { Category } from '../../types/index';
import DeleteIcon from 'material-ui-icons/Delete';
import { selectCategoryType } from '../../actions/categoryActions';

type Props = {
  handleCategoryChange: () => void,
  selectAssumptionType: () => void,
  categoryTypeSelect: () => void,
  categories: Category[]
};

class DropBoard extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const {
      handleCategoryChange,
      selectAssumptionType,
      categoryTypeSelect,
      categories
    } = this.props;
    if (prevProps.isDropped) {
      return {
        assumptionType: () => selectAssumptionType(prevProps.item),
        category: () => categoryTypeSelect(prevProps.item)
      }[prevProps.item.type]();
    }
  }

  render() {
    const {
      connectDropTarget,
      selectedAssumptionTypes,
      selectedCategoryTypes,
      categories,
      period,
      percentage,
      handleChange,
      handleSelectedAssumptionTypeRemove
    } = this.props;
    return connectDropTarget(
      <div style={{ marginTop: '10px' }}>
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
              handleChange={handleChange('period')}
              fullWidth
            />
          </CardList>
          <CardList gridSize={3}>
            <TextField
              id="number"
              value={percentage}
              onChange={handleChange('percentage')}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
            />
          </CardList>
          <CardList gridSize={3}>
            {selectedAssumptionTypes.map(assumptionType => (
              <div key={assumptionType.id}>
                {assumptionType.name}
                <DeleteIcon
                  onClick={handleSelectedAssumptionTypeRemove(
                    assumptionType.id
                  )}
                  style={{
                    float: 'right',
                    cursor: 'pointer',
                    color: '#757575'
                  }}
                />
              </div>
            ))}
          </CardList>
          <CardList gridSize={3}>
            {selectedCategoryTypes.map((categoryType: Category) => (
              <div key={categoryType.id}>{categoryType.name}</div>
            ))}
          </CardList>
        </Grid>
      </div>
    );
  }
}

const boxTarget = {
  drop() {
    return { name: 'BOARD' };
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  item: monitor.getItem(),
  isDropped: monitor.didDrop(),
  getDropResult: monitor.getDropResult(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default DropTarget(BOARD, boxTarget, collect)(DropBoard);
