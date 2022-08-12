import React from 'react';
import Information from '../src/screens/Information';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Information>Snapshot Test</Information>).toJSON();
  expect(tree).toMatchSnapshot();
});