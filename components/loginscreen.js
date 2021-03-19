
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, StatusBar, TextInput, FlatList, ScrollView, Card, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-community/async-storage';






// if (!firebase.apps.length) {
//     firebase.initializeApp(FirebaseConfig);

// }



const reviewSchema = yup.object({
    email: yup.string()
        .required()
        .email(),
    password: yup.string()
        .required()
        .min(3),

});


export const Loginscreen = ({ navigation }) => {

    const [dataof, setdata] = useState([{}])

    useEffect(() => {
        return () => {
        }
    })




    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '386833532446-368srhcibomaq1oo1q9iml9tfsdil1b3.apps.googleusercontent.com',
                // behavior: 'web',
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });
            // https://console.cloud.google.com/apis/credentials?project=reactfirestoreapp     id is present on this site

            if (result.type === 'success') {
                console.log("success1");
                onSignIn(result)

                return result.accessToken;
            } else {
                console.log("failed");

                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    const onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );//  changed222222222

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then((u) => {
                    navigation.navigate("Page3");
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
                navigation.navigate("Page3");

            }
        }
        );
    }


    const isUserEqual = (googleUser, firebaseUser) => {
        console.log("inside isUserEqual");
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {

                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id) { // changed
                    // We don't need to reauth the Firebase connection.
                    console.log("return true")

                    return true;
                }
            }
        }
        console.log("return fauled")
        return false;
    }










    const loginuser = async (values) => {


        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log("user", user);
                AsyncStorage.setItem("dbname", user.uid)


                navigation.navigate("Page3")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage);
                // console.log("error", errorMessage);

            });



    }


    return (


        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>



            <View style={globalStyles.container}>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={reviewSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        loginuser(values);
                    }}
                >
                    {props => (
                        <View>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Email'
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                            />
                            {/* only if the left value is a valid string, will the right value be displayed */}
                            <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                            <TextInput
                                style={globalStyles.input}

                                placeholder='password'
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                value={props.values.password}
                                secureTextEntry={true}
                            />
                            <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>


                            <View style={{ paddingBottom: 18, paddingTop: 8 }}>
                                <Button color='lightgreen' title="Submit " onPress={props.handleSubmit} />
                            </View>
                            <View style={{ paddingBottom: 18, paddingTop: 8 }}>

                                <TouchableOpacity onPress={() => navigation.navigate("Signupscreen")}  >
                                    <Text style={{ textAlign: "center", color: "gray" }}> Don't have account ?</Text>
                                </TouchableOpacity>

                            </View>




                        </View>
                    )}
                </Formik>

                <Button title="signin with google" onPress={signInWithGoogleAsync} />

            </View>

        </TouchableWithoutFeedback>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BFC3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 18,
        marginLeft: 3,
        padding: 8,
    },
    lists: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 18,
        borderRadius: 6,
        textAlign: "center",
        marginTop: 10,



    }
});