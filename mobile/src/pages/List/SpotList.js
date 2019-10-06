import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";
import api from "../../services/api"

import globalStyles from "../../Styles/global"
import { FlatList } from 'react-native-gesture-handler';

function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function getSpots() {
           const response = await api.get("/", {
                params: {
                    tech
                }
            })
            setSpots(response.data.spot)
        }

        getSpots();
    },[])


    function handleBook(id) {
        navigation.navigate("Book", {id});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Companies who uses
                <Text style={globalStyles.bold}> {tech} </Text>
            </Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={(spot) => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                    const spot = item;
                    return (
                        <View style={styles.listItem} key={index}>
                            <Image source={{ uri: spot.thumbnail_url }} style={styles.thumbnail} />
                            <Text style={styles.company}>{spot.company}</Text>
                            <Text style={styles.price}>{spot.value ? `R$ ${spot.value}/day` : "free"}</Text>

                            <TouchableOpacity style={globalStyles.button} onPress={() => handleBook(spot._id)}>
                                <Text style={globalStyles.buttonText}> Book </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    list:{
        paddingHorizontal:20,
    },

    listItem : {
        marginRight:15,

    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: "#999",
        marginTop: 5,
    },
})

export default withNavigation(SpotList);