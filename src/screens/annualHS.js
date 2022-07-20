import React, { useEffect, useState } from "react";
import { View , FlatList, StyleSheet, Pressable, Image } from "react-native";
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
                  const users = []
                  querySnapshot.forEach((doc)=> {
                      const {countryName, emissions, noOfNights} = doc.data()
                      users.push({
                          id: doc.id,
                          countryName,
                          emissions,
                          noOfNights, 
                      })
                  })
                  setUsers(users);
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
        
      <View style={{ marginTop: 30,}}>
                    <FlatList 
                        style ={{height:'100%', }}
                        data={users}
                        numColumns={1}
                        renderItem={({item})=> (
                            <Pressable
                                style={styles.container}
                            >
                                <View style={styles.innerContainer}>
                                    <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}> 2022 {'\n'}</Text>
                                    <Text> Country       Nights        kgCO2e        Dated {'\n'}</Text>
                                    <Text style={styles.itemHeading}> {item.countryName}       {item.noOfNights}        {item.emissions}       {this.props.firebase.firestore.FieldValue.serverTimestamp()}</Text>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>

    </Layout>

)};


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'steelblue',
      padding: 15,
      borderRadius: 15,
      margin: 20,
      marginHorizontal: 30,
      height: 100
  },

  innerContainer: {
      backgroundColor: 'antiquewhite',
      alignItems: 'center',
      flexDirection:'column',
      borderRadius: 15,
      padding: 10,

  },

  itemHeading: {
      fontWeight: 'bold',
  },

  itemText: {
      fontWeight:'300',
  }
})
