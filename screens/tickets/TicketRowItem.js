import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
  } from 'react-native';

  import moment from "moment";

export default class TicketRowItem extends Component {





    render() {
      var data = this.props.bookedTicketDetailsData;
      console.log('data.eventdate: '+data);
      var weekDayName = moment(data.eventdate, "DD/MMM/YYYY HH:mm:ssZZ")
        .format("ddd")
        .toUpperCase();
      var date = data.eventdate.split("/");
      if(data.bookingconfirm != null && data.bookingconfirm == 'confirm'){
        return(
          
          <View style={styles.rowContainer}>
            <Image source={{uri: "http://199.180.133.121:3030" +data.imageurl}}
            style={styles.thumbnail}
             />
            <View style={styles.rowText}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {data.clubname}
              </Text>
              <Text style={styles.author} numberOfLines={1} ellipsizeMode ={'tail'}>
                {data.eventname}
              </Text>

              <Text style={styles.datetxt} numberOfLines={1} ellipsizeMode ={'tail'}>
              {weekDayName} | {date[0]} {date[1]} {date[2]}
              </Text>
              
            </View>
            
            <Image source={require('../../assets/images/confirmed4.png')}
            style={styles.statusImg}
             />
          </View>
        );

      }else {

        return(
          
          <View style={styles.rowContainer}>
            <Image source={{uri: "http://199.180.133.121:3030" +data.imageurl}}
            style={styles.thumbnail}
             />
            <View style={styles.rowText}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {data.clubname}
              </Text>
              <Text style={styles.author} numberOfLines={1} ellipsizeMode ={'tail'}>
                {data.eventname}
              </Text>

              <Text style={styles.datetxt} numberOfLines={1} ellipsizeMode ={'tail'}>
                {weekDayName} | {date[0]} {date[1]} {date[2]}
              </Text>
              
            </View> 
            
            <Image source={require('../../assets/images/pending5.png')}
            style={styles.statusImg}
             />
          </View>
        );

      }
        
    }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#263238',
    height: 100,
    //padding: 10,
    // marginRight: 5,
    // marginLeft: 5,
    marginTop: 1,
    //borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: '#ffffff',
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },

  statusImg:{
    width: 55,  
    height: 55,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 0,
    marginRight: 10,
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0091ea'
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 16,
    color: '#4caf50'
  },
  datetxt: {
    paddingLeft: 10,
    marginTop: 15,
    fontSize: 14,
    color: '#ffffff'
  },
  thumbnail: {
    flex: 1,
    // height: undefined,
    // width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: 'column'
  }
  });