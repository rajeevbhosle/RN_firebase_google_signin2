import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Page2 } from './components/mainscreen';
import * as firebase from "firebase";
import { FirebaseConfig } from "./config";



export default function App() {

  const AuthStack = createStackNavigator()

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);

  }






  return (

    <NavigationContainer>
      <AuthStack.Navigator>



        <AuthStack.Screen name="Page2" component={Page2} options={{
          title: "Add Data", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
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
