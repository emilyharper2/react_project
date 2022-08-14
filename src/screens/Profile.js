// Import relevant modules and functions.
import { React, useState, useEffect } from "react";
import { 
  View, 
  Linking, 
  StyleSheet, 
  FlatList, 
  ScrollView, 
  Pressable, 
  Image 
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
import { useRoute } from '@react-navigation/native';
import { useNavigation, route } from '@react-navigation/native';
import { render } from "react-dom";
import { db } from "../firebase/config";
import { 
  addDoc, 
  collection, 
  doc, 
  getDocs, 
  onSnapshot, 
  setDoc
} from "firebase/firestore";
import { 
  getDoc, 
  QueryDocumentSnapshot, 
  QuerySnapshot, 
  query 
} from "firebase/firestore";
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

/**
* This page represents the Profile page of the application. Any emissions 
* recorded are displayed on this page in an analytical graph, accessing 
* the collections in the database for each of the Scope 3 categories. 
*
* The two graphs created include a pie chart displaying the percentage of 
* emissions that each category is responsible for and a bar chart showing 
* the number of recordings for each category. 
*/

export default function ({ route, navigation }) {
  /** 
  * Constant variables for this page to allow for dark mode feature
  * and logout button. 
  * 
  * As well as this, the users username is called and displayed at the top 
  * the page.
  */ 
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const user = firebase.auth().currentUser;
  /**
  * Constant variables to hold all recordings from 
  * the Hotel Stays, Commuting and Business Travel categories.
  * Constant variables to also hold the total amount of emissions
  * from all recordings of a specific cateogry as well as the number
  * of documents in each Scope 3 collection in the database.
  */
  const [hsEmissions, setHsEmissions] = useState([]);
  const [commutingEmissions, setCommutingEmissions] = useState([]);
  const [btEmissions, setBtEmissions] = useState([]);
  const [amountHS, setAmountHS] = useState([]);
  const [amountCom, setAmountCom] = useState([]);
  const [amountBT, setAmountBT] = useState([]);
  const [docsHS, setDocsHS] = useState([]);
  const [docsCom, setDocsCom] = useState([]);
  const [docsBT, setDocsBT] = useState([]);

  /**
  * Code to call and store all recordings in the 'Hotel Stays' collection into 
  * the 'setHsEmissions' variable. The country, number of nights and resultant 
  * emissions are all stored. The 'emissionsAmount' variable holds the 
  * calculation to add all resultant emissions in the collection and the 
  * 'count' variable finds the length of the collection. This is then stored 
  * in the 'setDocsHS' variable. 
  */

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
                    emissionsAmount = emissionsAmount 
                    + parseInt(doc.data().emissions, 0)
                    setAmountHS(emissionsAmount);
                    count = hsEmissions.length;
                    setDocsHS(count);
                    
                  });
  
                })};

/**
  * Code to call and store all recordings in the 'Commuting' collection into 
  * the 'setCommutingEmissions' variable. The tranport type, distance travelled
  * and resultant emissions are all stored. The 'emissionsCommuting' variable 
  * displays the calculation to add all resultant emissions in the collection 
  * and the 'count2' variable finds the length of the collection. This is then 
  * stored in the 'setDocsCom' variable. 
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
                    let count2 = 0
                    querySnapshot.forEach((doc)=> {
                        let {
                          transportType, 
                          distanceTravelled, 
                          comEmissions
                        } = doc.data()
                        commutingEmissions.push({
                            id: doc.id,
                            transportType,
                            distanceTravelled,
                            comEmissions, 
                        });
                    setCommutingEmissions(commutingEmissions);
                    emissionsCommuting = emissionsCommuting 
                    + parseInt(doc.data().comEmissions, 0)
                    setAmountCom(emissionsCommuting);
                    count2 = commutingEmissions.length;
                    setDocsCom(count2);
                    });
  
        })};

/**
  * Code to call and store all recordings in the 'Business Travel' collection
  * into the 'setBtEmissions' variable. The tranport type, distance travelled 
  * and resultant emissions are all stored. The 'emissionsTravel' variable 
  * displays the calculation to add all resultant emissions in the collection 
  * and the 'count3' variable finds the length of the collection. This is then 
  * stored in the 'setDocsBT' variable. 
  */

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
                        let {
                          transportType2, 
                          distanceTravelled2, 
                          businessEmissions
                        } = doc.data()
                        btEmissions.push({
                                    id: doc.id,
                                    transportType2,
                                    distanceTravelled2,
                                    businessEmissions
                                });
                            setBtEmissions(btEmissions);
                            emissionsTravel = emissionsTravel 
                            + parseInt(doc.data().businessEmissions, 0)
                            setAmountBT(emissionsTravel);
                            count3 = btEmissions.length;
                            setDocsBT(count3);
                            });
                })};

/**
 * The data is then added to the bar and pie chart functions, designing
 * graphs accordingly. 
 */
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
  
  /**
  * Line 270-316 represents the layout of the page, including the icon for 
  * activating the dark/light mode in the top left corner and the icon
  * for logging out in the top right hand corner.
  *
  * The 'Curoscope' logo is added at the top of the page as well as the title
  * 'Welcome to Curoscope' 
  *
  * The users username is then displayed underneath this. 
  */ 
  
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
      <Text style={{
        textAlign: 'center', 
        fontSize: 34, 
        marginTop: 10
        }}> Welcome to Curoscope</Text>
        <Text style={{
          textAlign:'center', 
          fontSize: 18, 
          marginTop: 10
          }}>{user.email}</Text>
      </View>

      <View style ={{
        width : 450,
        height : 300,
        alignItems: 'center',
        marginLeft: -25,
        marginTop: 50
      }}>
        <Text style={{
        textAlign: 'center', 
        fontSize: 20, 
        marginTop: 8
        // Adding the title to the pie chart as well as designing appropriately.
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
      width: 450,
      height: 300,
      alignItems: 'center',
      marginLeft: -34,
      marginTop: -30,
    }}>
      <Text style={{
        textAlign: 'center', 
        fontSize: 20, 
        marginTop: 8
        // Adding the title to the bar chart as well as designing appropriately.
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