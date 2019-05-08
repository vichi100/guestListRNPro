import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  WebView,
  ActivityIndicator,
  Dimensions,
  YellowBox
} from "react-native";
import moment from "moment";
//import WebViewPostMessage from './react-native-web-view'
//import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { create, PREDEF_RES } from "react-native-pixel-perfect";
import TableDetailsnPrice from "./TableDetailsnPrice";
import Dialog from "react-native-dialog";
import { AsyncStorage } from "react-native";
import axios from 'axios';
import { SERVER_URL } from '../constants';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

let eventData;
var email;
var mobile;

var clickedTableid = null;
YellowBox.ignoreWarnings(["Warning", "Encountered an error loading page"]);

export default class TableScreenNoLayout extends React.Component {
  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "Table Booking",
    headerBackTitle: null,
    headerTintColor: "#ffffff",
    headerStyle: {
      backgroundColor: "#263238"
      //Background Color of Navigation Bar
    },
    headerTitleStyle: {
      justifyContent: "center",
      color: "#ffffff",
      textAlign: "left",
      flex: 1
    }
  };

  static defaultProps = {
    backgroundColor: "#37474f",
    marginTop: 1,
    //width: 150,
    //height: 150,
    shadowColor: "rgb(50,50,50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      calc_height: 0,
      //tableNumber: null,
      dataSource: [],
      // tableNumber:null,
      // tablePrice:null,
      // tableSize: null,
      // tableDetails:null,
      // tablelayoutURL: null,
      tableData: null,
      tablePx: 0
    };
  }

  componentDidMount() {
    //return fetch(SERVER_URL+"tableDetails?clubid=1000001&eventDate=19/Mar/2019")
    return axios.get(
      SERVER_URL+"tableDetails?clubid=" +
        eventData.clubid +
        "&eventDate=" +
        eventData.eventdate
    )
      //.then(response => response.json())
      .then(response => {
        response = response.data
        console.log("Table data from response  : " + JSON.stringify(response));
        Object.keys(response).map((keyName, keyIndex) => {
          // use keyName to get current key's name
          let tableid = response[keyName].tableid;
          console.log("tableid " + tableid);
          // console.log("data : " + response[keyName].type);
          // and a[keyName] to get its value
        });

        this.setState({ dataSource: response, isLoading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  bookTicket = async () => {
    email = await AsyncStorage.getItem("email");
    mobile = await AsyncStorage.getItem("mobile");
    var userid = await AsyncStorage.getItem("customerId");
    var custName = await AsyncStorage.getItem("name");
    console.log(email + ": " + mobile);
    if(this.state.tablePx == 0){
      this._showDialog();
      return;
    }



    if (email == null && mobile == null) {
      // go to login form
      console.log(email + ": " + mobile);
      //this.props.navigation.navigate('BookingScreen', {data:item});
      this.props.navigation.navigate("LoginScreen", {
        eventDataFromBookingScreen: eventData,
        me: "TableScreenNoLayout"
      }); // move to login page
      return;
    }

    var bookingTimeStamp = moment().valueOf();
    var postData = {
      bookingid: bookingTimeStamp,
      userid: userid,
      username: custName,
      mobilenumber: mobile,
      email: email,
      clubid: eventData.clubid,
      clubname: eventData.clubname,
      eventid: eventData.eventid,
      eventname: eventData.eventname,
      eventdate: eventData.eventdate,
      imageurl: eventData.imageurl,
      postedby: eventData.postedby, //[guestlist, club, dj, pr]
      offerid: eventData.offerid,
      tablediscountamt: null, //eventData.tablediscount,
      tablediscountpercentage: null,
      passdiscountamt: null, //eventData.passdiscount,
      passdiscountpercentage: null,
      purpose: "Table Booking",
      totalprice: "Pay at club",
      priceafterdiscount: null,
      bookingamount: 0, //this.state.totalAmountAfterDiscount,
      remainingamount: "Pay at club",
      guestlistgirlcount: null,
      guestlistcouplecount: null,
      passcouplecount: null,
      passstagcount: null,
      tablenumber: null,
      tablepx: this.state.tablePx,
      transactionnumber: bookingTimeStamp, //transactionnumber,
      paymentstatusmsg: "pending",
      bookingconfirm: "pending",//pending or confirmed
      termncondition: "",
      latlong: eventData.latlong,
      qrcode:
        eventData.clubid +
        "_" +
        eventData.clubname +
        "_" +
        eventData.eventid +
        "_" +
        eventData.eventdate +
        "_" +
        bookingTimeStamp,
      bookingdate: moment().toDate(),
      bookingtimestamp: bookingTimeStamp // current date and time
    };

    console.log("bookingData: " + JSON.stringify(postData));
    this.sendbookingDetailsToServer(postData);

    // if (true) {
    //   console.log("totalprice: " + postData.totalprice);
    //   //this.props.navigation.navigate("PayTmScreen", {bookingData: postData, me:'BookingScreen'});
    //   this.props.navigation.navigate("TicketDisplayFromNoLayoutTableBooking", {
    //     bookingData: postData,
    //     me: "TicketDisplayFromNoLayoutTableBooking"
    //   });
    // }
  };


  sendbookingDetailsToServer = (bookingData) => {
    // SEND BOOKING DETAILS TO SERVER -  START
    // return fetch(SERVER_URL+"bookTicket", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(bookingData)
    // })
    return axios.post(SERVER_URL+"bookTicket", bookingData, {
      headers: {
        'Content-Type': 'application/json',
    },
    })
      //.then(response => response.json())
      .then(response => {
        console.log("data : " + response.data);
        this.setState({ dataSource: response.data, isLoading: false });
        
        this.props.navigation.navigate("TicketDisplayFromNoLayoutTableBooking", {
          bookingData: bookingData ,
          me: "TicketDisplayFromNoLayoutTableBooking"
        });
        

        console.log("PaymentOptions data send to server");
      })
      .catch(error => {
        console.error(error);
      });
    // SEND BOOKING DETAILS TO SERVER FINSH -END
  };

  _showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  
  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  pressedIncreaseGuestListCoupleCount = value => { 
    console.log("tablePx" + JSON.stringify(value));
    this.setState({ tablePx: value.tablePx });
  };

  render() {
    setTimeout(() => {}, 200);

    const { navigation } = this.props;
    eventData = navigation.getParam("data");
    const meValue = navigation.getParam("me");
    console.log("meValue: " + meValue);
    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, "g"), replace);
    }
    var eventDateForImageURL = eventData.eventdate.replace(
      new RegExp("/", "g"),
      ""
    );
    console.log("eventDateForImageURL " + eventDateForImageURL);
    console.log("data from events screen :" + JSON.stringify(eventData));
    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={false}>
          <View
            //outer Pass
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                height: height,
                //margin: 5,
                ...Platform.select({
                  ios: {
                    shadowColor: this.props.shadowColor,
                    shadowOpacity: this.props.shadowOpacity,
                    shadowRadius: this.props.shadowRadius,
                    shadowOffset: {
                      height: -1,
                      width: 0
                    }
                  },
                  android: {
                    elevation: this.props.elevation
                  }
                })
              }
            ]}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <MaterialCommunityIcons
                style={styles.icons}
                name="table-plus"
                size={20}
              />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>
                Table Booking
              </Text>
            </View>

            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: 55,
                  margin: 5,
                  ...Platform.select({
                    ios: {
                      shadowColor: this.props.shadowColor,
                      shadowOpacity: this.props.shadowOpacity,
                      shadowRadius: this.props.shadowRadius,
                      shadowOffset: {
                        height: -1,
                        width: 0
                      }
                    },
                    android: {
                      elevation: this.props.elevation
                    }
                  })
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5
                  //marginLeft: 10,
                  //marginRight: 10
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    color: "#e0e0e0",
                    textAlign: "center"
                  }}
                >
                  Sorry! we do not have table layout for this club{"\n"}but you
                  can still book table
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  //height: this.props.height,
                  height: 45,
                  margin: 5,
                  ...Platform.select({
                    ios: {
                      shadowColor: this.props.shadowColor,
                      shadowOpacity: this.props.shadowOpacity,
                      shadowRadius: this.props.shadowRadius,
                      shadowOffset: {
                        height: -1,
                        width: 0
                      }
                    },
                    android: {
                      elevation: this.props.elevation
                    }
                  })
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.instructions}>Number of guest</Text>
                <NumericInput
                  initValue={this.state.tablePx}
                  value={this.state.tablePx}
                  onChange={tablePx =>
                    this.pressedIncreaseGuestListCoupleCount({
                      tablePx 
                    })
                  }
                  totalWidth={150} 
                  totalHeight={35}
                  minValue={0}
                  maxValue={20}
                  step={1}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>

            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: 35,
                  margin: 5,
                  ...Platform.select({
                    ios: {
                      shadowColor: this.props.shadowColor,
                      shadowOpacity: this.props.shadowOpacity,
                      shadowRadius: this.props.shadowRadius,
                      shadowOffset: {
                        height: -1,
                        width: 0
                      }
                    },
                    android: {
                      elevation: this.props.elevation
                    }
                  })
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 15,
                  marginBottom: 5
                  //marginLeft: 10,
                  //marginRight: 10
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    color: "#e0e0e0",
                    textAlign: "center"
                  }}
                >
                  Please call or chat with us on +91 9867614466
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.bookTicket()}
          style={{
            height: 50
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#263238"
            }}
          >
            <Text style={{ color: "#ffffff" }}>BOOK</Text>
          </View>
        </TouchableOpacity>

        <Dialog.Container visible={this.state.dialogVisible}>
          {/* <Dialog.Title>Enter Mobile Number</Dialog.Title> */}
          <Dialog.Description>
            Number of guest is zero!
          </Dialog.Description>

          
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="OK"
            onPress={this.handleOk}
          />
        </Dialog.Container>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //backgroundColor: "#939393",
  },

  icons: {
    width: 30,
    height: 30,
    color: "#0091ea"
    //borderRadius: 30,
    //borderWidth: 2,
    //borderColor: 'rgb(170, 207, 202)'
  },
  instructions: {
    color: "#e0e0e0"
  }
});
