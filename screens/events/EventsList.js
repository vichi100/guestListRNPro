// @flow

import React, { Component } from 'react';
import {
  ScrollView,
  ListView,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import Event from './Event';
import type { EventType } from '../../App';


export default class Events extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     events1: events
  //   };
  // }

  

  props: {
    events: ?Array<EventType>,
  };

  // return this.state.laps.map((data) => {
  //     return (
  //       <View><Text>{data.time}</Text></View>
  //     )
  //   })


  _renderItem= ({ rowData }) =>{
    console.log("vichizz "+rowData)
    return (
    <Event event={rowData}/>);
  }

  //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id;

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) =>
    this.setState({ viewableItems });

  render() {
    const { events } = this.props;

    console.log("Events componant   "+JSON.stringify(events.map(
      function(item, i){
        console.log("events item :  "+JSON.stringify(item));
      }

    )))
    
    return (
      <View style={styles.container}>
        {/* <ScrollView>
          {events.map((event) =>
            <Event event={event} />)}
        </ScrollView> */}

        {/* <ScrollView>
          {events.map((event) =>
            <Event event={event} />)}
        </ScrollView> */}

        {/* <ListView
             	style={{flex:1}} 
                
                dataSource={this.props.events}
                renderRow={this._renderRow.bind(this)}
                
              /> */}


        <ListView
        style={{flex:1}} 
        dataSource={this.props.events}
          
          //renderRow={this._renderItem.bind(this)} // render each item
          renderRow={this._renderItem.bind(this)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});