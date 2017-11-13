import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { WebBrowser, MapView, Constants, Location, Permissions } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class DoctorsScreen extends Component {
  renderRating(info) {
    if (info.rating) {
      return(
        <View style={ styles.rowStyling }>
          <Text>Rating: </Text>
          <Text>{ info.rating }</Text>
        </View>
      );
    }
  }
  onButtonPress(info) {
    const id = info.id
    this.props.navigation.navigate('Schedule', {id});
  }
  render() {
    console.log(this.props.navigation.state);
    const info = this.props.navigation.state.params
    return (
      <View style={{ flex: 1}}>
        <View style={ styles.rowStyling }>
          <Text>Name: </Text>
          <Text>{info.name}</Text>
        </View>
        {this.renderRating(info)}
        <View style={ styles.rowStyling }>
          <Text>Address: </Text>
          <Text>{ info.address }</Text>
        </View>
        <Button
                onPress={this.onButtonPress.bind(this, info)}
                buttonStyle={{ margin: 0 }}
                containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                title="Schedule Appoinment" />
        <View style={ styles.mapStyling }>
        <MapView
        style={{ flex: 1 }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={{
          latitude: info.coords.lat,
          longitude: info.coords.lng,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0210,
        }}
        >
        <MapView.Marker
        coordinate={{
                    longitude: info.coords.lng,
                    latitude: info.coords.lat
                  }}
        description={info.address}
          >
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 100,
                width: 50,
                height: 50
              }}>
              <MaterialCommunityIcons name="stethoscope" size={32} />
            </View>
          </MapView.Marker>
        </MapView>
        </View>
      </View>
    )
  }
}

const styles = {
  rowStyling: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    borderTopWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black'
  },
  mapStyling: {
    flex: 9
  }
}
export default DoctorsScreen;
