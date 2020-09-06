import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector} from 'react-redux';

export default function Header() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => {
    return state.themeMode
  });
  const iconsColor = colors.iconColor;
  return (
    <View style={{ ...styles.root, backgroundColor: colors.headerColor }}>

      <View style={styles.iconView}>
        <Entypo style={styles.icon} name="youtube" size={30} color="red" />
        <Text style={{ ...styles.text, color: iconsColor }}>YouTube</Text>
      </View>

      <View style={styles.serachView}>
        <MaterialCommunityIcons name="video-plus" size={30} color={iconsColor} />
        <Ionicons name="md-search" size={30} color={iconsColor}
          onPress={() => navigation.navigate("Search")} />
        <MaterialIcons name="account-circle" size={30} color={iconsColor} 
          onPress={()=> dispatch({type:"CHANGE_THEME", payload: !currentTheme})}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#FFF",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4
  },
  iconView: {
    flexDirection: "row",
    margin: 7
  },
  icon: {
    marginLeft: 5
  },
  text: {
    marginLeft: 5,
    fontSize: 22,
    fontWeight: "bold"
  },
  serachView: {
    flexDirection: "row",
    margin: 7,
    justifyContent: "space-around",
    width: 150
  }

})

