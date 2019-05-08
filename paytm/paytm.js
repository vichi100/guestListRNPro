import React from "react";
import { View, Text, Modal, WebView, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import axios from "axios";
import { SERVER_URL } from '../constants';
import { PAYTM_SERVER_URL } from '../constants';


var bookingData;
export default class App extends React.Component {
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

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  handleCancel = () => {
    this.setState({ dialogVisible: false });
    this.props.navigation.navigate("'MainTabNavigator'");
  };

  handleOk = () => {
    this.setState({ dialogVisible: false });
  };

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



  sendbookingDetailsToServer = () => {
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
        if(bookingData.tablenumber != null){
            this.props.navigation.navigate("TicketDisplayFromTableBooking", {
                postData: bookingData
              });
        }else{
            this.props.navigation.navigate("TicketDisplayFromBooking", {
                postData: bookingData
              });
        }
        
        console.log("data send to server");
      })
      .catch(error => {
        console.error(error);
      });
    // SEND BOOKING DETAILS TO SERVER FINSH -END
  };

  handelResponse = title => {
    console.log("resopnse : " + title);
    if (title == "true") {
      this.setState({
        showModal: false,
        ack: "Your transaction was successful"
      });

      bookingData.paymentstatusmsg = "success";
      bookingData.bookingconfirm = "yes";
      this.sendbookingDetailsToServer();

    } else if (title == "false") {
      this.setState({ showModal: false, ack: "Oops! Something went wrong" });
      bookingData.paymentstatusmsg = "fail";
      bookingData.bookingconfirm = "no";
      this.sendbookingDetailsToServer();
      this.showDialog();
    } else {
      return;
    }
  };

  render() {
    // get post data
    const { navigation } = this.props;
    bookingData = navigation.getParam("bookingData");
    var meValue = navigation.getParam("me");
    //if total amount is > 0 then display payment gateway option other wise directly book ticket
    console.log('totalprice: in paytm '+bookingData.totalprice);
    if(parseInt(bookingData.totalprice)  == 0){
        this.sendbookingDetailsToServer()
    }


    let { showModal, ack, ORDER_ID, TXN_AMOUNT, CUST_ID } = this.state;
    return (
      <View style={{ marginTop: 90 }}>
        <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
          <Text>Pay with PayTm</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50 }}>
          <Text>{ack}</Text>
        </View>

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
          <Dialog.Description>Do you want to retry ?</Dialog.Description>

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
