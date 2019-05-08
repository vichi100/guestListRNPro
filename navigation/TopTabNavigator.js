import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, TabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import ClubsListScreen from '../screens/ClubsListScreen'; 
import DJsListScreen from '../screens/DJsListScreen';
import ClubsEvents from '../screens/ClubsEvents'



//https://reactnavigation.org/docs/en/material-top-tab-navigator.html
const MainTopTabs = createMaterialTopTabNavigator({  
    Tab1: {
      screen: ClubsEvents,
     navigationOptions:{ 
       tabBarLabel: 'Parties',
       //headerLeft: null,
        //headerTitle: "Tab 1 Screen"
     },
    },
    Tab2: {
      screen: ClubsListScreen,
      navigationOptions:{
       tabBarLabel: 'Clubs' 
     } 
    },

    Tab3: {
        screen: DJsListScreen,
        navigationOptions:{
         tabBarLabel: 'Djs/Bands'
       } 
      },

      
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      
      style: {
        backgroundColor: '#212121',
      },
      labelStyle: {
        fontSize: 12,
        color: '#42a5f5'
      },
      indicatorStyle:{
        //backgroundColor:'#e91e63'
      }
    }

  }
  )

  export default MainTopTabs; 