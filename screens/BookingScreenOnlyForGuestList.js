import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  ActivityIndicator
} from "react-native";

import moment from "moment";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";

import Card from "./Card";
import CardImageOverlayBooking from "./CardImageOverlayBooking";
import GuestListScreen from "./GuestListScreen";
import PassScreen from "./PassScreen";
import TableScreen from "./TableScreen";
import { bold } from "ansi-colors";
import BillDetailsScreen from "./BillDetailsScreenForBooking";
import TicketDisplayScreen from "./ticketDistpay/TicketDisplayScreen";

import Login from "./login/Login";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "./numericInput/NumericInput";
import { create, PREDEF_RES } from "react-native-pixel-perfect";
const calcSize = create(PREDEF_RES.iphone7.px);
import Dialog from "react-native-dialog";
import { SERVER_URL } from '../constants';

import axios from 'axios'

const window = Dimensions.get("window");

var email;
var mobile;

let w = window.Width;
let eventData;


export default class BookingScreenOnlyForGuestList extends React.Component {
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

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "Booking",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#263238"
      //Background Color of Navigation Bar
    },

    headerTitleStyle: {
      justifyContent: "center",
      color: "#ffffff",
      textAlign: "left",
      flex: 1
    },

    headerTintColor: "#ffffff"
    //Text Color of Navigation Bar
  };

  constructor(props) {
    super(props);
    this.state = {
      calc_height: 0,
      isLoading: true,
      availbleticketsForCouple: null,
      availbleticketsForGirl: null,
      guestListCoupleAvailableStr: "Couple/Free",
      guestListGirlAvailableStr: "Girl/Free",
      guestListTitleStr:"Guest List",
      totalAmount: 0,
      remainingamount: 0,
      bookingAmount:0,
      clubTicketData:null,
      eventTicketDataByDj:null,
      eventTicketDataByPR:null,
      eventTicketDataByGuestList: null,
      totalGirlGuestListCount: 0,
      totalCoupleGuestListCount: 0,
      dataSource: [],
      lastPassCoupleCount:0,
      lastPassStagCount:0,
      guestlistgirlcount:0,
      guestlistcouplecount: 0,
      passcouplecount: 0,
      passstagcount:0,
      dialogVisible : false,
      ticketIdForGirl: null,
      ticketIdForCouple: null,
      guestListAlreadyBooked: false,
    
    };
  }

  componentDidMount() {
    return axios.get(
      SERVER_URL+"ticketDetails?clubid=" +
        eventData.clubid +
        "&eventDate=" +
        eventData.eventdate
    )
      //.then(response => response.json()) 
      .then(response => {
        console.log("BookingScreenOnlyForGuestList: ticketDetailsData : " + JSON.stringify(response.data));
        // check if tickets are availbale in guestlist or not
        response = response.data;
        let availbleticketsForCouple = -100;
        let availbleticketsForGirl = -100; 
        let ticketIdForGirl = null;
        let ticketIdForCouple = null;
        Object.keys(response).map((keyName, keyIndex) =>{ 
          //CHECK IF COUPLE TICKET IS AVAILABLE
          if(response[keyName].category == 'couple' && parseInt(response[keyName].availbletickets) > 0){ 
            availbleticketsForCouple = availbleticketsForCouple + parseInt(response[keyName].availbletickets);
            if(ticketIdForCouple == null){
              ticketIdForCouple = response[keyName].ticketid;
              this.setState({ticketIdForCouple: ticketIdForCouple})
            }
          }

          //CHECK IF GIRL TICKET IS AVAILABLE
          if(response[keyName].category == 'girl' && parseInt(response[keyName].availbletickets) > 0){
            availbleticketsForGirl = availbleticketsForGirl + parseInt(response[keyName].availbletickets);
            if(ticketIdForGirl == null){
              ticketIdForGirl = response[keyName].ticketid;
              this.setState({ticketIdForGirl: ticketIdForGirl})
            }
          } 
          
        })
        console.log("BookingScreenOnlyForGuestList: availbleticketsForCouple:  "+availbleticketsForCouple);
        console.log("BookingScreenOnlyForGuestList: availbleticketsForGirl:  "+availbleticketsForGirl);
        this.setState({availbleticketsForCouple: availbleticketsForCouple});
        this.setState({availbleticketsForGirl: availbleticketsForGirl});

        if(availbleticketsForGirl <= 0 && eventData != null && eventData.postedby != 'guestlist'){
          this.setState({guestListGirlAvailableStr: 'Girl/Sold Out'});
        }

        if(availbleticketsForCouple <= 0 && eventData != null && eventData.postedby != 'guestlist'){
          this.setState({guestListCoupleAvailableStr: 'Couples/Sold Out'});
        }
        // check from which ticketid count need to reduce for girl and couple

        this.setState({ dataSource: response, isLoading: false }); 
      })
      .catch(error => {
        console.error(error);
      });
  }
 
  pressedIncreaseGuestListGirlCount = value => {
    console.log('this.state.availbleticketsForCouple: '+this.state.availbleticketsForGirl)
    if(parseInt(this.state.availbleticketsForGirl ) > 0){
      console.log("BookingScreenOnlyForGuestList: guestlistgirlcount " + JSON.stringify(value));
      this.setState({ guestlistgirlcount: value.guestlistgirlcount });
    }else if (eventData != null && eventData.postedby == 'guestlist'){
      
      this.setState({ guestlistgirlcount: value.guestlistgirlcount });
    }else {
      //do nothing
      this.setState({ guestlistgirlcount: 0 });
    }
    
  };

  pressedIncreaseGuestListCoupleCount = value => {
    if(parseInt(this.state.availbleticketsForCouple ) > 0){
      console.log("BookingScreenOnlyForGuestList: guestlistcouplecount" + JSON.stringify(value));
      this.setState({ guestlistcouplecount: value.guestlistcouplecount });
    }else if (eventData != null && eventData.postedby == 'guestlist'){
      
      this.setState({ guestlistcouplecount: value.guestlistcouplecount });
    }else{
      this.setState({ guestlistcouplecount: 0 });
    } 
  };

  //fetch data from AsyncStorage
  _retrieveData = async () => {
    try {
      email = await AsyncStorage.getItem("email");
      mobile = await AsyncStorage.getItem("mobile");
      if (email !== null && mobile !== null) {
        // We have data!!
        console.log(email + ": " + mobile);
      }
    } catch (error) {
      // Error retrieving data
    }
  };




  bookTicket = async eventData => {
    //check if guest is selected any ticket
    if(this.state.guestlistcouplecount == 0 && this.state.guestlistgirlcount ==0 
      && this.state.lastPassCoupleCount == 0 && this.state.lastPassStagCount ==0){
          this._showDialog();
          return; 
      }

    email = await AsyncStorage.getItem("email");
    mobile = await AsyncStorage.getItem("mobile");
    var userid = await AsyncStorage.getItem("customerId");
    var custName = await AsyncStorage.getItem("name");
    console.log('BookingScreenOnlyForGuestList: BookingScreenOnlyForGuestList: email1 : ' + ": " + email);
    console.log('BookingScreenOnlyForGuestList: BookingScreenOnlyForGuestList: mobile1 : ' + ": " + mobile); 

    if (email == null || mobile == null || userid == null) {
      // go to login form
      console.log('BookingScreenOnlyForGuestList: BookingScreenOnlyForGuestList: email2 : ' + ": " + email);
      console.log('BookingScreenOnlyForGuestList: mobile2 : ' + ": " + mobile);
      //this.props.navigation.navigate('BookingScreen', {data:item});
      this.props.navigation.navigate("LoginScreen", {bookingData: eventData, me:'BookingScreenOnlyForGuestList'}); // move to login page
      return;
    } 

    

    //after payment send booking details to server for ticket
    var bookingTimeStamp = moment().valueOf();

    console.log('BookingScreenOnlyForGuestList: eventData: '+JSON.stringify(eventData));
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
      postedby: eventData.postedby,
      offerid: eventData.offerid,
      purpose: 'Pass Booking',
      tablediscountamt: null, //eventData.tablediscount,
      tablediscountpercentage: null,
      passdiscountamt: null, //eventData.passdiscount,
      passdiscountpercentage: null,
      totalprice: this.state.totalAmount,
      priceafterdiscount: this.state.totalAmount,
      bookingamount: this.state.bookingAmount, //this.state.totalAmountAfterDiscount,
      remainingamount: this.state.remainingamount,
      guestlistgirlcount: this.state.guestlistgirlcount,
      guestlistcouplecount: this.state.guestlistcouplecount,
      passcouplecount: this.state.passcouplecount,
      passstagcount: this.state.passstagcount,
      tablenumber: null,
      tablepx: null,
      transactionnumber: bookingTimeStamp, //transactionnumber,
      paymentstatusmsg: null,
      bookingconfirm: null,
      termncondition: null,
      ticketIdForCouple: this.state.ticketIdForCouple,
      ticketIdForGirl: this.state.ticketIdForGirl,
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
        this.state.totalAmount +
        "_" +
        bookingTimeStamp,
      bookingdate: moment().toDate(),
      bookingtimestamp: bookingTimeStamp // current date and time
    };

    // check if guestlist for eventdate is already booked
    console.log("BookingScreenOnlyForGuestList:  passcouplecount: "+postData.passcouplecount)
    console.log("BookingScreenOnlyForGuestList:  passstagcount: "+postData.passstagcount)
    if((  postData.passcouplecount != null && postData.passcouplecount <= 0) 
          || (postData.passstagcount != null && postData.passstagcount <= 0) ){

            console.log("BookingScreenOnlyForGuestList: calling _showDialogForGuestListAlreadyBooked")
            
            var bookedClubName =  await AsyncStorage.getItem("bookedClubName");
            var bookedEventDate =   await AsyncStorage.getItem("bookedEventDate");  
          if(bookedEventDate == postData.eventdate ){
            this._showDialogForGuestListAlreadyBooked()
            console.log("BookingScreenOnlyForGuestList: method is _showDialogForGuestListAlreadyBooked")
            return;
          }
    }

    if(eventData.postedby == 'dj' || eventData.postedby == 'pr' || eventData.postedby == 'club'){
      postData.bookingconfirm = 'confirm'
    }else if(eventData.postedby == 'guestlist'){
      postData.bookingconfirm = 'pending'
    }


    // navigate to payment getway if total amount is > 0
    console.log('BookingScreenOnlyForGuestList: bookingData in BookingScreenOnlyForGuestList: '+JSON.stringify(postData));

    if(this.state.guestlistcouplecount > 0 || this.state.guestlistgirlcount > 0 ){
        console.log('BookingScreenOnlyForGuestList: totalprice in BookingScreenOnlyForGuestList:  '+postData.totalprice);
        // this.props.navigation.navigate("PaymentOptions", {bookingData: postData, me:'BookingScreen'});
        this.props.navigation.navigate("PaymentOptions", {bookingData: postData, me:'BookingScreenOnlyForGuestList'});
      }
 
  };

  _showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  _showDialogForGuestListAlreadyBooked = () => {
    this.setState({ guestListAlreadyBooked: true });
  }

  handleOkForGuestListAlreadyBooked = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ guestListAlreadyBooked: false });
  };
  
  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  pressedPassStag = value => {
    console.log("BookingScreenOnlyForGuestList: current stag " + JSON.stringify(value));
    console.log("BookingScreenOnlyForGuestList: this.state.totalAmount stag " + this.state.totalAmount);
    console.log("BookingScreenOnlyForGuestList: lastPassStagCount " + this.state.lastPassStagCount);

    if(this.state.bookingAmount == 0){
      this.setState({bookingAmount:500})
    }
    

    if (value.passstagcount > this.state.lastPassStagCount) {
      var totalAmountx =
        this.state.totalAmount + parseInt(this.state.clubTicketData.passStagCost);
        this.setState({ totalAmount: totalAmountx });
        if(totalAmountx > 0){
          totalAmountx = totalAmountx - 500;
        }
      this.setState({ remainingamount: totalAmountx });
    } else if (value.passstagcount < this.state.lastPassStagCount) {
      var totalAmountx =
        this.state.totalAmount - parseInt(this.state.clubTicketData.passStagCost);
        this.setState({ totalAmount: totalAmountx });
        if(totalAmountx > 0){
          totalAmountx = totalAmountx - 500;
        }
        
      this.setState({ remainingamount: totalAmountx });
    }
    this.setState({ passstagcount: value.passstagcount });
    this.setState({ lastPassStagCount: value.passstagcount });

    if(this.state.totalAmount == 0){  
      this.setState({bookingAmount:0})
    }
     
    setTimeout(() => {}, 200);
  };

  pressedPassCouple = value => {
    console.log("BookingScreenOnlyForGuestList:  current couple " + JSON.stringify(value));
    console.log("BookingScreenOnlyForGuestList: this.state.totalAmount couple " + this.state.totalAmount);
    console.log("BookingScreenOnlyForGuestList: lastPassCoupleCount " + this.state.lastPassCoupleCount);

    if(this.state.bookingAmount == 0){
      this.setState({bookingAmount:500})
    }
    setTimeout(() => {}, 500);

    console.log('BookingScreenOnlyForGuestList: bookingAmount: '+this.state.bookingAmount)
    

    if (value.passcouplecount > this.state.lastPassCoupleCount) {
      var totalAmountx =
        this.state.totalAmount + parseInt(this.state.clubTicketData.passCoupleCost);
        this.setState({ totalAmount: totalAmountx });
        console.log('BookingScreenOnlyForGuestList: bookingAmount2: '+this.state.bookingAmount)
        if(totalAmountx > 0){
          totalAmountx = totalAmountx - 500;
        }
      this.setState({ remainingamount: totalAmountx });
    } else if (value.passcouplecount < this.state.lastPassCoupleCount) {
      var totalAmountx =
        this.state.totalAmount - parseInt(this.state.clubTicketData.passCoupleCost);
        this.setState({ totalAmount: totalAmountx });
        if(totalAmountx > 0){
          totalAmountx = totalAmountx - 500;
        }
      this.setState({ remainingamount: totalAmountx });
    }

    this.setState({ passcouplecount: value.passcouplecount });
    //lastPassCoupleCount = value.passCouple;
    this.setState({ lastPassCoupleCount: value.passcouplecount });
    if(this.state.totalAmount == 0){
      this.setState({bookingAmount:0})
    }
    setTimeout(() => {}, 200);
  };

  render() {

    console.log("BookingScreenOnlyForGuestList: I am in BookingScreenOnlyForGuestList");
    const { navigation } = this.props;
    eventData = navigation.getParam("data");
    var meValue = navigation.getParam("me");
    console.log("BookingScreenOnlyForGuestList: me: " + JSON.stringify(meValue));
    console.log("BookingScreenOnlyForGuestList: data from events screen BookingScreenOnlyForGuestList:" + JSON.stringify(eventData));

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}> 
          <ActivityIndicator size="large" />
        </View>
      );
    }

    setTimeout(() => {}, 200);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <CardImageOverlayBooking
            source={{
              uri: "http://199.180.133.121:3030" + eventData.imageurl
              //"http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg"
            }}
            eventData={eventData}
          />

          {/* <GuestListScreen /> Start   */}

          <View
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 170,
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
              <Ionicons style={styles.icons} name="ios-list" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>
                {this.state.guestListTitleStr}
              </Text>
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
                <Text style={styles.instructions}>{this.state.guestListGirlAvailableStr}</Text>
                
                <NumericInput
                  initValue={this.state.guestlistgirlcount}
                  value={this.state.guestlistgirlcount}
                  onChange={guestlistgirlcount =>
                    this.pressedIncreaseGuestListGirlCount({
                      guestlistgirlcount
                    })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={0}
                  maxValue={3}
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

            <View style={[
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
                <Text style={styles.instructions}>
                  {this.state.guestListCoupleAvailableStr}
                </Text>
                <NumericInput
                  initValue={this.state.guestlistcouplecount}
                  value={this.state.guestlistcouplecount}
                  onChange={guestlistcouplecount =>
                    this.pressedIncreaseGuestListCoupleCount({
                      guestlistcouplecount
                    })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={0}
                  maxValue={1}
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
          
          </View>

          {/* <GuestListScreen /> End */}
          {/* <PassScreen /> Start*/}

          <View
            //outer GuestList
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                height: this.props.height,
                //margin: 5,
                ...Platform.select({
                  ios: {
                    shadowColor: this.props.shadowColor,
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: {
                      height: -1,
                      width: 0
                    }
                  },
                  android: {
                    elevation: 0
                  }
                })
              }
            ]}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <FontAwesome style={styles.icons} name="rupee" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>
                Payment Details
              </Text>
            </View>

            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
                <Text style={styles.instructions}>Booking Amount</Text>
                <Text style={styles.instructions}>
                  {this.state.bookingAmount} Rs
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
                  height: this.props.height,
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
                <Text style={styles.instructions}>Payable at club</Text>
                <Text style={styles.instructions}>
                  {this.state.remainingamount} Rs
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
                  height: this.props.height,
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
                <Text style={styles.instructions}>Total Amount</Text>
                <Text style={styles.instructions}>
                  {this.state.totalAmount} Rs
                </Text>
              </View>
            </View>

            
            
            
            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.coverCharge}>
                  All amount is with full cover charge
                </Text>
              </View>
            </View>

            <View
              //Couple Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
            />
          </View>

          
          <View style={{backgroundColor: "#37474f", height:170}}>
 
          </View>

        </ScrollView>






        <View style={{ width: w }}>
          <TouchableOpacity
            onPress={() => this.bookTicket(eventData)}
            style={{
              height: 50
              //width:160,
              //borderRadius:10,

              // marginLeft :50,
              // marginRight:50,
              // marginTop :20
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
          {/* <Button
            onPress={this.buttonClickListener}
            title="BOOK"
            color="#263238" 
            height="40"
          /> */}
        </View>

        <Dialog.Container visible={this.state.dialogVisible}>
          {/* <Dialog.Title>Enter Mobile Number</Dialog.Title> */}
          <Dialog.Description>
            No Guest List or Passes selected !
          </Dialog.Description>

          
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="OK"
            onPress={this.handleOk}
          />
        </Dialog.Container>

        <Dialog.Container visible={this.state.guestListAlreadyBooked}>
          {/* <Dialog.Title>Enter Mobile Number</Dialog.Title> */}
          <Dialog.Description>
            You have already booked GuestList/Free Pass for date {eventData.eventdate} in  {eventData.clubname} club
          </Dialog.Description>

          
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="OK"
            onPress={this.handleOkForGuestListAlreadyBooked}
          />
        </Dialog.Container>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
    //backgroundColor: "#939393",
  },

  icons: {
    width: 30,
    height: 30,
    //borderRadius: 30,
    //borderWidth: 2,
    borderColor: "rgb(170, 207, 202)"
  },

  dateContainer: {
    marginLeft: 10,
    marginRight: 10
  },

  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    //height: 100,
    //padding: 10,
    marginRight: 10,
    marginLeft: 10,
    //marginTop: 5,
    //borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#ffffff"
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  title: {
    paddingLeft: 10,
    //paddingTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#777"
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: "#777"
  },
  thumbnail: {
    flex: 1
    // height: undefined,
    // width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: "column"
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
  },
  coverCharge: {
    color: "#e0e0e0"
  }
});
