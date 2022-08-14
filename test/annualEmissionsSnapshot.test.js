// Import relevant modules and functions.
import React from 'react';
import renderer from 'react-test-renderer';
import AnnualEmissions from '../src/screens/AnnualEmissions';

/**
 * Conducting a snapshot test for the 'Annual Emissions' page to ensure 
 * the UI does not change unexpectedly.
 */

it('renders correctly', () => {
    const treeThree = renderer
    .create(<AnnualEmissions>Snapshot Test</AnnualEmissions>)
    .toJSON();
    expect(treeThree).toMatchSnapshot();
  });