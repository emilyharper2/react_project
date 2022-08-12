import React from 'react';
import renderer from 'react-test-renderer';
import AddEmissions from '../src/screens/AddEmissions';

it('renders correctly', () => {
    const treeTwo = renderer.create(<AddEmissions>Snapshot Test</AddEmissions>).toJSON();
    expect(treeTwo).toMatchSnapshot();
  });