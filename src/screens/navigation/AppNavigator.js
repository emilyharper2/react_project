import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



import { useTheme, themeColor } from "react-native-rapi-ui";
import NavBarIcons from "../utils/NavBarIcons";
import NavBarText from "../utils/NavBarText";

// Main
import Home from "../Home";
import SecondScreen from "../SecondScreen";
import Profile from "../Profile";
import HotelStays from "../HotelStays";
import Information from "../Information";
import SettingsScreen from "../SettingsScreen";
import AnnualEmissions from "../AnnualEmissions";
import AddEmissions from "../AddEmissions";
import Commuting from "../Commuting";
import BusinessTravel from "../BusinessTravel";

// Auth screens
import Login from "../auth/Login"
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import Loading from "../utils/Loading";
import { AuthContext } from "../../provider/AuthProvider";
import { Settings } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import annualHS from "../annualHS";
import annualCommuting from "../annualCommuting";
import annualBT from "../annualBT";

// Better put your these secret keys in .env file

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
    </MainStack.Navigator>
  );
};


const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <NavBarText focused={focused} title= "Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <NavBarIcons focused={focused} icon = {"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        component={Add}
        options={{
          tabBarLabel: ({ focused }) => (
            <NavBarText focused={focused} title="Add Emissions" />
          ),
          tabBarIcon: ({ focused }) => (
            <NavBarIcons focused={focused} icon={"cloudy-outline" }/>
          ),
        }}
      />
        <Tabs.Screen
        name="Information"
        component={Information}
        options={{
          tabBarLabel: ({ focused }) => (
            <NavBarText focused={focused} title= "Information" />
          ),
          tabBarIcon: ({ focused }) => (
            <NavBarIcons focused={focused} icon={"md-information-circle-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Annual"
        component={Annual}
        options={{
          tabBarLabel: ({ focused }) => (
            <NavBarText focused={focused} title="Overview" />
          ),
          tabBarIcon: ({ focused }) => (
            <NavBarIcons focused={focused} icon={"calendar-sharp"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <NavBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <NavBarIcons focused={focused} icon={"person"} />
          ),
        }}
        />
    </Tabs.Navigator>
    
  );
};

const AddStack = createNativeStackNavigator();

const Add = () => {
  return (
    <AddStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AddStack.Screen name="AddEmissions" component={AddEmissions}/>
      <AddStack.Screen name="HotelStays" component={HotelStays} />
      <AddStack.Screen name="BusinessTravel" component={BusinessTravel} />
      <AddStack.Screen name="Commuting" component={Commuting} />
    </AddStack.Navigator>
  );
};

const AnnualStack = createNativeStackNavigator();

const Annual = () => {
  return (
    <AnnualStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AnnualStack.Screen name="AnnualEmissions" component={AnnualEmissions}/>
      <AnnualStack.Screen name="annualHS" component={annualHS} />
      <AnnualStack.Screen name="annualCommuting" component={annualCommuting} />
      <AnnualStack.Screen name="annualBT" component={annualBT} />
    </AnnualStack.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
