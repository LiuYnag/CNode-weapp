import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import service from '../../utils/service'
import MessageItem from '../../components/messageItem'
import Empty from '../../components/empty'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '信息'
  }
  constructor () {
    super(...arguments)
    this.state = {
      hasNotMessages: [],
      hasMessages: [],
      current: 0
    }
  }

  componentDidMount () {
    this.getMessage()
  }
  getMessage(){
    let that = this
    const param = {
      //accesstoken: Taro.getStorageSync('Authorization'),
      accesstoken: '590f9858-d01d-4d9f-9e1d-30c30d9086ba',
      mdrender: ''
    }
    service.get('messages',param).then((result) => {
      console.log(result)
      that.setState({
        hasNotMessages: result.data.data.hasnot_read_messages,
        hasMessages: result.data.data.has_read_messages
      })
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    const { hasNotMessages,hasMessages,current } = this.state
    return (
      <View className='content'>
        {
          current == 1 &&
          ( hasMessages.length>0 ?
            <View className='message-list'>
              {
                hasMessages.map((item,index) => {
                  return <View key={index}>
                          <MessageItem message={item} type={current} />
                        </View>
                })
              }
            </View> : <Empty />
          )

        }
        {
          current == 0 &&
          (
            hasNotMessages.length>0 ?
            <View className='message-list'>
              {
                hasNotMessages.map((item,index) => {
                  return <View key={index}>
                          <MessageItem message={item} />
                        </View>
                })
              }
            </View> : <Empty />
          )
        }
        <View className='tab-bar'>
          <View className={current==0 ? 'tab-item active' : 'tab-item'} onClick={this.handleClick.bind(this,0)}>
            <AtIcon prefixClass='fa' value='envelope-o' size='16' />
            <Text className='tab-item-text'>未读</Text>
          </View>
          <View className={current==1 ? 'tab-item active' : 'tab-item'} onClick={this.handleClick.bind(this,1)}>
            <AtIcon prefixClass='fa' value='envelope-open-o' size='16' />
            <Text className='tab-item-text'>已读</Text>
          </View>
        </View>
      </View>
    )
  }
}
