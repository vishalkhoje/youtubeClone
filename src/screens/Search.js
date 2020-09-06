import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MiniCard from '../components/MiniCard';
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux';

// GET https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=react%20native%20tutorials&key=AIzaSyA7D75ZrJzX_ad3w4qbE_LtDhsyRGRhhw4
// Authorization: Bearer [AIzaSyA7D75ZrJzX_ad3w4qbE_LtDhsyRGRhhw4]

export default function Search({ navigation }) {
    const { colors } = useTheme();
    const iconColor = colors.iconColor;
    const [searchValue, setSearchValue] = useState("");
    // const [miniCardData, setMiniCardData] = useState();
    const dispatch = useDispatch();
    const miniCardData = useSelector(state => {
        return state.cardData;
    })
    // console.log(miniCardData);
    const [loading, setLoading] = useState(false);

    const fetchSearchData = () => {
        setLoading(true);
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchValue}&key=AIzaSyA7D75ZrJzX_ad3w4qbE_LtDhsyRGRhhw4`)
            .then((res) => res.json())
            .then(data => {
                // console.log(data.items);
                setLoading(false);
                // setMiniCardData(data.items);
                dispatch({ type: "ADD", payload: data.items });
            })
    }

    return (
        <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
            <View style={{
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: colors.headerColor,
                elevation: 2 // this work only android for ios use shadow
            }}>
                <Ionicons name="md-arrow-back" size={32} color={iconColor} onPress={() => {
                    navigation.goBack();
                }} />
                <TextInput style={{ width: "70%", backgroundColor: "#EAEAEA" }}
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)} />
                <Ionicons
                    name="md-send"
                    size={32}
                    color={iconColor}
                    onPress={() => fetchSearchData()} />
            </View>

            {loading ? <ActivityIndicator style={{ marginTop: 15 }} size="large" color="gray" /> : null}

            <FlatList
                data={miniCardData}
                renderItem={({ item }) => {
                    return <MiniCard
                        videoId={item.id.videoId}
                        title={item.snippet.title}
                        channel={item.snippet.channelTitle}
                    />
                }}
                keyExtractor={item => item.id.videoId}
            />
        </View>
    );
}
