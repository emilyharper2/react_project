// Import relevant modules and functions.
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";

/**
* Creating a function for a loading message to appear when requireed during 
* the navigation of application pages.
*/

export default function ({ navigation }) {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </Layout>
  );
}
