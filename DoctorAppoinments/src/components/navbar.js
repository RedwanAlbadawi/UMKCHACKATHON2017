import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-vector-icons';

class NavBar extends Component {
  constructor() {
   super();
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
     dataSource: ds.cloneWithRows(this.props.tab),
   };
 }

  rederNavBar() {
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TouchableOpacity onPress{this.changeTabs(rowData.name)}>
            <Icon name='home' iconStyle={[styles.iconStyle, rowData.iconStyle]}/>
            <Text>rowData.name</Text>
          </TouchableOpacity>
        }
      />
    );
  }
  render(){
    return (
      <View>
        <View></View>
        <View style={styles.navBarStyling}>
        </View>
      </View>
    );
  }
}


const styles = {
  navBarStyling: {
    flexDirecton: 'column',
    heigt: 50
  }
  iconStyle : {
    backgroundColor: 'white'
  }
}
