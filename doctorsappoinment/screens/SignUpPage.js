import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Card, CardSection, Input, Spinner } from '../components/common';

 class SignUp extends Component {
   state = { email: '', password: '', name: ''}
   onEmailChange(text) {
     this.setState({ email: text })
   }
   onNameChange(text) {
     this.setState({ name: text });
   }
   onPasswordChange(text) {
     this.setState({ password: text });
   }
   onButtonPress() {
    const { email, password, name, account } = this.props;
    this.props.createUser({ email, password, name, account });
   }
   onLoginPress() {
     this.props.navigation.navigate('Login');
   }
   renderButton() {
     if (this.props.loading) {
       return <Spinner size="large" />;
     }
     return (
       <Button
          title="Sign Up"
          onPress={this.onButtonPress.bind(this)}
          buttonStyle={{ borderRadius: 5 }}
          backgroundColor="#4f9deb"
       />
            );
   }
   render() {
     return (
       <View style={{ flex: 1, backgroundColor: 'white' }}>
         <View style={{ flex: 3, alignItems: 'center', marginTop: 70 }} >
            <Text h2>Healthy Life</Text>
         </View>
      <View style={{ flex: 4 }}>
       <Card style={{flex: 1, marginBottom: 50}}>
       <CardSection>
         <Input
         label="Name"
         placeholder="JOHN"
         onChangeText={this.onNameChange.bind(this)}
         value={this.state.name}
         />
       </CardSection>
        <CardSection>
        <Input
        label="Email"
        placeholder="email@example.com"
        onChangeText={this.onEmailChange.bind(this)}
        value={this.state.email}
        />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
        {this.props.error}
        </Text>
        <View>
          {this.renderButton()}
        </View>
        <CardSection>
          <Text>Already have account?</Text>
        </CardSection>
        <View>
          <Button
          title="Login"
          onPress={this.onLoginPress.bind(this)}
          buttonStyle={{ borderRadius: 5, marginBottom: 20}}
          backgroundColor="#27ae60"
          />
        </View>
       </Card>
     </View>
     <KeyboardSpacer/>
   </View>
     );
   }
 }
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default SignUp;
