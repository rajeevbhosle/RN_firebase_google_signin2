
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, StatusBar, TextInput, FlatList, ScrollView, Card, TouchableOpacity, ActivityIndicator } from "react-native";

import * as firebase from "firebase";











export const Loadingscreen = ({ navigation }) => {

    const [dataof, setdata] = useState([{}])

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                // navigation.replace("form");
                navigation.replace("Loginscreen");

            } else {

                navigation.replace("Loginscreen");

            }
        });

        return () => {
        }
    }, [])


    return (

        <View style={styles.container}>
            <ActivityIndicator size="large" color="blue"></ActivityIndicator>

        </View>
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