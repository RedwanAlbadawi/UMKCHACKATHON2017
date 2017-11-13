import React, { Component } from 'react';
import { View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';

class Example extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.value.name}`,
  });
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={{ flex: 1}}>
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      <KeyboardSpacer/>
      </View>
    );
  }
}

export default Example;
