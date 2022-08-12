import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddEmissions from '../src/screens/AddEmissions';


it('should find the button via testId', () => {
    const naviagation = {navigate: () => {}}
    spyOn(navigation, 'navigate');
    const page = render(<AddEmissions/>);

    const hotelButton = page.getByTestID('hotelButton');

    fireEvent.press(hotelButton)
    expect(navigation.navigate).toHaveBeenCalledWith("HotelStays");
});