import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const screens = {
    Test1: {
        screen: ()=> <View><Text>Test2</Text></View>,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <View><Text>Test3</Text></View>
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