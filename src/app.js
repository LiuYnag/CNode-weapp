import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import 'taro-ui/dist/style/index.scss'
import './app.scss'
import './assets/icon/css/font-awesome.css'
import './custom-theme.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/index/detail',
      'pages/user/myInfo',
      'pages/user/userInfo',
      'pages/user/userTopic',
      'pages/login/login',
      'pages/message/message',
      'pages/about/about'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      onReachBottomDistance: 500
    }
    /*tabBar: {
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/image/main.png',
        selectedIconPath: './assets/image/main_select.png'
      }, {
        pagePath: 'pages/user/userInfo',
        text: '我的',
        iconPath: './assets/image/my.png',
        selectedIconPath: './assets/image/my_select.png'
      }],
      color: '#bfbfbf',
      selectedColor: '#2c2c2c',
      backgroundColor: '#f2f2f2',
      borderStyle: 'white'
    }*/
  }



  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
