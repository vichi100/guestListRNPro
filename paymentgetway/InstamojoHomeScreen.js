import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            purpose: null,
            amount: null,
            name: null,
            email: null
        }
    }
//http://192.168.43.64:3001/api/paytm/request
    processInfo = () => {

        if (this.state.purpose !== null && this.state.amount !== null && this.state.name !== null && this.state.email !== null) {
           const self =  this;
            axios.post(`http://192.168.43.64:8089/api/makerequest`,{

                purpose: self.state.purpose,
                amount: self.state.amount,
                buyer_name: self.state.name,
                email: self.state.email,

            })
                .then(function (response) { 
                   //console.log(response)
                    if (response.data.statusCode === 200) {
                        //we got success from server ,now pass it to our webview
                        ToastAndroid.show('Redirecting to payment gateway', ToastAndroid.SHORT);
                        self.props.navigation.navigate('InstamojoWebview',{url:response.data.url})
                    }
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                })
        } else {
            Alert.alert('All fields are needed');
        }

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Purpose of payment</Text>
                <TextInput style={{ width: '90%', borderColor: 'black', borderWidth: 1, marginBottom: 5 }} onChangeText={(event) => this.setState({ purpose: event })} placeholder="Purpose of payment"></TextInput>

                <Text>Amount</Text>
                <TextInput style={{ width: '90%', borderColor: 'black', borderWidth: 1, marginBottom: 5 }} onChangeText={(event) => this.setState({ amount: event })} placeholder="Amount"></TextInput>

                <Text>Your Name</Text>
                <TextInput style={{ width: '90%', borderColor: 'black', borderWidth: 1, marginBottom: 5 }} onChangeText={(event) => this.setState({ name: event })} placeholder="Name"></TextInput>

                <Text>Email</Text>
                <TextInput style={{ width: '90%', borderColor: 'black', borderWidth: 1, marginBottom: 5 }} onChangeText={(event) => this.setState({ email: event })} placeholder="Email"></TextInput>


                <TouchableOpacity onPress={() => this.processInfo()} style={{ backgroundColor: 'blue', borderRadius: 4 }}>
                    <Text style={{ color: '#FFF', margin: 10 }}>Submit</Text>
                </TouchableOpacity>


            </View>
        );
    }
}