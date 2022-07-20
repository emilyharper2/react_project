import React, { useState,  useEffect, useRef, Component  }  from "react";
import { View, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image, TextInput, Picker, Alert} from "react-native";
const {width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button
} from "react-native-rapi-ui";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from "react-native-element-dropdown";
import { textShadowColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import { db } from "../firebase/config";


export default function HotelScreen({ navigation }) {
  const [number, setNumber] = useState("");
  const [countries, setCountries] = useState([]);
  const [factor, setFactor] = useState([]);
  const [country, setCountry] = useState([]);
  const [result, setResult] = useState([]);
  const calculation = (number * factor).toFixed(3);
  const [emissions, setEmissions] = useState("");

  function create() {
    addDoc(collection(db,"Hotel Stays"), {
      countryName: country,
      noOfNights: number,
      emissions: calculation,
      category: 'Hotel Stays'
    }).then (() => {
      console.log("Data submitted successfully");
    }).catch((error) => {
      console.log("Data submission failed");
      console.log(error)
    });;
  }


  useEffect(() => {
    setTimeout(() => {
      setCountries ([
        {name: 'UK', factor: 13.9},
        {name: 'UK (London)', factor: 13.8},
        {name: 'Argentina', factor: 56.0},
        {name: "Australia", factor: 42.6},
        {name: "Austria", factor: 13.9},
        {name: "Belgium", factor: 10.9},
        {name: "Brazil", factor: 12.3},
        {name: "Canada", factor: 16.1},
        {name: "Chile", factor: 30.5},
        {name: "China", factor: 62.9},
        {name: "Colombia", factor: 13.5},
        {name: "Czech Republic", factor: 36.2},
        {name: "Egypt", factor: 56.5},
        {name: "Fiji",factor: 47.8},
        {name: "France",factor: 6.5},
        {name: "Germany",factor: 17.0},
        {name: "Greece",factor: 43.0},
        {name: "Hong Kong, China", factor: 65.9},
        {name: "India", factor: 75.5},
        {name: "Indonesia", factor: 89.1},
        {name: "Ireland", factor: 25.0},
        {name: "Israel", factor: 54.0},
        {name: "Italy", factor: 20.2},
        {name: "Japan", factor: 60.6},
        {name: "Jordan",factor: 62.4},
        {name: "Korea", factor: 61.2},
        {name: "Macau, China",factor: 75.6},
        {name: "Malaysia", factor: 83.0},
        {name: "Maldives", factor: 183.3},
        {name: "Mexico",factor: 25.9},
        {name: "Netherlands", factor: 20.9},
        {name: "New Zealand", factor: 10.4},
        {name: "Pananma",factor: 22.1},
        {name: "Peru", factor: 22.5},
        {name: "Phillipines",factor: 44.2},
        {name: "Poland",factor: 33.2},
        {name: "Portugal",factor: 26.0},
        {name: "Qatar", factor: 126.8},
        {name: "Romania", factor: 25.5},
        {name: "Russian Federation",factor: 31.8},
        {name: "Saudi Arabia", factor: 114.5},
        {name: "Singapore", factor: 37.8},
        {name: "Slovak Republic", factor: 19.1},
        {name: "South Africa", factor: 61.0},
        {name: "Spain", factor: 18.7},
        {name: "Switzerland", factor: 7.4},
        {name: "Taiwan, China",factor: 77.3},
        {name: "Thailand", factor: 51.0},
        {name: "Turkey",factor: 33.6},
        {name: "United Arab Emirates",factor: 114.4},
        {name: "United States", factor: 19.7},
        {name: "Vietnam",factor: 51.8}
      ]);
    }, 1000);
  });


  const { isDarkmode, setTheme } = useTheme();
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
      <View 
        style={{
        
        marginTop: 30,
        marginHorizontal: '12%',
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
  <View style={styles.dropdownsRow}>
  <SelectDropdown
    marginLeft = '20px'
	  data={countries}
	  onSelect={(selectedItem, index) => {
		  console.log(selectedItem, index);
      setFactor([]);
      setCountry([]);
      setFactor(selectedItem.factor);
      setCountry(selectedItem.name)
	  }}
    defaultButtonText = {'Select country'}
	  buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		  return selectedItem.name 
	  }}
	  rowTextForSelection={(item, index) => {
      // text represented for each item in dropdown
      // if data array is an array of objects then return item.property to represent item in dropdown
        return item.name
      }}
      buttonStyle ={styles.dropdown1BtnStyle}
      buttonTextStyle = {styles.dropdown1BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
      }}
      dropdownIconPosition={'right'}
      dropdownStyle= {styles.dropdown1DropdownStyle}
      rowStyle = {styles.dropdown1DropdownStyle}
      rowTextStyle = {styles.dropdown1RowTxtStyle}
    
    /> 
</View>
<View style={{
  textAlign: 'left'
}}>
  <Text 
    style={{
      marginLeft: 60,
      marginBottom: -28,
      fontSize: 22,
      marginTop: 40
    }}>
    How many nights? 
    </Text>

    <TextInput 
       style = {{
        backgroundColor: "white",
        borderColor: "gray",
        width: "22%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        //marginBottom:340,
        marginLeft:260,
        fontSize: 18,
        textShadowColor: '#444'
      }} 
      maxLength = {4}
      onChangeText ={(nights) => setNumber(nights)} />
  </View>

  <View style= {{
      textAlign: 'left'
  }}>
    <Image
            style={{    
              width: 280, 
              height: 280, 
              //marginLeft: 25,
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
    //marginBottom: 200,
    //themeColor : isDarkmode ? themeColor.white100 : themeColor.dark,
    fontSize: 26,
    marginTop: -215,
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
  onPress={create}/>



  </Layout>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  //header: {
  //  flexDirection: 'row',
  //  width,
  //  height: 50,
  //  alignItems: 'center',
   // justifyContent: 'center',
   // backgroundColor: '#F6F6F6',
  //},
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: {flexDirection: 'row', width: '90%', paddingHorizontal: '5%', marginTop: 40, marginLeft: 22},

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
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
  roundButton2: {
    marginTop: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ccc',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
});
