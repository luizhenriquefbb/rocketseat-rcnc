import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import logo from '../../assets/logo.png';
import api from "../../services/api";

import globalStyles from "../../Styles/global"


export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [technologies, setTechnologies] = useState('');

    useEffect(() => {
        async function getUser_id() {
            const user_id = await AsyncStorage.getItem("user_id");
            if (user_id) {
                navigation.navigate("List");
            }
        }
        getUser_id();

    }, [])

    async function handleSubmit() {

        const response = await api.post("/new_user", {
            email
        });

        const { _id } = response.data.new_user;

        // store _id
        await AsyncStorage.setItem("user_id", _id);
        await AsyncStorage.setItem("techs", technologies);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <Image source={logo} />
            <View style={styles.form}>
                {/* email input */}
                <Text style={styles.label}> E-mail *</Text>
                <TextInput
                    id="email"
                    placeholder="Your best email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* techs input */}
                <Text style={styles.label}> Technologies *</Text>
                <TextInput
                    id="techs"
                    placeholder="Techs"
                    placeholderTextColor="#999"
                    value={technologies}
                    onChangeText={(text) => setTechnologies(text)}
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='words'
                />

                {/* submit Button */}
                <TouchableOpacity type="submit" title="Submit" style={globalStyles.button} onPress={handleSubmit}>
                    <Text style={globalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        ...globalStyles.form
    },

    label: {
        ...globalStyles.label

    },

    input: {
        ...globalStyles.input
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    }
})