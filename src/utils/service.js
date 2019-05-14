import Taro from '@tarojs/taro'
import { baseUrl } from '../config'

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': Taro.getStorageSync('Authorization')
      },
      success(res) {
        if(res.data.success){
          return res.data.data
        }else{
          console.error('返回结果数据错误')
        }
      },
      error(e) {
        //logError('api', '请求接口出现问题', e)
        console.error('请求接口出现问题'+e)
      }
    }
    return Taro.request(option)
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}


