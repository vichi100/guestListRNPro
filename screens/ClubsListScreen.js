import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Calendar from "./calendar/Calendar";
import moment from "moment";
import Card from "./Card";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardAction from "./CardAction";
import CardButton from "./CardButton";
import CardImage from "./CardImage";
import CardImageOverlay from "./CardImageOverlay";
import CardOverlay from "./CardOverlay";
import { OpenMapDirections } from '../screens/gmap/GMapDirectionDrive'; 
import CardVideo from './CardVideoOverlay';
//import { CardButton } from 'react-native-material-cards'


import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import getDirections from "../screens/gmap/gmapsdirection";

import GuestListScreen from "./GuestListScreen";
import BookingScreen from "./BookingScreen";
import { SERVER_URL } from '../constants';
import axios from 'axios'

export default class ClubsListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      liked: false
    };
  }
  pressedLike =() => {  
    this.setState({liked: !this.state.liked, })
  }

  async componentDidMount() {
    var city = global.city;
    return await axios.get(SERVER_URL+"clubsDetails?city="+city)
      //.then(response => response.json())
      .then(response => { 
        console.log("clubs list data : " + JSON.stringify(response.data)); 
        this.setState({ dataSource: response.data, isLoading: false });
      })
      .catch(error => {
        console.error(error); 
      });
  }




  _getEventsOfOneClub = (item) => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    console.log("clubid ; " + item.clubid);
    this.props.navigation.navigate("EventsOfOneClub", {
      clubid: item.clubid,

    });
  };




  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      //EventsOfOneClub
      <View style={styles.container}>
     
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this._getEventsOfOneClub(item)}>
            {/* <CardOverlay> */}
              <CardImageOverlay
                source={{
                  uri: "http://199.180.133.121:3030"+item.imageurl
                    //"http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg"
                    // "http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg"
                    //images/club/barrelandheriwest/event/tuesday.jpg
                    
                }}
                title={item.clubname}
                location={item.location}
                latlong = {item.latlong}
                //eventDate={item.date}
                //title="Above all i am here"
              />
             {/* <View style={styles.rowContainer}>
             <View style={styles.rowText}>
                <Text
                  style={styles.title}
                  numberOfLines={2}
                  ellipsizeMode={"tail"}
                >
                  {item.clubname.toUpperCase()} 
                </Text>
                <Text
                  style={styles.author}
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                >
                  {item.location}
                </Text>
                <Text
                  style={styles.author}
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                >
                  Offer inside
                </Text>
              </View>


              <View style={styles.dateContainer}>
              <TouchableOpacity onPress={() => this._callShowDirections()}>
              <MaterialIcons style={styles.icons} name="near-me" size={30} />
              </TouchableOpacity>
              </View>
              
              
         
            </View> */}
            {/* </CardOverlay> */}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.clubid + item.clubname}
        />
        
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 2
  },
  touchButton: {
    alignSelf: "center",
    backgroundColor: "#2980b9",
    paddingVertical: 25,
    width: 295,
    margin: 15
  },
  touchButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold"
  },
  icons: {
    color: "#60B2E5"
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    //height: 100,
    //padding: 10,
    marginRight: 10,
    marginLeft: 5,
    //marginTop: 5,
    //borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#ffffff"
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  dateContainer: {
    marginTop: 10, 
    marginRight: 8
  },
  rowText: {
    flex: 4,
    flexDirection: "column",
    marginBottom: 10
  },
  title: {
    //paddingLeft: 5,
    //paddingTop: 5,
    fontSize: 16,
    fontWeight: "500",
    color: "#424242" 
  },

});
