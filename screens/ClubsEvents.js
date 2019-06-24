import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView
} from "react-native";
import Calendar from "./calendar/Calendar";
import moment from "moment";
import Card from "./Card";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardAction from "./CardAction";
import CardButton from "./CardButton";
// import CardImage from "./CardImage";
import CardImageOverlayEvents from "./CardImageOverlayEvents";
//import { CardButton } from 'react-native-material-cards'

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { EvilIcons } from "@expo/vector-icons";

import GuestListScreen from "./GuestListScreen";
import BookingScreen from "./BookingScreen";
import axios from 'axios';
import { SERVER_URL } from '../constants';
import NumericInput from "../screens/numericInput/NumericInput";


var mydatasource = [];
var mybookingDataSource = [];
var isDataChanged = false;

const mywidth = Dimensions.get("window").width;
const myheight = Dimensions.get("window").height;
const mycenter = Dimensions.get("window").height / 2;

const mydata = (data, eventdate) =>
  data.filter(item => {
    // console.log("Date : "+date.format('DD/MMM/YYYY'))
    // console.log("Data : "+JSON.stringify(data))
    isDataChanged = true;
    return item.eventdate === eventdate.format("DD/MMM/YYYY");
  });


  const myBookingdata = (data, eventdate) =>
  data.filter(item => {
    // console.log("Date : "+date.format('DD/MMM/YYYY'))
    // console.log("Data : "+JSON.stringify(data))
    isDataChanged = true;
    return item.eventdate === eventdate.format("DD/MMM/YYYY"); 
  });

export default class ClubsEvents extends Component {  

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
      isLoading: true,
      dataSource: [],
      bookingDataSource: null,
      guestListCoupleCount:0,
      guestListGirlCount : 0,
      passCoupleCount :0,
      passCoupleCost:  0,
      passStagCount : 0,
      passStagCost : 0,
    };
  }

  componentDidMount() {
    var clubid = '1000002';
    //return axios.get(SERVER_URL+"eventsDetails?city="+city)
    return axios.get(SERVER_URL+"eventsNBookingDetails?clubid="+clubid)
      //.then(response => response.json())
      .then(response => { 
        //console.log("ClubsEvents: response data from server eventDetails: " + JSON.stringify(response.data.eventDetails));
        console.log("ClubsEvents: response data from server bookingDetails: " + JSON.stringify(response.data.bookingDetails));

        mydatasource = response.data.eventDetails; 
        x = mydatasource.filter(item => {
          // console.log("item.date : " + item.eventdate);
          // console.log("item.clubname : " + item.clubname);
          // console.log("filter date : " + moment().format('DD/MMM/YYYY'));
          return item.eventdate === moment().format("DD/MMM/YYYY");  
        });

        mybookingDataSource = response.data.bookingDetails;

        y = mybookingDataSource.filter(item => { 
          // console.log("item.date : " + item.eventdate);
          // console.log("item.clubname : " + item.clubname);
          // console.log("filter date : " + moment().format('DD/MMM/YYYY'));
          return item.eventdate === moment().format("DD/MMM/YYYY");
        });

        this.setTicketDetailsByCategort(y);

        this.setState({ dataSource: x, bookingDataSource: y, isLoading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }


setTicketDetailsByCategort = (response) =>{
  var guestListCoupleCount = 0;
  var guestListGirlCount = 0;
  var passCoupleCount = 0;
  var passCoupleCost = 0;
  var passStagCount = 0;
  var passStagCost = 0;

  console.log("ClubsEvents: response: "+JSON.stringify(response))

  Object.keys(response).map((keyName, keyIndex) =>{ 
    //CHECK IF COUPLE TICKET IS AVAILABLE
    if(response[keyName].category == 'couple' && response[keyName].type == 'guest list'){
      guestListCoupleCount = guestListCoupleCount + 1; 
      // availbleticketsForCouple = availbleticketsForCouple + parseInt(response[keyName].availbletickets);
      // if(ticketIdForCouple == null){
      //   ticketIdForCouple = response[keyName].ticketid;
      //   this.setState({ticketIdForCouple: ticketIdForCouple})
      // }
    }

    //CHECK IF GIRL TICKET IS AVAILABLE
    if(response[keyName].category == 'girl'  && response[keyName].type == 'guest list'){
      guestListGirlCount = guestListGirlCount + 1;
      // availbleticketsForGirl = availbleticketsForGirl + parseInt(response[keyName].availbletickets);
      // if(ticketIdForGirl == null){
      //   ticketIdForGirl = response[keyName].ticketid;
      //   this.setState({ticketIdForGirl: ticketIdForGirl})
      // }
    }
    
    // get couple pass cost
    if(response[keyName].category == 'couple' && response[keyName].type == 'pass' ){
        passCoupleCount = passCoupleCount + 1;
        passCoupleCost = passCoupleCost + response[keyName].cost;
        //this.setState({clubTicketData: {passCoupleCost: passCoupleCost}})
    }

    // get couple pass cost
    if(response[keyName].category == 'stag' && response[keyName].type == 'pass' ){
      passStagCount = passStagCount +1;
      passStagCost = passStagCost + response[keyName].cost;
      //this.setState({clubTicketData: {passStagCost: passStagCost}})
    }
    
  })

  this.setState({ guestListCoupleCount: guestListCoupleCount,
                  guestListGirlCount: guestListGirlCount,
                  passCoupleCount: passCoupleCount,
                  passCoupleCost: passCoupleCost,
                  passStagCount: passStagCount,
                  passStagCost: passStagCost,
          })

  console.log("guestListCoupleCount: "+guestListCoupleCount);

}


  onSelectDate = date => {
    // console.log("date ; " + date, 'day');
    // console.log(date.format('DD/MMM/YYYY'));
    
    this.setState({ dataSource: mydata(mydatasource, date),  bookingDataSource:myBookingdata(mybookingDataSource, date)});
    this.setTicketDetailsByCategort(myBookingdata);
  };

  goToGuestListScreen = item => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    // DJ, PR and guestlist is allowed to post only guestlist
    if(item.postedby == 'guestlist' || item.postedby == 'dj' || item.postedby == 'pr'){
      this.props.navigation.navigate("BookingScreenOnlyForGuestList", { data: item, me: "yo" });
    }else{
      this.props.navigation.navigate("BookingScreen", { data: item, me: "yo" });
    }
    
  };

  pressedLike = () =>{
    
  }

  goToTableScreen = item => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    //this.props.navigation.navigate("TableScreen", { data: item, me: "yo" });
    if(item.postedby == 'club'){
      this.props.navigation.navigate("TableScreen", { data: item, me: "yo" });
      
    }else{
      this.props.navigation.navigate("TableScreenNoLayout", { data: item, me: "yo" });
    }
    
    
  };

  _showMoreApp = () => {
    //this.props.navigation.navigate('Other');
  };

  render() {
    setTimeout(() => {}, 200);

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    var   count = Object.keys(this.state.dataSource).length;

    if(count == 0){
      return (
      <View style={styles.container}>
      <Calendar onSelectDate={this.onSelectDate} />
      <Text style={{textAlign: 'center', color: "#424242", fontSize: 16, fontWeight: '600'}}>
          No event posted by you :(
      </Text>
        
      </View>

      );
    }else{

    return (
      <View style={styles.container}>
        <Calendar onSelectDate={this.onSelectDate} />
        <FlatList
          data={this.state.dataSource}
          extraData={this.state}
          renderItem={({ item }) => (
            
            <View
              style={[styles.cardImage]}
              onLayout={e => {
                this.setState({
                  calc_height: (e.nativeEvent.layout.width * 9) / 16
                });
              }}
            >
              <ImageBackground
                source={{ uri: "http://199.180.133.121:3030" + item.imageurl }}
                resizeMode="cover" //{this.props.resizeMode || "cover"}
                resizeMethod="scale" //{this.props.resizeMethod || "resize"}
                style={[
                  styles.imageContainer,
                  { height: this.state.calc_height }
                ]}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    alignSelf: "flex-start",
                    position: "absolute",
                    bottom: 0,
                    //left:0,
                    height: 75,
                    width: mywidth,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      style={{ color: "#e040fb", fontSize: 15 }}
                      numberOfLines={1}
                    >
                      {item.eventname}
                    </Text>
                    <Text
                      style={{
                        color: "#2196f3",
                        fontSize: 17,
                        fontWeight: "bold"
                      }}
                    >
                      {item.clubname}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 35,
                      width: 1,
                      backgroundColor: "#ffffff",
                      marginRight: 5
                    }}
                  />
                  <View style={styles.rowText}>
                    <Text
                      style={{
                        textAlign: "right",
                        color: "#ff9800",
                        fontSize: 16
                      }}
                      numberOfLines={2}
                      ellipsizeMode={"tail"}
                    >
                     {item.offertitile}
                    </Text>
                    {/* <Text
                      style={{ textAlign: "right", color: "#ff9800" }}
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                    >
                      upto 1:00PM
                    </Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    //backgroundColor: '#ffffff',
                    position: "absolute",
                    bottom: 0,
                    justifyContent: "center",
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 5,
                      justifyContent: "flex-start",
                      flex: 1,
                      marginLeft: 10
                      // marginRight: 10
                    }}
                  >
                    <Ionicons style={styles.icons} name="ios-list" size={15} />
                    <CardButton
                      onPress={() => this.goToGuestListScreen(item)}
                      title="GuestList"
                      color="blue"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 5,
                      justifyContent: "center",
                      flex: 1
                      // marginLeft: 10,
                      // marginRight: 10
                    }}
                  >
                    <FontAwesome style={styles.icons} name="ticket" size={15} />
                    <CardButton
                      onPress={() => this.goToGuestListScreen(item)}
                      title="Pass"
                      color="blue"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 5,
                      justifyContent: "flex-end",
                      flex: 1,
                      // marginLeft: 10,
                      marginRight: 5
                    }}
                  >
                    <MaterialCommunityIcons
                      style={styles.icons}
                      name="table-plus"
                      size={15}
                    />

                    <CardButton
                      onPress={() => this.goToTableScreen(item)}
                      title="Table"
                      color="#8FD694"
                    />
                  </View>
                </View>

                <MaterialCommunityIcons
                  onPress={() => this.pressedLike()}
                  style={styles.heartwhite}
                  name="heart-outline"
                  size={30}
                />
                <EvilIcons style={styles.share} name="share-google" size={30} />
              </ImageBackground>
            </View>
          )}
          keyExtractor={item => item.eventid + item.eventdate}
        />

        <ScrollView>

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
                Guest Lists
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
                <Text style={styles.instructions}>Girls/Free</Text>
                
               <Text style={styles.instructions}> {this.state.guestListGirlCount}</Text>
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
                 Couple/Free
                </Text>
                <Text style={styles.instructions}> {this.state.guestListCoupleCount}</Text>
              </View>
            </View>
          
          </View>

          {/* <GuestListScreen /> End */}
          {/* <PassScreen /> Start*/}

          <View
            //outer Pass
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
              <FontAwesome style={styles.icons} name="ticket" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>Passes</Text>
            </View>

            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  // height: this.props.height,
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
                  Couples
                </Text>
                <Text style={styles.instructions}> {this.state.passCoupleCount}/{this.state.passCoupleCost}</Text>
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
                  Stags
                </Text>
                <Text style={styles.instructions}> {this.state.passStagCount}/{this.state.passStagCost}</Text>
              </View>
            </View>
          </View>

          {/* <PassScreen /> End*/}
          {/* <Table/> Start */}

          <View
            //Table Details
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
                name="table-settings"
                size={20}
              />
              <Text style={{ fontSize: 14 , color:'#4caf50'}}>Table Details</Text>
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
                <Text style={styles.instructions}>Table No.</Text>
                <Text style={styles.instructions}>
                10
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
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                  marginRight: 10 
                }}
              >
                <Text style={styles.instructions}>Table Size</Text>
                <Text style={styles.instructions}>
                 guests
                    </Text>
              </View>
            </View>
          </View>

      
      </ScrollView>
      </View>
    );
   }
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
    //transform: [{ rotate: '90deg'}]
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    //height: 100,
    //padding: 10,
    marginRight: 10,
    paddingLeft: 5,
    //marginLeft: 10,
    //marginTop: 5,
    //borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#ffffff"
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  dateContainer: {
    //marginLeft: 10,
    marginRight: 10
  },
  rowText: {
    flex: 1,
    flexDirection: "column",
    color: "#607d8b"
    //textAlign: 'right', alignSelf: 'stretch'
  },
  cardImage: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "grey",
    //alignSelf: 'stretch',
    marginBottom: 1,
    justifyContent: "center"
    //alignItems: 'stretch'
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    //paddingRight: 16,
    //paddingLeft: 16,
    paddingBottom: 10,
    paddingTop: 5,
    justifyContent: "flex-end"
  },
  imageTitleText: {
    fontSize: 24,
    color: "rgba(255 ,255 ,255 , 0.87)"
  },
  heartwhite: {
    margin: 10,
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    color: "#ffffff"
  },
  heartred: {
    margin: 10,
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    color: "red"
  },
  share: {
    margin: 10,
    position: "absolute",
    top: 50,
    right: 0,
    width: 30,
    height: 30,
    color: "#009688"
  },
  near_me: {
    margin: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    color: "#60B2E5"
  },

  rowText: {
    flex: 1,
    flexDirection: "column",
    color: "#607d8b",
    marginRight: 10
    //textAlign: 'right', alignSelf: 'stretch'
  },
  icons: {
    color: "#60B2E5"
    //transform: [{ rotate: '90deg'}]
  },
  // icons: {
  //   width: 30,
  //   height: 30,
  //   color: "#0091ea"
  //   //borderRadius: 30,
  //   //borderWidth: 2,
  //   //borderColor: 'rgb(170, 207, 202)'
  // },
  instructions: {
    color: "#e0e0e0"
  },
});
