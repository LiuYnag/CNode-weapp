import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { AtFab,AtDrawer,AtIcon,AtAvatar,AtButton,AtTabs, AtTabsPane  } from 'taro-ui'
import TopicList from '../../components/topicList'
import service from '../../utils/service'
import { isLogin } from '../../utils/utils'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    this.state = {
      show: false,
      topicList: [],
      topicAskList: [],
      topicShareList: [],
      topicJobList: [],
      topicGoodList: [],
      userInfo: {},
      isLogin: false,
      current: 0,
      messageCount: 0,
    }
  }

  componentDidMount () {
    Taro.showLoading({title: '加载中...'})
    this.getTopicList(0)
    this.setState({
      userInfo: Taro.getStorageSync('userInfo')
    })
  }

  componentDidShow() {
    this.setState({
      isLogin: isLogin()
    })
  }

  onReachBottom(){
    Taro.showLoading({title: '加载中...'})
    this.getTopicList(this.state.current)
  }

  getMessageCount(){
    const token = Taro.getStorageSync('Authorization')
    if(token){
      service.get('message/count',{accesstoken: token}).then((result) => {
        this.setState({
          messageCount: result.data.data
        })
      })
    }
  }

  getTopicList(index,type){
    if(type=='changeTab'){
      return
    }
    let that = this
    const param = {
      page : 1,
      limit : 10,
      tab: ''
    }
    switch(index){
      case 0: param.tab=''
              param.page=this.state.topicList.length+1
              break
      case 1: param.tab='good'
              param.page=this.state.topicGoodList.length+1
              break
      case 2: param.tab='share'
              param.page=this.state.topicShareList.length+1
              break
      case 3: param.tab='ask'
              param.page=this.state.topicAskList.length+1
              break
      case 4: param.tab='job'
              param.page=this.state.topicJobList.length+1
              break
      default: ''
    }
    service.get('topics',param).then((result) => {
        if(index==0){
          that.setState({topicList: that.state.topicList.concat(result.data.data)})
        } else if(index==1){
          that.setState({topicGoodList: that.state.topicGoodList.concat(result.data.data)})
        } else if(index==2){
          that.setState({topicShareList: that.state.topicShareList.concat(result.data.data)})
        } else if(index==3){
          that.setState({topicAskList: that.state.topicAskList.concat(result.data.data)})
        } else if(index==4){
          that.setState({topicJobList: that.state.topicJobList.concat(result.data.data)})
        }
        Taro.hideLoading()
    })
  }
  toPage(page){
    Taro.navigateTo({
      url: '/pages/'+page
    })
  }
  showMenu(){
    this.setState({
      show: true
    })
  }
  hideMenu(){
    this.setState({
      show: false
    })
  }
  signOut(){
    Taro.setStorageSync('Authorization', '')
    Taro.setStorageSync('userInfo', '')
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  tabClick(index){
    this.setState({
      current: index
    })
    if(
      (index==0 && this.state.topicList.length==0) ||
      (index==1 && this.state.topicGoodList.length==0) ||
      (index==2 && this.state.topicShareList.length==0) ||
      (index==3 && this.state.topicAskList.length==0) ||
      (index==4 && this.state.topicJobList.length==0)
      ){
      Taro.showLoading({title: '加载中...'})
      this.getTopicList(index,'')
    }
  }

  render () {
    const { topicList,topicGoodList,topicShareList,topicAskList,topicJobList,userInfo,current,messageCount } = this.state
    const tabList = [{ title: '全部' }, { title: '精华' }, { title: '分享' }, { title: '问答' }, { title: '招聘' }]
    return (
      <View className='content'>
        <AtTabs current={current} tabList={tabList} onClick={this.tabClick.bind(this)}>
          <AtTabsPane current={current} index={0}>
            <View className='list-content'>
            {
              topicList.map((topic,top) => {
                return <TopicList key={top} info={topic} />
              })
            }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='list-content'>
            {
              topicGoodList.map((topic,top) => {
                return <TopicList key={top} info={topic} />
              })
            }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className='list-content'>
            {
              topicShareList.map((topic,top) => {
                return <TopicList key={top} info={topic} />
              })
            }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View className='list-content'>
            {
              topicAskList.map((topic,top) => {
                return <TopicList key={top} info={topic} />
              })
            }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={4}>
            <View className='list-content'>
            {
              topicJobList.map((topic,top) => {
                return <TopicList key={top} info={topic} />
              })
            }
            </View>
          </AtTabsPane>
        </AtTabs>
        <View className='fab'>
          <AtFab className='fab-content' onClick={this.showMenu.bind(this)}>
            <Text className='at-fab__icon at-icon at-icon-menu'></Text>
          </AtFab>
        </View>
        <AtDrawer
          show={this.state.show}
          mask
          onClose={this.hideMenu.bind(this)}
        >
        {
          this.state.isLogin ? (
            <View className='menu'>
              <View className='userInfo'>
                <AtAvatar circle size='large' image={userInfo.avatar_url}></AtAvatar>
                <View className='username'>
                  <Text>{userInfo.loginname}</Text>
                  <Text onClick={this.signOut.bind(this)}>注销</Text>
                </View>
              </View>
              <View className='menu-list'>
                <View className='menu-list-item' onClick={this.toPage.bind(this,'message/message')}>
                  <View>
                    <AtIcon value='bell' size='18' className='item-icon' />
                    <Text className='item-text'>信息</Text>
                  </View>
                  {
                    messageCount > 0 && <Text>{messageCount}</Text>
                  }
                </View>
                <View className='menu-list-item' onClick={this.toPage.bind(this,'user/myInfo')}>
                  <View>
                    <AtIcon prefixClass='fa' value='user-circle-o' size='18' />
                    <Text className='item-text'>我的</Text>
                  </View>
                </View>
                <View className='menu-list-item' onClick={this.toPage.bind(this,'about/about')}>
                  <View>
                    <AtIcon prefixClass='fa' value='info-circle' size='18' />
                    <Text className='item-text'>关于</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View className='menu'>
              <View className='signin'>
                <View className='logo'><Image src={require('../../assets/image/launcher.png')} /></View>
                <AtButton type='primary' onClick={this.toPage.bind(this,'login/login')}>登录</AtButton>
              </View>
            </View>
          )
        }
        </AtDrawer>
      </View>
    )
  }
}
