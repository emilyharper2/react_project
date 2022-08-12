import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AnnualEmissions from '../src/screens/AnnualEmissions';


it('should find the button via testId', () => {
    const naviagation = {navigate: () => {}}
    spyOn(navigation, 'navigate');
    const page = render(<AnnualEmissions/>);

    const hotelButtonFolder = page.getByTestID('hotelButtonFolder');

    fireEvent.press(hotelButtonFolder)
    expect(navigation.navigate).toHaveBeenCalledWith("annualHS");
});