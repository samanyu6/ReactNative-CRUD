import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RkTextInput,RkButton} from 'react-native-ui-kitten';
import { WebBrowser, SQLite } from 'expo';
import { MonoText } from '../components/StyledText';

const db = SQLite.openDatabase('user.db');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._createTables();
  }
  

  constructor(props) {
    super(props);

    this.state = {
      username: '' ,
      password: ''
    };
  }

  _handlePress() {
    // alert("User:" + this.state.username + " Password" + this.state.password);
    var user = String(this.state.username);
    var pass = String(this.state.password);
    db.transaction(
      tx => {
        tx.executeSql('insert into people values (?,?);', [user, pass], succ => { alert('Database updated.') }, err => { alert('Error.')});
      }
    );
    this.setState({ username: '', password: '' });
  }

  _createTables() {
    db.transaction(
      tx => {
        tx.executeSql('create table if not exists people(username text not null, password text not null);');
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <RkTextInput
              rkType="rounded"
              placeholder = "Enter username"
              style = {
                styles.welcome
              }
              onChangeText = {
                text => this.setState({
                  username: text
                })} />
          
          <RkTextInput
            rkType="rounded"
            secureTextEntry={true}
              placeholder = "Enter password"
              style = {
                styles.welcome
              }
              onChangeText = {
                text => this.setState({
                  password: text
                })
            } />
          
          <RkButton
            style={styles.button}
            onPress = {
              () => this._handlePress()
            }>Register.
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    margin: 10
  },
  button: {
    marginTop: 30
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container2: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button2: {
    marginTop: -10
  }
});
