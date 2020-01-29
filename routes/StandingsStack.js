import { createStackNavigator } from 'react-navigation-stack';
import Standings from '../components/Standings'
import Header from '../shared/Header';
import React from 'react';

const screens = {
    Standings: {
        screen: Standings,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Standings'/>,
            }
        }
    }
}

const StandingsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        //headerTintColor: 'yellow',
        headerStyle: { backgroundColor: '#101010' },
        
    }
});

export default StandingsStack;