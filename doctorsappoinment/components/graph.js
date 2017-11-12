import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Graph extends Component {
  render(){
    return (
      <View style={{ flex: 1, height: 300, borderWidth: 1, borderRadius: 5}}>
        <View
          style={{
            flex: 1,
            borderLeftWidth: 1,
            borderBottomWidth :1,
            margin: 30,
            flexDirection: 'row',
            alignItems: 'flex-end',
            borderRadius: 3
          }}>
            <View style={{
              backgroundColor: 'lightblue',
              height: 100,
              width: 50,
              marginLeft: 10,
              borderRadius: 4,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{
              backgroundColor: 'lightgreen',
              height: 80,
              flex: 1,

              borderRadius: 4
            }}></View></View>
            <View style={{
              backgroundColor: 'green',
              height: 150,
              width: 50,
              marginLeft: 10,
              borderRadius: 4
            }}/>
            <View style={{
              backgroundColor: 'green',
              height: 120,
              width: 50,
              marginLeft: 10,
              borderRadius: 4
            }}/>
        </View>
      </View>
    );
  }
}

export default Graph;
