import * as actions from './userActions';
import expect from 'expect';

describe('user actions', () => {
  it('should create setUser action with snapshot', () => {
    const data = {
      id: 1,
      name: 'Dawid',
    };
    expect(actions.setUser(data)).toMatchSnapshot();
  });
});
