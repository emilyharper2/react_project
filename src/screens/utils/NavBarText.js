import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
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

