import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const screens = {
    Sipal: {
        screen: ()=> <View><Text>Sipal</Text></View>,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <View><Text>nigimi</Text></View>
            }
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'black',
        headerStyle: { backgroundColor: 'pink', height: 150 },
    }
});

export default HomeStack;