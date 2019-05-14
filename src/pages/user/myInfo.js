import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon,AtButton } from 'taro-ui'
import ToLogin from '../../components/toLogin'
import UserInfo from '../../components/userInfo'
import { isLogin } from '../../utils/utils'
import './userInfo.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor () {
    this.state = {
      loginname: '',
      isLogin: false,
    }
  }
  componentDidMount () {
    this.setState({
      loginname: Taro.getStorageSync('userInfo').loginname
    })
  }

  componentDidShow() {
    this.setState({
      isLogin: isLogin()
    })
  }
  toTopic(type){
    let url = '/pages/user/userTopic?type='+type+'&loginname='+this.state.loginname
    Taro.navigateTo({
      url: url
    })
  }
  signOut(){
    Taro.setStorageSync('Authorization', '')
    Taro.setStorageSync('userInfo', '')
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
  render () {
    const { isLogin } = this.state
    return (
      <View>
      {
        isLogin ? (
        <View className='content'>
            <UserInfo loginname={Taro.getStorageSync('userInfo').loginname}></UserInfo>
            <View className='info-list'>
              <View className='info-list-item'>
                <View className='item-title'>最近创建话题</View>
                <View className='item-content' onClick={this.toTopic.bind(this,1)}><AtIcon value='chevron-right' size='12' /></View>
              </View>
              <View className='info-list-item'>
                <View className='item-title'>最近参与话题</View>
                <View className='item-content' onClick={this.toTopic.bind(this,2)}><AtIcon value='chevron-right' size='12' /></View>
              </View>
              <View className='info-list-item'>
                <View className='item-title'>我的收藏</View>
                <View className='item-content' onClick={this.toTopic.bind(this,3)}><AtIcon value='chevron-right' size='12' /></View>
              </View>
            </View>
            <View className='signout'>
              <AtButton type='primary' onClick={this.signOut.bind(this)}>退出登录</AtButton>
            </View>
          </View>
        ) : (
          <ToLogin isLogin={isLogin} />
        )
      }
      </View>
    )
  }
}
