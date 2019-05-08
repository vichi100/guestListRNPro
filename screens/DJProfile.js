import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Navigator
} from 'react-native';
// import TopBar from './topBar';
// import TabProfile from './tabProfile'; 
import DJEvents from './DJEvents'

import Card from "./Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default class Profile extends Component {

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

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "The Player",
    headerBackTitle: null,
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
  
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");

    return ( 
     <View> 

        {/* <TopBar title={meUsername}/> */}
 
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>


      <Card>
            <View style={styles.meInfoWrap}>
              <TouchableOpacity
                onPress={() =>
                  this.goToDJProfile(item)
                }
              >
                <View style={styles.meInfo}>
                  <Image source={{uri: "http://199.180.133.121:3030"+item.picurl}} style={styles.mePic} />
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <View style={styles.edit}>
                  <Text>{item.name}</Text>
                </View>
                <View
                  style={{
                    height: 1,
                    flexDirection: "row",
                    //width: 40,
                    backgroundColor: "#D81458",
                    marginTop: 5,
                    marginLeft: 50,
                    marginRight: 50
                  }}
                />
                <View style={styles.meData}>
                  <View style={styles.data}>
                    <Text style={{ fontSize: 12, fontWeight: "600" }}>{item.eventscount}</Text>
                    <Text style={{ fontSize: 12, color: "#777" }}>events</Text>
                  </View>

                  <View style={styles.data}>
                    <Text style={{ fontWeight: "600" }}>{item.followers}</Text>
                    <Text style={{ fontSize: 12, color: "#777" }}>
                      followers
                    </Text>
                  </View>
                  <View style={styles.data}>
                  <TouchableOpacity onPress={()=>{this.pressedLike()}} >
                  
                    <MaterialCommunityIcons
                      color={this.state.touchableHighlightMouseDown?'#424242':(this.state.liked ? '#dd2c00' : '#424242')}
                      name="heart-outline"
                      size={20}
                    />
                    <Text style={{ fontSize: 12, color: "#777" }}>{this.state.touchableHighlightMouseDown?'follow':(this.state.liked ? 'unfollow' : 'follow')}</Text>
                  
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Card>
      <DJEvents navigation={this.props.navigation} djData={item}/>

      
      </ScrollView>
     
    </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView:{
    backgroundColor: '#fff',
    //marginBottom:110
  },
  container: {

  
    backgroundColor: '#fff',


  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  mePic:{
      width:70,
      height:70,
      borderRadius:35
  },
  meInfoWrap:{
    paddingTop:5,
    
    flexDirection:'row'
  },
  meData:{
    flex:2,
    paddingTop:10,
    flexDirection:'row',
    
  },
  meInfo:{
    alignItems:'center',
    padding:15
  },
  meName:{
    fontWeight:'bold',
    fontSize:12,
    paddingTop:10
  },
  data:{
    flex:1,
    
    alignItems:'center'
  },
  edit:{
    // borderWidth:1,
    // borderColor:'#ccc',
    // borderRadius:3,
    alignItems:'center',
    //margin:15,
    fontWeight:'bold',
    fontSize:16,
    padding:2
  }

});

