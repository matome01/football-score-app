import { createStackNavigator } from 'react-navigation-stack';
import HomeBody from '../components/HomeBody';
import Header from '../shared/Header';
import React from 'react';

const screens = {
    Home: {
        screen: HomeBody,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Match Results'/>,
            }
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: 'yellow',
        headerStyle: { backgroundColor: '#101010' },
    }
});

export default HomeStack;