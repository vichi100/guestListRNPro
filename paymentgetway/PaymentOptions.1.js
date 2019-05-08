//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import axios from 'axios';

import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// import GuestListScreen from "./GuestListScreenForBilling";
// import PassScreen from "./PassScreenForBilling";
// import TermnCondition from "./TermnCondtion";
// import BillDetailsScreen from "./BillDetailsScreen";


// create a component 
export default class PaymentOptions extends Component {

    static defaultProps = {
        backgroundColor: "#2c3e50",
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
    title: "Payment",
    headerBackTitle: null,
    //headerLeft: null,
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



  //http://192.168.43.64:3001/api/paytm/request
  processInstamojoInfo = (bookingData) => {

    //console.log("bookingData: "+JSON.stringify(bookingData))

    if (bookingData.purpose !== null && bookingData.bookingamount !== null && bookingData.username !== null && bookingData.email !== null) {
       const self =  this;
       //this.props.navigation.navigate('InstamojoWebview')
       //console.log("bookingData2: "+JSON.stringify(bookingData))
        axios.post(`http://192.168.43.64:8089/api/makerequest`,{

            purpose: bookingData.purpose,
            amount: bookingData.bookingamount,
            buyer_name: bookingData.username,
            email: bookingData.email,

        })
            .then(function (response) {
               //console.log(JSON.stringify(response));
                if (response.data.statusCode === 200) {
                    
                    console.log('success');
                    self.props.navigation.navigate('InstamojoWebview',{url:response.data.url})
                    
                    console.log('after navigation');
                }
            })
            .catch(function (error) {
                console.log("error : "+JSON.stringify(error));
                //ToastAndroid.show('Error', ToastAndroid.SHORT); 
            })
    } else {
        Alert.alert('All fields are needed');
    }

}


  render() {
    const { navigation } = this.props;
    const bookingData = navigation.getParam("bookingData");
    var mevalue = navigation.getParam("me");
    var weekDayName = moment(bookingData.eventdate, "DD/MMM/YYYY HH:mm:ssZZ")
    .format("ddd")
    .toUpperCase();
    var date = bookingData.eventdate.split("/");
    console.log("mevalue: " + mevalue);
    console.log("eventData " + JSON.stringify(bookingData));

    return (
        
      <View behavior="padding" style={styles.container}> 
      <ScrollView>
        <View style={styles.loginContainer}>
     
        <View
            //outer GuestList 
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 370,
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
            <View style={{ flexDirection: "row", margin: 10,  }}>
            <MaterialCommunityIcons style={styles.icons} name="owl" size={20} />
              <Text style={{ fontSize: 16, color: "#4caf50" , flex: 1 ,justifyContent: "space-between",}}>
                {bookingData.clubname}
              </Text>
              <Text style={styles.textDate}>{weekDayName} {date[0]}/{date[1]}</Text>
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
                <Text style={styles.instructions}>Booking Amount</Text>
                
                <Text style={styles.instructions}>{bookingData.bookingamount} Rs</Text>
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
                <Text style={styles.instructions}>Payable at club</Text>
                
                <Text style={styles.instructions}>{bookingData.remainingamount} Rs</Text>
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
                <Text style={styles.instructions}>Total Amount</Text>
                
                <Text style={styles.instructions}>{bookingData.totalprice} Rs</Text>
              </View>
            </View>
          

          </View>

       
        </View>

       </ScrollView>
        <View>
          
        <TouchableOpacity
            onPress={() => this.setState({ showModal: true })}
            style={{
              height: 50
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#2196f3"
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                PAYTM
              </Text>
            </View>
          </TouchableOpacity>
        


          <TouchableOpacity
            onPress={() => this.processInstamojoInfo(bookingData)}
            style={{
              height: 50
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#43a047"
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                CREDIT/DEBIT CARDS 
              </Text>
            </View>
          </TouchableOpacity>
        

          <TouchableOpacity
            onPress={() => this.processInstamojoInfo(bookingData)}
            style={{
              height: 50
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f06292"
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                NETBANKING/UPI
              </Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.processInstamojoInfo(bookingData)}
            style={{
              height: 50
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ff9800"
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  fontWeight: "bold"
                }}
              >
                WALLATES
              </Text>
            </View>
          </TouchableOpacity>
        
        
        
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    justifyContent: "space-between"
    // alignItems: 'center',
  },
  loginContainer: {
   // alignItems: "center",
    flex: 1,
   // flexWrap: "wrap",
   // justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
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
  textDate:{
    color: "#2196f3",
    fontSize:14,
  }
});

//make this component available to the app
// export default Login;
