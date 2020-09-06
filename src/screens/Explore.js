import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { useSelector, useDispatch } from 'react-redux';

function Chips({ name, fetchSearchData }) {
    return (
        <TouchableOpacity onPress={() => fetchSearchData(name)}>
            <View style={styles.chipsView}>
                <Text style={styles.chipsText}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

function Explore() {
    const cardData = useSelector(state => {
        return state.cardData
    })

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const fetchSearchData = (name) => {
        setLoading(true);
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${name}&key=AIzaSyA7D75ZrJzX_ad3w4qbE_LtDhsyRGRhhw4`)
            .then((res) => res.json())
            .then(data => {
                setLoading(false);
                dispatch({ type: "ADD", payload: data.items });
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                <View style={styles.exploreChipsView}>
                    <Chips name="Gaming" fetchSearchData={() => fetchSearchData("Gaming")} />
                    <Chips name="Music" fetchSearchData={() => fetchSearchData("Music")} />
                    <Chips name="News" fetchSearchData={() => fetchSearchData("News")} />
                    <Chips name="Movies" fetchSearchData={() => fetchSearchData("Movies")} />
                    <Chips name="Treanding" fetchSearchData={() => fetchSearchData("Treanding")} />
                    <Chips name="Fashion" fetchSearchData={() => fetchSearchData("Fashion")} />
                </View>
                <Text style={styles.exploreText}>Trending Videos</Text>
                {loading ? <ActivityIndicator style={{ marginTop: 15 }} size="large" color="gray" /> : null}
                <FlatList
                    data={cardData}
                    renderItem={({ item }) => {
                        return <Card
                            videoId={item.id.videoId}
                            title={item.snippet.title}
                            channel={item.snippet.channelTitle} />
                    }}
                    keyExtractor={item => item.id.videoId}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    chipsView: {
        backgroundColor: "#DCDCDC",
        width: 160,
        height: 50,
        borderRadius: 10,
        borderColor: "#cdcdcd",
        borderWidth: 1,
        marginTop: 10
    },
    chipsText: {
        textAlign: "center",
        fontSize: 22,
        marginTop: 7
    },
    exploreChipsView: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    exploreText: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cdcdcd",
        margin: 8
    }
})

export default Explore;