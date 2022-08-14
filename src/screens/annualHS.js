// Import relevant modules and functions.
import { React,  useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Pressable, 
  Image, 
  ScrollView, 
  RefreshControl
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase/config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { 
  getDoc, 
  QueryDocumentSnapshot, 
  QuerySnapshot, 
  query } from "firebase/firestore";
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import { firebase } from "../firebase/FirebaseConfig";
import { async } from "@firebase/util";
import { DataTable } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
* This page acts as the individual annual emissions page for the 'Hotel Stays'
* Scope 3 category and shows the two user inputs (country and number of nights) 
* as well as the resultant emissions from the calculation. 
*
* The total emissions from all Hotel Stays recordings is then presented under
* the list of recordings. 
*/


export default function ({navigation}) {
  /**
  * Constant variables for this page to allow for dark mode feature,
  * the collection of Hotel Stays recordings and the current amount 
  * of emissions due to the Hotel Stays recordings. 
  */ 
  const { isDarkmode, setTheme } = useTheme();
  const [hotelStays, setHotelStays] = useState([]);
  const [amountHS, setAmountHS] = useState([]);

  /**
  * Code to call and store all recordings in the 'Hotel Stays' collection into 
  * the 'setHotelStays' variable. The country, number of nights and resultant 
  * emissions are all stored. 
  * 
  * The 'emissionsAmount' variable represents the calculation to count all resultant
  * emissions from all recordings in the 'Hotel Stays' collection and is stored
  * in the 'setAmountHS' variable. 
  */

useEffect(() => {
emissionsQuery(); 
}, []);

    const emissionsQuery = async () => {
      const emissionsRef = firebase.firestore().collection("Hotel Stays");
      
      emissionsRef.onSnapshot(
              querySnapshot => {
                  let hotelStays = []
                  let emissionsAmount = 0 
                  querySnapshot.forEach((doc)=> {
                      let {countryName, emissions, noOfNights} = doc.data()
                      hotelStays.push({
                          id: doc.id,
                          countryName,
                          emissions,
                          noOfNights, 
                      });
                  setHotelStays(hotelStays);
                  emissionsAmount = emissionsAmount 
                  + parseInt(doc.data().emissions, 0)
                  setAmountHS(emissionsAmount.toFixed(2));
                  });

      })};

 /**
  * Line 113-180 represents the layout of the page, including the icon for 
  * activating the dark/light mode in the top-right-hand corner and a 'return' 
  * icon in the top-left-hand corner to return to the 'main' annual emissions 
  * page.
  * 
  * The 'Hotel Stays' heading is added, with an image representing the title. 
  * 
  * A Data Table is then created, holding the country user input in the 
  * first cell, the number of nights user input in the second cell and the 
  * resultant emissions in the third.
  * 
  * A View holding the current total of resultant emissions is then added 
  * underneath the DataTable. 
  */

return (
    <Layout>
      <TopNav
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
<ScrollView>

<View 
        style={{
        marginTop: 30,
        marginHorizontal: '10%',
        backgroundColor: 'steelblue',
        borderRadius: 14,
        width: 310,
        height: 75,
        textAlign: 'left',
        flexDirection: 'row',
        shadowColor: '#171717',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
      }}
      >
          <Image
            style={{
              width: 60, 
              height: 50, 
              marginLeft: 25,
              alignSelf: "center",
              marginBottom: 5,
            }}
            source={require('../../assets/hotel.png')}
          />
          <Text
          style={{
            color: 'white',
            alignSelf: "center",
            fontSize: 32,
            marginLeft: 35,
            fontWeight: 'bold'
          }}>
          Hotel Stays 
        </Text>
    </View>

    <View style={styles.container}>
      <View style = {styles.innerContainer}>
    <DataTable >
    <Text style={{
      alignSelf: "center", 
      fontSize: 24, 
      marginTop: 10, 
      color: 'black',  
      fontWeight:'bold', 
      marginBottom: 5
      }}>2022 Recordings</Text>
      <DataTable.Header>
        <DataTable.Title style={{ 
          marginLeft: 6 
          }} 
          textStyle={{
            fontSize: 14, 
            color: 'black', 
            fontWeight:'bold'
            }}>Country</DataTable.Title>
        <DataTable.Title style={{ 
          marginLeft: 40
          }} 
          textStyle={{
            fontSize: 14, 
            color: 'black', 
            fontWeight:'bold'
            }}>Nights</DataTable.Title>
        <DataTable.Title style={{ 
          marginLeft: 20
          }} 
          textStyle={{
            fontSize: 14, 
            color: 'black', 
            fontWeight:'bold'
            }}>kgCO2e</DataTable.Title>
      </DataTable.Header>
      {
        hotelStays.map((item, key) => {
          return (
            <DataTable.Row 
              key={item.id}>
              <DataTable.Cell style={{ 
                marginLeft: 6 
                }}>{item.countryName}</DataTable.Cell>
              <DataTable.Cell style={{ 
                marginLeft: 50 
                }}>{item.noOfNights}</DataTable.Cell>
              <DataTable.Cell style={{ 
                marginLeft: 5 
                }}>{item.emissions}</DataTable.Cell>
              </DataTable.Row>
          )})}
      </DataTable>
    </View>
    </View>
    <View style={styles.container2}>
      <View style={styles.innerContainer}>
      <Text style={{
        textAlign: 'center',
        color: 'black'
      }}>Current Total:   {amountHS} kgCO2e</Text>
      </View>
    </View>
    </ScrollView>
    </Layout>
)};


// StyleSheet used for the styling of the Views in the code. 

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'steelblue',
      padding: 5,
      borderRadius: 15,
      margin: 20,
      marginHorizontal: 25,
      shadowColor: '#171717',
      shadowOffset: {width: 4, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 5,
  },
  innerContainer: {
      backgroundColor: 'ivory',
      alignItems: 'center',
      flexDirection:'column',
      borderRadius: 15,
      padding: 10,
      margin: 2,
  },
  container2: {
  backgroundColor: 'steelblue',
  padding: 5,
  borderRadius: 15,
  margin: 20,
  marginHorizontal: 25,
  shadowColor: '#171717',
  shadowOffset: {width: 4, height: 4},
  shadowOpacity: 0.5,
  shadowRadius: 5,
  marginTop: -5,
  width: 260,
  marginLeft: 100
  },
})

