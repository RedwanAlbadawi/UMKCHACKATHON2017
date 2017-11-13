import React, { Component } from 'react';
import firebase from 'firebase';
import { ScrollView, Text, View } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'

const MESSAGE_LINK = 'https://us-central1-doctorappointment-2a6ef.cloudfunctions.net/helloWorld'

class InboxScreen extends Component {
  state = { inbox: {}, noMessages: true}
  componentWillMount() {
    this.checkInbox();
  }
  checkInbox() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`users/${currentUser.uid}/messages`)
    .once('value', snapshot => {
      const messages = snapshot.val()
      if (messages) {
        this.setState({ noMessages: false, inbox: messages});
      }
    });
  }
  onButtonPress() {
    this.props.navigation.navigate('NewMessage');
  }
  renderInbox() {
    if (this.state.noMessages) {
      return(
        <View>
          <Text>No Messages</Text>
          <Button onPress={this.onButtonPress.bind(this)} title="start message"/>
        </View>
      );
    } else {
      return(
      <List containerStyle={{marginBottom: 20}}>
        {
          this.state.inbox.map((l, i) => {
            return(
            <ListItem
              roundAvatar
              avatar={{uri:l.avatar_url}}
              key={i}
              title={l.name}
            />)}
          )
        }
      </List>);
    }
  }
  render() {
    return(
      <ScrollView>
        {this.renderInbox()}
      </ScrollView>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1
  }
}

export default InboxScreen;
