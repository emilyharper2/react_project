// Import relevant modules and functions.
import React, { useState, useEffect, useRef, Component}  from "react";
import { 
  View, 
  Image, 
  TextInput, 
  SafeAreaView, 
  StatusBar, 
  Dimensions, 
  StyleSheet, 
  ScrollView, 
  TouchableHighlight, 
  Alert
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button
} from "react-native-rapi-ui";
const { width } = Dimensions.get('window');
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

/**
* This page acts as the individual add emissions page for the 'Business Travel'
* Scope 3 category and displays a dropdown menu allowing the user to select
* a mode of transport and an input box allowing the user to input the distance
* travelled. 
*
* The calculated emissions are then displayed on the cloud image below the 
* input box and these can be added to the database by clicking the 
* 'Add Emissions' button.
*/

export default function ({ navigation }) {
  /**
  * Constant variable for this page to allow for dark mode feature.
  * As well as this, constant variable to store the distance travelled,
  * the list of transport modes to select from, the transport mode selected, 
  * the corresponding conversion factor, the calculated value and setting this
  * value as the resulting emissions. 
  */ 
  const { isDarkmode, setTheme } = useTheme();
  const [number, setNumber] = useState("");
  const [transportModes, setTransportModes] = useState([]);
  const [transport, setTransport] = useState([]);
  const [factor, setFactor] = useState([]);
  const [result, setResult] = useState([]);
  const calculation = (number * factor).toFixed(3)
  const [businessEmissions, setBusinessEmissions] = useState("");

  /**
  * Creating the 'Business Travel' collection and storing the transport type
  * selected, the distance travelled inputted value and the resultant emissions
  * from the calculation.
  * 
  * The user is then alerted once the action has completed successfully.
  */
  function create() {
    addDoc(collection(db,"Business Travel"), {
      transportType2: transport,
      distanceTravelled2: number,
      businessEmissions: calculation,
      category: 'Business Travel'
    }).then (() => {
      console.log("Data submitted successfully");
    }).catch((error) => {
      console.log("Data submission failed");
      console.log(error)
    });;
    alert('Emissions Added!');
  }

  /**
  * Listing the transport types for the dropdown menu along with their
  * corresponding conversion factors that will be multiplied by the distance
  * travelled number. 
  */ 

  useEffect(() => {
    setTimeout(() => {
      setTransportModes ([
        {name: 'Small Car (Diesel)', factor: 0.13758 },
        {name: 'Small Car (Petrol)', factor: 0.14946 },
        {name: 'Medium Car (Diesel)', factor: 0.16496},
        {name: 'Medium Car (Petrol)', factor: 0.18785},
        {name: 'Large Car (Diesel)', factor: 0.20721},
        {name: 'Large Car (Petrol)', factor: 0.27909},
        {name: 'Average Car (Diesel)', factor: 0.16843},
        {name: 'Average Car (Petrol)', factor: 0.17431}, 
        {name: 'Regular Taxi', factor: 0.14876},
        {name: 'Black Cab', factor: 0.20416},
        {name: 'Local Bus (not London)', factor: 0.11774},
        {name: 'Local London Bus', factor: 0.07718},
        {name: 'Average Local Bus', factor: 0.10227},
        {name: 'Coach', factor: 0.02684},
        {name: 'National Rail', factor: 0.03549},
        {name: 'International Rail', factor: 0.00446},
        {name: 'Light Rail and Tram', factor: 0.02861},
        {name: 'London Underground', factor: 0.02781},
        {name: 'Domestic Flights (Average Passenger)', factor: 0.24587},
        {name: 'Short-Haul Flights (Average Passenger)', factor: 0.15353}, 
        {name: 'Short-Haul (Economy)', factor: 0.15102},
        {name: 'Short-Haul (Business)', factor: 0.22652},
        {name: 'Long-Haul (Average Passenger', factor: 0.19309}, 
        {name: 'Long-Haul (Economy)', factor: 0.14787},
        {name: 'Long-Haul (Premium Economy)', factor: 0.23659},
        {name: 'Long-Haul (Business)', factor: 0.42882},
        {name: 'Long-Haul (First)', factor: 0.59147},
        {name: 'International (Average Passenger)', factor: 0.18362},
        {name: 'International (Economy)', factor: 0.140625},
        {name: 'International (Premium Economy)', factor: 0.225},
        {name: 'International (Business)', factor: 0.40781},
        {name: 'International (First)', factor: 0.56251}, 
        {name: 'Ferry (Foot Passenger)', factor: 0.018738},
        {name: 'Ferry (Car Passenger)', factor: 0.129517},
        {name: 'Ferry (Average Passenger)', factor: 0.112862}
      ]);
    }, 1000);
  });

  /*
  * Line 144-204 represents the layout of the page, including the icon for 
  * activating the dark/light mode in the top-right-hand corner and a 'return' 
  * icon in the top-left-hand corner to return to the 'main' add emissions page.
  * 
  * The 'Business Travel' heading is added, with an image representing the 
  * title. 
  * 
  * The dropdown menu is then created, storing the selected value. An input box 
  * is added to allow the user to enter a number of kilometers. The cloud image 
  * is added and calculated emissions are displayed on top of it. 
  * 
  * The 'Add Emissions' button is created, activating the 'create' function 
  * once pressed. 
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
      <View 
        style={{
        marginTop: 30,
        marginHorizontal: '12%',
        backgroundColor: 'lightskyblue',
        borderRadius: 14,
        width: 310,
        height: 75,
        textAlign: 'left',
        flexDirection: 'row',
        shadowColor: '#171717',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
      }}>
          <Image
            style={{
              resizeMode: "contain",
              width: 62, 
              height: 52, 
              marginLeft: 22,
              alignSelf: "center"
            }}
            source={require('../../assets/travel2.png')}/>
          <Text
          style={{
            color: 'white',
            alignSelf: "center",
            fontSize: 30,
            marginLeft: 20,
            fontWeight: 'bold'
          }}>
          Business Travel 
        </Text>
    </View>

  <View style={styles.dropdownsRow}>
  <SelectDropdown
    // inserting the tranport modes as the dropdown data.
	  data={transportModes}
	  onSelect={(selectedItem, index) => {
      // Setting the selected transport type name and corresponding factor.
		  console.log(selectedItem, index);
      setFactor([]);
      setTransport([]);
      setFactor(selectedItem.factor);
      setTransport(selectedItem.name);
	  }}
    defaultButtonText = {'Select Mode of Travel'}
	  buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected.
		  return selectedItem.name
	  }}
	  rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
	  	return item.name
	  }}
    buttonStyle= {styles.dropdown1BtnStyle}
    buttonTextStyle= {styles.dropdown1BtnTxtStyle}
    renderDropdownIcon={isOpened => {
      return <FontAwesome 
      name={isOpened ? 'chevron-up' : 'chevron-down'} 
      color={'#444'} 
      size={18} 
      />;
    }}
    dropdownIconPosition= {'right'}
    dropdownStyle= {styles.dropdown1DropdownStyle}
    rowStyle= {styles.dropdown1DropdownStyle}
    rowTextStyle= {styles.dropdown1RowTxtStyle}
  />  
</View>
<View style={{
  textAlign: 'left'
}}>
  <Text 
    style={{
      marginLeft: 50,
      marginBottom: -28,
      fontSize: 22,
      marginTop: 40
    }}>
    How many kilometers? 
    </Text>
    <TextInput 
       style = {{
        backgroundColor: "white",
        borderColor: "gray",
        width: "22%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginLeft: 260,
        fontSize: 18,
        textShadowColor: '#444'
      }} 
      // maximum length of 4 integers added in the text input box.
      maxLength = {4}
      // setting entered number as distance which will be used in calculation.
      onChangeText ={(distance) => setNumber(distance)} />
  </View>

  <View style= {{
      textAlign: 'left'
  }}>
    <Image
            style={{    
              width: 280, 
              height: 280, 
              alignSelf: "center",
              marginBottom: 70,
              marginTop: 10
            }}
            source={require('../../assets/thecloud.png')}
          />
  </View>

  <View>
  <Text style={{
    marginLeft: 122,
    fontSize: 26, 
    marginTop: -215,
    color: 'black'
  }}>{calculation} kgCO2e </Text>
  </View>

  <Button style = {{
    padding: 10,
    borderRadius: 10,
    margin: 80,
    marginTop: -70,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  }}
  text = "Add Emissions"
  textStyle = {{
    fontSize: 18
  }}
  color = "mediumseagreen"
  // Calling the 'create' function once the 'Add Emissions' button is pressed.
  onPress={create}/>
    </Layout>
  );
}

// StyleSheet used for the styling the code. 
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: {
    flexDirection: 'row', 
    width: '90%', 
    paddingHorizontal: '5%', 
    marginTop: 40, 
    marginLeft: 22
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF', 
    borderBottomColor: '#C5C5C5'
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12}
});