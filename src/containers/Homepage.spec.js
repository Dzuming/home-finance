import React from 'react';
import { create } from 'react-test-renderer';
import Homepage from './Homepage';

const component = create(
   <Homepage/>
);

describe('<Homepage />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

