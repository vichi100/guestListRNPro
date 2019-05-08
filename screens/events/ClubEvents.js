// @flow

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Event from './ClubEvent';
import type { EventType } from '../EventsScreen';

export default class Events extends Component {

  props: {
    events: ?Array<EventType>,
  };

  render() {
    const { events } = this.props;
    console.log("Events componant   "+JSON.stringify(events.map(
      function(item, i){
        console.log("events item :  "+JSON.stringify(item));
      }

    )))
    return (
      <View style={styles.container}>
        <ScrollView>
          {events && events.map((event, index) =>
            <Event event={event} key={index} />)}
        </ScrollView>
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