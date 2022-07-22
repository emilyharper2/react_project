import React, { useEffect, useState, document , querySelector, getElementByID} from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";



export default function ({navigation}) {

  const { isDarkmode, setTheme } = useTheme();
  const [users, setUsers] = useState([]);

useEffect(() => {
emissionsQuery(); 
}, []);

    const emissionsQuery = async () => {
      const emissionsRef = firebase.firestore().collection("Hotel Stays");
      
      emissionsRef.onSnapshot(
              querySnapshot => {
                  let users = []
                  querySnapshot.forEach((doc)=> {
                      let {countryName, emissions, noOfNights} = doc.data()
                      users.push({
                          id: doc.id,
                          countryName,
                          emissions,
                          noOfNights, 
                      });
                  setUsers(users);
                  console.log(users)
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
        backgroundColor: 'steelblue',
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
              width: 60, 
              height: 50, 
              //borderRadius: 10,
              //marginTop: 5,
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
    <Text style={{alignSelf: "center", fontSize: 24, marginTop: 10, color: 'black', textDecorationLine: 'underline', fontWeight:'bold'}}> 2022 Recordings</Text>
      <DataTable.Header>
        <DataTable.Title style={{ marginLeft: 6 }} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>Country</DataTable.Title>
        <DataTable.Title style={{ marginLeft: 40}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>Nights</DataTable.Title>
        <DataTable.Title style={{ marginLeft: 20}} textStyle={{fontSize:14, color: 'black', fontWeight:'bold'}}>kgCO2e</DataTable.Title>
      </DataTable.Header>
      {
        users.map((item, key) => {
          return (
            <DataTable.Row 
              key={item.id}>
              <DataTable.Cell style={{  marginLeft: 6 }}>{item.countryName}</DataTable.Cell>
              <DataTable.Cell style={{  marginLeft: 50 }}>{item.noOfNights}</DataTable.Cell>
              <DataTable.Cell style={{  marginLeft: 5 }}>{item.emissions}</DataTable.Cell>
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
      margin: 8,

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
})

