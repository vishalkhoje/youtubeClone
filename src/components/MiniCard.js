import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function MiniCard(props) {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const textColor = colors.iconColor;
    return (
        <TouchableOpacity onPress={() => navigation.navigate("VideoPlayer", { videoId: props.videoId, title: props.title })}>
            <View style={{ flexDirection: "row", margin: 10, marginBottom: 0 }}>
                <Image source={{ uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg` }}
                    style={{ width: "45%", height: 100 }} />
                <View style={{ padding: 7 }}>
                    <Text style={{ fontSize: 17, color: textColor, width: Dimensions.get("screen").width / 2 }}
                        numberOfLines={3}
                        ellipsizeMode="tail">{props.title}</Text>
                    <Text style={{ fontSize: 14, color: textColor }}>{props.channel}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
