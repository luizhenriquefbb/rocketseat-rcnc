import React, { useState, useEffect } from 'react';
import { Text, AsyncStorage, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import globalStyles from "../../Styles/global"
import logo from '../../assets/logo.png';
import SpotList from "./SpotList"
import socketio from "socket.io-client";
import consts from "../../consts"


export default function List({ navigation }) {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        // get techs from storage
        AsyncStorage.getItem("techs").then(technologies => {
            if (technologies) {
                setTechnologies(technologies.split(",").map(tc => tc.trim()));
            }
        })
    },[])


    useEffect(() => {
        // get user_id from storage
        AsyncStorage.getItem("user_id").then(user_id => {
            // connect to socket
            const socket = socketio(consts.BASE_URL, {
                query:{
                    user_id
                }
            })

            // listen to booking events
            socket.on("booking_response", (booking) => {
                alert(`Your booking at ${booking.company} in ${booking.date} was ${booking.approved ? "APPROVED" : "REJECTED"}`);
            })
        });
    }, [])

    function logout() {
        AsyncStorage.clear();
        navigation.navigate("Login");
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <TouchableOpacity onPress={logout} style={styles.logout}>
                    <Text style={globalStyles.buttonText}>Logout</Text>
                </TouchableOpacity>

                <Image source={logo} style={styles.logo} />

                {technologies.map((tech, index) => (
                    <SpotList
                        key={index}
                        tech={tech}
                    />
                ))}



            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        ...globalStyles.droidSafeArea,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 32,
    },

    logout:{
        ...globalStyles.button,

    }
})