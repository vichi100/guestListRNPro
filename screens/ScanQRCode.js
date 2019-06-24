import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import store from 'react-native-simple-store';


export default class ScanQRCode extends Component {

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

  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    clubname:null, 
    eventdate:null, 
    passcode:null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      var passQRCode = result.data;
      console.log('passQRCode '+passQRCode)
      var passQRCodeArry = passQRCode.split('_');
      var clubname = passQRCodeArry[1];
      var eventdate = passQRCodeArry[3]
      var passcode = passQRCodeArry[5]
      console.log('passcode '+passcode)
      this.setState({ lastScannedUrl: result.data, clubname:clubname, eventdate:eventdate, passcode:passcode});
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    // 
    store.push('passesList', 'milk')

    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}> 
          <Text numberOfLines={4} style={styles.urlText}>
            {this.state.clubname}{"\n"} {this.state.eventdate} {"\n"} {this.state.passcode}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    // color: 'rgba(255,255,255,0.8)',
    color: '#4caf50',
    fontSize: 18,
  },
});
