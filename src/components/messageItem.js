import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import service from '../utils/service'
import './message.scss'

export default class MessageItem extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {}
  }
  toUser(id){
    let url = '/pages/user/userInfo?loginname='+id
    Taro.navigateTo({
      url: url
    })
  }
  messageMark(messageId,topicId){
    if(this.props.current==0){
      let url = 'message/mark_one/'+messageId
      const param = {
        //accesstoken: Taro.getStorageSync('Authorization'),
        accesstoken: '590f9858-d01d-4d9f-9e1d-30c30d9086ba',
      }
      service.post (url,param).then((result) => {
        if(result.data.data.success){
          Taro.navigateTo({
            url: '/pages/index/detail?id='+topicId
          })
        }
      })
    }else{
      Taro.navigateTo({
        url: '/pages/index/detail?id='+topicId
      })
    }

  }
  render () {
    const {message} = this.props
    return (
        <View>
        {
          message.type=='at' &&
          <View className='message-item'>
            <Text className='message-link' onClick={this.toUser.bind(this,message.author.loginname)}>{message.author.loginname}</Text>
            <Text className='message-text'>在话题</Text>
            <Text className='message-link' onClick={this.messageMark.bind(this,message.id,message.topic.id)}>{message.topic.title}</Text>
            <Text>中@了你</Text>
          </View>
        }
        {
          message.type=='reply' &&
          <View className='message-item'>
            <Text className='message-link' onClick={this.toUser.bind(this,message.author.loginname)}>{message.author.loginname}</Text>
            <Text className='message-text'>回复了你的话题</Text>
            <Text className='message-link' onClick={this.messageMark.bind(this,message.id,message.topic.id)}>{message.topic.title}</Text>
          </View>
        }
        </View>
    )
  }
}