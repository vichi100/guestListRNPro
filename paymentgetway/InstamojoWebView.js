import React from 'react';
import { Text, WebView, ToastAndroid, Alert } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../constants';

var bookingData;
export default class InstamojoWebview extends React.Component {
    constructor(props) {
        super(props)
        this.state = { url: null }
    }
    componentDidMount() {
        const { state } = this.props.navigation;
        var url = state.params.url;
        this.setState({ url: url });
    }
    onNavigationChange(webViewState) {
        let hitUrl = webViewState.url;
        console.log("InstamojoWebview: hitUrl="+hitUrl);
        if (hitUrl.includes('yoguestlist')) {
            console.log(hitUrl);
            // we need the payment_req_id to get the status of paymnt
            let payment_final_id = hitUrl.split("request_id=").pop();
            var response = {
                url: hitUrl,
                payment_final_id: payment_final_id
            }
            bookingData.bookingconfirm = 'confirm';
            bookingData.paymentstatusmsg = hitUrl;
            this.sendbookingDetailsToServer(bookingData);
            setTimeout(() => {}, 500);
            if(bookingData.tablenumber == null || bookingData.tablenumber == 0){
                this.props.navigation.navigate("TicketDisplayFromBooking", {bookingData: bookingData, me:'BookingScreen'});
            }else{
                this.props.navigation.navigate("TicketDisplayFromTableBooking", {bookingData: bookingData, me:'BookingScreen'});
            }
            
            //ToastAndroid.show('Success \n' + JSON.stringify(response), ToastAndroid.SHORT);
            // check if getPaymentDetails works in prod
            //this.getPaymentDetails(payment_final_id);
        }
    }


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
    return axios.post(SERVER_URL+"bookTicket", bookingData ,{
      headers: {
        'Content-Type': 'application/json',
    },
    })
      //.then(response => response.json())
      .then(response => {
        console.log("data : " + response.data);
        this.setState({ dataSource: response.data, isLoading: false });
        if (bookingData.tablenumber != null) {
          this.props.navigation.navigate("TicketDisplayFromTableBooking", {
            postData: bookingData
          });
        } else {
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


    getPaymentDetails(trans_id) {
        //ToastAndroid.show('Getting transaction status', ToastAndroid.SHORT);
        console.log("Instamojo trans_id: "+JSON.stringify(trans_id));

        //insted of this you can do whatever you wan with the response , loading a custom success page with details etc
        const self = this;
        axios.get(`https://www.instamojo.com/api/1.1/payment-requests/${trans_id}`, {//PROD
        //axios.get(`https://test.instamojo.com/api/1.1/payment-requests/${trans_id}`, { //TEST
            headers: {
                'Content-Type': 'application/json',
                //POST
                // 'X-Api-Key': 'd74246e64c7f1fcfd47cc8abb0c037e8',
                // 'X-Auth-Token': '1b053dcb43b2aa9fca0f145a033ad3a2'
                //TEST
                'X-Api-Key': 'test_31f84e0ead532c7633e69a2749c',
                'X-Auth-Token': 'test_1dc1306d404d8519059beadbf32'    

            }
        }).then(function (response) {
            console.log("bookingDetailData: "+JSON.stringify(bookingDetailData));
            //Alert.alert('Response of txn', JSON.stringify(response.data));
            if(bookingDetailData.tablenumber == null || bookingDetailData.tablenumber == 0){
                this.props.navigation.navigate("TicketDisplayFromBooking", {bookingData: bookingData, me:'BookingScreen'});
            }else{
                this.props.navigation.navigate("TicketDisplayFromTableBooking", {bookingData: bookingData, me:'BookingScreen'});
            }

        })
            .catch(function (error) {
                console.log("Instamojo error: "+JSON.stringify(error));
                //ToastAndroid.show('Error', ToastAndroid.SHORT);

            })
    }




    render() {
        console.log('webview');
        const { navigation } = this.props;  
        bookingData = navigation.getParam("bookingData");
        return (
            <WebView
                ref="webview"
                source={{ uri: this.state.url }}
                onNavigationStateChange={this.onNavigationChange.bind(this)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                // renderLoading={this.renderLoading.bind(this)}
                onMessage={(event) => console.log(event.nativeEvent.data)} />

        );
    }
}