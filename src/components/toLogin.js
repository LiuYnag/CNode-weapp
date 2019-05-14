import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './toLogin.scss'

export default class ToLogin extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {}
  }
  handleClick () {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
  render () {
    return (
        <View className='content'>
          <View>
            <View className='logo'><Image src={require('../../assets/image/launcher.png')} /></View>
            <View className='logo-btn'>
              <AtButton circle type='primary' onClick={this.handleClick.bind(this)}>Login</AtButton>
            </View>
          </View>
        </View>
    )
  }
}