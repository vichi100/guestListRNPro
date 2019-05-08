import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  WebView
} from "react-native";
//import WebViewPostMessage from './react-native-web-view'
//import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { create, PREDEF_RES } from "react-native-pixel-perfect";

export default class TableDetailsnPrice extends React.Component {
  static defaultProps = {
    backgroundColor: "#37474f",
    marginTop: 1,
    //width: 150,
    //height: 150,
    shadowColor: "rgb(50,50,50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };

  constructor(props) {
    super(props);
    this.state = {
      calc_height: 0
    };
  }

  render() {
    var tableData = this.props.tableData;

    console.log("table data : " + JSON.stringify(tableData));
    //if(false){
    if (tableData == null ) {
      return (
        <View style={styles.container}>
          <View
            //Girls Section

            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                height: this.props.height,
                //margin: 5,
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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Text style={{ textAlign: "center", color: "#e0e0e0" }}>
                Tap/Click on table number to book
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View
              //outer GuestList
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
                  //margin: 5,
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
              <View style={{ flexDirection: "row", margin: 10 }}>
                <MaterialCommunityIcons
                  style={styles.icons}
                  name="table-settings"
                  size={20}
                />
                <Text style={{ fontSize: 14, color: "#4caf50" }}>
                  Table Details
                </Text>
              </View>

              <View
                //Girls Section

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
                  <Text style={styles.instructions}>Table No.</Text>
                  <Text style={styles.instructions}>
                    {tableData.tableNumber}
                  </Text>
                </View>
              </View>

              <View
                //Girls Section

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
                  <Text style={styles.instructions}>Table Size</Text>
                  <Text style={styles.instructions}>
                    {tableData.tableSize} guests
                  </Text>
                </View>
              </View>

              <View
                //Couple Section

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
                  <Text style={styles.instructions}>Table Price</Text>
                  <Text style={styles.instructions}>
                    {tableData.tablePrice} Rs
                  </Text>
                </View>
              </View>

              <View
                //Couple Section

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
                  <Text style={styles.instructions}>Table info</Text>
                  <Text style={styles.instructions}>
                    {tableData.tableDetails}
                  </Text>
                </View>
              </View>
            </View>

            <View
              //outer GuestList
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
                  //margin: 5,
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
              <View style={{ flexDirection: "row", margin: 10 }}>
                <FontAwesome style={styles.icons} name="rupee" size={20} />
                <Text style={{ fontSize: 14, color: "#4caf50" }}>
                  Payment Details
                </Text>
              </View>

              <View
                //Girls Section

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
                  <Text style={styles.instructions}>Booking Amount</Text>
                  <Text style={styles.instructions}>
                    {tableData.bookingAmount} Rs
                  </Text>
                </View>
              </View>

              <View
                //Girls Section

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
                  <Text style={styles.instructions}>Remaining Amount</Text>
                  <Text style={styles.instructions}>
                    {tableData.remainingAmount} Rs
                  </Text>
                </View>
              </View>

              <View
                //Couple Section

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
                  <Text style={styles.instructions}>Total Amount</Text>
                  <Text style={styles.instructions}>
                    {tableData.tablePrice} Rs
                  </Text>
                </View>
              </View>

              <View
                //Couple Section

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
                  {/* <Text style={styles.instructions}>All amount is with full cover charge</Text> */}
                  <Text style={styles.instructions}>
                    All amount is with full cover charge
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //backgroundColor: "#939393",
  },

  icons: {
    width: 30,
    height: 30,
    color: "#0091ea"
    //borderRadius: 30,
    //borderWidth: 2,
    //borderColor: 'rgb(170, 207, 202)'
  },
  instructions: {
    color: "#e0e0e0"
  }
});
