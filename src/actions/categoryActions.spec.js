import * as actions from "./categoryActions";

describe('finance flow actions', () => {
  it('should create SET_CATEGORIES action with snapshot', () => {
    expect(
      actions.setCategories({ id: 1, name: 'jedzenie' }),
    ).toMatchSnapshot();
  });
  it('should create selectCategoryType action with snapshot', () => {
    expect(actions.selectCategoryType()).toMatchSnapshot();
  });

  it('should create resetCategories action with snapshot', () => {
    expect(actions.resetDraggedCategories()).toMatchSnapshot();
  });
});
