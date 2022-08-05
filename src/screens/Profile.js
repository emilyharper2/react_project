import {React, useState, useEffect} from "react";
import { View, Linking, StyleSheet, FlatList, ScrollView, Pressable, Image } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { useNavigation, route } from '@react-navigation/native';
import { render } from "react-dom";
import { db } from "../firebase/config";
import {addDoc, collection, doc, getDocs, onSnapshot, setDoc} from "firebase/firestore";
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
import {
  LineChart,
  BarChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart, 
  PieChart
} from 'react-native-chart-kit'



export default function ({ route, navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const user = firebase.auth().currentUser;
  
  
  const [hsEmissions, setHsEmissions] = useState([]);
  const [commutingEmissions, setCommutingEmissions] = useState([]);
  const [btEmissions, setBtEmissions] = useState([]);
  const [amountHS, setAmountHS] = useState([]);
  const [amountCom, setAmountCom] = useState([]);
  const [amountBT, setAmountBT] = useState([]);
  const [docsHS, setDocsHS] = useState([]);
  const [docsCom, setDocsCom] = useState([]);
  const [docsBT, setDocsBT] = useState([]);


  useEffect(() => {
  hsEmissionsQuery(); 
  }, []);
  
      const hsEmissionsQuery = async () => {
        const hsEmissionsRef = firebase.firestore().collection("Hotel Stays");
        
        hsEmissionsRef.onSnapshot(
                querySnapshot => {
                    let hsEmissions = []
                    let emissionsAmount = 0
                    let count = 0
                    querySnapshot.forEach((doc)=> {
                        let {countryName, emissions, noOfNights} = doc.data()
                        hsEmissions.push({
                            id: doc.id,
                            countryName,
                            emissions,
                            noOfNights,
                        });
                    setHsEmissions(hsEmissions);
                    emissionsAmount = emissionsAmount + parseInt(doc.data().emissions, 0)
                    setAmountHS(emissionsAmount);
                    count = hsEmissions.length;
                    setDocsHS(count);
                    
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
                    let emissionsCommuting = 0
                    let count2 = 0
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
                    count2 = commutingEmissions.length;
                    setDocsCom(count2);
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
                  let emissionsTravel = 0
                  let count3 = 0
                  querySnapshot.forEach((doc)=> {
                        let {transportType2, distanceTravelled2, businessEmissions} = doc.data()
                        btEmissions.push({
                                    id: doc.id,
                                    transportType2,
                                    distanceTravelled2,
                                    businessEmissions
                                });
                            setBtEmissions(btEmissions);
                            emissionsTravel = emissionsTravel + parseInt(doc.data().businessEmissions, 0)
                            setAmountBT(emissionsTravel);
                            count3 = btEmissions.length;
                            setDocsBT(count3);
                            });
                })};

2
const barData = {
  labels: ['Hotel Stays', 'Commuting', 'Business Travel'],
   datasets: [
     {
       data: [docsHS, docsCom, docsBT],
       barColors: ['steelblue', 'cornflowerblue', 'lightskyblue']
     },
     ],
    };

    const pieData = [
      {
        name: 'Hotel Stays',
        emissions: amountHS,
        color: 'steelblue',
        legendFontColor: isDarkmode === true ? 'white' : 'black',
        legendFontSize: 12,
      },
      {
        name: 'Commuting',
        emissions: amountCom,
        color: 'cornflowerblue',
        legendFontColor: isDarkmode === true ? 'white' : 'black',
        legendFontSize: 12,
      },
      {
        name: 'Business Travel',
        emissions: amountBT,
        color: 'lightskyblue',
        legendFontSize: 12,
        legendFontColor: isDarkmode === true ? 'white' : 'black',
      },
    ]
  
  return (
    <Layout>
      <TopNav
        middleContent="Profile"
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
      <Text style={{textAlign: 'center', fontSize: 34, marginTop: 10}}> Welcome to Curoscope</Text>
        <Text style={{textAlign:'center', fontSize: 18, marginTop: 10}}>{user.email}</Text>
      </View>

      <View style ={{
        width : 450,
        height : 300,
        alignItems: 'center',
        marginLeft: -25,
        marginTop: 50
      }}>
        <Text style={{
        textAlign: 'center', fontSize: 20, marginTop: 8
      }}>% of Emissions (kgCO2e)</Text>
      <PieChart style={{
        marginTop: 15
      }}
      data = {pieData}
      width = {340}
      height = {210}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 6
        }
      }}
      accessor = "emissions"
      backgroundColor="transparent"
      paddingLeft= "0"
      avoidFalseZero = {true}
      strokeWidth={16}
      />
    </View>
    <View style={{
      width : 450,
      height : 300,
      alignItems: 'center',
      marginLeft: -34,
      marginTop: -30,
    }}>
      <Text style={{
        textAlign: 'center', fontSize: 20, marginTop: 8
      }}>Number of Recordings</Text>
    <BarChart style={{
      marginTop: 30
    }}
      data = {barData}
      width = {350}
      height = {250}
      chartConfig={{
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        barPercentage: 1.3,
        color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
        labelColor: (opacity = 1) => isDarkmode === true ? 'white' : 'black',
        style: {
          borderRadius: 16
        }
      }}
      fromZero = {true}
      withInnerLines={false}
      />
    </View>
    </ScrollView>
    </Layout>
  );
}