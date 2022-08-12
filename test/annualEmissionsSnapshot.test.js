import React from 'react';
import renderer from 'react-test-renderer';
import AnnualEmissions from '../src/screens/AnnualEmissions';

it('renders correctly', () => {
    const treeThree = renderer.create(<AnnualEmissions>Snapshot Test</AnnualEmissions>).toJSON();
    expect(treeThree).toMatchSnapshot();
  });