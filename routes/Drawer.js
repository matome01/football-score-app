import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import StandingsStack from './StandingsStack'

const RootDrawerNavigator = createDrawerNavigator({
    'Match Results': {
      screen: HomeStack,
    },
    Standings: {
      screen: StandingsStack,
    },
  },{
    drawerBackgroundColor: '#101010',
    //drawerType: 'back',
    drawerWidth: 200,
    edgeWidth: 0,
    //hideStatusBar: true,
    overlayColor: '#00000055',
    contentOptions: {
      activeTintColor: '#ccc',
      activeBackgroundColor: '#202020',
      inactiveTintColor: '#ccc',
      labelStyle: {fontSize: 20},
      //inactiveBackgroundColor: 'coral',
    },
    defaultNavigationOptions: {
      backgroundColor: 'green'
    }
  });
  
  export default createAppContainer(RootDrawerNavigator);