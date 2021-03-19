import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Page2 } from './components/mainscreen';
import { Page3 } from './components/secondaryscreen';
import { Loadingscreen } from './components/loadingfile';
import { Loginscreen } from './components/loginscreen';
import { Signupscreen } from './components/signupscreen';



import * as firebase from "firebase";
import { firebaseConfig } from "./config";



export default function App() {

  const AuthStack = createStackNavigator()

  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);

  // }






  return (

    <NavigationContainer>
      <AuthStack.Navigator>

        <AuthStack.Screen name="Loadingscreen" component={Loadingscreen} options={{
          title: "Login", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'lightgreen'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',
          headerShown: false,
        }} />



        <AuthStack.Screen name="Loginscreen" component={Loginscreen} options={{
          title: "Login", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'lightgreen'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',


        }} />

        <AuthStack.Screen name="Signupscreen" component={Signupscreen} options={{
          title: "SignUp", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'skyblue'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',
        }} />




        <AuthStack.Screen name="Page3" component={Page3} options={{
          title: "firestore", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'lightgreen'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',
          headerShown: false,
        }} />


        <AuthStack.Screen name="Page2" component={Page2} options={{
          title: "firebase", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'lightgreen'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',
          headerShown: false,
        }} />


      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
