import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";

import TicketRowItem from "./TicketRowItem";
import { AsyncStorage } from "react-native";
import FBLogin from '../login/FBLogin';
import GLogin from '../login/GLogin';
import axios from 'axios';
import { SERVER_URL } from '../../constants';


var userid = null;

export default class TicketsListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      isLoading: true,
      userid: null
    };
  }

  // email = await AsyncStorage.getItem("email");
  //   mobile = await AsyncStorage.getItem("mobile");
  //   var userid = await AsyncStorage.getItem("customerId");
  //   var custName = await AsyncStorage.getItem("name");
  //   console.log('email1 : ' + ": " + email);
  //   console.log('mobile1 : ' + ": " + mobile);

  //   if (email == null || mobile == null || userid == null) {
  //     // go to login form
  //     console.log('email2 : ' + ": " + email);
  //     console.log('mobile2 : ' + ": " + mobile);
  //     //this.props.navigation.navigate('BookingScreen', {data:item});
  //     this.props.navigation.navigate("LoginScreen", {bookingData: eventData, me:'BookingScreenOnlyForGuestList'}); // move to login page
  //     return;
  //   }

  async init() {
    userid = await AsyncStorage.getItem("customerId");
    console.log('TickestListScreen: userid='+userid);
    if(userid == null){
      this.props.navigation.navigate("LoginFromTicketList"); // move to login page
      return;
    }
  }

  async componentDidMount() {
    await this.init() 
    // var userid = await AsyncStorage.getItem("customerId");
    // console.log('TickestListScreen: userid '+userid);
    // if(userid == null){
    //   this.props.navigation.navigate("LoginFromTicketList"); // move to login page
    //   return;
    // }

    return axios.get(SERVER_URL+"bookingDetails?userid=" + userid)
      //.then(response => response.json())
      .then(response => {
        response= response.data
        Object.keys(response).map((keyName, keyIndex) => {
          this.setState({ dataSource: response });
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  goToTicketDisplay = item => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);

    //guestlistgirlcount":null,"guestlistcouplecount":null,"passcouplecount":null,"passstagcount":null,
    if (
      item.guestlistgirlcount != null ||
      item.guestlistcouplecount != null ||
      item.passcouplecount != null ||
      item.passstagcount != null
    ) {
      this.props.navigation.navigate("TicketDisplayFromBooking", {
        bookingData: item,
        navigatingFrom: "TicketsListScreen"
      });
    } else if (item.tablenumber != null && item.tablepx != 0) {
      this.props.navigation.navigate("TicketDisplayFromTableBooking", {
        bookingData: item,
        navigatingFrom: "TicketsListScreen"
      });
    } else if (
      item.tablenumber == null &&
      (item.tablepx != null || item.tablepx != 0)
    ) {
      this.props.navigation.navigate("TicketDisplayFromNoLayoutTableBooking", {
        bookingData: item,
        navigatingFrom: "TicketsListScreen"
      });
    }
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.goToTicketDisplay(item)}>
      <TicketRowItem bookedTicketDetailsData={item} />
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => index.toString();

  // checkUserId = async () =>{
  //   userid = await AsyncStorage.getItem("customerId");
  //   // this.setState({ userid: userid });
  //   console.log("userid: " + JSON.stringify(userid));
  // }

  render() {
    
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    // checkUserId();
    // if (checkUserId == null) {
    //   var eventData = null;
    //   var mevalue = 'TicketsListScreen';
    //   return (
        
    //     <View behavior="padding" style={styles.loginOuterContainer}>
    //       <View style={styles.loginContainer}>
    //         <Text>Please login/signin to view your tickets</Text>
    //       </View>
    //       <View>
    //         <FBLogin
    //           navigation={this.props.navigation}
    //           eventDataFromBookingScreen={eventData}
    //           gotoScreen={mevalue}
    //         />
    //         <GLogin
    //           navigation={this.props.navigation}
    //           eventDataFromBookingScreen={eventData}
    //           gotoScreen={mevalue}
    //         />
    //       </View>
    //     </View>
    //   );
    // }

    if (this.state.dataSource == null) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "#000000", textAlign: "center" }}>
            {" "}
            No ticket booked yet
          </Text>
        </View>
      );
    } else {
      console.log("I am in else");
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <FlatList
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  loginOuterContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  }
});
