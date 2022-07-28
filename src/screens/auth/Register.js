import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";



export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password, fullName).catch(function (
      error
    ) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      setLoading(false);
      alert(errorMessage);
    });
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.light,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                marginTop: 40,
                height: 135,
                width: 230,
                
              }}
              source={require("../../../assets/newlogoblack.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.light ,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Register
            </Text>

            <Text>Full Name: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter full name"
              value={fullName}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="name"
              onChangeText={(text) => setName(text)}
            />

            <Text style={{ marginTop: 15 }}>Company Name: </Text>
            <TextInput 
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter company name"
              value={companyName}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="companyName"
              onChangeText={(text) => setCompanyName(text)}
            />
            
            <Text style={{ marginTop: 15 }}>Company Email Address: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter company email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Password: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Text style={{ marginTop: 15 }}>Confirm Password: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Confirm password"
              value={confirmPassword}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <Button
              text={loading ? "Loading" : "Create an account"}
              onPress={() => {
                register();
                navigation.navigate("Login");
              }}
              color = 'green'
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
