// Import relevant modules and functions.
import React from 'react';
import renderer from 'react-test-renderer';
import AddEmissions from '../src/screens/AddEmissions';

/**
 * Conducting a snapshot test for the 'Add Emissions' page to ensure 
 * the UI does not change unexpectedly.
 */

it('renders correctly', () => {
    const treeTwo = renderer.create(<AddEmissions>Snapshot Test</AddEmissions>).toJSON();
    expect(treeTwo).toMatchSnapshot();
  });