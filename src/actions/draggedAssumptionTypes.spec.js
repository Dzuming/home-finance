import * as actions from './draggedAssumptionTypes';

describe('drag actions', () => {
  it('it should create removeAssumptionType action with a snapshot', () => {
    expect(actions.reduceAssumptionTypes()).toMatchSnapshot();
  });

  it('it should create resetDraggedAssumptionType action with a snapshot', () => {
    expect(actions.resetDraggedAssumptionTypes()).toMatchSnapshot();
  });
});
