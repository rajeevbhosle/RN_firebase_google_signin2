
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, StatusBar, TextInput, FlatList, ScrollView, Card, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from "firebase";




// if (!firebase.apps.length) {
//     firebase.initializeApp(FirebaseConfig);

// }



const reviewSchema = yup.object({
    email: yup.string()
        .required()
        .email(),
    password: yup.string()
        .required()
        .min(6),

});


export const Signupscreen = ({ navigation }) => {

    const [dataof, setdata] = useState([{}])

    useEffect(() => {
        return () => {
        }
    })
    const Signupuser = (values) => {


        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log("user", user);
                // navigation.navigate("Signupscreen")
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
                        Signupuser(values);
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
                                <Button color='skyblue' title="Submit " onPress={props.handleSubmit} />
                            </View>
                            <View style={{ paddingBottom: 18, paddingTop: 8 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("Loginscreen")}  >
                                    <Text style={{ textAlign: "center", color: "gray" }}> Already have an account ?</Text>
                                </TouchableOpacity>
                            </View>




                        </View>
                    )}
                </Formik>



            </View>
        </TouchableWithoutFeedback>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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