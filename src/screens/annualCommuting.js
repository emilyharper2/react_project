// Import relevant modules and functions.
import {React,  useEffect, useState} from "react";
import { View , FlatList, StyleSheet, Pressable, Image, ScrollView, RefreshControl} from "react-native";
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
import {addDoc, collection, doc, getDocs, setDoc} from "firebase/firestore";
import { getDoc, QueryDocumentSnapshot, QuerySnapshot, query } from "firebase/firestore";
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import {firebase} from "../firebase/FirebaseConfig";
import { async } from "@firebase/util";
import { DataTable } from "react-native-paper";

/*
* This page acts as the individual annual emissions page for the 'Commuting'
* Scope 3 category and shows the two user inputs (transport type and distance) as
* well as the resultant emissions from the calculation. 
*
* The total emissions from all Commuting recordings is then presented under
* the list of recordings. 
*/

export default function ({ navigation }) {
  /*
  * Constant variables for this page to allow for dark mode feature,
  * the collection of commuting recordings and the current amount 
  * of emissions due to the commuting recordings. 
  */ 
  const { isDarkmode, setTheme } = useTheme();
  const [commutingEmissions, setCommutingEmissions] = useState([]);
  const [amountCom, setAmountCom] = useState([]);

  /*
  * Code to call and store all recordings in the 'Commuting' collection into 
  * the 'setCommutingEmissions' variable. The tranport type, distance travelled and resultant 
  * emissions are all stored. 
  * 
  * The 'emissionsCommuting' variable represents the calculation to count all resultant
  * emissions from all recordings in the 'Commuting' collection and is stored in the 
  * 'setAmountCom' variable. 
  */

  useEffect(() => {
    commutingQuery(); 
    }, []);
      
          const commutingQuery = async () => {
          const commutingRef = firebase.firestore().collection("Commuting");
            
            commutingRef.onSnapshot(
                    querySnapshot => {
                        let commutingEmissions = []
                        let emissionsCommuting = 0
                        querySnapshot.forEach((doc)=> {
                            let {transportType, distanceTravelled, comEmissions} = doc.data()
                            commutingEmissions.push({
                                id: doc.id,
                                transportType,
                                distanceTravelled,
                                comEmissions, 
                            });
                        setCommutingEmissions(commutingEmissions);
                        emissionsCommuting = emissionsCommuting + parseInt(doc.data().comEmissions, 0)
                        setAmountCom(emissionsCommuting);
                        });
      
            })};

  /*
  * Line 98-123 represents the layout of the page, including the icon for 
  * activating the dark/light mode in the top-right-hand corner and a 'return' icon
  * in the top-left-hand corner to return to the 'main' annual emissions page.
  * 
  * The 'Commuting' heading is added, with an image representing the title. 
  * 
  * A Data Table is then created, holding the transport mode user input in the 
  * first cell, the distance user input in the second cell and the resultant 
  * emissions in the third.
  * 
  * A View holding the current total of resultant emissions is then added underneath
  * the DataTable. 
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
        backgroundColor: 'cornflowerblue',
        borderRadius: 14,
        width: 310,
        height:75,
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
              width: 75, 
              height: 30, 
              marginLeft: 22,
              alignSelf: "center",
              marginBottom: 4,
              
            }}
            source={require('../../assets/car2.png')}
          />
          <Text
          style={{
            color: 'white',
            alignSelf: "center",
            fontSize: 32,
            marginLeft: 22,
            fontWeight: 'bold'
          }}>
          Commuting
        </Text>
    </View>

    <View style={styles.container}>
      <View style = {styles.innerContainer}>

    <DataTable >
    <Text style={{alignSelf: "center", fontSize: 24, marginTop: 10, color: 'black', fontWeight:'bold', marginBottom: 5}}> 2022 Recordings</Text>
      <DataTable.Header>
        <DataTable.Title style={{ marginLeft: 2 , marginRight: 18}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>Transport</DataTable.Title>
        <DataTable.Title style={{ marginLeft: 35, marginRight: 36}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>Distance</DataTable.Title>
        <DataTable.Title style={{ marginLeft: 2}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>kgCO2e</DataTable.Title>
      </DataTable.Header>
      {
        commutingEmissions.map((item, key) => {
          return (
            <DataTable.Row 
              key={item.id}>
              <DataTable.Cell>{item.transportType}</DataTable.Cell>
              <DataTable.Cell>           {item.distanceTravelled} km </DataTable.Cell>
              <DataTable.Cell>           {item.comEmissions}</DataTable.Cell>
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
      }}>Current Total:   {amountCom} kgCO2e</Text>
      </View>
    </View>
    </ScrollView>
    </Layout>
)};

/*
* StyleSheet used for the styling of the Views in the code. 
*/ 
const styles = StyleSheet.create({
  container: {
      backgroundColor: 'cornflowerblue',
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
  backgroundColor: 'cornflowerblue',
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
});