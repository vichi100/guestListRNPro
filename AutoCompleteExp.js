//https://github.com/toystars/react-native-multiple-select

import React, { Component } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const items = [{
  id: '92iijs7yta',
  name: 'Ondo',
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun',
}, {
  id: '16hbajsabsd',
  name: 'Calabar',
}, {
  id: 'nahs75a5sg',
  name: 'Lagos',
}, {
  id: '667atsas',
  name: 'Maiduguri',
}, {
  id: 'hsyasajs',
  name: 'Anambra',
}, {
  id: 'djsjudksjd',
  name: 'Benue',
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna',
}, {
  id: 'suudydjsjd',
  name: 'Abuja',
}];

class Auto extends Component {

  state = {
    selectedItems: [],
  };

  

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems: selectedItems });
    console.log('selectedItems:'+selectedItems)
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <View style={{ flex: 1 , marginTop:90}}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          // altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }} 
          single = {true}
          // submitButtonColor="#CCC"
          // submitButtonText="Submit"
        />
        {/* <View>
          {MultiSelect.getSelectedItemsExt(selectedItems)}
        </View> */}
      </View>
    );
  }
}

//export default App;