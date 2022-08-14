// Import relevant modules and functions.
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddEmissions from '../src/screens/AddEmissions';

/**
 * Testing the Hotel Stays button on the 'Add Emissions' page, should 
 * navigate the user to the 'HotelStays' page.
 */
it('should find the button via testId', () => {
    const naviagation = {navigate: () => {}}
    spyOn(navigation, 'navigate');
    const page = render(<AddEmissions/>);

    const hotelButton = page.getByTestID('hotelButton');

    fireEvent.press(hotelButton)
    expect(navigation.navigate).toHaveBeenCalledWith("HotelStays");
});