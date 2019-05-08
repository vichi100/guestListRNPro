import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Card from "./Card";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardAction from "./CardAction";
import CardButton from "./CardButton";
import CardImage from "./CardImage"; 

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      calc_height: 0
    };
  }

  render() {
    const newStyle = this.props.style || {};
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Card>
            <CardImage
              source={{
                uri:
                  "http://yourexsite.altervista.org/blog/wp-content/uploads/2017/02/party4.jpg"
              }}
              //title="Above all i am here"
            />
            <CardTitle title="This is a title" subtitle="This is subtitle" />
            <CardContent text="Your device will reboot" />
            <CardAction separator={false} inColumn={false}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <Ionicons style={styles.icons} name="ios-list" size={15} />
                  <CardButton
                    onPress={() => {}}
                    title="GuestList"
                    color="blue"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <FontAwesome style={styles.icons} name="ticket" size={15} />
                  <CardButton onPress={() => {}} title="Pass" color="blue" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icons}
                    name="table-plus"
                    size={15}
                  />
                  <CardButton onPress={() => {}} title="Table" color="blue" />
                </View>
              </View>
            </CardAction>
          </Card>

          <Card>
            <CardImage
              source={{
                uri:
                  "http://yourexsite.altervista.org/blog/wp-content/uploads/2017/02/party4.jpg"
              }}
              //title="Above all i am here"
            />
            <CardTitle title="This is a title" subtitle="This is subtitle" />
            <CardContent text="Your device will reboot" />
            <CardAction separator={false} inColumn={false}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <Ionicons style={styles.icons} name="ios-list" size={15} />
                  <CardButton
                    onPress={() => {}}
                    title="GuestList"
                    color="blue"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <FontAwesome style={styles.icons} name="ticket" size={15} />
                  <CardButton onPress={() => {}} title="Pass" color="blue" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icons}
                    name="table-plus"
                    size={15}
                  />
                  <CardButton onPress={() => {}} title="Table" color="blue" />
                </View>
              </View>
            </CardAction>
          </Card>
          <Card>
            <CardImage
              source={{
                uri:
                  "http://yourexsite.altervista.org/blog/wp-content/uploads/2017/02/party4.jpg"
              }}
              //title="Above all i am here"
            />
            <CardTitle title="This is a title" subtitle="This is subtitle" />
            <CardContent text="Your device will reboot" />
            <CardAction separator={false} inColumn={false}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  backgroundColor: '#f5f5f5',
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <Ionicons style={styles.icons} name="ios-list" size={15} />
                  <CardButton
                    onPress={() => {}}
                    title="GuestList"
                    color="blue"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <FontAwesome style={styles.icons} name="ticket" size={15} />
                  <CardButton onPress={() => {}} title="Pass" color="blue" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icons}
                    name="table-plus"
                    size={15}
                  />
                  <CardButton onPress={() => {}} title="Table" color="blue" />
                </View>
              </View>
            </CardAction>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff"
    //backgroundColor: "#939393",
  },
  card: {
    flex: 1
  }
});
