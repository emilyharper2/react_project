import React from "react";
import renderer from "react-test-renderer";
import App from "./App.js"
import HotelStays from "./src/screens/HotelStays"

it('renders correctly across screens', () => {
    const tree = renderer.create(<HotelStays />).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('given a country and number of nights, calculation() returns 280.000', () => {
    expect(calculation('Argentina', 5)).toBe(280.000);
  });

