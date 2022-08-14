// Import relevant modules and functions.
import { React, useState, useEffect} from "react";
import { View, Linking, StyleSheet, FlatList, ScrollView, Pressable, Image} from "react-native";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
* This page represents the Homepage of the application. Any emissions that are recorded
* are displayed on this page, accessing the collections in the database for each of the 
* Scope 3 categories. 
*
* The recordings are presented as a post and display the two user inputs, the resultant 
* emissions and the category name within the post. 
*/

export default function ({ route, navigation }) {
  /** 
  * Constant variables for this page to allow for dark mode feature
  * and logout button. 
  * 
  * As well as this, constant variables to hold all recordings from 
  * the Hotel Stays, Commuting and Business Travel categories.
  */ 
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [hsEmissions, setHsEmissions] = useState([]);
  const [commutingEmissions, setCommutingEmissions] = useState([]);
  const [btEmissions, setBtEmissions] = useState([]);

 /*
  * Code to call and store all recordings in the 'Hotel Stays' collection into 
  * the 'setHsEmissions' variable. The country, number of nights and resultant 
  * emissions are all stored. 
  */

  useEffect(() => {
  hsEmissionsQuery(); 
  }, []);
  
      const hsEmissionsQuery = async () => {
        const hsEmissionsRef = firebase.firestore().collection("Hotel Stays");
        
        hsEmissionsRef.onSnapshot(
                querySnapshot => {
                    let hsEmissions = []
                    querySnapshot.forEach((doc)=> {
                        let {countryName, emissions, noOfNights} = doc.data()
                        hsEmissions.push({
                            id: doc.id,
                            countryName,
                            emissions,
                            noOfNights, 
                        });
                    setHsEmissions(hsEmissions)
                    });
  
        })};

 /*
  * Code to call and store all recordings in the 'Commuting' collection into 
  * the 'setCommutingEmissions' variable. The tranport type, distance travelled and 
  * resultant emissions are all stored. 
  */

useEffect(() => {
commutingQuery(); 
}, []);
  
      const commutingQuery = async () => {
      const commutingRef = firebase.firestore().collection("Commuting");
        
        commutingRef.onSnapshot(
                querySnapshot => {
                    let commutingEmissions = []
                    querySnapshot.forEach((doc)=> {
                        let {transportType, distanceTravelled, comEmissions} = doc.data()
                        commutingEmissions.push({
                            id: doc.id,
                            transportType,
                            distanceTravelled,
                            comEmissions, 
                        });
                    setCommutingEmissions(commutingEmissions);
                    
                    });
  
        })};

/*
  * Code to call and store all recordings in the 'Business Travel' collection into 
  * the 'setBtEmissions' variable. The tranport type, distance travelled and resultant 
  * emissions are all stored. 
  */

 useEffect(() => {
 btEmissionsQuery(); 
 }, []);
          
    const btEmissionsQuery = async () => {
      const btEmissionsRef = firebase.firestore().collection("Business Travel");
                
        btEmissionsRef.onSnapshot(
              querySnapshot => {
                  let btEmissions = []
                  querySnapshot.forEach((doc)=> {
                        let {transportType2, distanceTravelled2, businessEmissions} = doc.data()
                        btEmissions.push({
                                    id: doc.id,
                                    transportType2,
                                    distanceTravelled2,
                                    businessEmissions
                                });
                            setBtEmissions(btEmissions);
                            });
          
                })};
/*
* Line 148-202 represents the layout of the page, including the icon for 
* activating the dark/light mode in the top left corner and the icon
* for logging out in the top right hand corner.
*
* The 'Curoscope' logo is added at the top of the page as well as the title
* 'Latest Emission Recordings' 
*
* After the design, each category recording variable is mapped to a view and 
* designed accordingly. 
*/ 

  return (
    <Layout>
      <TopNav
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
      <Text style={{textAlign: 'center', fontSize: 28, marginTop: 10}}> Latest Emission Recordings</Text>
      </View>

     <View style={{
      marginTop: 15,
      padding:10
     }}>
     {hsEmissions.map((hsEmission) => {
        return (
          <View style={{backgroundColor: 'steelblue',padding: 15,
          borderRadius: 5,
          margin: 8,
          marginHorizontal: 10,
          borderRadius: 5,
          shadowColor: '#171717',
          shadowOffset: {width: 4, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 5,}}>
            
            <Text style ={{color: 'white', alignItems:'center', textAlign:'center', marginHorizontal: 8}}>{hsEmission.emissions} kgCO2e was added to the Hotel Stays sector. {'\n'}</Text>
            <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>Country: {hsEmission.countryName}     |    Nights: {hsEmission.noOfNights} nights</Text> 

          </View>
        );
     })}
        {commutingEmissions.map((commutingEmission) => {
          return (
            <View 
            style={{backgroundColor: 'cornflowerblue',padding: 15,
            borderRadius: 5,
            margin: 8,
            marginHorizontal: 10,
            shadowColor: '#171717',
            shadowOffset: {width: 4, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 5,}}>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>{commutingEmission.comEmissions} kgCO2e was added to the Commuting sector. {'\n'}</Text>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}> Transport: {commutingEmission.transportType}    |   Distance: {commutingEmission.distanceTravelled} km</Text>
              
            
            </View>
          );
        })}
        {btEmissions.map((btEmission) => {
          return (
            <View style={{backgroundColor: 'lightskyblue',padding: 15,
            borderRadius: 5,
            margin: 8,
            marginHorizontal: 10,
            shadowColor: '#171717',
            shadowOffset: {width: 4, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 5,}}>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>{btEmission.businessEmissions} kgCO2e was added to the Business Travel sector. {'\n'}</Text>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}> Transport: {btEmission.transportType2}    |   Distance: {btEmission.distanceTravelled2} km</Text>
              
            
            </View>
          );
        })}
      </View>
    </ScrollView>

    </Layout>

  )};

// Style sheet for designing code on this page.   
const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10
  },
  container: {
    backgroundColor: 'steelblue',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10
},
innerContainer: {
    alignItems: 'center'
},
itemHeading: {
    fontWeight: 'bold',
},
itemText: {
    fontWeight:'300',
}
});

