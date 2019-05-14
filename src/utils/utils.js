import Taro from '@tarojs/taro'
/*获取当前页url*/
export const getCurrentPageUrl = () => {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const getDateDiff = (dateStr) => {
    const dateTimeStamp = new Date(dateStr)
    console.log('dateTimeStamp='+dateTimeStamp)
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    //let halfamonth = day * 15;
    let month = day * 30;
    let year = month * 12;
    let now = new Date().getTime();
    let diffValue = now - dateTimeStamp;
    if(diffValue < 0){return;}
    let yearC =diffValue/year;
    let monthC =diffValue/month;
    let weekC =diffValue/(7*day);
    let dayC =diffValue/day;
    let hourC =diffValue/hour;
    let minC =diffValue/minute;
    let result = ''
    if(yearC>=1){
        result="" + parseInt(yearC) + "年前";
    }
    else if(monthC>=1){
        result="" + parseInt(monthC) + "月前";
    }
    else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
    result="刚刚";
    return result;
}

export const isLogin = () => {
  return Taro.getStorageSync('Authorization').length > 0
}
