import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground
} from 'react-native';


import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NumericInput from 'react-native-numeric-input'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
const calcSize = create(PREDEF_RES.iphone7.px)

export default class GuestListScreen extends React.Component {

    static defaultProps = {
        backgroundColor: '#fff',
        marginTop: 10,
        // width: 350,
        // height: 350,
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3
      };

    constructor(props) {
        super(props);
        this.state = {
            calc_height: 0
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View
                    //outer GuestList
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
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Ionicons style={styles.icons} name="ios-list" size={20} />
                        <Text style={{ fontSize: 14 }}>
                            Guest Lists
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
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, }}>
                            <Text style={styles.instructions}>
                                Girls
                  </Text>
                  <Text style={styles.instructions}>
                                Girls
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
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, }}>
                            <Text style={styles.instructions}>
                                Couples
                  </Text>
                            <NumericInput
                                initValue={this.state.v1}
                                value={this.state.v1}
                                onChange={(v1) => this.setState({ v1 })}
                                totalWidth={150}
                                totalHeight={35}
                                minValue={0}
                                maxValue={9999}
                                step={1}
                                iconStyle={{ fontSize: 15, color: '#434A5E' }}
                                inputStyle={{ fontSize: 18, color: '#434A5E' }}
                                valueType='real'
                                borderColor='#C7CBD6'
                                rightButtonBackgroundColor='#C7CBD6'
                                leftButtonBackgroundColor='#C7CBD6'
                            />


                        </View>


                    </View>


                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //backgroundColor: "#939393",

    },

    icons: {
        width: 30,
        height: 30,
        //borderRadius: 30, 
        //borderWidth: 2, 
        borderColor: 'rgb(170, 207, 202)'
    },






});