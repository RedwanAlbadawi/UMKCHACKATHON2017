import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import firebase from 'firebase';
import { List, ListItem, Button } from 'react-native-elements';


class NewMessageScreen extends Component {
  state = { doctors: {}, loaded: false}
  componentWillMount() {
      firebase.database().ref('doctor').once('value', (snapshot) => {
      doctors = snapshot.val();
      this.setState({ doctors, loaded: true })
    });
  }
  onItemPress(value){
    console.log(value);
    this.props.navigation.navigate('Chat',{value});
  }
  renderDoctors() {
    if(this.state.loaded) {
      return(
      <List containerStyle={{marginBottom: 20}}>
        {
        Object.keys(this.state.doctors).map((key, val) => {
          const value = this.state.doctors[key];
          return(
            <ListItem
              roundAvatar
              key={value.id}
              title={value.name}
              onPress={() => this.onItemPress(value)}
            />);}
          )
        }
      </List>);
    } else {
      return (<Text>Getting messages</Text>)
    }
  }
  render(){
    return(
      <ScrollView>{this.renderDoctors()}</ScrollView>
    );
  }
}

export default NewMessageScreen;
