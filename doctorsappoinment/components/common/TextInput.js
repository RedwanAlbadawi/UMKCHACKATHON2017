import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import HashtagInput from './HashtagInput';

class Texter extends Component {
  renderInput(){
    const { hashtag } = this.props;
    if(hashtag) {
      return(
        <HashtagInput  />
      );
    }
    else {
      return(
      <View style={styles.TextInput}>
        <TextInput secureTextEntry={this.props.secureTextEntry} style={styles.inputStyle} />
      </View>
      );
    }
  }
  render() {
    return(
      <View style={styles.inputContainer}>
        <View style={styles.textTitle}>
          <Text>{this.props.title}</Text>
        </View>
        <View style={styles.desc}>
          <Text>{this.props.desc}</Text>
        </View>
        {this.renderInput()}
      </View>
    );
  }
}

const styles = {
  inputContainer : {
    borderRadius: 4,
    paddingBottom: 20
  },
  textTitle : {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: 5,
    marginBottom: 5

  },
  textInput : {
    flex: 1
  },
  inputStyle : {
    borderRadius: 4,
    borderColor: 1,
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor: 'lightgrey',
    height: 30
  }
}

export default Texter;
