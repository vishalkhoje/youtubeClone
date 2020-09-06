import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import Home from './src/screens/Home';
import Explore from './src/screens/Explore';
import Subscribe from './src/screens/Subscribe'
import Search from './src/screens/Search';
import VideoPlayer from './src/screens/VideoPlayer';
import { MaterialIcons } from '@expo/vector-icons';

import { cardReducer } from './src/reducers/cardReducer';
import { themeReducer } from './src/reducers/themeReducer';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector } from 'react-redux';

// central state
const rootReducer = combineReducers({
  cardData: cardReducer, //[]
  themeMode: themeReducer //false
})
const store = createStore(rootReducer);
const stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    headerColor: "#FFF",
    iconColor: "#606060",
    tabIcon: "red"
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#dcdcdc',
    headerColor: "#404040",
    iconColor: "#FFFFFF",
    tabIcon: "white"
  },
};

const rootHome = () => {
  const { colors } = useTheme();
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Explore') {
          iconName = 'explore';
        } else if (route.name === 'Subscribe') {
          iconName = 'subscriptions';
        }

        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: colors.tabIcon,
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Explore" component={Explore} />
      <Tabs.Screen name="Subscribe" component={Subscribe} />
    </Tabs.Navigator>
  )
}

export default App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export function Navigation() {
  let currentTheme = useSelector(state => {
    return state.themeMode
  })
  return (
    <NavigationContainer theme={currentTheme ? MyTheme : MyDarkTheme}>
      <stack.Navigator headerMode="none">
        <stack.Screen name="rootHome" component={rootHome} />
        <stack.Screen name="Search" component={Search} />
        <stack.Screen name="VideoPlayer" component={VideoPlayer} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
