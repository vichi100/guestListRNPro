// import React from "react";
// import {
//   Platform,
//   Button,
//   Alert,
//   TouchableWithoutFeedback, 
//   Text,
//   View,
//   TouchableHighlight
// } from "react-native";
// import {
//   createStackNavigator,
//   createBottomTabNavigator
// } from "react-navigation";

// import TabBarIcon from "../components/TabBarIcon";
// import LinksScreen from "../screens/LinksScreen";
// import SettingsScreen from "../screens/SettingsScreen";
// //import Feed from "../screens/feed";
// import EventsScreen from "../screens/EventsScreen";
// //import ScrollableTabBar from '../screens/ScrollableTabBar';
// import Icon from "@expo/vector-icons/FontAwesome";
// import Ionicons from "@expo/vector-icons/Ionicons";

// import Profile from "../screens/profile";
// import MyProfile from "../screens/MyProfile";
// import Search from  "../screens/SearchScreen";
// import MainTopTabs from "./TopTabNavigator";

// import { SafeAreaView } from "react-navigation";

// // if (Platform.OS === "android") {
// //   // removes extra space at top of header on android
// //   SafeAreaView.setStatusBarHeight(0);
// // }

// function onSubmitPressed() {
//   this.props.navigator.push({
//       title: "Secure Page",
//       component: SecureView,
//       passProps: {username: this.state.username, password: this.state.password},
//   });
// };

// navigate = () => {
//   props.navigator.navigate('Games');
// }

// const SearchStack = createStackNavigator({ 
//   Search:{
//     screen:Search,
//   }
// });

// // const SearchStack = createStackNavigator({
// //   Search: {
// //     screen: Search,
// //     navigationOptions: {
// //       headerTitle: "link",
// //       headerStyle: {
// //         backgroundColor: "#ffffff",

// //         shadowOpacity: 0,
// //         borderBottomWidth: 0
// //       },
// //       tabBarVisible: false,
// //       tabBarOptions: { showLabel: false }

// //     },
    
// //   }
// // });

// const HomeStack = createStackNavigator({ 
//   Home: {
//     screen: MainTopTabs,
//     navigationOptions: ({ navigation }) => {
//       const { navigate } = navigation
//       return {
//         headerTitle: 'Mumbai',
//         headerRight: (
//           <TouchableHighlight onPress={() => navigate('Search')}> 
//             <View>
//               <Ionicons style={{ marginRight: 10 }} name="ios-search" size={25} />
//             </View>
//           </TouchableHighlight>
//         ),
//       } 
//     },
//     // navigationOptions: {
//     //   //headerTitle: 'Mumbai',
//     //   headerTitle: () => ( 
//     //     <TouchableWithoutFeedback onPress={() => navigate()}>
//     //       <View
//     //         style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//     //       >
//     //         <Text>Mumbai</Text>
//     //       </View>
//     //     </TouchableWithoutFeedback>
//     //   ),

//       // headerRight: (
//       //   <TouchableHighlight onPress={() => navigate('LinksStack')}>
//       //     <View>
//       //       <Ionicons style={{ marginRight: 10 }} name="ios-search" size={25} />
//       //     </View>
//       //   </TouchableHighlight>
//       // ),
//     //   headerTitleStyle: {
//     //     //fontWeight: 'bold',
//     //     fontFamily: "Roboto",
//     //     textAlign: "center",
//     //     flex: 1
//     //   }
//     // }
//   }
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: "Clubs",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `md-pulse${focused ? "" : "-outline"}`
//           : "md-pulse"
//       }
//     />
//   )
// };

// // const LinksStack = createStackNavigator({
// //   Links: {
// //     screen: LinksScreen,
// //     navigationOptions: {
// //       headerTitle: "link",
// //       headerStyle: {
// //         backgroundColor: "#ffffff",

// //         shadowOpacity: 0,
// //         borderBottomWidth: 0
// //       }
// //     }
// //   }
// // });

// // LinksStack.navigationOptions = {
// //   tabBarLabel: "Offers",
// //   safeAreaInset: {
// //     top: "never"
// //   },
// //   tabBarIcon: ({ focused }) => (
// //     <TabBarIcon
// //       focused={focused}
// //       name={
// //         Platform.OS === "ios"
// //           ? "ios-notifications-outline"
// //           : "ios-notifications-outline"
// //       }
// //     />
// //   )
// // };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Passes",
//   safeAreaInset: {
//     top: "never"
//   },
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-pricetags" : "ios-pricetags"}
//     />
//   )
// };

// const ProfileStack = createStackNavigator({
//   Profiles: MyProfile
// });

// ProfileStack.navigationOptions = {
//   tabBarLabel: "Profile",
//   safeAreaInset: {
//     top: "never"
//   },
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "md-finger-print" : "md-finger-print"}
//     />
//   )
// };

// const Bottom = createBottomTabNavigator({
//   HomeStack,
//   LinksStack,
//   SettingsStack,
//   ProfileStack,
//   // Search: {
//   //   screen: Search,
//   //   navigationOptions: {
      
//   //     tabBarVisible: false,
//   //     tabBarOptions: { hide: true }

//   //   },
    
//   // }
// });

// export default createStackNavigator({ 
//   tabs: Bottom,
//     Search: {
//     screen: Search,
//     navigationOptions: {
      
//       tabBarVisible: false,
//       tabBarOptions: { hide: true }

//     },
    
//   }
// })

// // export default createBottomTabNavigator({
// //   CLUBS:  {
// //     screen: MainTopTabs,
// //     navigationOptions:  ({navigation})  => ({
// //       header: 'mumbai',
// //       tabBarIcon: ({tintColor}) => (
// //           <Ionicons
// //               name="ios-pulse"
// //               color={tintColor}
// //               size={24}
// //           />
// //       )
// //   })
// //   },
// //   OFFERS:  {
// //     screen: LinksScreen,
// //     navigationOptions:  ({navigation})  => ({
// //       title: 'OFFERS',
// //       tabBarIcon: ({tintColor}) => (
// //           <Ionicons
// //               name="ios-notifications-outline"
// //               color={tintColor}
// //               size={24}
// //           />
// //       )
// //   })
// //   },

// //   PASSES:  {
// //     screen: SettingsScreen,
// //     navigationOptions: () => ({
// //       tabBarIcon: ({tintColor}) => (
// //           <Ionicons
// //               name="ios-pricetag"
// //               color={tintColor}
// //               size={24}
// //           />
// //       )
// //   })
// //   },

// //   PROFILE:  {
// //     screen: Profile,

// //     navigationOptions: () => ({
// //       tabBarIcon: ({tintColor}) => (
// //           <Ionicons
// //               name="md-finger-print"
// //               color={tintColor}
// //               size={24}
// //           />
// //       )
// //   })
// //   },

// // },

// // {
// //   navigationOptions: ({ navigation }) => ({
// //      headerTitle: 'Mumbai',
// //     // headerStyle: {
// //     //   //backgroundColor: '#298e82',
// //     //   //alignSelf: 'center'
// //     // },
// //     // headerTintColor: '#000000',
// //     // headerTitleStyle: {
// //     //   fontWeight: 'bold',
// //     //   fontFamily: 'Roboto',
// //     //   textAlign:"center",
// //     //     flex:1
// //     // },
// //     tabBarIcon: ({ focused, tintColor }) => {
// //       const { routeName } = navigation.state;
// //       let iconName;
// //       if (routeName === 'Home') {
// //         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
// //       } else if (routeName === 'Settings') {
// //         iconName = `ios-options${focused ? '' : '-outline'}`;
// //       }

// //       // You can return any component that you like here! We usually use an
// //       // icon component from react-native-vector-icons
// //       return <Ionicons name={iconName} size={25} color={tintColor} />;
// //     },
// //   }),
// //   tabBarOptions: {
// //     activeTintColor: 'red',
// //     inactiveTintColor: 'gray',
// //   },

// // }

// // );
