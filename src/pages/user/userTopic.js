import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TopicList from '../../components/topicList'
import Empty from '../../components/empty'
import service from '../../utils/service'

import './userInfo.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '话题'
  }

  constructor () {
    super(...arguments)
    this.state = {
      type: 0,
      creatTopic: [],
      joinTopic: [],
      collectTopic: [],
    }
  }

  componentDidMount () {
    Taro.showLoading({title: '加载中...'})
    const type= this.$router.params.type
    this.setState({
      type: type
    })
    if(type==3){
      this.getCollectTopic()
    }else{
      this.getUserInfo()
    }

  }

  getUserInfo(){
    let that = this
    const url = 'user/'+this.$router.params.loginname
    service.get(url,'').then((result) => {
      that.setState({
        creatTopic: result.data.data.recent_topics,
        joinTopic: result.data.data.recent_replies
      })
      Taro.hideLoading()
    })
  }

  getCollectTopic(){
    let that = this
    const url = 'topic_collect/'+this.$router.params.loginname
    service.get(url,'').then((result) => {
      that.setState({
        collectTopic: result.data.data
      })
      Taro.hideLoading()
    })
  }
  render () {
    const { type,creatTopic,joinTopic,collectTopic } = this.state
    return (
      <View className='content'>
        <View className='list-content'>
          {
            type==1 && (creatTopic.length>0 ? creatTopic.map((item,index) => {
              return <TopicList key={index} info={item} type={type} />
            }) : <Empty />)
          }
          {
            type==2 && (joinTopic.length>0 ? joinTopic.map((item,index) => {
              return <TopicList key={index} info={item} type={type} />
            }) : <Empty />)
          }
          {
            type==3 && (collectTopic.length>0 ? collectTopic.map((item,index) => {
              return <TopicList key={index} info={item} type={type} />
            }) : <Empty />)
          }
        </View>
      </View>
    )
  }
}
