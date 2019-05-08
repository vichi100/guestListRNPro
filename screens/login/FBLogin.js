import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import Dialog from "react-native-dialog";
import { Facebook } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from "axios";
import { SERVER_URL } from '../../constants';

var changeText;

//https://github.com/mmazzarolo/react-native-dialog

// Initialize Firebase
// const firebaseConfig = {
//   // ADD YOUR FIREBASE CREDENTIALS
//   apiKey: "AIzaSyAAvPhHhFlKx1eu_PWRFmNm1pRl7LqTNh8",
//   authDomain: "https://guestlistandroid.firebaseio.com",
//   databaseURL: "",
//   projectId: "guestlistandroid",
//   storageBucket: "guestlistandroid.appspot.com"
// };

// firebase.initializeApp(firebaseConfig);

var mobile;
var eventDataFromBookingScreen;
var gotoScreen;


export default class FBLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn : false,
      name: null,
      dialogVisible: false,
      photoUrl: null,
      mobile: null,
      email:null,
      id: null,
      expoToken:null,
    };
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user != null) {
  //       console.log(user);
  //     }
  //   });
  // }

  _storeDataMobile = async (mobile) => {
    try {
      await AsyncStorage.setItem("mobile", mobile);
      console.log("store mobile: "+ mobile);
    } catch (error) {
      // Error saving data
    }
  };

  _storeCustomerData = async () => {
    try {
      //await AsyncStorage.setItem("mobile", this.state.mobile);
      await AsyncStorage.setItem("email", this.state.email);
      await AsyncStorage.setItem("name", this.state.name);
      await AsyncStorage.setItem("photoUrl", this.state.photoUrl);
      console.log('FBLogin: photoUrl: '+this.state.photoUrl)
      await AsyncStorage.setItem("customerId", this.state.id);
      console.log("store mobile"+ mobile);
    } catch (error) {
      // Error saving data
      console.log('Error in storing data when loging in FB: '+error)
    }
  };

  //fetch data from AsyncStorage
  _retrieveData = async () => {
    try {
      //email = await AsyncStorage.getItem('email');
      mobile = await AsyncStorage.getItem("mobile");
      var expoToken = await AsyncStorage.getItem("expoToken");
      this.setState({mobile: mobile, expoToken:expoToken})
      console.log("get mobile: "+ mobile);
      if (mobile !== null) {
        // We have data!!
        console.log(mobile);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  handleCancel = () => {
    this.setState({ dialogVisible: false, mobile: null });
  };

  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
    this._storeDataMobile(this.state.mobile);
    this.loginWithFacebook();
  };

  setMobile = text => {
    //console.log(text);
    var myMob = text;
    changeText = myMob;
    //console.log("myMob : " + myMob);
    this.setState({ mobile: myMob });
    var lastChar = myMob[myMob.length - 1];
    this.setState({ modiMob: myMob });
  };

  insertCustomerDetails=() =>{
    var postData = {
      "userid" : this.state.id,
      "mobilenumber":this.state.mobile,
      "email" : this.state.email,
      "name" : this.state.name, 
      "expoToken": this.state.expoToken,
    }

    this._storeCustomerData();

    // SEND Customer DETAILS TO SERVER -  START
    console.log(" inserting customer" ); 
    // return fetch(SERVER_URL+"insertCustomerDetails",{  
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',    
    //   },
    //   body:  JSON.stringify(postData)
    // })
    return axios.post(SERVER_URL+"insertCustomerDetails", postData, {  
      headers: {
        'Content-Type': 'application/json',
    },
    })
    //.then(response => response.json()) 
    .then(response => {
    console.log("data : " + response.data); 
      this.setState({ dataSource: response.data, isLoading: false });
      
    console.log("data send to server");
    }) 
    .catch(error => {
      console.error(error); 
    }); 
    // SEND Customer DETAILS TO SERVER FINSH -END

  }

  async loginWithFacebook() {

    this._retrieveData();
    if (this.state.mobile == null) {
      this.showDialog();
      return;
    }

    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('343969116414961', {
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
        );
        const {  name, email , id, picture} = await response.json();
        //console.log("FBLogin: response.json() from fb: "+JSON.stringify(picture.data.url));
        this.setState({
          signedIn: true,
          name: name,
          photoUrl: picture.data.url,//`https://graph.facebook.com/${id}/?fields=picture&type=large&access_token=${token}`,
          id: id,
          email:email,
        });

        setTimeout(() => { 
      
        }, 200);

        this.insertCustomerDetails();
        console.log("gotoScreen: "+ gotoScreen)
        console.log("eventDataFromBookingScreen: "+eventDataFromBookingScreen);

        if(gotoScreen != null && (gotoScreen == 'TicketsListScreenXV' || gotoScreen == 'profile')){
          console.log("back");
          const resetAction = StackActions.reset({
            index: 0, // <-- currect active route from actions array
            actions: [
              NavigationActions.navigate({ routeName: 'MainTabNavigator' }),
            ],
          });
          return this.props.navigation.dispatch(resetAction);
        }else{
          this.props.navigation.navigate(gotoScreen, { "bookingData":eventDataFromBookingScreen }); 
        }


        

        //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        //console.log("FB Data: "+`Hi ${(await response.json()).email}!`);
        //console.log("FB Data: "+`Hi ${(await response.json())}!`);
        //https://graph.facebook.com/<userId>/?fields=picture&type=large&access_token=${token}
        // console.log("FB Data: "+JSON.stringify(picture));
      } else {  
        // type === 'cancel'
      }
    } catch ({ message }) {  
      //alert(`Facebook Login Error: ${message}`);
      console.log("Error FB Login: "+message)
    }
  }

  async loginWithFacebookC() {   
    this._retrieveData();
    if (this.state.mobile == null) {
      this.showDialog();
      return;
    }
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "343969116414961",
      { permissions: ["public_profile"] }
    ); 

    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      

      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(info => {
          this.userEmail = info.email;
          this.userName = info['displayName'];
          this.userUid = info['uid'];
          this.photoURL = info['photoURL'];
          console.log("FB Data: "+this.userEmail);
          })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    eventDataFromBookingScreen = this.props.eventDataFromBookingScreen;
    gotoScreen = this.props.gotoScreen;
    console.log("gotoScreen FBLogin: "+gotoScreen);
    console.log(" eventDataFromBookingScreen FBLogin: "+ eventDataFromBookingScreen);
    return ( 
      <View style={styles.container}>
        {/* <Button
          onPress={() => this.loginWithFacebook()}
          title="Login With Facebook"
          color="#2196f3"
          size
          accessibilityLabel="Login With Facebook"
        /> */}

        <TouchableOpacity
          onPress={() => this.loginWithFacebook()}
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
              SIGN IN WITH FACEBOOK
            </Text>
          </View>
        </TouchableOpacity>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Enter Mobile Number</Dialog.Title>
          {/* <Dialog.Description>
            Mobile number is required by bank and payment getway.
          </Dialog.Description> */}

          <Dialog.Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setMobile(text)}
            keyboardType="phone-pad"
            maxLength={10}
            autoCorrect={false}
            //value={changeText}
            textAlign={"center"}
            autoFocus={true}
          />
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

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#2c3e50",
    marginTop: 1,
    marginBottom: 1
    // justifyContent: "center",
    // padding: 10
  }
});
