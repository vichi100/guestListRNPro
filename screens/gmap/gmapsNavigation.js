import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image
} from 'react-native';
import getDirections from './gmapsdirection'

export default class gmapsNavigation extends React.Component {

  handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }

    getDirections(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //backgroundColor: "#939393",
  },
});
