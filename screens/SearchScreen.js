/*This is an Example of SearchBar in React Native*/
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';
import { SERVER_URL } from '../constants';
//library-music

class Search extends React.Component {
  static defaultProps = {
    //backgroundColor: "#fff",
    backgroundColor: "#37474f",
    marginTop: 1,
    // width: 350,
    // height: 350,
    shadowColor: "rgb(50,50,50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "Search",
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
    //setting default state
    this.state = { isLoading: true, search: "" };
    this.arrayholder = [];
  }
  componentDidMount() {
    var city = global.city;
    console.log("Search: city = "+city)
    return axios.get(SERVER_URL+"getSearchParameter?city="+city)
      //.then(response => response.json())
      .then(responseJson => {
        console.log("search array " + JSON.stringify(responseJson.data));
        this.setState(
          {
            isLoading: false,
            clubNameDataSource: responseJson.data.clubname,
            locationDataSource: responseJson.data.location,
            djNameDataSource: responseJson.data.djname
          },
          function() {
            this.clubNameArrayholder = responseJson.data.clubname;
            this.locationArrayholder = responseJson.data.location;
            this.djNameArrayholder = responseJson.data.djname;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newClubnameData = this.clubNameArrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      console.log("search array " + JSON.stringify(item));
      const itemData = item.clubname
        ? item.clubname.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      clubNameDataSource: newClubnameData,
      search: text
    });

    //LOCATION SEARCH FITER

    const newLocationData = this.locationArrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      console.log("search array " + JSON.stringify(item));
      const itemData = item.location
        ? item.location.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      locationDataSource: newLocationData,
      search: text
    });

    // DJNAME SEARCH FILTER
    const newDJNameData = this.djNameArrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      console.log("search array " + JSON.stringify(item));
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      djNameDataSource: newDJNameData,
      search: text
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: "90%",
          backgroundColor: "#ffffff"
        }}
      />
    );
  };

  _display() {}

  goToClubEvents = (item) => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    console.log("Searhch: item: "+JSON.stringify(item))
    console.log("clubid ; " + item.clubid);
    this.props.navigation.navigate("EventsOfOneClub", {
      clubid: item.clubid,

    });
  };

  goToClubEventsByLocation =  (item) => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    console.log("location ; " + item.location);
    this.props.navigation.navigate("EventsByLocation", {
      location: item.location,

    });
  };

  goToDJProfile = (item) => {
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen');
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    this.props.navigation.navigate("DJProfile", { item: item });
  };

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <SearchBar
          style={{ fontSize: 12 }}
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction("")}
          placeholder="Search by club name/location/DJ name.."
          value={this.state.search}
        />
        {/* <View style={{ backgroundColor:"#4caf50" }}> */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 1,
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#37474f",
            hight: 90
          }}
        >
          <MaterialCommunityIcons style={styles.icons} name="owl" size={20} />
          <Text style={{ paddingLeft: 10, fontSize: 14, color: "#4caf50" }}>
            Clubs
          </Text>
        </View>

        <FlatList
          style={{ backgroundColor: "#37474f" }}
          data={this.state.clubNameDataSource}
          //ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems

            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
              <TouchableOpacity
                onPress={() => this.goToClubEvents(item)}
                style={{
                  height: 40
                }}
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
                  <Text style={styles.instructions}>{item.clubname}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View
          style={{
            flexDirection: "row",
            marginBottom: 1,
            //marginTop: 1,
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#37474f",
            hight: 90
          }}
        >
          <MaterialIcons style={styles.icons} name="location-on" size={20} />
          <Text style={{ paddingLeft: 8, fontSize: 14, color: "#4caf50" }}>
            Location
          </Text>
        </View>

        <FlatList
          style={{ backgroundColor: "#37474f" }}
          data={this.state.locationDataSource}
          //ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
              <TouchableOpacity
                onPress={() => this.goToClubEventsByLocation(item)}
                style={{
                  height: 40
                }}
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
                  <Text style={styles.instructions}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View
          style={{
            flexDirection: "row",
            marginBottom: 1,
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#37474f",
            hight: 90
          }}
        >
          <MaterialCommunityIcons
            style={styles.icons}
            name="access-point"
            size={20}
          />
          <Text style={{ paddingLeft: 8, fontSize: 14, color: "#4caf50" }}>
            DJs
          </Text>
        </View>

        <FlatList
          style={{ backgroundColor: "#37474f" }}
          data={this.state.djNameDataSource}
          //ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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

            <TouchableOpacity
                onPress={() => this.goToDJProfile(item)}
                style={{
                  height: 40
                }}
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
                <Text style={styles.instructions}>{item.name}</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}
          // enableEmptySections={true}
          // style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 30 : 0
  },
  textStyle: {
    padding: 10
  },
  instructions: {
    color: "#e0e0e0"
  },
  icons: {
    width: 20,
    height: 20,
    color: "#0091ea"
    //borderRadius: 30,
    //borderWidth: 2,
    //borderColor: 'rgb(170, 207, 202)'
  }
});

export default withNavigation(Search);
