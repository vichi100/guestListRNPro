import React, { Component } from 'react';
import {
  ActivityIndicator,
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
  KeyboardAvoidingView

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
import ModalFilterPicker from 'react-native-modal-filter-picker'


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

]

const optionsData = [
  {
    key: 'kenya',
    label: 'Kenya',
  },
  {
    key: 'uganda',
    label: 'Uganda',
  },
  {
    key: 'libya',
    label: 'Libya',
  },
  {
    key: 'morocco',
    label: 'Morocco',
  },
  {
    key: 'estonia',
    label: 'Estonia',
  },
  {
    key: 'kenya',
    label: 'Kenya',
  },
  {
    key: 'uganda',
    label: 'Uganda',
  },
  {
    key: 'libya',
    label: 'Libya',
  },
  {
    key: 'morocco',
    label: 'Morocco', 
  },
  {
    key: 'estonia',
    label: 'Estonia',
  },
];

export default class UploadEvent extends Component {

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
    eventdate: 'Event Date',
    eventName: null,
    clubName: 'Club Name',
    guestListCoupleAvailableStr: "Couple/Free",
    guestListGirlAvailableStr: "Girl/Free",
    guestListTitleStr:"Guest List",
    guestlistgirlcount:10,
    guestlistcouplecount: 5,
    uploadBy: null,
    selectedSegment: null,
    passCoupleCost: null,
    passStagCost: null,
    clubPickerVisible: false,
    cityPickerVisible: false,
    picked: null,
    dialogVisible: false,
    dialogDescription: null,
    dialogTitle: null,
    city: 'City Name',

  };

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
    console.log('on show') 
    this.setState({ clubPickerVisible: true });
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
    console.log('picked: '+picked)
    this.setState({
      clubName: picked,
      clubPickerVisible: false
    })
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

  pressedIncreaseGuestListGirlCount = value => { 
    this.setState({ guestlistgirlcount: value.guestlistgirlcount });
    
  };

  pressedIncreaseGuestListCoupleCount = value => {
    this.setState({ guestlistcouplecount: value.guestlistcouplecount });
  };

  onChangeTextEventName = eventName => {
    
    //console.log('eventName: '+eventName)
    this.setState({ eventName:eventName });

  }

  onChangeCoupleCost = cost => {
    
    //console.log('eventName: '+eventName)
    this.setState({ passCoupleCost:cost });

  }

  onChangeStagCost = cost => {
    
    //console.log('eventName: '+eventName)
    this.setState({ passStagCost:cost });

  }

  onChangeTextClubName = clubName =>{
    console.log('clubName: '+clubName)
    this.setState({ clubName:clubName });
  }

  uploadImageAsync = () => { 
    //let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
    console.log('uri: '+this.state.image); 
    let uri = this.state.image;
    let apiUrl = `http://192.168.43.64:6060/upload`
    let eventDate = this.state.eventdate;
    console.log('eventDate: '+this.state.eventdate); 
    let clubName = this.state.clubName;
    console.log('clubName: '+this.state.clubName); 
  
    console.log('uri: '+uri);

    if(this.state.image == null){
      this.setState({dialogDescription: 'Please select image for event !'});
      this.showDialog();
      return;
    } 

    if(this.state.eventdate == 'Event Date'){
      this.setState({dialogDescription: 'Please select event date !'});
      this.showDialog();
      return;
    } 

    if(this.state.eventName == null){
      this.setState({dialogDescription: 'Please enter event name !'});
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

    

    if(this.state.passCoupleCost == null){
      this.setState({dialogDescription: 'Please enter couple cover charge !'});
      this.showDialog();
      return;
    } 

    if(this.state.passStagCost == null){
      this.setState({dialogDescription: 'Please enter stag cover charge !'});
      this.showDialog();
      return;
    } 

    if(this.state.selectedSegment == null){
      this.setState({dialogDescription: 'Please let us know your profession !'});
      this.showDialog();
      return; 
    } 
  
    
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let data = new FormData();
    data.append('clubName', clubName);
    data.append('eventName', this.state.eventName);
    data.append('eventDate', eventDate);
    data.append('guestListGirlCount', this.state.guestlistgirlcount);
    data.append('guestListCoupleCount', this.state.guestlistcouplecount);
    data.append('passCoupleCost', this.state.passCoupleCost);
    data.append('passStagCost', this.state.passStagCost);
    data.append('uploadType', 'eventUpload');
    data.append('uploadBy', this.state.selectedSegment); 
     

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
  
    return fetch(apiUrl, options);
  }

  

  render() {
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
        <TextInput 
            placeholder="Event Name"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeTextEventName}
            value={this.state.eventName}
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
            }} onPress={this.onShow}>
        <Text style={styles.textStyle}>{this.state.clubName}</Text>
        </TouchableOpacity>

        <ModalFilterPicker
          visible={clubPickerVisible}
          onSelect={this.onSelect}
          onCancel={ this.onCancel} 
          options={optionsData}
          title='Select Club'
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
            }} onPress={this.onShowCity}>
        <Text style={styles.textStyle}>{this.state.city}</Text>
        </TouchableOpacity>

        <ModalFilterPicker
          visible={cityPickerVisible}
          onSelect={this.onSelectCity}
          onCancel={ this.onCancelCity} 
          options={optionsCityData}
          title='Select city'
        />
        </View>



        <View
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 170,
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
              <Ionicons style={styles.icons} name="ios-list" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>
                {this.state.guestListTitleStr}
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
                <Text style={styles.instructions}>Girls Count</Text>
                
                <NumericInput
                  initValue={this.state.guestlistgirlcount}
                  value={this.state.guestlistgirlcount}
                  onChange={guestlistgirlcount =>
                    this.pressedIncreaseGuestListGirlCount({
                      guestlistgirlcount
                    })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={10}
                  maxValue={100} 
                  step={5}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>

            <View style={[
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
                <Text style={styles.instructions}>
                  Couples Count 
                </Text>
                <NumericInput
                  initValue={this.state.guestlistcouplecount}
                  value={this.state.guestlistcouplecount}
                  onChange={guestlistcouplecount =>
                    this.pressedIncreaseGuestListCoupleCount({
                      guestlistcouplecount
                    })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={5}
                  maxValue={100}
                  step={5}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>
          
          </View>


          <View
            //outer Pass
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 170,
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
              <FontAwesome style={styles.icons} name="ticket" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>Passes</Text>
            </View>

            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  // height: this.props.height,
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
                <Text style={styles.instructions}>
                  Couple Cost
                </Text>
                <View style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginRight: 10,
                  
                }}>
                <TextInput
                    placeholder="Cost"
                    style={styles.inputPasses}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onChangeCoupleCost}
                    value={this.state.passCoupleCost}
                    keyboardType='numeric'
                    maxLength={5}
                />
                <Text style={styles.instructionsINR}>
                  Rs
                </Text> 
                </View>
              </View>
            </View>

            <View
              //Couple Section

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
                <Text style={styles.instructions}>
                  Stag Cost
                </Text>
               
                <View style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginRight: 10,
                  
                }}>
                <TextInput
                    placeholder="Cost"
                    style={styles.inputPasses}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onChangeStagCost}
                    value={this.state.passStagCost}
                    keyboardType='numeric'
                    maxLength={5}
                />
                <Text style={styles.instructionsINR}>
                  Rs
                </Text> 
                </View>
             
              </View>
            </View>
          </View>


          <View
            //outer Pass
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 120,
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
              <MaterialCommunityIcons style={styles.icons} name="table-plus" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>Table Booking</Text>
            </View>

            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  // height: this.props.height,
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
                <Text style={styles.instructionsInfo}>
                  To activate table and pass booking {'\n'}Please call us +91 9867614466
                </Text>

                
              
              </View>
            </View>

         
          
          </View>



          <View
            //outer Pass
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 120,
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
              <MaterialCommunityIcons style={styles.icons} name="alien" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>Who am I ? {this.state.selectedSegment}</Text>
            </View>

            
              <View
                style={{
                  flex: 1,
                  // justifyContent: "space-between",
                  // flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <SegmentedControls
                  tint={'#f80046'}
                  selectedTint= {'white'}
                  backTint= {'#f5f5f5'}
                  options={ options }
                  onSelection={ this.setSelectedOption }
                  selectedOption={ this.state.selectedSegment }
                  optionContainerStyle={{flex: 1}}
                />
              
              </View>
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
    backgroundColor: '#000000',
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
  }
});