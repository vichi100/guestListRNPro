import React, { Component } from 'react';
import {
  
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator

} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from "react-native-modal-datetime-picker"; 
import DismissKeyboard from 'dismissKeyboard';
import NumericInput from "./numericInput/NumericInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5Brands } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';
//https://github.com/hiddentao/react-native-modal-filter-picker
// import ModalFilterPicker from 'react-native-modal-filter-picker'
import ModalFilterPicker from '../modelPicker/ModalFilterPicker';
import { SERVER_URL } from '../constants';
import { showMessage, hideMessage } from "react-native-flash-message";
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment';


import axios, { post } from 'axios';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const options = [
  'Club Mgr',
  'PR',
  'DJ',
]; 



const optionsCityData = [
  {
    key: 'mumbai',
    label: 'Mumbai',
  },

  { 
    key: 'delhi',
    label: 'Delhi',
  },

  {
    key: 'pune',
    label: 'Pune',
  },

  {
    key: 'bangalore',
    label: 'Bangalore',
  },

];


var eventData = null;

export default class UploadOffer extends Component {

  static defaultProps = {
    backgroundColor: "#37474f",
    marginTop: 1,
    //width: 150,
    //height: 150,
    shadowColor: "rgb(50,50,50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };

  state = {
    image: null,
    uploading: false,
    isDateTimePickerVisible:false, 
    eventdate: 'Offer Date',
    clubName: 'Club Name',
    clubPickerVisible: false,
    cityPickerVisible: false,
    picked: null,
    dialogVisible: false,
    dialogDescription: null,
    dialogTitle: null,
    city: 'City Name',
    dataSource: null,
    isLoading: true,
    clubid: null,
    offertitle: null,
    offerdetail: null,
    

  };

  componentDidMount() {
    console.log("UploadEvent: clubDetails : ");
    return axios.get(
      SERVER_URL+"clubsDetailsForUploadEvent"
    )
    .then(response => {
        console.log("UploadEvent: clubDetails : " + JSON.stringify(response.data));
        // check if tickets are availbale in guestlist or not
        response = response.data;
        this.setState({ dataSource: response, isLoading: false }); 

      })

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

  onShow = () => { 
    try{
      console.log('on show') 
      this.setState({ clubPickerVisible: true });
    }catch (error) {
      console.log("error in onShow: " + error);
    }
    
  }

  onShowCity = () => {
    console.log('on show') 
    this.setState({ cityPickerVisible: true });
  }

  onSelectCity = (picked) => {
    console.log('picked: '+picked)
    this.setState({
      city: picked,
      cityPickerVisible: false
    }) 
  }

  onCancelCity = () => {
    console.log('cancel') 
    this.setState({
      cityPickerVisible: false
    });
  }

  onSelect = (picked) => {
    console.log('picked: '+JSON.stringify(picked));
    Object.keys(this.state.dataSource).map((keyName, keyIndex) =>{

      if(this.state.dataSource[keyName].clubid == picked ){  
       console.log('latlong: '+this.state.dataSource[keyName].latlong)
       this.setState({
        clubName: this.state.dataSource[keyName].clubname,
        clubid: this.state.dataSource[keyName].clubid,
        location: this.state.dataSource[keyName].location,
        city: this.state.dataSource[keyName].city,
        latlong: this.state.dataSource[keyName].latlong,
        clubPickerVisible: false,

       })
      }

    });
    
  }

  onCancel = () => {
    console.log('cancel') 
    this.setState({
      clubPickerVisible: false
    });
  }

  setSelectedOption = (selectedSegment)=>{
    this.setState({
      selectedSegment: selectedSegment
    });
  }

 

  onChangeTextOfferTitle = offertitle => {
    
    //console.log('eventName: '+eventName)
    this.setState({ offertitle:offertitle });

  }

  onChangeTextOfferDetail = offerdetail => {
    
    //console.log('eventName: '+eventName)
    this.setState({ offerdetail:offerdetail });

  }

  

  onChangeTextClubName = clubName =>{
    console.log('clubName: '+clubName)
    this.setState({ clubName:clubName });
  }

  uploadImageAsync = async() => {  

    email = await AsyncStorage.getItem("email");
    mobile = await AsyncStorage.getItem("mobile");
    var userid = await AsyncStorage.getItem("customerId");
    var custName = await AsyncStorage.getItem("name");
    var mobile = await AsyncStorage.getItem("mobile");
    console.log('email : ' + ": " + email);
    console.log('mobile : ' + ": " + mobile); 


    if (email == null || mobile == null || userid == null || custName == null) {  
      // if (true) {
      // go to login form
      console.log('email2 : ' + ": " + email);
      console.log('mobile2 : ' + ": " + mobile);
      //this.props.navigation.navigate('BookingScreen', {data:item});
      this.props.navigation.navigate("LoginScreen", {bookingData: eventData, me:'UploadEvent'}); // move to login page
      return;
    } 

    //let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
    console.log('uri: '+this.state.image); 
    let uri = this.state.image;
    let apiUrl = `http://192.168.43.64:6060/uploadOffer`
    let eventdate = this.state.eventdate;
    console.log('eventDate: '+this.state.eventdate); 

    let changeEventDate = moment(eventdate, 'DD-MM-YYYY').format("DD/MMM/YYYY") 
    console.log('changeEventDate: '+changeEventDate);  

    let clubName = this.state.clubName; 
    console.log('clubName: '+this.state.clubName); 
    var userid = await AsyncStorage.getItem("customerId");
    console.log('userid : ' + ": " + userid);
    var username = await AsyncStorage.getItem("name");   
    var mobile = await AsyncStorage.getItem("mobile");
    
    console.log('username : ' + ": " + username); 
  
    console.log('uri: '+uri);

    if(this.state.image == null){
      this.setState({dialogDescription: 'Please select image for event !'});
      this.showDialog();
      return; 
    }  

    if(this.state.eventdate == 'Offer Date'){
      this.setState({dialogDescription: 'Please select offer date !'});
      this.showDialog();
      return;
    } 

    

    if(this.state.clubName == 'Club Name'){
      this.setState({dialogDescription: 'Please enter club name !'});
      this.showDialog();
      return;
    } 

    if(this.state.city == 'City Name'){
      this.setState({dialogDescription: 'Please enter city name !'});
      this.showDialog();
      return;
    } 

    

    if(this.state.offertitle == null){
      this.setState({dialogDescription: 'Please enter Offer title !'});
      this.showDialog();
      return;
    } 

    if(this.state.offerdetail == null){
      this.setState({dialogDescription: 'Please enter offer details !'});
      this.showDialog();
      return;
    } 
    
    let uriParts = uri.split('.'); 
    let fileType = uriParts[uriParts.length - 1];
   
    let data = new FormData();
    
    data.append('offertitle', this.state.offertitle); 
    data.append('offerdetail', this.state.offerdetail);  
    data.append('clubid', this.state.clubid);  
    data.append('clubName', clubName);
    data.append('city', this.state.city); 
    data.append('eventdate', changeEventDate);
    data.append('username', username); //postedbyname
    data.append('userid', userid); //postedbyid
    data.append('mobile', mobile); 
 
    data.append('fileData', { 
      uri : uri, 
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });  
  
    let options = { 
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }, 
    }; 
  
    //return fetch(apiUrl, options);

    uploadResponse = await fetch(apiUrl, options);
    //uploadResult = uploadResponse.json();
    console.log('uploadResponse.json: '+ JSON.stringify(uploadResponse))
    if(uploadResponse._bodyText.indexOf('Saved') > -1){
      showMessage({
        message: "Offer successfully uploaded",
        description: "Please go and verify Offer for event date  ",
        type: "success",
        duration: 5000,
      });

      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        actions: [
          NavigationActions.navigate({ routeName: 'MainTabNavigator' }),
        ],
      });
      return this.props.navigation.dispatch(resetAction);
    } else if(uploadResponse._bodyText.indexOf('already posted an offer') > -1){

      showMessage({
        message: "Offer is already there for event date",
        description: "Please go and verify Offer for event date  ",
        type: "info",
        duration: 5000,
      });
      
    }else if(uploadResponse._bodyText.indexOf('Error') > -1 || uploadResponse._bodyText.indexOf('error') > -1){

      showMessage({
        message: "Error! Please try after some time", 
        //description: "Please go and verify event for event date  ",
        type: "error",  
        duration: 5000,  
      });
      
    }
  }

  

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}> 
          <ActivityIndicator size="large" />
        </View>
      );
    }

    setTimeout(() => {}, 200);

    let {
      image
    } = this.state;

    const clubPickerVisible = this.state.clubPickerVisible;
    const picked = this.state.picked;
    const cityPickerVisible = this.state.cityPickerVisible;

    return (
      <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
      <ScrollView>
        <StatusBar barStyle="default" />

        <Button
          onPress={this._pickImage}
          title="Pick an image"
        />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}



      
      <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
            <Image
            source={require("../assets/images/cal3.png")}
            style={styles.icon}
            resizeMode="cover"
            />
        </View>
        {/* <TextInput
            placeholder="Event Date"
            style={styles.input}
            underlineColorAndroid="transparent"
            onFocus={ () => this.showDateTimePicker() }
            //onFocus = {this.showPicker.bind(this, 'simple', { date: this.state.simpleDate })}
            onChangeText={(text) => this.setState({eventdate:text})}
            value={this.state.eventdate} 
            //editable={false}
        /> */}
        <TouchableOpacity
            onPress={() => this.showDateTimePicker()}
            style={{
              flex: 1,
            }}
          >
        <Text style={styles.textStyle}>{this.state.eventdate}</Text>
        </TouchableOpacity>
        </View>

       
        <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
            <Image
            source={require("../assets/images/cal3.png")}
            style={styles.icon}
            resizeMode="cover"
            />
        </View>
        <TouchableOpacity style={{
              flex: 1,
            }} onPress={this.onShow}>
        <Text style={styles.textStyle}>{this.state.clubName}</Text>
        </TouchableOpacity>

        <ModalFilterPicker
          visible={clubPickerVisible}
          onSelect={this.onSelect}
          onCancel={ this.onCancel} 
          options={this.state.dataSource}
          title='Search by club name'
        />
        </View>


        <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
            <Image
            source={require("../assets/images/cal3.png")}
            style={styles.icon}
            resizeMode="cover"
            />
        </View>
        {/* <TouchableOpacity style={{
              flex: 1,
            }} onPress={this.onShowCity}> */}
        <Text style={styles.textStyle}>{this.state.city}</Text>
        {/* </TouchableOpacity> */}

        <ModalFilterPicker
          visible={cityPickerVisible}
          onSelect={this.onSelectCity}
          onCancel={ this.onCancelCity} 
          options={optionsCityData}
          title='Select city'
        />
        </View>


        <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
            <Image
            source={require("../assets/images/cal3.png")}
            style={styles.icon}
            resizeMode="cover"
            />
        </View>
        <TextInput 
            placeholder="Offer Title"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeTextOfferTitle}
            value={this.state.offertitle}
        />
        </View>

        <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
            <Image
            source={require("../assets/images/cal3.png")}
            style={styles.icon}
            resizeMode="cover"
            />
        </View>
        <TouchableOpacity style={{
              flex: 1,
            }} >
        <Text style={styles.textStyle}>Offer's details</Text>
        </TouchableOpacity>
        </View>

        
        <View style={styles.textAreaContainer} >
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Offer details here..."
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={this.onChangeTextOfferDetail}
            value={this.state.offerdetail}
          />
        </View>


        
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

</ScrollView>

<Dialog.Container visible={this.state.dialogVisible}> 
          {/* <Dialog.Title>{this.state.dialogTitle}</Dialog.Title> */}
          <Dialog.Description>{this.state.dialogDescription}</Dialog.Description>

          
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="OK"
            onPress={this.handleOk}
          />
        </Dialog.Container>

<View style={{ width: width }}>
          <TouchableOpacity
            onPress={() => this.uploadImageAsync()}
            style={{
              height: 50
              //width:160,
              //borderRadius:10,

              // marginLeft :50,
              // marginRight:50,
              // marginTop :20
            }}
          >
            <View
              style={{ 
                flex: 1,
                alignItems: "center", 
                justifyContent: "center",
                backgroundColor: "#263238"
              }}
            >
              <Text style={{ color: "#ffffff" }}>UPLOAD</Text>
            </View>
          </TouchableOpacity>
          {/* <Button
            onPress={this.buttonClickListener}
            title="BOOK"
            color="#263238" 
            height="40"
          /> */}
        </View>

        </KeyboardAvoidingView>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => { 
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
       
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        {/* <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text> */}
      </View>


      
    );
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => { 
    this.setState({ isDateTimePickerVisible: false }); 
  };  

  handleDatePicked = pickeddate => {    
            day   = pickeddate.getDate();
            month = pickeddate.getMonth()+1;
            year  = pickeddate.getFullYear();
            console.log('A date has been picked: ' + day + '-' + month + '-' + year);
            exdate= day + '-' + month + '-' + year
    console.log("A date has been pickedxxx: ", pickeddate);    
    this.setState({eventdate:exdate})
    this.hideDateTimePicker();   
      
  }; 

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };


  _pickImage = async () => { 
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    console.log('pickerResult.uri: '+pickerResult.uri)
    this.setState({
      image: pickerResult.uri,//uploadResult.location
    });

    try {
      this.setState({
        uploading: true
      });

      // if (!pickerResult.cancelled) {
      //   uploadResponse = await uploadImageAsync(pickerResult.uri);
      //   uploadResult = await uploadResponse.json();

      //   this.setState({
      //     image: pickerResult.uri,//uploadResult.location
      //   });
      // }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult }); 
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}






const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    flex: 1,
    //justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 1,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: width,
  },
  maybeRenderImageContainer: {
    // borderTopLeftRadius: 3,
    // borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: width,
    marginBottom: 0.5,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 0.5,
    height: 40,
    backgroundColor: "transparent"
  },
  textStyle:{
    flex: 1, 
    paddingHorizontal: 10,
    paddingVertical:10,
    backgroundColor: '#212121',
    color : "#e0e0e0",
    alignItems: 'center'
  },
  input:{
    flex: 1, 
    paddingHorizontal: 10,
    backgroundColor: '#212121',
    color : "#e0e0e0"
  },
  inputPasses: {
    //flex: 1, 
    width: 70,
    paddingHorizontal: 10,
    backgroundColor: '#212121',
    color : "#e0e0e0"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#d73352"
  },
  icon: {
    width: 20,
    height: 20,
  },
  wrapper: {
    paddingHorizontal: 5,
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
  instructionsInfo: {
    color: "#e0e0e0",
    alignItems: 'center'

  },
  instructionsINR:{
    color: "#e0e0e0",
    alignItems:'center',
    marginTop: 10,
    marginBottom: 5,
  },
  textAreaContainer: {
    borderColor: '#212121',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});