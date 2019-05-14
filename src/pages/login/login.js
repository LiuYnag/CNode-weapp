import Taro, { Component } from '@tarojs/taro'
import { View, Image,Text } from '@tarojs/components'
import { AtButton,AtIcon } from 'taro-ui'
import service from '../../utils/service'
import './login.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  constructor () {
    super(...arguments)
    this.state = {}
  }

  componentDidMount () {

  }

  handleClick () {
    Taro.scanCode().then((res) =>{
      const param = {accesstoken: res.result}
      service.post('accesstoken',param).then((result) => {
        Taro.setStorageSync('Authorization', res.result)
        Taro.setStorageSync('userInfo', result.data)
        Taro.navigateTo({
          url: '/pages/index/index'
        })
      })
    })
  }

  render () {
    return (
      <View className='content'>
          <View className='logo-image'><Image src={require('../../assets/image/launcher.png')} /></View>
          <View className='logo-btn'>
            <AtButton type='primary' onClick={this.handleClick.bind(this)}>
              <AtIcon prefixClass='fa' value='qrcode' size='15' />
              <Text className='logo-btn-text'>扫码登录</Text>
            </AtButton>
          </View>
          <View className='login-text'>
            <Text>1、目前小程序端暂不支持账号密码方式，敬请谅解！</Text>
            <Text>2、请在PC端打开网页访问https://cnodejs.org/ Cnode社区登录后进入设置页面，扫描页面上二维码登录。</Text>
          </View>
      </View>
    )
  }
}
