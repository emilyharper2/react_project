import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Register from '../src/screens/auth/Register';


it('should find the button via testId', () => {
    const naviagation = {navigate: () => {}}
    spyOn(navigation, 'navigate');
    const page = render(<Register/>);

    const registerButton = page.getByTestID('registerButton');

    fireEvent.press(registerButton)
    expect(navigation.navigate).toHaveBeenCalledWith("Home");
});