import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';

import globalStyles from "../../Styles/global"

import logo from '../../assets/logo.png';

import SpotList from "./SpotList"

export default function List({ navigation }) {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("techs").then(technologies => {
            if (technologies) {
                setTechnologies(technologies.split(",").map(tc => tc.trim()));
            }
        })
    },[])


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