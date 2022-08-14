// Import relevant modules and functions.
import React from "react";
import { View, ScrollView, StyleSheet, Text, Image} from "react-native";
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

/** 
 * This page represents the Information page for the application. 
*/
 
export default function ({ navigation }) {
  /** 
  * Constant variables for this page to allow for dark mode feature
  * and logout button. 
  */
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();

  /**
  * Line 41-95 represents the layout of the page, including the icon for 
  * activating the dark/light mode in the top left corner and the icon
  * for logging out in the top right hand corner.
  *
  * The 'Curoscope' logo is added at the top of the page as well as the title
  * 'Curoscope FAQs' 
  *
  * After the design, a list of questions related to Scope 3 carbon emissions
  * along with the answersa are added. 
  */ 

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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                marginTop: 30,
                height: 135,
                width: 230,
                
              }}
              source={require("../../assets/newsplash.png")}
            />
          </View>

      <View>
      <Text style={{
        textAlign: 'center', 
        fontSize: 28, 
        marginTop: 10, 
        color: isDarkmode === true ? 'white' : 'black'
        }}>Curoscope FAQs</Text>
      </View>
      <View
        style={{ 
          alignItems:"center",
          justifyContent: "center",
          marginHorizontal: 20, 
          marginTop: 30,
          backgroundColor: 'white',
          borderRadius: 5,
          borderWidth: 1.5,
          borderColor: 'steelblue',
        }}
        >
            <Text style={{
              fontWeight: 'bold', 
              marginTop: 10, 
              color: 'black', 
              fontSize: 20
              }}> What are Scope 3 carbon emissions? </Text>
            <Text style={{
              textAlign: 'justify', 
              marginHorizontal: 20, 
              color: 'black',  
              fontSize: 16, 
              marginBottom: 10, 
              marginTop:10}}>Stated by Environmental Protection Agency, 
              Scope 3 emissions are “the result of activities from assets 
              not owned or controlled by the reporting organization but that the 
              organization indirectly impacts in its value chain”. This 
              includes factors such as employee business travel, employee 
              commuting, freighting goods for the company or even employee 
              hotel stays in various countries.</Text>

</View>
<View style={{ 
          alignItems:"center",
          justifyContent: "center",
          marginHorizontal: 20, 
          marginTop: 20,
          backgroundColor: 'white',
          borderRadius: 5,
          borderWidth: 1.5,
          borderColor: 'steelblue',
        }}>
            <Text style={{
              fontWeight: 'bold', 
              color: 'black', 
              fontSize: 20, 
              marginTop: 10}}>Why are they important? </Text>
            <Text style={{
              textAlign: 'justify', 
              marginHorizontal: 20, 
              color: 'black', 
              fontSize: 16,  
              marginBottom: 10, 
              marginTop: 10}}>Studies show that Scope 3 emissions are quickly
               becoming the largest portion of businesses total GHG emissions 
               due to focussed action on reducing Scope 1 and Scope 2 emissions. 
               For example, it was found that for companies such as BT and Pepsi, 
               Scope 3 emissions account for 90% of the companys' total GHG 
               emissions. Due to the important action that must be taken to 
               reduce these carbon emissions, it is projected that reporting 
               Scope 3 emissions for all companies will become mandatory in the 
               future.
            </Text>
</View>
<View style={{ 
          alignItems:"center",
          justifyContent: "center",
          marginHorizontal: 20, 
          marginTop: 20,
          backgroundColor: 'white',
          borderRadius: 5,
          borderWidth: 1.5,
          borderColor: 'steelblue',
        }}>
            <Text style={{
              fontWeight: 'bold', 
              color: 'black', 
              fontSize: 20, 
              textAlign: 'center', 
              marginTop:10
              }}>How are Scope 3 carbon emissions calculated? </Text>
            <Text style={{
              textAlign: 'justify', 
              marginHorizontal: 20, 
              color: 'black', 
              fontSize: 16, 
              marginTop: 10}}>Every year, the UK govnerment website uploads a 
              range of Scope 1, 2 and 3 carbon emission conversion factors. 
              These factors are then built into the software and selected 
              based on the information provided by the user. For example, 
              if The Netherlands is selected as the country in which an 
              employee has stayed in a hotel and the user inputs a value of 
              4 nights, the calculation is as follows:
            </Text>
            <Text style={{
              textAlign:'center', 
              color: 'black', 
              fontSize: 16, 
              marginTop: 10}}> 4 x 20.9 = 83.6 kgCO2e
            </Text>
            <Text style={{
              textAlign: 'justify', 
              marginHorizontal: 20, 
              marginBottom: 15, 
              color: 'black', 
              fontSize: 16, 
              marginTop: 10}}>where 20.9 is the 2021 conversion factor for 
              the Netherlands.</Text>
        </View>
      </ScrollView>
    </Layout>
  );
}
