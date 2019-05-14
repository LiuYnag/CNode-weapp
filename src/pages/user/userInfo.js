import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import UserInfo from '../../components/userInfo'
import './userInfo.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor () {
    this.state = { }
  }
  componentDidMount () { }

  toTopic(type){
    let url = '/pages/user/userTopic?type='+type+'&loginname='+this.$router.params.loginname
    Taro.navigateTo({
      url: url
    })
  }

  render () {
    return (
        <View className='content'>
          <UserInfo loginname={this.props.loginname}></UserInfo>
          <View className='info-list'>
            <View className='info-list-item'>
              <View className='item-title'>最近创建话题</View>
              <View className='item-content' onClick={this.toTopic.bind(this,1)}><AtIcon value='chevron-right' size='12' /></View>
            </View>
            <View className='info-list-item'>
              <View className='item-title'>最近参与话题</View>
              <View className='item-content' onClick={this.toTopic.bind(this,2)}><AtIcon value='chevron-right' size='12' /></View>
            </View>
          </View>
        </View>
    )
  }
}
