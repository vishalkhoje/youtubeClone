import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import { useTheme } from '@react-navigation/native';

function VideoPlayer({ route }) {
    const { videoId, title } = route.params;
    const { colors } = useTheme();
    const textColor = colors.iconColor;
    return (
        <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
            <View style={{ width: "100%", height: 200 }}>
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                    style={{ marginTop: 20 }}
                />
            </View>
            <Text style={{
                fontSize: 20,
                color: colors.iconColor,
                width: Dimensions.get("screen").width - 50,
                margin: 9
            }}
                numberOfLines={2}
                ellipsizeMode="tail" >{title}</Text>

            <View style={{ borderBottomWidth: 1 }} />

        </View>
    )
}

export default VideoPlayer;