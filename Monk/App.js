import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-crop-picker';


class Index extends Component {
  onclick = () => {
    const Image = ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    console.log(Image);
  };

  render() {
    return (
      <View>
        <Text onPress={this.onclick}>哈哈哈哈哈哈</Text>
      </View>
    );
  }
}

export default Index;
