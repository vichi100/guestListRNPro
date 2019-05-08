//import liraries
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import FBLogin from './FBLogin';
import GLogin from './GLogin';
import Dialog from "react-native-dialog";


// create a component
export default class Login extends Component {
    static navigationOptions = {
        //To set the header image and title for the current Screen
        title: 'Login',
        headerBackTitle: null,
        //headerLeft: null,
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


    render() {
        const { navigation } = this.props;  
        eventData = navigation.getParam("bookingData");
        var mevalue = navigation.getParam("me");
        console.log("mevalue: "+ mevalue);
        console.log("eventData "+JSON.stringify(eventData))
        
        return (
        <View behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} 
                    source={require('../../assets/images/logo-dark-bg.png')} /> 
                  
                    </View>
               <View>
               
                   <FBLogin navigation={this.props.navigation} eventDataFromBookingScreen={eventData}  gotoScreen={mevalue}/>
                   <GLogin navigation={this.props.navigation} eventDataFromBookingScreen={eventData} gotoScreen={mevalue}/>
               </View>
               
         
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        justifyContent: 'space-between',
        // alignItems: 'center',
    }, 
    loginContainer:{
        alignItems: 'center',
        flex:1,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    input:{
        height: 40, 
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    
});

//make this component available to the app
// export default Login;