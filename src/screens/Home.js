import { React, useState, useEffect} from "react";
import { View, Linking, StyleSheet, FlatList, ScrollView, Pressable} from "react-native";
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




export default function ({ route, navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [liked, setLiked] = useState(false);
  const [liked2, setLiked2] = useState(false);
  const [liked3, setLiked3]= useState(false);
  
  const [hsEmissions, setHsEmissions] = useState([]);
  const [commutingEmissions, setCommutingEmissions] = useState([]);
  const [btEmissions, setBtEmissions] = useState([]);


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



  return (
    <Layout>
      <TopNav
      middleContent="Newsfeed"
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
     <View style={{
      marginTop: 15,
      padding:10
     }}>
     {hsEmissions.map((hsEmission) => {
        return (
          <View style={{backgroundColor: 'steelblue',padding: 18,
          borderRadius: 5,
          margin: 8,
          marginHorizontal: 10,
          shadowColor: '#171717',
          shadowOffset: {width: 4, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 5,
          }}>
            <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>{hsEmission.emissions} kgCO2e was added to the Hotel Stays sector. {'\n'}</Text>
            <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>Country: {hsEmission.countryName}     |    Nights: {hsEmission.noOfNights} nights</Text> 

            <Pressable style={{marginTop: 10, marginBottom: -6, marginLeft: -4}}
            onPress={() => setLiked((isLiked) => !isLiked)}>
            <MaterialCommunityIcons
            name={liked ? "thumb-up" : "thumb-up-outline"}
            size={22}
            color={liked ? "white" : "white"}
            
      />
    </Pressable>
          </View>
        );
     })}
        {commutingEmissions.map((commutingEmission) => {
          return (
            <View style={{backgroundColor: 'cornflowerblue',padding: 15,
            borderRadius: 5,
            margin: 8,
            marginHorizontal: 10,
            shadowColor: '#171717',
            shadowOffset: {width: 4, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 5,}}>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>{commutingEmission.comEmissions} kgCO2e was added to the Commuting sector. {'\n'}</Text>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}> Transport: {commutingEmission.transportType}    |   Distance: {commutingEmission.distanceTravelled} km</Text>
              <Pressable style={{marginTop: 10, marginBottom: -6, marginLeft: -4}}
            onPress={() => setLiked2((isLiked) => !isLiked)}>
            <MaterialCommunityIcons
            name={liked ? "thumb-up" : "thumb-up-outline"}
            size={22}
            color={liked ? "white" : "white"}
            
      />
    </Pressable>
            
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
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}>{btEmission.businessEmissions} kgCO2e was added to the Commuting sector. {'\n'}</Text>
              <Text style ={{color: 'white', alignItems:'center', textAlign:'center'}}> Transport: {btEmission.transportType2}    |   Distance: {btEmission.distanceTravelled2} km</Text>
              <Pressable style={{marginTop:6, marginLeft: -4}}
            onPress={() => setLiked((isLiked) => !isLiked)}>
            <MaterialCommunityIcons
            name={liked ? "thumb-up" : "thumb-up-outline"}
            size={22}
            color={liked ? "white" : "white"}
            
      />
    </Pressable>
            
            </View>
          );
        })}
      </View>
    </ScrollView>

    </Layout>

  )};
const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },

  container: {
    backgroundColor: 'steelblue',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
},

innerContainer: {
    alignItems: 'center',

},

itemHeading: {
    fontWeight: 'bold',
},

itemText: {
    fontWeight:'300',
}
});

