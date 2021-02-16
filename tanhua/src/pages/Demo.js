import React from 'react';
import { View, Text } from "react-native";
import JMessage from "../utils/JMessage";
class App extends React.Component {
  componentDidMount() {
    JMessage.init();
    JMessage.login("sfdsfdf","dfdsfdf")
    .then(console.log);

  }
  render() {
    return (
      <View>
        <Text>goods</Text>
      </View>
    );
  }
}
export default App;