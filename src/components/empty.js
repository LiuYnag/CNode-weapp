import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './empty.scss'
export default class Empty extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <View className='content'>
        <Image className='img' src={require('../assets/image/empty.png')} />
        <Text className='text'>暂无数据</Text>
      </View>
    )
  }
}
