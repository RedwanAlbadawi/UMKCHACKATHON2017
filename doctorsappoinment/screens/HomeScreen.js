import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser, MapView, Constants, Location, Permissions } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    doctors: {}
  };
  static navigationOptions = {
    header: null,
  };
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    var config = {
      apiKey: 'AIzaSyBlyvBEct-StmV-DVSLPoHf1voair-6aSw',
      authDomain: 'doctorappointment-2a6ef.firebaseapp.com',
      databaseURL: 'https://doctorappointment-2a6ef.firebaseio.com',
      projectId: 'doctorappointment-2a6ef',
      storageBucket: 'doctorappointment-2a6ef.appspot.com',
      messagingSenderId: '481515514891'
    };
    firebase.initializeApp(config);
    firebase.database().ref('doctors').once('value', (snapshot) => {
      this.setState({doctors: snapshot.val(), doctorsloaded: true});
      console.log(this.state);
    });
  }
  onPressCallout(marker) {
     this.props.navigation.navigate('Info', {
                                              name: marker.name,
                                              rating: marker.rating,
                                              address: marker.formatted_address,
                                              coords: marker.geometry.location
                                            });
  }
  renderDoctors() {
    if (this.state.doctorsloaded) {
      this.state.doctors.forEach((marker) => {
        console.log(marker);
        return (
          <MapView.Marker
          coordinate={{
            latitude:marker.geometry.location.lat,
            longitude: marker.geometry.location.lng,
          }}
          title={marker.name}
          description={marker.address}
          onCalloutPress={() => this.onPressCallout(marker)}
        />
      );
    });
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, loaded: true });
  };
  render() {
    let text = 'Waiting..';
    let coords = {}
    if (this.state.loaded && this.state.doctorsloaded) {
      //coords = this.state.location.coords;
      //console.log(this.state.location);
      coords = { latitude: 39.0336 , longitude: -94.5760 }
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          >
            <MapView.Marker
              coordinate={coords}
              title={'current location'}
            />
            {
                this.state.doctors.map((marker) => {
                  console.log(marker);
                  return (
                    <MapView.Marker
                    coordinate={{
                      latitude:marker.geometry.location.lat,
                      longitude: marker.geometry.location.lng,
                    }}
                    key={marker.id}
                    title={marker.name}
                    description={marker.address}
                    onCalloutPress={() => this.onPressCallout(marker)}
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
                );
                })
            }
          </MapView>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
