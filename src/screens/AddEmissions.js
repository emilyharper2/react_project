import React from "react";
import { StyleSheet, View , TouchableOpacity, Image} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { getAuth, signOut } from "firebase/auth";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Layout,
  Button,
  TopNav,
  Section, 
  SectionContent,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native-web";
import App from "../../App";



export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Add Carbon Emissions"
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
      
      <SafeAreaView style={styles.container}>
    <View>
      <Button
        text="Hotel Stays"
        textStyle={{
          fontSize : 20
        }}
        onPress={() => navigation.navigate("HotelStays")}
        style = {styles.roundButton2}
        color = "steelblue"
        />
    </View>
    <View>
      <Button
        text="Commuting"
        textStyle={{
          fontSize : 20
        }}
        color= "cornflowerblue"
        onPress={() => navigation.navigate("Commuting")}
        style = {styles.roundButton2}
      />
    </View>
    <View>
      <Button
        text="Business Travel"
        textStyle={{
          fontSize : 20
        }}
        onPress={() => navigation.navigate("BusinessTravel")}
        style = {styles.roundButton2}
        color = "lightskyblue"
      />
    </View>
  </SafeAreaView>

  </Layout>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20 ,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButton2: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ccc',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
});

