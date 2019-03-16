import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('user.db');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Registered Users',
  };

  state ={
    user: [100],
    pass: [100],
    item: null
  }

  componentDidMount() {
    this._retreiveUsers();
  }

  _retreiveUsers() {
    db.transaction(tx => {
      tx.executeSql('select * from people;', [], (_, { rows: { _array } }) => {
        this._processArr(_array);
        this.setState({ item: _array });
      });
    });
  }

  _processArr(data) {
    var len = data.length;
    var u=[len], p=[len];
    for (i = 0; i < len; i++)
    {
      // u[i]=(data[i].username);
      // p[i]=(data[i].password);
      this.state.user[i] = data[i].username;
      this.forceUpdate();
    }
   
  }

  render() {
    var u = this.state.user;
    return (
      <ScrollView style={styles.container}>
        {u.map((item, key) => (
          <Text key={key}>{item}</Text>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
