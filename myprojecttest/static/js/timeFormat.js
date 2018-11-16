export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

function getFaceTag(message) {
  let re = /\[([\u4e00-\u9fa5\w]+)\]/g;
  let r = [];
  let m;
  while (m = re.exec(message)) {
    r.push({value: m[0]});
  }
  return r;
}

export function EmojArray() {

  const emojArray = [{
    "phrase": "[龇牙]",
    "url": "../../static/img/emoj/0.png",
  }, {
    "phrase": "[调皮]",
    "url": "../../static/img/emoj/1.png",
  }, {
    "phrase": "[流汗]",
    "url": "../../static/img/emoj/2.png",
  }, {
    "phrase": "[偷笑]",
    "url": "../../static/img/emoj/3.png",
  }, {
    "phrase": "[再见]",
    "url": "../../static/img/emoj/4.png",
  }, {
    "phrase": "[敲打]",
    "url": "../../static/img/emoj/5.png",
  }, {
    "phrase": "[擦汗]",
    "url": "../../static/img/emoj/6.png",
  }, {
    "phrase": "[猪头]",
    "url": "../../static/img/emoj/7.png",
  }, {
    "phrase": "[玫瑰]",
    "url": "../../static/img/emoj/8.png",
  }, {
    "phrase": "[流泪]",
    "url": "../../static/img/emoj/9.png",
  }, {
    "phrase": "[大哭]",
    "url": "../../static/img/emoj/10.png",
  }, {
    "phrase": "[嘘]",
    "url": "../../static/img/emoj/11.png",
  }, {
    "phrase": "[酷]",
    "url": "../../static/img/emoj/12.png",
  }, {
    "phrase": "[抓狂]",
    "url": "../../static/img/emoj/13.png",
  }, {
    "phrase": "[委屈]",
    "url": "../../static/img/emoj/14.png",
  }, {
    "phrase": "[微笑]",
    "url": "../../static/img/emoj/15.png",
  }, {
    "phrase": "[炸弹]",
    "url": "../../static/img/emoj/16.png",
  }, {
    "phrase": "[菜刀]",
    "url": "../../static/img/emoj/17.png",
  }, {
    "phrase": "[可爱]",
    "url": "../../static/img/emoj/18.png",
  }, {
    "phrase": "[色]",
    "url": "../../static/img/emoj/19.png",
  }, {
    "phrase": "[害羞]",
    "url": "../../static/img/emoj/20.png",
  }, {
    "phrase": "[得意]",
    "url": "../../static/img/emoj/21.png",
  }, {
    "phrase": "[吐]",
    "url": "../../static/img/emoj/22.png",
  }, {
    "phrase": "[便便]",
    "url": "../../static/img/emoj/23.png",
  }, {
    "phrase": "[怒]",
    "url": "../../static/img/emoj/24.png",
  }, {
    "phrase": "[尴尬]",
    "url": "../../static/img/emoj/25.png",
  }, {
    "phrase": "[惊恐]",
    "url": "../../static/img/emoj/26.png",
  }, {
    "phrase": "[冷汗]",
    "url": "../../static/img/emoj/27.png",
  }, {
    "phrase": "[爱心]",
    "url": "../../static/img/emoj/28.png",
  }, {
    "phrase": "[示爱]",
    "url": "../../static/img/emoj/29.png",
  }, {
    "phrase": "[白眼]",
    "url": "../../static/img/emoj/30.png",
  }, {
    "phrase": "[傲慢]",
    "url": "../../static/img/emoj/31.png",
  }, {
    "phrase": "[难过]",
    "url": "../../static/img/emoj/32.png",
  }, {
    "phrase": "[惊讶]",
    "url": "../../static/img/emoj/33.png",
  }, {
    "phrase": "[疑问]",
    "url": "../../static/img/emoj/34.png",
  }, {
    "phrase": "[困]",
    "url": "../../static/img/emoj/35.png",
  }, {
    "phrase": "[么么哒]",
    "url": "../../static/img/emoj/36.png",
  }, {
    "phrase": "[憨笑]",
    "url": "../../static/img/emoj/37.png",
  }, {
    "phrase": "[爱情]",
    "url": "../../static/img/emoj/38.png",
  }, {
    "phrase": "[衰]",
    "url": "../../static/img/emoj/39.png",

  }, {
    "phrase": "[撇嘴]",
    "url": "../../static/img/emoj/40.png",
  }, {
    "phrase": "[阴险]",
    "url": "../../static/img/emoj/41.png",
  }, {
    "phrase": "[奋斗]",
    "url": "../../static/img/emoj/42.png",
  }, {
    "phrase": "[发呆]",
    "url": "../../static/img/emoj/43.png",
  }, {
    "phrase": "[右哼哼]",
    "url": "../../static/img/emoj/44.png",
  }, {
    "phrase": "[抱抱]",
    "url": "../../static/img/emoj/45.png",
  }, {
    "phrase": "[坏笑]",
    "url": "../../static/img/emoj/46.png",
  }, {
    "phrase": "[飞吻]",
    "url": "../../static/img/emoj/47.png",
  }, {
    "phrase": "[鄙视]",
    "url": "../../static/img/emoj/48.png",
  }, {
    "phrase": "[晕]",
    "url": "../../static/img/emoj/49.png",
  }, {
    "phrase": "[大兵]",
    "url": "../../static/img/emoj/50.png",
  }, {
    "phrase": "[可怜]",
    "url": "../../static/img/emoj/51.png",
  }, {
    "phrase": "[强]",
    "url": "../../static/img/emoj/52.png",
  }, {
    "phrase": "[弱]",
    "url": "../../static/img/emoj/53.png",
  }, {
    "phrase": "[握手]",
    "url": "../../static/img/emoj/54.png",
  }, {
    "phrase": "[胜利]",
    "url": "../../static/img/emoj/55.png",
  }, {
    "phrase": "[抱拳]",
    "url": "../../static/img/emoj/56.png",
  }, {
    "phrase": "[凋谢]",
    "url": "../../static/img/emoj/57.png",
  }, {
    "phrase": "[米饭]",
    "url": "../../static/img/emoj/58.png",
  }, {
    "phrase": "[蛋糕]",
    "url": "../../static/img/emoj/59.png",
  }, {
    "phrase": "[西瓜]",
    "url": "../../static/img/emoj/60.png",
  }, {
    "phrase": "[啤酒]",
    "url": "../../static/img/emoj/61.png",
  }, {
    "phrase": "[瓢虫]",
    "url": "../../static/img/emoj/62.png",
  }, {
    "phrase": "[勾引]",
    "url": "../../static/img/emoj/63.png",
  }, {
    "phrase": "[ok]",
    "url": "../../static/img/emoj/64.png",
  }, {
    "phrase": "[爱你]",
    "url": "../../static/img/emoj/65.png",
  }, {
    "phrase": "[咖啡]",
    "url": "../../static/img/emoj/66.png",
  }, {
    "phrase": "[月亮]",
    "url": "../../static/img/emoj/67.png",
  }, {
    "phrase": "[刀]",
    "url": "../../static/img/emoj/68.png",
  }, {
    "phrase": "[发抖]",
    "url": "../../static/img/emoj/69.png",
  }, {
    "phrase": "[差劲]",
    "url": "../../static/img/emoj/70.png",
  }, {
    "phrase": "[拳头]",
    "url": "../../static/img/emoj/71.png",
  }, {
    "phrase": "[心碎了]",
    "url": "../../static/img/emoj/72.png",
  }, {
    "phrase": "[太阳]",
    "url": "../../static/img/emoj/73.png",
  }, {
    "phrase": "[礼物]",
    "url": "../../static/img/emoj/74.png",
  }, {
    "phrase": "[皮球]",
    "url": "../../static/img/emoj/75.png",
  }, {
    "phrase": "[骷髅]",
    "url": "../../static/img/emoj/76.png",
  }, {
    "phrase": "[挥手]",
    "url": "../../static/img/emoj/77.png",
  }, {
    "phrase": "[闪电]",
    "url": "../../static/img/emoj/78.png",
  }, {
    "phrase": "[饥饿]",
    "url": "../../static/img/emoj/79.png",
  }, {
    "phrase": "[闭嘴]",
    "url": "../../static/img/emoj/80.png",
  }, {
    "phrase": "[咒骂]",
    "url": "../../static/img/emoj/81.png",
  }, {
    "phrase": "[折磨]",
    "url": "../../static/img/emoj/82.png",
  }, {
    "phrase": "[抠鼻]",
    "url": "../../static/img/emoj/83.png",
  }, {
    "phrase": "[鼓掌]",
    "url": "../../static/img/emoj/84.png",
  }, {
    "phrase": "[糗大了]",
    "url": "../../static/img/emoj/85.png",
  }, {
    "phrase": "[左哼哼]",
    "url": "../../static/img/emoj/86.png",
  }, {
    "phrase": "[打哈欠]",
    "url": "../../static/img/emoj/87.png",
  }, {
    "phrase": "[快哭了]",
    "url": "../../static/img/emoj/88.png",
  }, {
    "phrase": "[吓]",
    "url": "../../static/img/emoj/89.png",
  }, {
    "phrase": "[篮球]",
    "url": "../../static/img/emoj/90.png",
  }, {
    "phrase": "[乒乓]",
    "url": "../../static/img/emoj/91.png",
  }, {
    "phrase": "[NO]",
    "url": "../../static/img/emoj/92.png",
  }, {
    "phrase": "[跳跳]",
    "url": "../../static/img/emoj/93.png",
  }, {
    "phrase": "[怄火]",
    "url": "../../static/img/emoj/94.png",
  }, {
    "phrase": "[转圈]",
    "url": "../../static/img/emoj/95.png",
  }, {
    "phrase": "[磕头]",
    "url": "../../static/img/emoj/96.png",
  }, {
    "phrase": "[回头]",
    "url": "../../static/img/emoj/97.png",
  }, {
    "phrase": "[跳绳]",
    "url": "../../static/img/emoj/98.png",
  }, {
    "phrase": "[激动]",
    "url": "../../static/img/emoj/99.png",
  }, {
    "phrase": "[街舞]",
    "url": "../../static/img/emoj/100.png",
  }, {
    "phrase": "[献吻]",
    "url": "../../static/img/emoj/101.png",
  }, {
    "phrase": "[左太极]",
    "url": "../../static/img/emoj/102.png",
  }, {
    "phrase": "[右太极]",
    "url": "../../static/img/emoj/103.png",
  }, {
    "phrase": "[手枪]",
    "url": "../../static/img/emoj/104.png",
  }, {
    "phrase": "[飞机]",
    "url": "../../static/img/emoj/105.png",
  }, {
    "phrase": "[猫咪]",
    "url": "../../static/img/emoj/106.png",
  }, {
    "phrase": "[红双喜]",
    "url": "../../static/img/emoj/107.png",
  }, {
    "phrase": "[鞭炮]",
    "url": "../../static/img/emoj/108.png",
  }, {
    "phrase": "[红灯笼]",
    "url": "../../static/img/emoj/109.png",
  }, {
    "phrase": "[麻将]",
    "url": "../../static/img/emoj/110.png",
  }, {
    "phrase": "[麦克风]",
    "url": "../../static/img/emoj/111.png",
  }, {
    "phrase": "[礼品袋]",
    "url": "../../static/img/emoj/112.png",
  }, {
    "phrase": "[信封]",
    "url": "../../static/img/emoj/113.png",
  }, {
    "phrase": "[香蕉]",
    "url": "../../static/img/emoj/114.png",
  }, {
    "phrase": "[彩带]",
    "url": "../../static/img/emoj/115.png",
  }, {
    "phrase": "[蜡烛]",
    "url": "../../static/img/emoj/116.png",
  }, {
    "phrase": "[爆筋]",
    "url": "../../static/img/emoj/117.png",
  }, {
    "phrase": "[奶瓶]",
    "url": "../../static/img/emoj/118.png",
  }, {
    "phrase": "[面条]",
    "url": "../../static/img/emoj/119.png",
  }];
  return emojArray;
}

export function changeEmoj(commentContent) {
  var str = commentContent;
  var faceTag = getFaceTag(str);
// console.log(faceTag.length);
  if (faceTag.length > 0) {
    for (var m = 0, len = EmojArray().length; m < len; m++) {
      if (str.indexOf(EmojArray()[m].phrase) > -1) {
        // console.log(str);
        str = str.replace(new RegExp('\\' + EmojArray()[m].phrase.split("]")[0] + '\\]', 'g'), "<img src=" + EmojArray()[m].url + " >");
      }
    }
  }

  return str;
}

/**
 * 标签转换
 * @param json 服务器返回数据
 * @returns {Array} 解析为数组
 */
export function tagChange(json) {
  var data = [];
  for (var key in json) {
    if (json[key] == null || json[key] == undefined || json[key] == "") {

    } else {
      // console.log(json[key]);
      data.push(json[key]);
    }
  }
  return data;
}

/**
 * 导航栏切换
 * @param arr 导航栏数据
 * @param path 当前路由路径
 */
export function tabbarChange(arr, path) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i].path == path) {
      arr[i].select = true;
    } else {
      arr[i].select = false;
    }


  }


}

/**
 *判断是否有新消息
 * @param key this关键字
 */
export function isNewmessage(key) {
  key.$axios.post(key.COMMEURL.commonUrl + "/index.php?s=/ucenter/newindex/index").then(function (res) {
    if (res.data.code == 200) {
      if (parseInt(res.data.data.user.is_message) == 0) {
        key.COMMEURL.isNewMessage = false;
      } else {
        key.COMMEURL.isNewMessage = true;
      }

    }
  });
}

/**
 * 获取微信权限
 * @param key this 关键字
 * @param url 当前页面链接
 */
let that;
export function wxConfig(key, url) {
  that=key;
  key.$axios.post(key.COMMEURL.commonUrl + "/index.php/ucenter/newindex/share", qs.stringify({
    url: url
  })).then(function (res) {
    if (res.data.code == 200) {
      wx.config({
        debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.data.appId, //必填，公众号的唯一标识
        timestamp: res.data.data.timestamp.toString(), // 必填，生成签名的时间戳
        nonceStr: res.data.data.nonceStr, //必填，生成签名的随机串
        signature: res.data.data.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','onMenuShareQZone', 'uploadImage', 'downloadImage', 'chooseImage','getLocalImgData', 'previewImage'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
      });
    }

  });

}

/**
 * 微信分享
 * @param title 标题
 * @param src 分享图标
 * @param link 分享链接
 * @param desc 分享语描述
 */
export function share(title, src, link, desc,check1) {
  wx.ready(function () {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      imgUrl: src, // 分享图标
      link: link,
      success: function () {
        if(check1===0){
          that.shareSign();
        }else if(check1===1){
          that.articleShare()
        }else {

        }
      },
      cancel: function (res) {
        console.log("分享取消");
      }
    });

    //分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      imgUrl: src, // 分享图标
      link: link,
      desc: desc,
      success: function () {
        if(check1===0){
          that.shareSign();
        }else if(check1===1){
          that.articleShare()
        }else {

        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
    //分享QQ
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: src, // 分享图标
      success: function () {
        if(check1===0){
          that.shareSign();
        }else if(check1===1){
          that.articleShare()
        }else {

        }
      },
      cancel: function () {
      }
    });
    //分享QQ空间
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: src, // 分享图标
      success: function () {
        if(check1===0){
          that.shareSign();
        }else if(check1===1){
          that.articleShare()
        }else {

        }
      },
      cancel: function () {
      }
    });
  });
  wx.error(function (res) {
    console.log(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
  });
}

/**
 * 获取分享链接
 * @param key this关键字
 * @param href 当前路由地址
 */
export function shareUrl(key, href) {
  console.log("href:" + href);
  key.$axios.get(key.COMMEURL.commonUrl + "/index.php/ucenter/newindex/up_share", qs.stringify({
    url: href.split("#")[0],
    newUrl: href.split("#")[1]
  })).then(function (res) {

  });
}

export function changeImgUrl(json) {
  var urlArray = [];

  for (var i in json) {
    if (i.indexOf("url") > -1) {
      if (json[i] == null || json[i] == '') {
      } else {
        urlArray.push(json[i])
      }
    }
  }

  return urlArray;
}

export function changeImgUrl1(json) {
  var urlArray = [];
  console.log(json);
  for (var i in json) {
    if (i.indexOf("url") > -1 && i.indexOf('urlsize1') == -1) {
      if (json[i] == null || json[i] == '') {
      } else {
        urlArray.push(json[i])
      }
    }
  }
  return urlArray;
}

// 等级划分
export function gradation(score) {
  var grade = "";
  if (score >= 0 && score <= 400) {
    grade = "学前班(小)"
  } else if (score > 400 && score <= 800) {
    grade = "学前班(中)"
  } else if (score > 800 && score <= 1200) {
    grade = "学前班(大)"
  } else if (score > 1200 && score <= 1800) {
    grade = "小学(一年级)"
  } else if (score > 1800 && score <= 2400) {
    grade = "小学(二年级)"
  } else if (score > 2400 && score <= 3000) {
    grade = "小学(三年级)"
  } else if (score > 3000 && score <= 3600) {
    grade = "小学(四年级)"
  } else if (score > 3600 && score <= 4200) {
    grade = "小学(五年级)"
  } else if (score > 4200 && score <= 4800) {
    grade = "小学(六年级)"
  } else if (score > 4800 && score <= 5600) {
    grade = "初中(一年级)"
  } else if (score > 5600 && score <= 6400) {
    grade = "初中(二年级)"
  } else if (score > 6400 && score <= 7200) {
    grade = "初中(三年级)"
  } else if (score > 7200 && score <= 8800) {
    grade = "高中(一年级)"
  } else if (score > 8800 && score <= 10400) {
    grade = "高中(二年级)"
  } else if (score > 10400 && score <= 12000) {
    grade = "高中(三年级)"
  } else if (score > 12000 && score <= 15200) {
    grade = "大学(一年级)"
  } else if (score > 15200 && score <= 18400) {
    grade = "大学(二年级)"
  }else if(score > 18400 && score <= 21600){
    grade = "大学(三年级)"
  }else if (score > 21600 && score <= 24800) {
    grade = "大学(四年级)"
  } else if (score > 24800 && score <= 31200) {
    grade = "硕士(一年级)"
  } else if (score > 31200 && score <= 37600) {
    grade = "硕士(二年级)"
  }else if(score > 37600 && score <= 44000) {
    grade = "硕士(三年级)"
  }else if (score > 44000 && score <= 56800) {
    grade = "博士(一年级)"
  } else if (score > 56800 && score <= 69600) {
    grade = "博士(二年级)"
  } else if (score > 69600 && score <= 82400) {
    grade = "博士(三年级)"
  }else if(score > 82400 && score <= 95200){
    grade = "博士(四年级)"
  }else if(score > 95200 && score <= 108000){
    grade = "博士(五年级)"
  }else {
    grade = "博士后"
  }
  return grade;
}







