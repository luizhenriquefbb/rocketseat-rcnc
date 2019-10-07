import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import globalStyles from "../../Styles/global";
import api from "../../services/api";

export default function Book({ navigation }) {
    const spot_id = navigation.getParam('id');
    const [date, setDate] = useState("");

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user_id');
        const response = await api.post(`/spots/${spot_id}/booking`,
            {
                date
            },
            {
                headers: {
                    user_id
                }
            });

         alert("Solicitation sent");
         navigation.navigate("List");
    }

    function handleCancel() {
        navigation.navigate("List");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}> Date *</Text>
                <TextInput
                    id="date"
                    placeholder="Which date to book?"
                    placeholderTextColor="#999"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='words'
                />

                 {/* submit Button */}
                <TouchableOpacity type="submit" title="Submit" style={globalStyles.button} onPress={handleSubmit}>
                    <Text style={globalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>

                 {/* cancelar Button */}
                <TouchableOpacity type="none" title="Cancel" style={styles.cancel} onPress={handleCancel}>
                    <Text style={globalStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.droidSafeArea
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

    cancel : {
        ...globalStyles.button,
        backgroundColor: "#ccc",
        marginTop: 10,

    }
})