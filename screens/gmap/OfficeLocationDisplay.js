import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import { MaterialIcons } from "@expo/vector-icons";

export default class OfficeLocationDisplay extends Component {
  state = {
    mapRegion: {
      latitude: 19.084097,
      longitude: 72.874318,
      latitudeDelta: 0.0922,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.00522
    },
    locationResult: null,
    location: { coords: { latitude: 19.084097, longitude: 72.874318 } }
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }

    // let location = await Location.getCurrentPositionAsync({});
    // this.setState({ locationResult: JSON.stringify(location), location });
  };

  render() {
    return (
      <View style={styles.container}> 
        <MapView
          style={{ alignSelf: "stretch", height: 90 }}
          region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.01922,
            longitudeDelta:
              (Dimensions.get("window").width /
                Dimensions.get("window").height) *
              0.00522
          }}
          //onRegionChange={this._handleMapRegionChange}
          // minZoomLevel={10}
        >
          <MapView.Marker coordinate={this.state.location.coords} />

          <View>
            <Text style={styles.pinText}>GuestList</Text>

            <MaterialIcons style={styles.icons} name="near-me" size={30} />
            {/* <Text style={styles.title}> Sunday, March 9 </Text> */}
          </View>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    marginTop: 1
  },
  circle: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 50 / 2,
    position: "absolute",
    top: 0,
    right: 0
    //backgroundColor: 'red',
  },

  pinText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    //width: 50,
    height: 90,
    fontSize: 14,
    //marginTop: 40,
    paddingTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    //width: 50,
    // height: 90,
    fontSize: 14,
    //marginTop: 40,
    paddingTop: 50
    //backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  icons: {
    width: 30,
    height: 30,
    color: "#0091ea"
    //borderRadius: 30,
    //borderWidth: 2,
    //borderColor: 'rgb(170, 207, 202)'
  }
});
