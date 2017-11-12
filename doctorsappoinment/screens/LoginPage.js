
import React, { Component } from 'react';
import {  View, Image, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Card, CardSection, Input, Spinner } from '../components/common';
import { loginUser } from '../functions/LoginFunctions';

 class LoginForm extends Component {
   state = {email: '', password: '', error: ''}
   onEmailChange(text) {
    this.setState({ email: text});
   }
   onPasswordChange(text) {
     this.setState({ password: text });
   }
   onButtonPress() {
    const { email, password } = this.state;
    var login = loginUser(email, password);
    console.log(login);
    /**if ( login.loginBool ) {
      this.props.navigation.navigate('Main', { id: login.id });
    }*/
   }
   onSignUpPress() {
     this.props.navigation.navigate('SignUp');

   }
   renderButton() {
     if (this.props.loading) {
       return <Spinner size="large" />;
     }
     return (
       <Button
          title="Login In"
          onPress={this.onButtonPress.bind(this)}
          buttonStyle={{ borderRadius: 5, }}
          backgroundColor="#27ae60"
       />
            );
   }
   render() {
     return (
       <View style={{ flex: 1, alignContent: 'space-between' }}>
       <ScrollView style={{flex: 3, backgroundColor: 'white' }}>
         <View style={{ flex: 4, alignItems: 'center', marginTop: 120 }} >
            <Text h2> Healthy Life</Text>
         </View>
         <View style={{ flex: 4 }}>
         <Card style={{ paddingBottom: 20}}>
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
          {this.state.error}
          </Text>
          <View style={{ marginBottom: 5}}>
            {this.renderButton()}
          </View>
            <View>
            <Button
              title="Sign Up"
              onPress={this.onSignUpPress.bind(this)}
              buttonStyle={{ borderRadius: 5, marginBottom: 20 }}
              backgroundColor="#4f9deb"
            />
            </View>
         </Card>
       </View>
       </ScrollView>
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

export default LoginForm;
