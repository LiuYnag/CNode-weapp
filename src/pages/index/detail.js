import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtIcon, AtTag, AtAvatar   } from 'taro-ui'
import Html2View from '../../components/html2View'
import service from '../../utils/service'
import { getDateDiff,isLogin } from '../../utils/utils'
import './detail.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '详情'
  }
  constructor () {
    super(...arguments)
    this.state = {
      detail: '',
      authorName: '',
      type: '',
      title: '',
      isCollect: false,
      current: 0,
      replyList: [],
      isLogin: false,
    }
  }
  componentDidMount () {
    Taro.showLoading({title: '加载中...'})
    this.getDetail()
  }
  componentDidShow() {
    this.setState({
      isLogin: isLogin()
    })
  }
  getDetail(){
    let that = this
    const param = {
      mdrender: 'true',
      accesstoken: Taro.getStorageSync('Authorization')
    }
    const url = 'topic/'+this.$router.params.id
    service.get(url,param).then((result) => {
      that.setState({
        detail: result.data.data.content,
        title: result.data.data.title,
        authorName: result.data.data.author.loginname,
        type: result.data.data.tab,
        isCollect: result.data.data.is_collect,
        replyList: result.data.data.replies
      })
      Taro.hideLoading()
    })
  }
  collect(opt){
    const url =  'topic_collect/'+opt
    const collect = this.state.isCollect
    const param = {
      accesstoken: Taro.getStorageSync('Authorization'),
      topic_id: this.$router.params.id
    }
    service.post(url,param).then((result) => {
      console.log(result)
      if(result.data.success){
        this.setState({
          isCollect: !collect
        })
      }
    })
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    let tagType = null
    if(this.state.type == 'good'){
      tagType = (<View>精华</View>)
    }else if(this.state.type == 'share'){
      tagType =  (<View>分享</View>)
    }else if(this.state.type == 'ask'){
      tagType =  (<View>问答</View>)
    }else if(this.state.type == 'job'){
      tagType =  (<View>招聘</View>)
    }else if(this.state.type == 'dev'){
      tagType =  (<View>测试</View>)
    }
    return (
      <View className='content'>
        {
          this.state.current == 0 &&
          <View className='artical'>
            <View className='head'>
              <Text className='title'>{this.state.title}</Text>
              <View className='head-info'>
                <View className='username'>
                  <AtTag size='small' type='primary'> {tagType} </AtTag>
                  <Text>{this.state.authorName}</Text>
                </View>
                {
                  this.state.isLogin &&
                  <View className='collect' >
                    {
                    this.state.isCollect ?
                    <View onClick={this.collect.bind(this,'de_collect')}><AtIcon value='star-2' size='20' color='#80bd01' /></View> :
                    <View onClick={this.collect.bind(this,'collect')}><AtIcon value='star' size='20' color='#aaa' /></View>
                    }
                  </View>
                }
              </View>
            </View>
            <View className='text'><Html2View content={this.state.detail}></Html2View></View>
          </View>
        }
        {
          this.state.current == 1 &&
          <View className='comment'>
            {
              this.state.replyList.map((item,index) => {
                return <View key={index} className='comment-item'>
                  <AtAvatar size='small' image={item.author.avatar_url}></AtAvatar>
                  <View className='item-content'>
                    <View>
                      <View className='username'>{item.author.loginname}</View>
                      <View className='time'>{getDateDiff(item.create_at)}</View>
                    </View>
                    <View className='text'><Html2View content={item.content}></Html2View></View>
                  </View>
                </View>
              })
            }
          </View>
        }
        <View className='tab-bar'>
          <View className={this.state.current==0 ? 'tab-item active' : 'tab-item'} onClick={this.handleClick.bind(this,0)}>
            <AtIcon value='align-center' size='16' />
            <Text className='tab-item-text'>正文</Text>
          </View>
          <View className={this.state.current==1 ? 'tab-item active' : 'tab-item'} onClick={this.handleClick.bind(this,1)}>
            <AtIcon value='message' size='16' />
            <Text className='tab-item-text'>评论</Text>
          </View>
        </View>
      </View>
    )
  }
}
