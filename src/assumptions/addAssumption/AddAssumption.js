// @flow

import * as React from 'react';
import {
  fetchAssumptionTypes,
  createAssumption,
  resetSelectedAssumptionTypes,
  selectAssumptionTypes,
  removeSelectedAssumptionType
} from '../../actions/assumptionActions';
import {
  resetDraggedCategories,
  fetchCategories,
  reduceCategories
} from '../../actions/financeFlowActions';
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
import { makeGetDraggedCategories } from '../../selectors/categories';
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
  categories: Array<Category>,
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
  reduceCategories: () => void,
  selectAssumptionTypes: () => void
};

class AddAssumption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = (): State => ({
    categories: [],
    isInitialValue: false,
    percentage: 0,
    period: yearMonthFormatDate
  });

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    const {
      categories,
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

  handleAssumptionTypeChange = (
    key: string,
    value: number,
    callback: () => void
  ): void => this.setState({ [key]: value }, callback);

  handleCategoryChange = (
    categories: Array<Category>,
    callback: () => void
  ): void =>
    this.setState(
      {
        categories
      },
      callback
    );

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
    const { selectedAssumptionTypes } = this.props;
    const {
      notSelectedAssumptionTypes,
      draggedCategories,
      selectAssumptionTypes,
      reduceCategories,
      handleSelectedAssumptionTypeRemove
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
            {draggedCategories.map((category: Category): React.Node => (
              <DragCategories key={category.id} category={category} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <DropBoard
              selectedAssumptionTypes={selectedAssumptionTypes}
              period={period}
              percentage={percentage}
              handleChange={this.handleChange}
              categories={categories}
              date={period}
              handleAssumptionTypeChange={this.handleAssumptionTypeChange}
              handleCategoryChange={this.handleCategoryChange}
              selectAssumptionTypes={selectAssumptionTypes}
              reduceCategories={reduceCategories}
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
  selectedAssumptionTypes: state.assumptions.selectedTypes,
  notSelectedAssumptionTypes: makeGetNotSelectedAssumptionTypes(state),
  draggedCategories: makeGetDraggedCategories(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  assumptionTypesFetch: (): void => dispatch(fetchAssumptionTypes()),
  categoriesFetch: (): void => dispatch(fetchCategories()),
  selectedAssumptionTypesReset: (): void =>
    dispatch(resetSelectedAssumptionTypes()),
  resetDraggedCategories: (): void => dispatch(resetDraggedCategories()),
  createAssumption: (assumption: Assumption): void =>
    dispatch(createAssumption(assumption)),
  reduceCategories: (category): void => dispatch(reduceCategories(category)),
  selectAssumptionTypes: (assumptionType): void =>
    dispatch(selectAssumptionTypes(assumptionType)),
  selectedAssumptionTypeRemove: (assumptionId): void =>
    dispatch(removeSelectedAssumptionType(assumptionId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(AddAssumption);
