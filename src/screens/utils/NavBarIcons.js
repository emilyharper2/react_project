import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Ionicons
      name={props.icon}
      style={{ marginBottom: -2}}
      size={28}
      color={
        props.focused
          ? isDarkmode
            ? themeColor.white100
            : themeColor.black100
          : "rgb(143, 155, 179)"
      }
    />
  );
};