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
  Dimensions
} from "react-native";

import { BackHandler } from "react-native";


import TermnConditionForTable from "./ticketDistpay/TermnCondtionForTable";
import BillDetailsScreen from "./ticketDistpay/BillDetailsScreen";

import QRCodeDisplay from "./qrCode/QRCodeDisplay";

import { bold } from "ansi-colors";

import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";


import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";

import ClubLocationDisplay from "./gmap/ClubLocationDisplay";

import getDirections from './gmap/gmapsdirection';

//https://github.com/laki944/react-native-navigation-directions/blob/master/index.js
import { OpenMapDirections } from './gmap/GMapDirectionDrive'; 

const window = Dimensions.get("window");

let w = window.Width;

import { StackActions, NavigationActions } from 'react-navigation';

var navigatingFrom = null;

export default class TicketDisplayFromNoLayoutTableBooking extends React.Component {

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: 'Ticket',
    headerBackTitle: null,
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#263238',
      //Background Color of Navigation Bar
    },

    headerTitleStyle: {
      justifyContent: 'center', 
      color:'#ffffff',
      textAlign:"left", 
        flex:1
  },

    headerTintColor: "#ffffff",
    //Text Color of Navigation Bar
  };

  static defaultProps = {
    backgroundColor: '#37474f',
    marginTop: 1,
    //width: 150,
    //height: 150,
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };


  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener("didFocus", payload =>
      BackHandler.addEventListener("hardwareBackPress", this.onBack),
    );

    this.state = {
      calc_height: 0,
      bookingData:"",
    };
  }

  componentDidMount() {
    this.willBlur = this.props.navigation.addListener("willBlur", payload =>
      BackHandler.removeEventListener("hardwareBackPress", this.onBack),
    );
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  }

  onBack = () => {
    if(navigatingFrom != null && navigatingFrom == 'TicketsListScreen'){
      this.props.navigation.goBack(null);
      return;
    }else{
      console.log("back");
      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        actions: [
          NavigationActions.navigate({ routeName: 'MainTabNavigator' }),
        ],
      });
      return this.props.navigation.dispatch(resetAction);
    }
    
  };  

 
  
  //this.props.navigation.dispatch(resetAction);

  buttonClickListener = () => {
    //alert("Clicked On Button !!!");
  };

  _onPressClubLocation = () =>{

  };

  handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }

    getDirections(data)
  }

  _callShowDirections = (latlong) => {
    //"latlong":"19.106205,72.825633"
    console.log("latlong "+latlong);
    var latlongArr = latlong.split(',');
    console.log("latlong "+parseFloat(latlongArr[0]));
    console.log("latlong "+latlongArr[1]);
    const startPoint = {
      longitude: -8.945406,
      latitude: 38.575078
    } 

    const endPoint = { 
      longitude: parseFloat(latlongArr[1]),
      latitude: parseFloat(latlongArr[0]),
    }

		const transportPlan = 'd';

    OpenMapDirections(null, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }

  render() {
    const { navigation } = this.props;  
    var bookingData = navigation.getParam("bookingData");
    console.log("bookingData in TicketDisplayFromNoLayoutTableBooking: "+JSON.stringify(bookingData));
    navigatingFrom = navigation.getParam("navigatingFrom");
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <QRCodeDisplay bookingData={bookingData}/>
          <TouchableOpacity onPress={() => this._callShowDirections(bookingData.latlong)}> 
          <ClubLocationDisplay bookingData={bookingData}/>
          </TouchableOpacity>

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
                <Text style={styles.instructions}>Number of guest</Text>
                <Text style={styles.instructions}>
                {bookingData.tablepx}
                    </Text>
              </View>
            </View>
  

  
          </View>

          
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
            <FontAwesome style={styles.icons} name="rupee" size={20} />
            <Text style={{ fontSize: 14 , color:'#4caf50'}}>Payment Details</Text>
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
              <Text style={styles.instructions}>Paid Amount</Text>
              <Text style={styles.instructions}>
                  0 Rs
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
              <Text style={styles.instructions}>Remaining Amount</Text>
              <Text style={styles.instructions}>
                  Pay at club
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
                  Pat at club
                  </Text>
            </View>
          </View>
        </View>
          {/* <BillDetailsScreen bookingData={bookingData}/> */}
          <TermnConditionForTable/>

        </ScrollView>

        <TouchableOpacity onPress={()=>this.onBack()} style ={{
                    height: 50,
                    //width:160,
                    //borderRadius:10,
                    
                    // marginLeft :50,
                    // marginRight:50,
                    // marginTop :20
                }}>
    <View style={{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor : "#263238",
}}>
    <Text style={{color: '#ffffff'}}>
        DONE
    </Text> 
</View>
</TouchableOpacity>

        {/* <View style={{ width: w, marginLeft: 10, marginRight:10, marginBottom:5 }}>
   <Button 
      onPress={this.buttonClickListener}
      title="Done"
      color="#90A4AE"
    />
</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:10
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
    color: "#777",
    textAlign: "center"
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
    color:'#0091ea'
    //borderRadius: 30, 
    //borderWidth: 2, 
    //borderColor: 'rgb(170, 207, 202)'
},
instructions:{
    color: '#e0e0e0'
},
});
