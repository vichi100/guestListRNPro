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
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from 'react-native-numeric-input'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
const calcSize = create(PREDEF_RES.iphone7.px)

export default class PassScreen extends React.Component {

    static defaultProps = {
        backgroundColor: '#37474f',
        marginTop: 1,
        //width: 150,
        //height: 150,
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
        var data = this.props.bookingData;
        if(data.passcouplecount != null && data.passcouplecount > 0 && data.passstagcount != null && data.passstagcount > 0){
            return (
                <View style={styles.container}>
    
                    <View
                        //outer Pass
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
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <FontAwesome style={styles.icons} name="ticket" size={20} />
                            <Text style={{ fontSize: 14, color:'#4caf50'}}>
                                Passes
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
                                    Couples
                      </Text>
                      <Text style={styles.instructions}>
                      {data.passcouplecount} Nos.
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
                                <Text style={styles.instructions}>Stags{" "}</Text>
                                <Text style={styles.instructions}>
                      {data.passstagcount} Nos.
                      </Text>
    
    
                            </View>
    
    
                        </View>
    
    
                    </View>
    
                </View>
            );

        }else if(data.passstagcount != null && data.passstagcount > 0){

            return (
                <View style={styles.container}>
    
                    <View
                        //outer Pass
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
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <FontAwesome style={styles.icons} name="ticket" size={20} />
                            <Text style={{ fontSize: 14, color:'#4caf50'}}>
                                Passes
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
                                    Stags
                      </Text>
                      <Text style={styles.instructions}>
                      {data.passstagcount} Nos.
                      </Text>
    
    
                            </View>
    
    
                        </View>
                        
                        </View>
    
                </View>
            );


        }else if(data.passcouplecount != null && data.passcouplecount > 0){

            return (
                <View style={styles.container}>
    
                    <View
                        //outer Pass
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
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <FontAwesome style={styles.icons} name="ticket" size={20} />
                            <Text style={{ fontSize: 14, color:'#4caf50'}}>
                                Passes
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
                                    Couples
                      </Text>
                      <Text style={styles.instructions}>
                      {data.passcouplecount} Nos.
                      </Text>
    
    
                            </View>
    
    
                        </View>
                        
                        </View>
    
                </View>
            );

        }else{ 
            return <View></View>
        }
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //backgroundColor: "#939393",

    },
    instructions:{
        color: '#e0e0e0'
    },

    icons: {
        width: 30,
        height: 30,
        color:'#0091ea',
        //borderRadius: 30, 
        //borderWidth: 2, 
        //borderColor: 'rgb(170, 207, 202)'
    },






});