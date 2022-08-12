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
import { fontSize } from "react-native-rapi-ui/constants/typography";



export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
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
      <TouchableOpacity
        onPress={() => navigation.navigate("HotelStays")}
        style = {styles.roundButton2}
        testID = "hotelButton"
        >
      <Image
            style={{
              width: 70, 
              height: 60, 
              //borderRadius: 10,
              //marginTop: 5,
              marginLeft: -150,
              marginTop: -20
              
            }}
            source={require('../../assets/hotel.png')}
          />    
          <Text style={{
            color: 'white',
            fontSize: 26,
            marginLeft: 95,
            marginTop: -40
          }}>Hotel Stays</Text>
        </TouchableOpacity>
        
        
    </View>
    <View>
    <TouchableOpacity
        onPress={() => navigation.navigate("Commuting")}
        style = {styles.roundButton3}
        >
      <Image
            style={{
              width: 90, 
              height: 35, 
              //borderRadius: 10,
              //marginTop: 5,
              marginLeft: -150,
              marginTop: -10
              
            }}
            source={require('../../assets/car2.png')}
          />    
          <Text style={{
            color: 'white',
            fontSize: 26,
            marginLeft: 110,
            marginTop: -30
          }}>Commuting</Text>
        </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity
        onPress={() => navigation.navigate("BusinessTravel")}
        style = {styles.roundButton4}
        >
      <Image
            style={{
              width: 70, 
              height: 70, 
              //borderRadius: 10,
              //marginTop: 5,
              marginLeft: -170,
              marginTop: -20
              
            }}
            source={require('../../assets/travel2.png')}
          />    
          <Text style={{
            color: 'white',
            fontSize: 26,
            marginLeft: 105,
            marginTop: -50
          }}>Business Travel</Text>
        </TouchableOpacity>
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
    marginLeft: 8,
    width: 340,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 60,
    backgroundColor: 'steelblue',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  roundButton3: {
    marginTop: 20,
    marginLeft: 8,
    width: 340,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 60,
    backgroundColor: 'cornflowerblue',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  roundButton4: {
    marginTop: 20,
    marginLeft: 8,
    width: 340,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 60,
    backgroundColor: 'lightskyblue',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
});

