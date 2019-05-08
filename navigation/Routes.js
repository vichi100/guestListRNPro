import React from "react";
import { View } from "react-native";
import {
  TabNavigator,
  TabBarBottom,
  createStackNavigator
} from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import Tab1Screen from "../screens/Tab1Screen";

import Tab2Screen from "../screens/Tab2Screen";
import CustomHeader from "./CustomHeader";
import HeaderStyles from "./headerStyles";

let headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  ...HeaderStyles
};

const Tab1 = createStackNavigator(
  {
    Tab1: {
      screen: Tab1Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Tab 1 Screen"
      }
    },
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);

const Tab2 = createStackNavigator(
  {
    Tab2: {
      screen: Tab2Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Tab 2 Screen"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);


const DashboardTabRoutes = TabNavigator(
  {
    Tab1: Tab1,
    Tab2: Tab2,
  },
  {
    initialRouteName: "Tab1",
    navigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      let params = routes && routes[1] && routes[1].params;
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Tab1') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Tab2') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }
  
          // You can return any component that you like here! For demo we use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarVisible:
          params && params.hideTabBar != null ? !params.hideTabBar : true,
        swipeEnabled:
          params && params.hideTabBar != null ? !params.hideTabBar : true
      };
    },
    tabBarOptions: {
      activeTintColor: "#858585",
      inactiveTintColor: "#858585",
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: "#fff"
      },
      labelStyle: {
        fontSize: 12,
        lineHeight: 20
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true
  }
);

export default DashboardTabRoutes;