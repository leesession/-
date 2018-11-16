import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('../components/home')), 'home')
const shouye = r => require.ensure([], () => r(require('../components/shouye')), 'shouye')
const gerenzhongxin = r => require.ensure([], () => r(require('../components/gerenzhongxin')), 'gerenzhongxin')

const guangchang = r => require.ensure([], () => r(require('../components/guangchang')), 'guangchang')
const wenzhangxiangqing = r => require.ensure([], () => r(require('../components/wenzhangxiangqing')), 'wenzhangxiangqing')
const zhuanfawenzhangxiangqing = r => require.ensure([], () => r(require('../components/zhuanfawenzhangxiangqing')), 'zhuanfawenzhangxiangqing')

const register = r => require.ensure([], () => r(require('../components/register')), 'register')

const login = r => require.ensure([], () => r(require('../components/login')), 'login')


const xiangxixinxi = r => require.ensure([], () => r(require('../components/gerenzhongxin/xiangxixinxi')), 'xiangxixinxi')

const fabuwenzhang = r => require.ensure([], () => r(require('../components/fabuwenzhang')), 'fabuwenzhang')

const haoyouliebiao = r => require.ensure([], () => r(require('../components/gerenzhongxin/haoyouliebiao')), 'haoyouliebiao')

const wodefabu = r => require.ensure([], () => r(require('../components/gerenzhongxin/wodefabu')), 'wodefabu')

const wodeshoucang = r => require.ensure([], () => r(require('../components/gerenzhongxin/wodeshoucang')), 'wodeshoucang')

const wodeqianbao = r => require.ensure([], () => r(require('../components/gerenzhongxin/wodeqianbao')), 'wodeqianbao')

const jiaoyijilu = r => require.ensure([], () => r(require('../components/gerenzhongxin/jiaoyijilu')), 'jiaoyijilu')

const yijianfankui = r => require.ensure([], () => r(require('../components/gerenzhongxin/yijianfankui')), 'yijianfankui')

const wodexiaoxi = r => require.ensure([], () => r(require('../components/gerenzhongxin/wodexiaoxi')), 'wodexiaoxi')

const gerenzhuye = r => require.ensure([], () => r(require('../components/gerenzhongxin/gerenzhuye')), 'gerenzhuye')

const haoyoutuijian = r => require.ensure([], () => r(require('../components/gerenzhongxin/haoyoutuijian')), 'haoyoutuijian')


const xiugaiyonghuming = r => require.ensure([], () => r(require('../components/gerenzhongxin/xiugaiyonghuming')), 'xiugaiyonghuming')

const fabushuoshuo = r => require.ensure([], () => r(require('../components/fabushuoshuo')), 'fabushuoshuo')

const chongzhi = r => require.ensure([], () => r(require('../components/gerenzhongxin/chongzhi')), 'chongzhi')

const faqizhifu = r => require.ensure([], () => r(require('../components/gerenzhongxin/faqizhifu')), 'faqizhifu')

const shezhizhifumima = r => require.ensure([], () => r(require('../components/gerenzhongxin/shezhizhifumima')), 'shezhizhifumima')

const xiugaizhifumima = r => require.ensure([], () => r(require('../components/gerenzhongxin/xiugaizhifumima')), 'xiugaizhifumima')
const wanshanziliao = r => require.ensure([], () => r(require('../components/gerenzhongxin/wanshanziliao')), 'wanshanziliao')
const tixian = r => require.ensure([], () => r(require('../components/gerenzhongxin/tixian')), 'tixian')
const xiufanghua = r => require.ensure([], () => r(require('../components/xiufanghua')), 'xiufanghua')
const xiufanghuaxiangqing = r => require.ensure([], () => r(require('../components/xiufanghuaxiangqing')), 'xiufanghuaxiangqing')
const youxiutuanduixiangqing = r => require.ensure([], () => r(require('../components/youxiutuanduixiangqing')), 'youxiutuanduixiangqing')
const tuanduifengcaixiangqing = r => require.ensure([], () => r(require('../components/tuanduifengcaixiangqing')), 'tuanduifengcaixiangqing')

const xitongxiaoxipinglunxiangqing = r => require.ensure([], () => r(require('../components/gerenzhongxin/xitongxiaoxipinglunxiangqing')), 'xitongxiaoxipinglunxiangqing')
const gexingqianming = r => require.ensure([], () => r(require('../components/gerenzhongxin/gexingqianming')), 'gexingqianming')
const xitongxiaoxidianzanxiangqing = r => require.ensure([], () => r(require('../components/gerenzhongxin/xitongxiaoxidianzanxiangqing')), 'xitongxiaoxidianzanxiangqing')
const xiufengcai = r => require.ensure([], () => r(require('../components/xiufengcai')), 'xiufengcai')
const fabuxiufengcai = r => require.ensure([], () => r(require('../components/fabuxiufengcai')), 'fabuxiufengcai')
const fabuxiufengcaitest = r => require.ensure([], () => r(require('../components/fabuxiufengcaitest')), 'fabuxiufengcaitest')
const xiufengcaixiangqing = r => require.ensure([], () => r(require('../components/xiufengcaixiangqing')), 'xiufengcaixiangqing')
const guangchangxiangqing = r => require.ensure([], () => r(require('../components/guangchangxiangqing')), 'guangchangxiangqing')
const shenfenrenzheng = r => require.ensure([], () => r(require('../components/gerenzhongxin/shenfenrenzheng')), 'shenfenrenzheng')
const huojiangtuandui = r => require.ensure([], () => r(require('../components/huojiangtuandui')), 'huojiangtuandui')

// 首页
const Index = r => require.ensure([], () => r(require('../components/home/Index')), 'Index')
//签到
const Sign = r => require.ensure([], () => r(require('../components/home/Sign')), 'Sign')
//签到详情
const SignDetail = r => require.ensure([], () => r(require('../components/home/SignDetail')), 'SignDetail')
//基金
const JiJin = r => require.ensure([], () => r(require('../components/home/JiJin')), 'JiJin')
//康养
const KangYang = r => require.ensure([], () => r(require('../components/home/KangYang')), 'KangYang')
//基地
const Cell = r => require.ensure([], () => r(require('../components/home/Cell')), 'Cell')
//秀头条
const XiuTouTiao = r => require.ensure([], () => r(require('../components/home/XiuTouTiao')), 'XiuTouTiao')
const TTdetail = r => require.ensure([], () => r(require('../components/home/TouTiaoDetail')), 'TouTiaoDetail');
//积分兑换
const Exchange = r => require.ensure([], () => r(require('../components/home/exchange')), 'exchange')

const newSign = r => require.ensure([], () => r(require('../components/sign/Sign')), 'newSign');
const Calendar = r => require.ensure([], () => r(require('../components/sign/Calendar')), 'Calendar');
const signRule = r => require.ensure([], () => r(require('../components/sign/Rule')), 'signRule');
const Workrank = r => require.ensure([], () => r(require('../components/sign/Workrank')), 'Workrank');
const Honor = r => require.ensure([], () => r(require('../components/sign/Honor')), 'Honor');

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/ttdetail',
      name: 'TTdetail',
      component: TTdetail,
      meta: {
        title: '秀头条详情',
      }
    },
    {
      path: '/honor',
      name: 'honor',
      component: Honor,
      meta: {
        title: '荣誉卡',
      }
    },
    {
      path: '/workrank',
      name: 'workrank',
      component: Workrank,
      meta: {
        title: '荣誉排行榜',
      }
    },
    {
      path: '/signrule',
      name: 'signRule',
      component: signRule,
      meta: {
        title: '任务规则',
        keepAlive: false
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        title: '签到记录',
        keepAlive: false
      }
    },
    {
      path: '/newsign',
      name: 'newSign',
      component: newSign,
      meta: {
        title: '任务系统',
        keepAlive: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '首页',
        keepAlive: false

      },
      children: [
        {
          path: '/guangchang',
          name: 'guangchang',
          component: guangchang,
          meta: {
            title: '秀生活',
            keepAlive: true
          },
        },

        {
          path: '/shouye',
          name: 'shouye',
          component: shouye,
          meta: {
            title: '秀文采',
            keepAlive: true
          },
        },
        {
          path: '/',
          name: 'Index',
          component: Index,
          meta: {
            title: '首页',
            KeepAlive:false
          },
        },
        {
          path: '/xiufanghua',
          name: 'xiufanghua',
          component: xiufanghua,
          meta: {
            title: '才艺大赛',
            keepAlive: true
          },
        },

        {
          path: '/gerenzhongxin',
          name: 'gerenzhongxin',
          component: gerenzhongxin,
          meta: {
            title: '个人中心',
            keepAlive: false
          },
        }
      ]
    },

    {
      path: '/sign',
      name: 'Sign',
      component: Sign,
      meta: {
        title: '签到',
        keepAlive: false
      },
    },
    {
      path: '/signdetail',
      name: 'SignDetail',
      component: SignDetail,
      meta: {
        title: '积分明细',
        keepAlive: false
      },
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange,
      meta: {
        title: '积分兑换',
        keepAlive: false
      },
    },
    {
      path: '/jijin',
      name: 'JiJin',
      component: JiJin,
      meta: {
        title: '互帮互助基金',
        keepAlive: false
      },
    },
    {
      path: '/kangyang',
      name: 'KangYang',
      component: KangYang,
      meta: {
        title: '康养基地',
        keepAlive: false
      },
    },
    {
      path: '/cell',
      name: 'Cell',
      component: Cell,
      meta: {
        title: '干细胞',
        keepAlive: false
      },
    },
    {
      path: '/topline',
      name: 'XiuTouTiao',
      component: XiuTouTiao,
      meta: {
        title: '秀头条',
        keepAlive: false
      },
    },

    {
      path: '/wenzhangxiangqing',
      name: 'wenzhangxiangqing',
      component: wenzhangxiangqing,
      meta: {
        title: '文章详情',
        keepAlive: false

      }
    },
    {
      path: '/zhuanfawenzhangxiangqing',
      name: 'zhuanfawenzhangxiangqing',
      component: zhuanfawenzhangxiangqing,
      meta: {
        title: '文章详情',
        keepAlive: false

      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录',

      },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册',

      },
    },
    {
      path: '/xiangxixinxi',
      name: 'xiangxixinxi',
      component: xiangxixinxi,
      meta: {
        title: '个人信息',
        keepAlive: false

      },
    },

    {
      path: '/fabuwenzhang',
      name: 'fabuwenzhang',
      component: fabuwenzhang,
      meta: {
        title: '发布文章',
        keepAlive: false

      },
    },
    {
      path: '/fabushuoshuo',
      name: 'fabushuoshuo',
      component: fabushuoshuo,
      meta: {
        title: '发布说说',
        keepAlive: false

      },
    },
    {
      path: '/haoyouliebiao',
      name: 'haoyouliebiao',
      component: haoyouliebiao,
      meta: {
        title: '关注列表',
        keepAlive: false

      },
    },
    {
      path: '/wodefabu',
      name: 'wodefabu',
      component: wodefabu,
      meta: {
        title: '我的文章',
        keepAlive: false

      },
    },
    {
      path: '/wodeshoucang',
      name: 'wodeshoucang',
      component: wodeshoucang,
      meta: {
        title: '我的收藏',
        keepAlive: false

      }
    },
    {
      path: '/wodeqianbao',
      name: 'wodeqianbao',
      component: wodeqianbao,
      meta: {
        title: '我的钱包',
        keepAlive: false

      }
    },
    {
      path: '/jiaoyijilu',
      name: 'jiaoyijilu',
      component: jiaoyijilu,
      meta: {
        title: '我的钱包',
        keepAlive: false

      }
    },
    {
      path: '/yijianfankui',
      name: 'yijianfankui',
      component: yijianfankui,
      meta: {
        title: '意见反馈',
        keepAlive: false

      }
    },
    {
      path: '/wodexiaoxi',
      name: 'wodexiaoxi',
      component: wodexiaoxi,
      meta: {
        title: '我的消息',
        keepAlive: false

      }
    },
    {
      path: '/gerenzhuye',
      name: 'gerenzhuye',
      component: gerenzhuye,
      meta: {
        title: '个人主页',
        keepAlive: false

      }
    },
    {
      path: '/haoyoutuijian',
      name: 'haoyoutuijian',
      component: haoyoutuijian,
      meta: {
        title: '推荐笔友',
        keepAlive: false

      }
    },
    {
      path: '/xiugaiyonghuming',
      name: 'xiugaiyonghuming',
      component: xiugaiyonghuming,
      meta: {
        title: '个人中心',
        keepAlive: false

      }
    },
    {
      path: '/chongzhi',
      name: 'chongzhi',
      component: chongzhi,
      meta: {
        title: '充值',
        keepAlive: false

      }
    },
    {
      path: '/faqizhifu',
      name: 'faqizhifu',
      component: faqizhifu,
      meta: {
        title: '支付',
        keepAlive: false

      }
    },
    {
      path: '/shezhizhifumima',
      name: 'shezhizhifumima',
      component: shezhizhifumima,
      meta: {
        title: '设置支付密码',
        keepAlive: false

      }
    },

    {
      path: '/xiugaizhifumima',
      name: 'xiugaizhifumima',
      component: xiugaizhifumima,
      meta: {
        title: '验证手机号',
        keepAlive: false

      }
    },
    {
      path: '/wanshanziliao',
      name: 'wanshanziliao',
      component: wanshanziliao,
      meta: {
        title: '完善资料',
        keepAlive: false

      }
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: tixian,
      meta: {
        title: '提现',
        keepAlive: false

      }
    },

    {
      path: '/xiufanghuaxiangqing',
      name: 'xiufanghuaxiangqing',
      component: xiufanghuaxiangqing,
      meta: {
        title: '获奖团队',
        keepAlive: false

      }
    },
    {
      path: '/youxiutuanduixiangqing',
      name: 'youxiutuanduixiangqing',
      component: youxiutuanduixiangqing,
      meta: {
        title: '优秀团队',
        keepAlive: false

      }
    },
    {
      path: '/tuanduifengcaixiangqing',
      name: 'tuanduifengcaixiangqing',
      component: tuanduifengcaixiangqing,
      meta: {
        title: '团队风采',
        keepAlive: false

      }
    },

    {
      path: '/xitongxiaoxipinglunxiangqing',
      name: 'xitongxiaoxipinglunxiangqing',
      component: xitongxiaoxipinglunxiangqing,
      meta: {
        title: '消息',
        keepAlive: false

      }
    }, {
      path: '/gexingqianming',
      name: 'gexingqianming',
      component: gexingqianming,
      meta: {
        title: '个性签名',
        keepAlive: false

      }
    }, {
      path: '/xitongxiaoxidianzanxiangqing',
      name: 'xitongxiaoxidianzanxiangqing',
      component: xitongxiaoxidianzanxiangqing,
      meta: {
        title: '系统消息',
        keepAlive: false

      }
    },
    {
      path: '/fabuxiufengcai',
      name: 'fabuxiufengcai',
      component: fabuxiufengcai,
      meta: {
        title: '发布图片',
        keepAlive: false

      }
    },
    {
      path: '/fabuxiufengcaitest',
      name: 'fabuxiufengcaitest',
      component: fabuxiufengcaitest,
      meta: {
        title: '发布图片',
        keepAlive: false

      }
    },{
      path: '/xiufengcaixiangqing',
      name: 'xiufengcaixiangqing',
      component: xiufengcaixiangqing,
      meta: {
        title: '秀风采详情',
        keepAlive: false
      }
    },

    {
      path:'/guangchangxiangqing',
      name:'guangchangxiangqing',
      component:guangchangxiangqing,
      meta:{
        title:'说说详情',
        keepAlive: false
      }
    },
    {
      path:'/shenfenrenzheng',
      name:'shenfenrenzheng',
      component:shenfenrenzheng,
      meta:{
        title:'身份认证',
        keepAlive: false
      }
    },   {
      path:'/huojiangtuandui',
      name:'huojiangtuandui',
      component:huojiangtuandui,
      meta:{
        title:'获奖团队',
        keepAlive: false
      }
    },
  ],

})

