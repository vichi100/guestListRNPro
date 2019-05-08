import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  View
} from 'react-native';

import OfferRowItem from './OfferRowItem';
import CardDark from "../CardDark";
import axios from 'axios';
import { SERVER_URL } from '../../constants';

export default class OffersListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      
    };
  }

  componentDidMount() {
    var city = global.city;
    return axios.get(SERVER_URL+"offersDetails?city="+city)
      //.then(response => response.json())
      .then(response => { 
        console.log("data : " + response.data);
        this.setState({ dataSource: response.data, isLoading: false });
      })
      .catch(error => { 
        console.error(error);
      });  
  }

  goToOffer = (item) => {
    // Logic: if offer is for clubs then display all events of club before enddate else if for event then display only event
    if(item.clubid != null){
      this.props.navigation.navigate('EventsOfOneClub', {clubid: item.clubid});
    }
    
    // else if(item.eventid != null){
    //   this.props.navigation.navigate('EventsOfOneClub', {eventDate:item.eventdate, clubid: item.clubid});
    // }
}

// INSERT INTO offers (  offertitle ,  offerdetails , offerfor,
//   offerimageurl , clubid , 
//   clubname , city , latlong , 
//   eventid , eventdate , startdate, starttime , enddate , endtime,
//   priority , passdiscountamt , passdiscountpercentage , 
//   tablediscountamt , tablediscountpercentage  )

  _renderItem = (item) => {
    console.log("item.offerid : "+item.offerid);

       <TouchableOpacity onPress={() => this.goToOffer(item)} >
    <OfferRowItem
      id={item.offerid}
      offertitle={item.offertitle}
      clubname={item.clubname}
      clubid = {item.clubid}
      offerfor = {item.offerfor}
      offerdetails={item.offerdetails}
      eventid = {item.eventid}
    />
    </TouchableOpacity>


  }
    


  _keyExtractor = (item) => item.offerid+item.clubid;

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          //renderItem={this._renderItem}
          renderItem={({ item }) => (
            <CardDark>
            <View style={styles.rowContainer}>
            
            <Image source={{uri: "http://199.180.133.121:3030"+item.offerimageurl}} 
            style={styles.thumbnail}
             />
            <View style={styles.rowText}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {item.offertitle.toUpperCase()}
              </Text>
              <Text style={styles.author} numberOfLines={10} ellipsizeMode ={'tail'}>
                {item.offerdetails}
              </Text>

              <Text style={styles.date} numberOfLines={1} ellipsizeMode ={'tail'}>
                Offer Ending : {item.enddate}:{item.endtime}
              </Text>
            </View>
            
          </View>
          </CardDark>
            
            )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#CCC',
    backgroundColor: '#ffffff',
  },

  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#263238', 
    //height: 100,
    //padding: 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
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
    color: '#ff9800'
  },
  author: {
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 14,
    color: '#eeeeee',
    flex: 1, 
    flexWrap: 'wrap'
  },

  date: {
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 14,
    color: '#f44336',
    flex: 1, 
    flexWrap: 'wrap'
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