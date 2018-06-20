// @flow

import * as React from 'react';
import {
  fetchAssumptionTypes,
  resetDraggedAssumptionTypes,
  createAssumption,
  reduceAssumptionTypes
} from '../actions/assumptionActions';
import {
  resetDraggedCategories,
  fetchCategories,
  reduceCategories
} from '../actions/financeFlowActions';
import { connect } from 'react-redux';
import { Button, Grid } from 'material-ui';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropBoard from './DropBoard';
import DragAssumptionTypes from './DragAssumptionTypes';
import DragCategories from './DragCategories';
import {
  makeGetDraggedAssumptionTypes,
  makeGetDraggedCategories
} from '../helpers/selectors';
import { yearMonthFormatDate } from '../helpers/format';
import type { Dispatch, State as ReduxState} from '../types';
import { compose } from 'redux';

type Props = {
  draggedAssumptionTypes: Array<AssumptionType>,
  draggedCategories: Array<Category>
} & DispatchProps & ReduxMappedProps;

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
  fetchAssumptionTypes: () => void,
  fetchCategories: () => void,
  resetDraggedAssumptionTypes: () => void,
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
  reduceAssumptionTypes: () => void
};

type AssumptionType = {
  id: string,
  name: string
};

type Category = {
  id: string,
  name: string
};

class AddAssumption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = (): State => ({
    assumptionType: {
      id: '',
      name: ''
    },
    categories: [],
    isInitialValue: false,
    percentage: 0,
    period: yearMonthFormatDate
  });

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const {
      assumptionType,
      categories,
      percentage,
      isInitialValue,
      period
    } = this.state;
    if (!this.validate()) {
      return;
    }
    Promise.resolve(
      this.props.createAssumption({
        userId: '1',
        assumptionTypeId: assumptionType.id,
        categoryIds: categories.map(
          (category: Category): string => category.id
        ),
        percentage,
        isInitialValue,
        period
      })
    ).then(() => {
      this.resetAddAssumptionForm();
    });
  };

  validate = (): boolean => {
    let error = [];
    if (!(this.state.percentage > 0)) {
      error.push('Percentage value must be more than 0');
    }
    if (Object.getOwnPropertyNames(this.state.assumptionType).length === 0) {
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

  resetAddAssumptionForm = () => {
    this.setState(this.initialState());
    this.props.resetDraggedAssumptionTypes();
    this.props.resetDraggedCategories();
  };

  componentDidMount() {
    this.props.fetchAssumptionTypes();
    this.props.fetchCategories();
  }

  componentWillUnmount() {
    this.resetAddAssumptionForm();
  }

  render(): React.Node {
    const { assumptionType, categories, period, percentage } = this.state;
    const {
      draggedAssumptionTypes,
      draggedCategories,
      reduceAssumptionTypes,
      reduceCategories
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={0}>
          <Grid
            container
            spacing={0}
            xs={12}
            direction={'row'}
            alignItems={'center'}
          >
            <div>Assumption type:</div>
            {draggedAssumptionTypes.map(
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
              assumptionType={assumptionType}
              period={period}
              percentage={percentage}
              handleChange={this.handleChange}
              categories={categories}
              date={period}
              handleAssumptionTypeChange={this.handleAssumptionTypeChange}
              handleCategoryChange={this.handleCategoryChange}
              reduceAssumptionTypes={reduceAssumptionTypes}
              reduceCategories={reduceCategories}
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
  draggedAssumptionTypes: makeGetDraggedAssumptionTypes(state),
  draggedCategories: makeGetDraggedCategories(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchAssumptionTypes: (): void => dispatch(fetchAssumptionTypes),
  fetchCategories: (): void => dispatch(fetchCategories),
  resetDraggedAssumptionTypes: (): void =>
    dispatch(resetDraggedAssumptionTypes),
  resetDraggedCategories: (): void => dispatch(resetDraggedCategories),
  createAssumption: (): void => dispatch(createAssumption),
  reduceCategories: (): void => dispatch(reduceCategories),
  reduceAssumptionTypes: (): void => dispatch(reduceAssumptionTypes)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(AddAssumption);
