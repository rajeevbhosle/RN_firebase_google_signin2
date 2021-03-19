
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, StatusBar, TextInput, FlatList, ScrollView, Card, Alert, TouchableOpacity } from "react-native";
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from "firebase";
import { object } from "yup/lib/locale";
// import Tododata from "../config";
import { firebaseConfig } from "../config";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';







if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

}

const db = firebase.firestore();
let Tododata = db.collection("TODO");



const reviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(3),
    body: yup.string()
        .required()
        .min(3),
    rating: yup.string()
        .required()
        .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0;
        }),
});


export const Page3 = ({ navigation }) => {

    const [dataof, setdata] = useState([])
    const [togglebutton, settogglebutton] = useState(true)
    const [id, setid] = useState('')



    useEffect(() => {
        setdbname();

        return () => {
        }
    }, [])

    const setdbname = async () => {
        let db_name = await AsyncStorage.getItem("dbname");

        console.log("dbname", db_name)
    }


    const fetchdata = () => {


        let dAta = []
        //  first way

        // Tododata.onSnapshot((querySnapShot) => {
        //     querySnapShot.forEach((doc) => {

        //         dAta.push({ id: doc.id, data: doc.data() });

        //     });

        //     setdata(dAta);

        //     console.log("datataa", dataof);

        // });


        //second way
        Tododata.get().then(querysnapshot => {
            querysnapshot.forEach(documentsnapshot => {
                // console.log("document data", documentsnapshot.data(), documentsnapshot.id)
                dAta.push({ id: documentsnapshot.id, data: documentsnapshot.data() });
                setdata(dAta);

            });
        });


    }
    const removedata = (id) => {

        // console.log("id is", id)
        const aa = id;
        Tododata.doc(aa).delete().then(() => {
            Alert.alert("success");
            fetchdata();

        })


    }

    const addReview = async (review) => {

        let values = {
            title: review.title,
            body: review.body,
            rating: review.rating,
        }

        //for cloud

        Tododata.add(values).then(() => {
            Alert.alert("success");
            fetchdata();
        })



    };




    const updatedata = async (review) => {

        settogglebutton(false);
        console.log("updateeee", review.id);

        let value2 = { title: review.data.title, body: review.data.body, rating: review.data.rating }

        //for cloud

        setformvalues(value2);

        setid(review.id)






    };


    const updatedata2 = async (data) => {

        console.log("form op", id);


        Tododata.doc(id).update({ title: data.title, body: data.body, rating: data.rating }).then(() => {
            Alert.alert("success");
            fetchdata();
        })
        settogglebutton(true)
        value2 = { title: "", body: "", rating: "" }
        setformvalues(value2);



    }



    const logoutuser = () => {
        firebase.auth().signOut().then(() => {

            // navigation.navigate('Loginscreen');
        }).catch((error) => {
            // An error happened.
        });


    };
    value1 = {
        title: '', body: '', rating: ''
    }

    const [formvalues, setformvalues] = useState('');


    return (

        <View style={globalStyles.container}>
            <Formik
                initialValues={formvalues || value1}
                validationSchema={reviewSchema}
                enableReinitialize
                onSubmit={(values, actions) => {
                    actions.resetForm();

                    if (togglebutton) {
                        addReview(values);
                    } else {
                        updatedata2(values)

                    }
                }}
            >
                {props => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Review title'
                            onChangeText={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}
                            value={props.values.title}
                        />
                        {/* only if the left value is a valid string, will the right value be displayed */}
                        <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

                        <TextInput
                            style={globalStyles.input}
                            multiline
                            placeholder='Review details'
                            onChangeText={props.handleChange('body')}
                            onBlur={props.handleBlur('body')}
                            value={props.values.body}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.body && props.errors.body}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Rating (1 - 5)'
                            onChangeText={props.handleChange('rating')}
                            onBlur={props.handleBlur('rating')}
                            value={props.values.rating}
                            keyboardType='numeric'
                        />
                        <Text style={globalStyles.errorText}>{props.touched.rating && props.errors.rating}</Text>
                        <TouchableOpacity>
                            {togglebutton ?
                                <View style={{ paddingBottom: 18, paddingTop: 8 }}>
                                    <Button color='green' title="Submit 2" onPress={props.handleSubmit} />
                                </View> : null
                            }

                            {!togglebutton ?
                                <View style={{ paddingBottom: 18, paddingTop: 8 }}>
                                    <Button color='green' title="update" onPress={props.handleSubmit} />
                                </View> : null
                            }



                            <View style={{ paddingBottom: 18, paddingTop: 8 }}>

                                <Button color='maroon' title="fetch" onPress={fetchdata} />
                            </View>


                            <Button color='maroon' title="logout" onPress={logoutuser} />


                        </TouchableOpacity>

                    </View>
                )}
            </Formik>


            <View style={styles.lists}>
                <FlatList data={dataof} renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                        <Text style={styles.text}>#: {item.data.title}</Text>
                        <Text style={styles.text}> #: {item.data.body}</Text>
                        <Text style={styles.text}> #: {item.data.rating}</Text>
                        <TouchableOpacity onPress={() => removedata(item.id)}>
                            <AntDesign name="close" size={29} color="red" style={styles.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => updatedata(item)}>
                            <AntDesign name="edit" size={29} color="green" style={styles.text2} />
                        </TouchableOpacity>

                    </View>



                )}
                />


            </View>
        </View>
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
    text2: {
        textAlign: 'center',
        marginLeft: 3,
        padding: 5,
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