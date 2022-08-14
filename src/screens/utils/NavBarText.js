// Import relevant modules and functions.
import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";

/*
* Adding the design for the text on the bottom navigation bar.
* This includes the size of the text, the position of the text 
* on the page and its colour, depending on if dark mode is 
* activated or not.
*/
export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Text
      style={{
        justifyContent : "center",
        alignItems: "center",
        color: props.focused
          ? isDarkmode
            ? themeColor.white100
            : themeColor.black100
          : "rgb(143, 155, 179)",
        fontSize: 12,
      }}
    >
      {props.title}
    </Text>
  );
};

