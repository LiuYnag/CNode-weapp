import Taro, { Component } from '@tarojs/taro'
import { View, Image,Text } from '@tarojs/components'
import service from '../../utils/service'
import './about.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  constructor () {
    super(...arguments)
    this.state = {}
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
          <View className='logo'><Image src={require('../../assets/image/launcher.png')} /></View>
          <View className='text'>
            <Text>1、该社区为同步PC端CNode社区数据实现的微信小程序端，方便在微信端直接查看社区信息。</Text>
            <Text>2、目前暂不支持账号密码方式登录，请在PC端打开网页访问https://cnodejs.org/ Cnode社区登录后进入设置页面，扫描页面上二维码登录。</Text>
            <Text>3、官方暂未开放发帖功能API，所以目前小程序端只支持查看功能。</Text>
            <Text>4、项目源码已发布在GitHub上，欢迎Issue和Star。</Text>
          </View>
      </View>
    )
  }
}
