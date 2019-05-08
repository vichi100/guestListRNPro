import React from 'react';
import {View, Text, Modal, WebView, TouchableOpacity} from 'react-native';
import { PAYTM_SERVER_URL } from '../constants';

export default  class App extends React.Component{

    state = {
        dialogVisible: false,
        showModal: false,
        ack:"",
        ORDER_ID:"pohrterdfggsfsdfdrgsdetasdsqedfhjlkkn3435",
        TXN_AMOUNT:"50",
        CUST_ID: "vichi1000",
        MOBILE_NO: "9833097595",
    } 


    showDialog = () => {
        this.setState({ dialogVisible: true });
      };
      handleCancel = () => {
        this.setState({ dialogVisible: false});

      };
    
      handleOk = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
      };

    generateJSCode() {
      
      let jsCode = `document.getElementById("ORDER_ID").value = "${this.state.ORDER_ID}"; document.getElementById("TXN_AMOUNT").value = "${this.state.TXN_AMOUNT}"; document.getElementById("CUST_ID").value = "${this.state.CUST_ID}";  document.f1.submit()`;
      return jsCode;
    }

    handelResponse = (title) =>{
      console.log("resopnse : "+ title)
        if(title == 'true'){
          this.setState({showModal:false, ack : 'Your transaction was successful'})
        }else if(title == 'false'){
          this.setState({showModal:false, ack : 'Oops! Something went wrong'});
          this.showDialog();
        }else{
          return
        }
    }

    render(){

      let{showModal, ack, ORDER_ID, TXN_AMOUNT, CUST_ID}= this.state
        return(

            <View style={{marginTop:90}}>
                <TouchableOpacity
                  onPress={() => this.setState({showModal:true})}
                >
                    <Text>Pay with PayTm</Text>
                </TouchableOpacity>
                <View style={{marginTop:50}}>

                  <Text>{ack}</Text>
                </View>

                <Modal
                  visible={showModal}
                  onRequestClose ={()=> this.setState({showModal:false})}
                
                >
                    <WebView
                        source={{uri: PAYTM_SERVER_URL+"/api/paytm/request"}}
                        injectedJavaScript={this.generateJSCode()}
                        onNavigationStateChange = {data => this.handelResponse(data.title)}

                    />

                </Modal>



        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Oops! some thing went wrong</Dialog.Title>
          <Dialog.Description>
            Do you want to retry ?
          </Dialog.Description>

          
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