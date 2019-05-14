import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import service from '../utils/service'
import { getDateDiff } from '../utils/utils'
import './userInfo.scss'

export default class userInfo extends Component {
  constructor () {
    this.state = {
      userInfo: {}
    }
  }
  componentDidMount () {
    this.getUserInfo()
  }

  getUserInfo(){
    let that = this
    const url = 'user/'+this.props.loginname
    service.get(url,'').then((result) => {
      that.setState({
        userInfo: result.data.data,
      })
    })
  }

  render () {
    const { userInfo } = this.state
    return (
        <View className='content'>
          <View className='info'>
            <View className='info-avatar'>
              <View className='avatar'><AtAvatar circle image={userInfo.avatar_url}></AtAvatar></View>
              <Text className='username'>{userInfo.loginname}</Text>
              <Text className='score'>积分：{userInfo.score}</Text>
            </View>
          </View>
          <View className='info-list'>
              <View className='info-list-item'>
                <View className='item-title'>注册时间</View>
                <View className='item-content'>{userInfo.create_at ? getDateDiff(userInfo.create_at) : '--'}</View>
              </View>
              <View className='info-list-item'>
                <View className='item-title'>GitHub</View>
                <View className='item-content'>@{userInfo.githubUsername ? userInfo.githubUsername : '--'}</View>
              </View>
              <View className='info-list-item'>
                <View className='item-title'>所在地</View>
                <View className='item-content'>{userInfo.address ? userInfo.address : '--'}</View>
              </View>
              <View className='info-list-item'>
                <View className='item-title'>个人网站</View>
                <View className='item-content'>{userInfo.url ? userInfo.url : '--'}</View>
              </View>
              <View className='info-list-item'>
                <View className='item-title'>微博</View>
                <View className='item-content'>{userInfo.weibo ? userInfo.weibo : '--'}</View>
              </View>
          </View>
        </View>
    )
  }
}
