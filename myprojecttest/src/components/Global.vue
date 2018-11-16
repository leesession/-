<script type="text/javascript">
  const IS_DEBUG = false //如果是测试环境就是true，如果是生产环境就是false
  const commonUrl = IS_DEBUG ? '/api' : 'http://test.zlzjcyw.com'
  // const commonUrl = IS_DEBUG ? '/api' : 'http://xfhwx.xiufanghua.com/social'
  const pullupConfig = {
    // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
    scrollbarObj: {
      fade: true
    },
    click: true,
    pullUpLoadObj: {
      threshold: -20,
      txt: {
        noMore: '没有更多数据了'
      }
    },
    startY: 0,  // 纵轴方向初始化位置
    scrollToX: 0,
    scrollToY: 0,
    scrollToTime: 700,
  };
  // console.log("gloable:"+JSON.stringify(pullupConfig.pullUpLoadObj));
  const count = 0;
  const linkArray = [
    {
      name: 'Index',
      title: '首页',
      imgUrl: require('../../static/img/home.png'),
      activeImgUrl: require("../../static/img/home-hong.png"),
      select: true,
      path: '/',
      isdian: false,
    },
    {
      name: 'guangchang',
      title: '秀生活',
      imgUrl: require('../../static/img/xiushenghuo.png'),
      activeImgUrl: require("../../static/img/xiushenghuo-hong.png"),
      select: false,
      path: '/guangchang',
      isdian: false,
    },

    {
      name: 'shouye',
      title: '秀文采',
      imgUrl: require('../../static/img/xiuwencai.png'),
      activeImgUrl: require("../../static/img/xiuwencai-hong.png"),
      select: false,
      path: '/shouye',
      isdian: false,
    },

    {
      name: 'xiufanghua',
      title: '才艺大赛',
      imgUrl: require('../../static/img/xiucaiyi.png'),
      activeImgUrl: require("../../static/img/xiucaiyi-hong.png"),
      select: false,
      path: '/xiufanghua',
      isdian: false,
    },

    {
      name: 'gerenzhongxin',
      title: "个人中心",
      imgUrl: require('../../static/img/gerenzhongxin.png'),
      activeImgUrl: require('../../static/img/gerenzhongxin-hong.png'),
      select: false,
      path: '/gerenzhongxin',
      isdian: false,
    }
  ];


  var isNewMessage = false;
  var isMobile = false;
  var Mobile = "";
  var UID = "";
  var Nickname = "";
  var Y = 0;
  var token='';
  //全局变量 记录秀风采缓存期间的状态
  var xfcdetail = {
    id: "",
  }
  var article={
    articleId:"", //文章id
    responstId:"",//文章转发id
    index:"",//列表item下标
    type:"",//转发 还是 新发布
  }
  //是否签到 + 总积分
  let sign= true;
  let signAll=0;
  let buttonTrue=true

  export default {
    sign,
    signAll,
    commonUrl,
    count,
    linkArray,
    pullupConfig,
    // emojArray,
    isNewMessage,
    isMobile,
    Mobile,
    UID,
    Nickname,
    Y,
    xfcdetail,
    article,
    token,
    buttonTrue

  }
</script>
