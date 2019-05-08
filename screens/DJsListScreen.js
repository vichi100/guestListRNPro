import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";

import Calendar from "./calendar/Calendar";
import moment from "moment";
import CardDark from "./CardDark";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardAction from "./CardAction";
import CardButton from "./CardButton";
import CardImage from "./CardImage";
import { OpenMapDirections } from "../screens/gmap/GMapDirectionDrive";
//import { CardButton } from 'react-native-material-cards'

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { SERVER_URL } from '../constants';



export default class DJsListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      liked: false
    };
  }
  pressedLike = () => {
    this.setState({ liked: !this.state.liked });
  };

  componentDidMount() {
    var city = global.city;
    return axios.get(SERVER_URL+"djDetails?city="+city)
      //.then(response => response.json())
      .then(response => {
        //console.log("data : " + response);
        this.setState({ dataSource: response.data, isLoading: false });
      })
      .catch(error => {
        console.error(error); 
      });
  }

  goToDJProfile = item => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    this.props.navigation.navigate("DJProfile", { item: item });
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
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <CardDark>
              <View style={styles.meInfoWrap}>
                <TouchableOpacity onPress={() => this.goToDJProfile(item)}>
                  <View style={styles.meInfo}>
                    <Image
                      source={{
                        uri: "http://199.180.133.121:3030" + item.picurl
                      }}
                      style={styles.mePic}
                    />
                  </View>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <View style={styles.edit}>
                    <Text
                      style={{
                        fontWeight: "500",
                        color: "#1de9b6",
                        marginTop: 10
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      flexDirection: "row",
                      //width: 40,
                      backgroundColor: "#03a9f4",
                      marginTop: 5,
                      marginLeft: 50,
                      marginRight: 50
                    }}
                  />
                  <View style={styles.meData}>
                    <View style={styles.data}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#f5f5f5"
                        }}
                      >
                        {item.eventscount}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#e0e0e0" }}>
                        events
                      </Text>
                    </View>

                    <View style={styles.data}>
                      <Text style={{ fontWeight: "600", color: "#f5f5f5" }}>
                        {item.followers}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#e0e0e0" }}>
                        followers
                      </Text>
                    </View>
                    <View style={styles.data}>
                      <TouchableOpacity
                        onPress={() => {
                          this.pressedLike();
                        }}
                      >
                        <MaterialCommunityIcons
                          color={
                            this.state.touchableHighlightMouseDown
                              ? "#f5f5f5"
                              : this.state.liked
                              ? "#dd2c00"
                              : "#f5f5f5"
                          }
                          name="heart-outline"
                          size={20}
                        />
                        <Text style={{ fontSize: 12, color: "#e0e0e0" }}>
                          {this.state.touchableHighlightMouseDown
                            ? "follow"
                            : this.state.liked
                            ? "unfollow"
                            : "follow"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </CardDark>
          )}
          keyExtractor={item => item.djid + item.email}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
    //paddingTop: 2
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  mePic: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  meInfoWrap: {
    //paddingTop: 5,
    marginTop: 10,
    flexDirection: "row"
  },
  meData: {
    flex: 2,
    paddingTop: 10,
    flexDirection: "row",
    marginBottom: 10
  },
  meInfo: {
    alignItems: "center",
    padding: 5
  },
  meName: {
    fontWeight: "bold",
    fontSize: 12
    //paddingTop:10
  },
  data: {
    flex: 1,
    alignItems: "center"
  },
  edit: {
    //borderWidth:1,
    // borderColor:'#1de9b6',
    // borderRadius:3,
    alignItems: "center",
    //margin:15,
    padding: 2
  },
  heart: {
    // margin: 10,
    // position: "absolute",
    // top: 0,
    // right: 0,
    // width: 25,
    // height: 25,
    color: "tomato"
  }
});
