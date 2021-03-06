import React from "react";
import { View , Image, TouchableOpacity} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'



export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Annual Emissions"
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
      <TouchableOpacity style = {{
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35
      }}
      onPress ={()=>{navigation.navigate('annualHS')}}>
        <Image style = {{
          height : 215, 
          width : 300, 
          alignSelf: 'center',
          marginTop: 50
        }}
        
        source = {require("../../assets/folderbold3.png")}/>
      </TouchableOpacity>

      <TouchableOpacity style = {{
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35
      }}
      onPress ={()=>{navigation.navigate('annualCommuting')}}>
        <Image style = {{
          height : 215, 
          width : 300, 
          alignSelf: 'center',
          marginTop: -45
        }}
        
        source = {require("../../assets/folderbold2.png")}/>
      </TouchableOpacity>
      <TouchableOpacity style = {{
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35
      }}
      onPress ={()=>{navigation.navigate('annualBT')}}>
        <Image style = {{
          height : 215, 
          width : 300, 
          alignSelf: 'center',
          marginTop: -45
        }}
        
        source = {require("../../assets/folderbold.png")}/>
      </TouchableOpacity>




    </Layout>
  );
}