import React, { Component } from 'react';
import firebase from 'firebase';
import { ScrollView, Text, View, StyleSheet, ListView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { List, ListItem, Button } from 'react-native-elements';


class HourlySched extends Component {
  scheduling() {
      if (this.props.busy === 0) {
        return (<View><Text h2 fontSize={10}> Not Avalible</Text>
          <Button title="schedule apoinment" disabled /></View>);
      }
      return (
        <Button
        buttonStyle={{ backgroundColor: '#2E86C1'}}
        title="schedule apoinment"
        onPress={() => { Alert.alert('Appoinment Set'); }} />
      );
    }
  render() {
    return (
      <View
      style={{
        borderWidth: 1,
        height: 200,
        flexDirection: 'column',
        marginRight: 15,
        borderColor: 'lightblue',
        marginLeft: 15,
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20
    }}>
        <View
        style={{
            backgroundColor: 'white',
            marginRight: 15,
            marginLeft: 15,
            borderWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            borderRadius: 5,
            marginBottom: 20
          }}
        >
          <View>
            <Text style={{ fontSize: 30 }} h1> Time:</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }} h2> {this.props.time} </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
            {this.scheduling()}
        </View>
      </View>
    );
  }
}


class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selectedDay: '2017-11-12',
      selectedMonth: '2017-11'
    };
  }

  renderDay(day) {
    console.log(day);
    if (day.month < 10) {
      console.log(String(day.month));
      this.setState({
        selectedDay: day.selectedDay,
        selectedMonth: '2017-0'.concat(String(day.month)),
        day
      });
    } else {
      this.setState({
        selectedDay: day.selectedDay,
        selectedMonth: '2017-'.concat(String(day.month)),
        day
      });
    }
  }
  renderDaySchedule(){
    const { id } = navigation.state.params;
    if(this.state.day) {
      const { day } = this.state;
      firebase.database().ref(`schedules/${id}/${day.month}/${day.day}`)
      .once('value', (snapshot) => {
        this.setState({ items: snapshot.val()})
      })
    }
  }
  render() {
    return (
    <View style={{ flex: 1}}>
      <Calendar
        current={this.state.selectedDay}
        minDate={'2017-10-10'}
        maxDate={'2018-05-30'}
        onDayPress={(day) => { this.renderDay(day); }}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => { console.log('month changed', month); }}
        disableMonthChange={false}
        firstDay={1}
        markingType={'interactive'}

      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

export default AgendaScreen;
