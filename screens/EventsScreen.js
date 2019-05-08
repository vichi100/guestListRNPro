// @flow

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import faker from 'faker';
import moment from 'moment';
import Calendar from './calendar/Calendar';
import Events from './events/Events';
import  Moment from 'moment';
import { _,random, min, times } from 'lodash'

export type EventType = {
  date: Moment,
  title: string,
  description: string,
  image: string,
};

// Generate fake event data
const FAKE_EVENTS = (() => {
  const startDay = moment().subtract(5, 'days').startOf('day');
  return new _.times(64, () => ({
    date: startDay.add(4, 'hours').clone(),
    title: faker.company.companyName(),
    description: faker.lorem.sentence(),
    // use random dimensions to get random urls
    image: faker.image.nightlife(Math.floor(Math.random() * 200) + 100, Math.floor(Math.random() * 200) + 100),
  }));
})(); 

// Filter events by date
// const filterEvents = (date: Moment): ?Array<EventType> =>
//   FAKE_EVENTS.filter(event => event.date.isSame(date, 'day'));

//var date;
 const FakeEventsList = new _.times(64, () => {
    const startDay = moment().subtract(5, 'days').startOf('day');
    return {
      date: startDay.add(4, 'hours').clone(),
      title: faker.company.companyName(),
      description: faker.lorem.sentence(),
      image: faker.image.nightlife(Math.floor(Math.random() * 200) + 100, Math.floor(Math.random() * 200) + 100),
    };
  });

  const filterEvents = (date: Moment) => FAKE_EVENTS.filter(
    event => event.date.isSame(date, 'day')
  );

export default class EventsScreen extends React.Component {

  state = {
    
    events: filterEvents(moment()),
  };

  onSelectDate = (date: Moment) => {
    console.log("date : "+date)
    console.log(date.format('DD-MMMM-YYYY')); 
    this.setState({ events: filterEvents(date) });
  };

  render() {
    const { events } = this.state;
    console.log(" my event"+events)
    return (
      
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Calendar onSelectDate={this.onSelectDate} />
        <Events events={events} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
});
