import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
  } from 'react-native';

//import { Icon } from 'react-native-elements';

export default class OfferRowItem extends Component {




  // INSERT INTO offers (  offertitle ,  offerdetails , offerfor,
  //   offerimageurl , clubid , 
  //   clubname , city , latlong , 
  //   eventid , eventdate , startdate, starttime , enddate , endtime,
  //   priority , passdiscountamt , passdiscountpercentage , 
  //   tablediscountamt , tablediscountpercentage  )

    render() {
        return(
          
          <View style={styles.rowContainer}>
            <Image source={{uri: this.props.offerimageurl}}
            style={styles.thumbnail}
             />
            <View style={styles.rowText}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {this.props.offertitle}
              </Text>
              <Text style={styles.author} numberOfLines={1} ellipsizeMode ={'tail'}>
                {this.props.offerdetails}
              </Text>

              <Text style={styles.author} numberOfLines={1} ellipsizeMode ={'tail'}>
                Sun | 29 Feb 2019
              </Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#263238',
    height: 100,
    //padding: 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    //borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: '#ffffff',
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777'
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#777'
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