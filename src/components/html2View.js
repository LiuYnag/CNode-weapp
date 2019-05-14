import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import WxParse from '../utils/wxParse/wxParse'

import '../utils/wxParse/wxParse.scss'

export default class Html2View extends Component {

    constructor (props) {
        super(props)
      }
    componentDidMount() {
        WxParse.wxParse('article', 'html', this.props.content, this.$scope, 5)
    }
    componentWillReceiveProps(nextProps){
        WxParse.wxParse('article', 'html', nextProps.content, this.$scope, 5)
    }
    render() {
        return (
            <View>
                <import src='../utils/wxParse/wxParse.wxml' />
                <template is='wxParse' data='{{wxParseData:article.nodes}}' />
            </View>
        )
    }
}