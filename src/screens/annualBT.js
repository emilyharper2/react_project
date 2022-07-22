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

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [travel, setTravel] = useState([]);

useEffect(() => {
travelQuery(); 
}, []);

    const travelQuery = async () => {
      const travelRef = firebase.firestore().collection("Business Travel");
      
      travelRef.onSnapshot(
              querySnapshot => {
                  const travel = []
                  querySnapshot.forEach((doc)=> {
                      const {transportType2, distanceTravelled2, businessEmissions} = doc.data()
                      travel.push({
                          id: doc.id,
                          transportType2,
                          distanceTravelled2,
                          businessEmissions 
                      });
                  setTravel(travel);
                  });

      })};

  return (
    <Layout>
      <TopNav
        //middleContent="Hotel Stays"
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
        backgroundColor: 'lightskyblue',
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
              width: 55, 
              height: 58, 
              //borderRadius: 10,
              //marginTop: 5,
              marginLeft: 22,
              alignSelf: "center",
              marginBottom: 4,
              
            }}
            source={require('../../assets/travel2.png')}
          />
          <Text
          style={{
            color: 'white',
            alignSelf: "center",
            fontSize: 32,
            marginLeft: 18,
            fontWeight: 'bold'
          }}>
          Business Travel 
        </Text>
    </View>

  

    <View style={styles.container}>
      <View style = {styles.innerContainer}>

    <DataTable >
    <Text style={{alignSelf: "center", fontSize: 24, marginTop: 10, color: 'black', textDecorationLine: 'underline', fontWeight:'bold'}}> 2022 Recordings</Text>
      <DataTable.Header>
        <DataTable.Title style={{ marginLeft: 2 , marginRight: 18}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>Transport</DataTable.Title>
        <DataTable.Title style={{ marginLeft: 35, marginRight: 36}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>Distance</DataTable.Title>
        <DataTable.Title style={{ marginLeft: 2}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>kgCO2e</DataTable.Title>
      </DataTable.Header>
      {
        travel.map((item, key) => {
          return (
            <DataTable.Row 
              key={item.id}>
              <DataTable.Cell style={{  }}>{item.transportType2}</DataTable.Cell>
              <DataTable.Cell style={{ }}>           {item.distanceTravelled2} km </DataTable.Cell>
              <DataTable.Cell style={{  }}>           {item.businessEmissions}</DataTable.Cell>
              </DataTable.Row>
          )})}
      </DataTable>
    </View>
    </View>
    </ScrollView>
    

    </Layout>

)};


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'lightskyblue',
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
      padding: 5,
      margin: 4,

  },

  itemHeading: {
      fontWeight: 'bold',
  },

  itemText: {
      fontWeight:'300',
  },

  row: {
    flex: 1,
    justifyContent: "space-around"
}
});