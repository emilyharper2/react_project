// Import relevant modules and functions.
import React from 'react';
import Information from '../src/screens/Information';
import renderer from 'react-test-renderer';

/**
 * Conducting a snapshot test for the 'Information' page to ensure 
 * the UI does not change unexpectedly.
 */

it('renders correctly', () => {
  const tree = renderer
  .create(<Information>Snapshot Test</Information>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});