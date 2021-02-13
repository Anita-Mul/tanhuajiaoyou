import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';
class Geo {
  async initGeo() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    }
    await init({
      // 那个网站android里面的key
      ios: 'eae895e0d2d13b8b1389d8c78d30095c',
      android: 'eae895e0d2d13b8b1389d8c78d30095c',
    });
    return Promise.resolve();
  }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log('开始定位');
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  }
  async getCityByLocation() {
    await init({
      // 那个网站android里面的key
      ios: 'eae895e0d2d13b8b1389d8c78d30095c',
      android: 'eae895e0d2d13b8b1389d8c78d30095c',
    });

    const {longitude, latitude} = await this.getCurrentPosition();
    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
        location: `${longitude},${latitude}`,
        // Anita_Map里面的key
        key: 'c998d78ec88d171b87d43c8aac735de0',
      },
    });
    return Promise.resolve(res.data);
  }
}

export default new Geo();
