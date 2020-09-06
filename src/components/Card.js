import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function Card(props) {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const textColor = colors.iconColor;
    return (
        <TouchableOpacity onPress={() => navigation.navigate("VideoPlayer", { videoId: props.videoId, title: props.title })}>
            <View style={{ marginBottom: 10 }}>
                <Image source={{ uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg` }}
                    style={{ width: "100%", height: 200 }} />

                <View style={{ flexDirection: "row", margin: 5 }}>
                    <MaterialIcons name="account-circle" size={40} color={textColor} />

                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, color: textColor, width: Dimensions.get("screen").width - 50 }}
                            numberOfLines={2}
                            ellipsizeMode="tail">{props.title}</Text>
                        <Text style={{ fontSize: 14, color: textColor }}>{props.channel}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}