import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

class Placemat extends Component {
  render() {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 2,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 15,
          marginLeft: 15
        }}
      >
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            borderRightWidth: 1,
            borderColor: 'lightgrey',
            flex: 1
          }}
        >
          <Text>{this.props.label}</Text>
        </View>
        <View
        style={{ borderColor: 'lightgrey',
                flex: 3,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10
              }}
        >
          <Text>{this.props.value}</Text>
        </View>
      </View>
    );
  }
}


export default Placemat;
