// @flow

import * as React from 'react';
import {
  fetchAssumptionTypes,
  createAssumption,
  resetSelectedAssumptionTypes,
  selectAssumptionType,
  removeSelectedAssumptionType
} from '../../actions/assumptionActions';
import {
  resetDraggedCategories,
  fetchCategories,
  selectCategoryType
} from '../../actions/categoryActions';
import { connect } from 'react-redux';
import { Button, Grid } from 'material-ui';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropBoard from './DropBoard';
import DragAssumptionTypes from './SelectedAssumption';
import DragCategories from './DragCategories';
import {
  makeGetNotSelectedAssumptionTypes,
  makeGetAssumptionTypes
} from '../../selectors/assumptions';
import {
  makeGetSelectedCategories,
  makeGetCategoryTypes,
  makeGetNotSelectedCategoryTypes
} from '../../selectors/categories';
import { yearMonthFormatDate } from '../../helpers/format';
import type {
  AssumptionType,
  Category,
  Dispatch,
  State as ReduxState
} from '../../types/index';
import { compose } from 'redux';

type Props = {
  draggedAssumptionTypes: Array<AssumptionType>,
  draggedCategories: Array<Category>
} & DispatchProps &
  ReduxMappedProps;

type ReduxMappedProps = {
  draggedAssumptionTypes: AssumptionType[],
  draggedCategories: Category[]
};

type State = {
  assumptionType: AssumptionType,
  isInitialValue: boolean,
  percentage: number,
  period: string
};

type DispatchProps = {
  assumptionTypesFetch: () => void,
  categoriesFetch: () => void,
  selectedAssumptionTypesReset: () => void,
  resetDraggedCategories: () => void,
  createAssumption: ({
    userId: string,
    assumptionTypeId: string,
    categoryIds: Array<string>,
    percentage: number,
    isInitialValue: boolean,
    period: string
  }) => void,
  categoryTypeSelect: () => void,
  selectAssumptionType: () => void
};

class AddAssumption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = (): State => ({
    isInitialValue: false,
    percentage: 0,
    period: yearMonthFormatDate
  });

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    const {
      percentage,
      isInitialValue,
      period
    } = this.state;
    const { createAssumption, selectedAssumptionTypes } = this.props;
    if (!this.validate()) {
      return;
    }
    await createAssumption({
      userId: '1',
      assumptionTypeId: selectedAssumptionTypes[0].id,
      categoryIds: categories.map((category: Category): string => category.id),
      percentage,
      isInitialValue,
      period
    });
    this.resetAddAssumptionForm();
  };

  validate = (): boolean => {
    const { percentage, assumptionType } = this.state;
    let error = [];
    if (!(percentage > 0)) {
      error.push('Percentage value must be more than 0');
    }
    if (Object.getOwnPropertyNames(assumptionType).length === 0) {
      error.push('Assumption type value must be filled');
    }
    if (error.length > 0) {
      alert(error.join('\n'));
      return false;
    }
    return true;
  };

  handleChange = (
    name: string
  ): ((event: SyntheticEvent<HTMLButtonElement>) => void) => (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    this.setState({
      [name]: event.currentTarget.value
    });
  };

  handleSelectedAssumptionTypeRemove = (assumptionId) => () => {
    const { selectedAssumptionTypeRemove } = this.props;
    selectedAssumptionTypeRemove(assumptionId);
  };
  resetAddAssumptionForm = () => {
    const { selectedAssumptionTypesReset, resetDraggedCategories } = this.props;
    this.setState(this.initialState());
    selectedAssumptionTypesReset();
    resetDraggedCategories();
  };

  componentDidMount() {
    const { assumptionTypesFetch, categoriesFetch } = this.props;
    assumptionTypesFetch();
    categoriesFetch();
  }

  componentWillUnmount() {
    this.resetAddAssumptionForm();
  }

  render(): React.Node {
    const { categories, period, percentage } = this.state;
    const {
      notSelectedAssumptionTypes,
      selectedAssumptionTypes,
      selectedCategoryTypes,
      categoryTypes,
      selectAssumptionType,
      categoryTypeSelect,
      handleSelectedAssumptionTypeRemove,
      notSelectedCategoryTypes
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={0}>
          <Grid
            container
            spacing={0}
            item
            xs={12}
            direction={'row'}
            alignItems={'center'}
          >
            <div>Assumption type:</div>
            {notSelectedAssumptionTypes.map(
              (assumptionType: AssumptionType): React.Node => (
                <DragAssumptionTypes
                  key={assumptionType.id}
                  assumptionType={assumptionType}
                />
              )
            )}
          </Grid>
          <Grid
            container
            spacing={0}
            item
            xs={12}
            direction={'row'}
            alignItems={'center'}
          >
            <div>Categories:</div>
            {notSelectedCategoryTypes.map((category: Category): React.Node => (
              <DragCategories key={category.id} category={category} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <DropBoard
              selectedAssumptionTypes={selectedAssumptionTypes}
              selectedCategoryTypes={selectedCategoryTypes}
              period={period}
              percentage={percentage}
              handleChange={this.handleChange}
              categories={categories}
              date={period}
              selectAssumptionType={selectAssumptionType}
              selectCategoryType={selectCategoryType}
              categoryTypeSelect={categoryTypeSelect}
              handleSelectedAssumptionTypeRemove={this.handleSelectedAssumptionTypeRemove}
            />
          </Grid>
        </Grid>
        <Button type={'submit'} fullWidth>
          Add assumption
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state: ReduxState): ReduxMappedProps => ({
  assumptionTypes: makeGetAssumptionTypes(state),
  categoryTypes: makeGetCategoryTypes(state),
  selectedAssumptionTypes: state.assumptions.selectedTypes,
  notSelectedAssumptionTypes: makeGetNotSelectedAssumptionTypes(state),
  notSelectedCategoryTypes: makeGetNotSelectedCategoryTypes(state),
  selectedCategoryTypes: makeGetSelectedCategories(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  assumptionTypesFetch: (): void => dispatch(fetchAssumptionTypes()),
  categoriesFetch: (): void => dispatch(fetchCategories()),
  selectedAssumptionTypesReset: (): void =>
    dispatch(resetSelectedAssumptionTypes()),
  resetDraggedCategories: (): void => dispatch(resetDraggedCategories()),
  createAssumption: (assumption: Assumption): void =>
    dispatch(createAssumption(assumption)),
  selectAssumptionType: (assumptionType): void =>
    dispatch(selectAssumptionType(assumptionType)),
  categoryTypeSelect: (categoryType): void =>
    dispatch(selectCategoryType(categoryType)),
  selectedAssumptionTypeRemove: (assumptionId): void =>
    dispatch(removeSelectedAssumptionType(assumptionId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(AddAssumption);
