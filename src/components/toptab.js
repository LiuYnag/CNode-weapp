import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './toptab.scss'

export default class Index extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    const tabList = [{ title: '全部' }, { title: '精华' }, { title: '分享' }, { title: '问答' }, { title: '招聘' }, { title: '客户端测试' }]
    return (
        <View className='content'>
            {
              tabList.map((tab, index) => {
                return <View key={index} className='item'>
                  <View className={this.state.current === index ? 'active' : 'not-active'} onClick={this.handleClick.bind(index)}>
                      <Text>{tab.title}</Text>
                  </View>
                </View>
              })
            }
        </View>
    )
  }
}