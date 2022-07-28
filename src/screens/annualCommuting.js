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
  const [commutingEmissions, setCommutingEmissions] = useState([]);
  const [amountCom, setAmountCom] = useState([]);

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
              //borderRadius: 10,
              //marginTop: 5,
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
              <DataTable.Cell style={{  }}>{item.transportType}</DataTable.Cell>
              <DataTable.Cell style={{ }}>           {item.distanceTravelled} km </DataTable.Cell>
              <DataTable.Cell style={{  }}>           {item.comEmissions}</DataTable.Cell>
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

  itemHeading: {
      fontWeight: 'bold',
  },

  itemText: {
      fontWeight:'300',
  },

  row: {
    flex: 1,
    justifyContent: "space-around"
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