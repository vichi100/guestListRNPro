import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar, type NavigationState } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import EventsScreen from './EventsScreen';
import Profile from '../screens/profile';

import Office from './Office'

// import Clubs from './Shared/Albums';
// import DJ from './Shared/Chat';

// type State = NavigationState<{
//   key: string,
//   title: string,
// }>;




export default class ScrollableTabBar extends React.Component {
  static title = 'Custom tab bar';
  static backgroundColor = '#fafafa';
  static tintColor = '#263238';
  static appbarElevation = 4;
  static statusBarStyle = 'dark-content';

  static navigationOptions = {
    title: 'vichi',
  };

  state = {
    index: 0,
    routes: [
      { key: 'parties', title: 'Parties' },
      { key: 'clubs', title: 'Clubs' },
      { key: 'dj', title: 'DJs' },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });


  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    parties: Office,
    clubs: EventsScreen, 
    dj: Profile,
  });

  render() {
    return ( 
      <TabView
        style={this.props.style}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        tabBarPosition="top"
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },
  tab: {
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    //borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
  },
  activeItem: {
    //position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: '#565656',
  },
  inactive: {
    color: '#565656',
  },
  
  label: {
    fontSize: 12,
    fontWeight: '100',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#565656'
  },
});
