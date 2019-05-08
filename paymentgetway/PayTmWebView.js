import React from "react";
import { View, Text, Modal, WebView, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { PAYTM_SERVER_URL } from '../constants';

var bookingData;

export default class PayTmWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
          MOBILE_NO: bookingData.mobilenumber
        });
      }

      generateJSCode() {
        console.log('ORDER_ID: '+this.state.ORDER_ID)
        console.log('TXN_AMOUNT: '+this.state.TXN_AMOUNT)
        console.log('CUST_ID: '+this.state.CUST_ID)
        let jsCode = `document.getElementById("ORDER_ID").value = "${
          this.state.ORDER_ID
        }"; document.getElementById("TXN_AMOUNT").value = "${
          this.state.TXN_AMOUNT
        }"; document.getElementById("CUST_ID").value = "${
          this.state.CUST_ID
        }";  document.f1.submit()`;
        return jsCode;
      }


  sendbookingDetailsToServer = (title) => {
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
        console.log("PayTmWebView data : " + response.data);
        this.setState({ dataSource: response.data, isLoading: false });
        if(title === 'true'){
          if (bookingData.tablenumber != null) {
            this.props.navigation.navigate("TicketDisplayFromTableBooking", {
              postData: bookingData
            });
          } else {
            this.props.navigation.navigate("TicketDisplayFromBooking", {
              postData: bookingData
            });
          }

        }else if(title == 'false'){
          this.setState({dialogVisible: true})

        }
        console.log("PayTmWebView data send to server");
      })
      .catch(error => {
        console.error(error);
      });
    // SEND BOOKING DETAILS TO SERVER FINSH -END
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false});

  };

  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  }; 

  handelResponse = title => {
    console.log("handelResponse : " + title);
    if (title == "true") {
      this.setState({
        showModal: false,
        ack: "Your transaction was successful"
      });

      bookingData.paymentstatusmsg = "success";
      bookingData.bookingconfirm = "yes";
      this.sendbookingDetailsToServer(title);
    } else if (title == "false") {
      this.setState({ showModal: false, ack: "Oops! Something went wrong" });
      bookingData.paymentstatusmsg = "fail";
      bookingData.bookingconfirm = "no";
      this.sendbookingDetailsToServer(title);
      //this.showDialog();
    } else {
      return;
    }
  };
  render() {
    const { navigation } = this.props;
    bookingData = navigation.getParam("bookingData");
    var meValue = navigation.getParam("me");
    let { showModal, ack, ORDER_ID, TXN_AMOUNT, CUST_ID } = this.state;
    return (
        <View style={{ marginTop: 90 }}>
        <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
          <Text>Pay with PayTm not use</Text>
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

        <Dialog.Container visible={this.state.dialogVisible}> 
          <Dialog.Title>Oops! some thing went wrong</Dialog.Title>
          <Dialog.Description>If any amount deducted, it will be refund in 2-3 working days {'\n'}Do you want to retry ?</Dialog.Description>

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
