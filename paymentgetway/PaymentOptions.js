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
  Modal,
  WebView,
  ActivityIndicator
} from "react-native";
import Dialog from "react-native-dialog";
import axios from "axios";

import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StackActions, NavigationActions } from "react-navigation";
import { SERVER_URL } from '../constants';
import { PAYTM_SERVER_URL } from '../constants';


var bookingData;
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dialogVisible: false,
      showModal: false,
      ack: null, //"",
      ORDER_ID: null, //"pohrterdfggsfsdfdrgsdetasdsqedfhjlkkn3435",
      TXN_AMOUNT: null, //"50",
      CUST_ID: null, //"vichi1000",
      MOBILE_NO: null //"9833097595"
    };
  }

  componentDidMount() {
    this.setState({
      ORDER_ID: bookingData.transactionnumber,
      TXN_AMOUNT: bookingData.bookingamount,
      CUST_ID: bookingData.userid,
      MOBILE_NO: bookingData.mobilenumber,
      isLoading: false
    });
  }

  generateJSCode() {
    console.log("PaymentOptions: ORDER_ID: " + this.state.ORDER_ID);
    console.log("PaymentOptions: TXN_AMOUNT: " + this.state.TXN_AMOUNT);
    console.log("PaymentOptions: CUST_ID: " + this.state.CUST_ID);
    let jsCode = `document.getElementById("ORDER_ID").value = "${
      this.state.ORDER_ID
    }"; document.getElementById("TXN_AMOUNT").value = "${
      this.state.TXN_AMOUNT
    }"; document.getElementById("CUST_ID").value = "${
      this.state.CUST_ID
    }";  document.f1.submit()`;
    return jsCode;
  }

  //http://192.168.43.64:3001/api/paytm/request
  processInstamojoInfo = bookingData => {
    console.log(
      "PaymentOptions: bookingData in processInstamojoInfo: " +
        JSON.stringify(bookingData)
    );

    if (
      bookingData.purpose !== null &&
      bookingData.bookingamount !== null &&
      bookingData.username !== null &&
      bookingData.email !== null
    ) {
      const self = this;
      //this.props.navigation.navigate('InstamojoWebview')
      //console.log("PaymentOptions: bookingData2: "+JSON.stringify(bookingData))
      axios
        .post(`http://192.168.43.64:8089/api/makerequest`, {
          purpose: bookingData.purpose,
          amount: bookingData.bookingamount,
          buyer_name: bookingData.username,
          email: bookingData.email
        })
        .then(function(response) {
          console.log(
            "PaymentOptions: Pay: response from server: " +
              JSON.stringify(response)
          );
          if (response.data.statusCode === 200) {
            console.log("PaymentOptions: PaymentOptions success");
            self.props.navigation.navigate("InstamojoWebview", {
              bookingData: bookingData,
              url: response.data.url
            });

            console.log("PaymentOptions: PaymentOptions after navigation");
          }
        })
        .catch(function(error) {
          console.log(
            "PaymentOptions: PaymentOptions error : " + JSON.stringify(error)
          );
          //ToastAndroid.show('Error', ToastAndroid.SHORT);
        });
    } else {
      Alert.alert("All fields are needed");
    }
  };

  sendbookingDetailsToServerForGuestList = () => {
    // SEND BOOKING DETAILS TO SERVER -  START
    if (
      bookingData.postedby == "club" ||
      bookingData.postedby == "dj" ||
      bookingData.postedby == "pr"
    ) {
      bookingData.bookingconfirm = "confirm";
    } else if (bookingData.postedby == "guestlist") {
      bookingData.bookingconfirm = "pending";
    }
    return (
      // axios
      //   .post(SERVER_URL+"bookTicket", bookingData, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //     }
      //   })

        // SEND BOOKING DETAILS TO SERVER -  START
    fetch(SERVER_URL+"bookTicket", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    })
        .then(response => response.json())
        .then(response => {
          console.log("PaymentOptions: data: " + response);
          this.setState({ dataSource: response, isLoading: false });

          this.props.navigation.navigate("TicketDisplayFromBooking", {
            bookingData: bookingData
          });

          console.log("PaymentOptions: PaymentOptions data send to server");
          if((bookingData.guestlistgirlcount != null && bookingData.guestlistgirlcount > 0) 
          || (bookingData.guestlistcouplecount != null && bookingData.guestlistcouplecount > 0) ){

            this._storeGuestListBookingDetails(bookingData.clubname, bookingData.eventdate);
            console.log("PaymentOptions: _storeGuestListBookingDetails");
          }
        })
        .catch(error => {
          console.error(error);
        })
    );
    // SEND BOOKING DETAILS TO SERVER FINSH -END
  };

  sendbookingDetailsToServer = title => {
    return (
      axios
        .post(SERVER_URL+"bookTicket", bookingData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        //.then(response => response.json())
        .then(response => {
          console.log("PaymentOptions: data : " + response.data);
          this.setState({ dataSource: response.data, isLoading: false });
          if (title == "true") {
            if (bookingData.tablenumber != null) {
              this.props.navigation.navigate("TicketDisplayFromTableBooking", {
                bookingData: bookingData
              });
            } else {
              this.props.navigation.navigate("TicketDisplayFromBooking", {
                bookingData: bookingData
              });
            }
          } else {
            this.setState({ dialogVisible: true });
          }
          // if ticket is booked and it is for guestlist only then store club name and date
          if((bookingData.guestlistgirlcount != null && bookingData.guestlistgirlcount > 0) 
          || (bookingData.guestlistcouplecount != null && bookingData.guestlistcouplecount > 0) ){

            this._storeGuestListBookingDetails(bookingData.clubname, bookingData.eventdate);
            console.log("PaymentOptions: _storeGuestListBookingDetails");
          }
          console.log("PaymentOptions: PaymentOptions data send to server");
        })
        .catch(error => {
          console.error(error);
        })
    );
    // SEND BOOKING DETAILS TO SERVER FINSH -END
  };

  _storeGuestListBookingDetails = async (clubname, eventdate) =>{
    try {
      await AsyncStorage.setItem("bookedClubName", clubname);
      await AsyncStorage.setItem("bookedEventDate", eventdate);
      console.log("store mobile" + mobile);
      setTimeout(() => {}, 200);
    } catch (error) {
      console.log("error in store mobile" + mobile);
    }
  }

  handelResponse = title => {
    console.log("PaymentOptions: PaymentOptions handelResponse : " + title);
    if (title == "true") {
      this.setState({
        showModal: false,
        ack: "Your transaction was successful"
      });

      bookingData.paymentstatusmsg = "success";
      bookingData.bookingconfirm = "confirm";
      this.sendbookingDetailsToServer(title);
    } else if (title == "false") {
      this.setState({ showModal: false, ack: "Oops! Something went wrong" });
      bookingData.paymentstatusmsg = "fail";
      bookingData.bookingconfirm = "cancel";
      this.sendbookingDetailsToServer(title);
      //this.showDialog();
    } else {
      return;
    }
  };

  onBack = () => {
    console.log("PaymentOptions: back");
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: "MainTabNavigator" })]
    });
    return this.props.navigation.dispatch(resetAction);
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
    this.onBack();
  };

  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {
    const { navigation } = this.props;
    bookingData = navigation.getParam("bookingData");
    console.log(
      "PaymentOptions: bookingData in render method: " +
        JSON.stringify(bookingData)
    );
    var mevalue = navigation.getParam("me");
    var weekDayName = moment(bookingData.eventdate, "DD/MMM/YYYY HH:mm:ssZZ")
      .format("ddd")
      .toUpperCase();
    var date = bookingData.eventdate.split("/");
    // console.log("PaymentOptions: mevalue: " + mevalue);
    // console.log("PaymentOptions: eventData " + JSON.stringify(bookingData));

    // if (this.state.isLoading) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: "center" }}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // }

    if (parseInt(bookingData.bookingamount) == 0) {
      console.log(
        "PaymentOptions: sendbookingDetailsToServerForGuestList in render method"
      );
      this.sendbookingDetailsToServerForGuestList(); // for Guestlist
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "#000000", textAlign: "center", fontSize: 16 }}>
            {" "}
            Please wait...
          </Text>
        </View>
      );
    }

    let { showModal, ack, ORDER_ID, TXN_AMOUNT, CUST_ID } = this.state;
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
              <View style={{ flexDirection: "row", margin: 10 }}>
                <MaterialCommunityIcons
                  style={styles.icons}
                  name="owl"
                  size={20}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#4caf50",
                    flex: 1,
                    justifyContent: "space-between"
                  }}
                >
                  {bookingData.clubname}
                </Text>
                <Text style={styles.textDate}>
                  {weekDayName} {date[0]}/{date[1]}
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
                  <Text style={styles.instructions}>Booking Amount</Text>

                  <Text style={styles.instructions}>
                    {bookingData.bookingamount} Rs
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
                  <Text style={styles.instructions}>Payable at club</Text>

                  <Text style={styles.instructions}>
                    {bookingData.remainingamount} Rs
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
                  <Text style={styles.instructions}>Total Amount</Text>

                  <Text style={styles.instructions}>
                    {bookingData.totalprice} Rs
                  </Text>
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

          <Modal
            visible={showModal}
            onRequestClose={() => this.setState({ showModal: false })}
          >
            <WebView
              source={{ uri: PAYTM_SERVER_URL+"/api/paytm/request" }}
              injectedJavaScript={this.generateJSCode()}
              onNavigationStateChange={data => this.handelResponse(data.title)}
            />
          </Modal>

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
                WALLETES
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Oops! some thing went wrong</Dialog.Title>
          <Dialog.Description>
            If any amount deducted, it will be refund in 2-3 working days{" "}
          </Dialog.Description>
          <Dialog.Description>Do you want to retry? </Dialog.Description>

          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="Cancel"
            onPress={this.handleCancel}
          />
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
    flex: 1
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
  textDate: {
    color: "#2196f3",
    fontSize: 14
  }
});

//make this component available to the app
// export default Login;
