import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image , TouchableOpacity, ActivityIndicator} from 'react-native';
import Card from '../Card'
import { StackActions, NavigationActions } from 'react-navigation';
import { AsyncStorage } from "react-native";

// const data = [
//   { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
//   // { key: 'K' },
//   // { key: 'L' },
// ];


const data = [{id:"Mumbai", src: require('../../assets/images/mumbai.png')},
                {id:"Delhi", src: require('../../assets/images/delhi.png')},
                {id:"Bangloore", src: require('../../assets/images/bangloore.png')},
                {id:'Pune', src: require('../../assets/images/pune.png')},
                ]

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;

export default class App extends React.Component {
  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "City",
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
    this.state = {
      city: null,
      isLoading:true,
    };
  }
  componentDidMount() {
    this.setState({city:global.city});
    this.setState({isLoading:false})
    
  }

  changeCity = async (item) =>{
    var newCity = item.id;
    this.setState({city:newCity})
    
  }


  onChange = async () => {
    console.log("back");
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabNavigator' }),
      ],
    });

    global.city = this.state.city;
    await AsyncStorage.setItem("city", global.city);
    return this.props.navigation.dispatch(resetAction);
  };

  renderItem = ({ item, index }) => {
      console.log(item.src) 
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        
        <Card>
        <TouchableOpacity onPress={() => this.changeCity(item)}>
        <Image
          resizeMode = "stretch"
          style = {{ flex: 1 , height:259, width:200}}
          source = {item.src}
          //source={require('/react-native/img/favicon.png')}
        />
        </TouchableOpacity>
        </Card> 
        
      </View>
    );
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
      <Text style={styles.itemText}>You are in {this.state.city.toUpperCase()}</Text>
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />

<TouchableOpacity
          onPress={() => this.onChange()}
          style={{
            height: 50
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2196f3"
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "sans-serif",
                fontWeight: "bold"
              }}
            >
              CHANGE
            </Text>
          </View>
        </TouchableOpacity>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: 2
  },
  item: {
    //backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    marginTop: 50,
    marginBottom: 50,
    color: '#FFFFFF',
    fontSize:18,
    textAlign:'center'
  },
});