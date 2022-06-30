import React from "react";
import { View, Linking, StyleSheet} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { useNavigation, route } from '@react-navigation/native';
import { render } from "react-dom";


export default function ({ route, navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();



  return (
    <Layout>
      <TopNav
        //middleContent="Add Carbon Emissions"
        leftContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={25}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}

        rightContent={
          <Ionicons 
            name = {"log-out"}
            size ={30}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
                signOut(auth);
              }}

      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* This text using ubuntu font */}
        <Text fontWeight="bold">This is the Newsfeed</Text>
        </View>
    
      

    </Layout>
  );
      }

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});

