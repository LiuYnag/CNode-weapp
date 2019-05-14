import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import { AtAvatar,AtIcon } from 'taro-ui'
import { getDateDiff } from '../utils/utils'

import './topicList.scss'

export default class TopicList extends Component {
    constructor (props) {
        super(props)
    }
    static defaultProps = {
        info: {
            id: '',
            avatar_url: '',
            title: '',
            reply_count: '',
            create_at: '',
            loginname: '',
            last_reply_at: '',
        },
        type: 0,
    }
    componentDidMount() {
    }
    toDetail(id){
        let url = '/pages/index/detail?id='+id
        Taro.navigateTo({
          url: url
        })
    }
    toUser(id){
      let url = '/pages/user/userInfo?loginname='+id
      Taro.navigateTo({
        url: url
      })
    }
    render() {
        const {info,type} = this.props
        return (
            <View className='info-container'>
                <View className='info-content'>
                  <View className='info-title' onClick={this.toDetail.bind(this,info.id)}>{info.title}</View>
                  <View className='info-avatar' onClick={this.toUser.bind(this,info.author.loginname)}>
                    <AtAvatar size='small' image={info.author.avatar_url}></AtAvatar>
                  </View>
                </View>
                {
                    (type == '0' || type == '3') &&
                   <View className='info-message'>
                      <View className='info-label'>
                        <AtIcon value='message' size='13' color='#aaa' />
                        <Text className='label-text'>{info.reply_count}</Text>
                        <AtIcon value='clock' size='13' color='#aaa' />
                        <Text className='label-text'>{getDateDiff(info.create_at)}</Text>
                      </View>
                      <View className='info-username'>
                        <Text>{info.author.loginname}</Text>
                      </View>
                    </View>
                }
                {
                    (type == '1' || type == '2') &&
                   <View className='info-message'>
                      <View className='info-label'>
                        <Text>最后参与时间：</Text>
                        <Text className='label-text'>{getDateDiff(info.last_reply_at)}</Text>
                      </View>
                      <View className='info-username'>
                        <Text>{info.author.loginname}</Text>
                      </View>
                    </View>
                }

            </View>
        )
    }
}