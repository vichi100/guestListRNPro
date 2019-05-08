import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Image,
} from 'react-native';

import styles from '../../styles';
import ContactDetails from './ContactDetails';

const url = 'http://api.randomuser.me/?results=15&seed=azer';

export default class ContactList extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);

    const datasource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      jsonData: datasource.cloneWithRows([]),
      ds: datasource,
    };
  }
  _handlePress() {
    return fetch(url)
      // convert to json
      .then((response) => response.json())
      // do some string manipulation on json
      .then(({ results }) => {
        const newResults = results.map((user) => {
          const newUser = {
            ...user,
            name: {
              title: `${user.name.title.charAt(0).toUpperCase()}${user.name.title.slice(1)}`,
              first: `${user.name.first.charAt(0).toUpperCase()}${user.name.first.slice(1)}`,
              last: `${user.name.last.charAt(0).toUpperCase()}${user.name.last.slice(1)}`,
            },
          };

          return newUser;
        });

        return newResults;
      })
      // set state
      .then((results) => {
        this.setState({
          jsonData: this.state.ds.cloneWithRows(results),
        });
      });
  }
  renderRow(rowData: string) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigator.push({
            component: ContactDetails,
          });
        }}
      >
        <View style={styles.listview_row}>
          <Image
            source={{ uri: rowData.picture.thumbnail }}
            style={{ height: 48, width: 48 }}
          />
          <Text>
            {rowData.name.title} {rowData.name.first} {rowData.name.last}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    const view = (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._handlePress()}
          style={styles.button}
        >
          <Text>Fetch results?</Text>
        </TouchableOpacity>
        <ListView
          enableEmptySections
          dataSource={this.state.jsonData}
          renderRow={(rowData) => this.renderRow(rowData)}
          onPress={() => this._handleRowClick()}
        />
      </View>
    );

    return view;
  }
}