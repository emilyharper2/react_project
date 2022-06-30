import React from "react";
import { View, ScrollView, StyleSheet, Text} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  TopNav,
  themeColor,
  useTheme,
  Section, 
  SectionContent, 
  span
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Information Page"
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
      <ScrollView>
      <View
        style={{
          flex:1, 
          alignItems:"center",
          justifyContent: "center",
          marginHorizontal:20, 
          marginTop: 20,
          backgroundColor: 'steelblue',
          borderRadius: 9,
          //borderWidth: 2,
          //borderColor: 'darkblue',
          shadowColor: '#171717',
          shadowOffset: {width: 4, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}
        >
            <Text style={{fontWeight: 'bold', marginTop: 15, color: 'white', fontSize: 20}}> What are Scope 3 carbon emissions? {'\n'} </Text>
            <Text style={{textAlign: 'justify', marginHorizontal:20, color: 'white',  fontSize: 16}}>Stated by Environmental Protection Agency, Scope 3 emissions are “the result of activities from assets not owned or controlled by the reporting organization but that the organization indirectly impacts in its value chain”. This includes factors such as employee business travel, employee commuting, freighting goods for the company or even employee hotel stays in various countries.
            {'\n'}{'\n'}</Text>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>Why are they important?{'\n'} </Text>
            <Text style={{textAlign: 'justify', marginHorizontal:20, color: 'white', fontSize: 16}}>Studies show that Scope 3 emissions are quickly becoming the largest portion of businesses total GHG emissions due to focussed action on reducing Scope 1 and Scope 2 emissions. For example, it was found that for companies such as BT and Pepsi, Scope 3 emissions account for 90% of the company’s total GHG emissions. Due to the important action that must be taken to reduce these carbon emissions, it is projected that reporting Scope 3 emissions for all companies will become mandatory in the future.
            {'\n'}{'\n'}</Text>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center'}}>How are Scope 3 carbon emissions calculated?{'\n'} </Text>
            <Text style={{textAlign: 'justify', marginHorizontal:20, color: 'white', fontSize: 16}}>Every year, the UK govnerment website uploads a range of Scope 1, 2 and 3 carbon emission conversion factors. These factors are then built into the software and selected based on the information provided by the user. For example, if The Netherlands is selected as the country in which an employee has stayed in a hotel and the user inputs a value of 4 nights, the calculation is as follows:
            {'\n'}{'\n'}</Text>
            <Text style={{fontWeight: 'bold', textAlign:'center', color: 'white', fontSize: 18}}> 4 x 20.9 = 83.6
            {'\n'}{'\n'}</Text>
            <Text style={{textAlign: 'justify', marginHorizontal:20, marginBottom: 15, color: 'white', fontSize: 16}}>where 20.9 is the 2021 conversion factor for the Netherlands.</Text>
        
      </View>
      </ScrollView>
    </Layout>
  );
}
