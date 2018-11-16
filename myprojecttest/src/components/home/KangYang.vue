<template>
  <div id="kangyang">
    <!--顶部的图-->
    <div class="head-img" :style="'backgroundImage: url('+banner+')'"></div>
    <!--基地列表-->
    <div class="place">
      <ul>
        <li v-for="(item,index) in imgs">
          <div  v-lazy:background-image="item.img"  @click="open(index)"></div>
          <!--:style="'backgroundImage: url('+item.img+')'""-->
        </li>
      </ul>
    </div>
    <!--弹框背景-->
    <div class="model" @touchmove.prevent v-show="model"></div>
    <!--弹框详情-->
    <div class="jidi active">
      <div class="shadow-head">
        <img :src="modelImg" alt="">
      </div>
      <span @click="close" style="background-image: url('../../../static/img/home/cancle.png')"></span>
      <div class="title">
        <div></div>
        <p>{{title}}</p>
      </div>
      <ul class="content">
        <li v-for="item in jidi">
          <div class="jidi-img" v-lazy:background-image="item.img"></div>
          <!--:style="'backgroundImage: url('+item.img+')'"-->
          <div class="jidi-detail">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  require('../../../static/css/index.css');
  export default {
    data() {
      return {
        banner: 'http://p5kgkqzx0.bkt.clouddn.com/Frp1EdmZampToVtAZ9kmu1hSMWfR',
        model: false,
        title:'',
        modelImg:'../../../static/img/home/cd-head.png',
        imgs: [
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/FpyotKg_IbRRwfdMUPNALtYsFPx-',
            headImg:'../../../static/img/home/cd-head.png',
            title: '【成都】和谐之家·阳光养老公寓',
            intro: [
              {
                img: '../../../static/img/home/cd1.png',
                title: '【基本简介】',
                content: '基地位于四川省成都市天回镇银杏园社区4组，由9栋独栋别墅和1个接待中心构成。酒店式，全时旅居、医养结合模式全程精细服务。'
              },
              {
                img: '../../../static/img/home/cd2.png',
                title: '【别墅式康养享老】',
                content: '独栋别墅环境优美，温馨舒适的居住环境。内设豪华套间、标间、护理房三种户型，共计300多个床位。'
              },
              {
                img: '../../../static/img/home/cd3.png',
                title: '【多样化健康膳食】',
                content: '宽敞明亮的用餐环境，纯天然、原生态的绿色营养美味餐饮。'
              },
              {
                img: '../../../static/img/home/cd4.png',
                title: '【丰富的娱乐活动】',
                content: '篝火晚会、棋牌、唱歌、跳舞等，优雅闲适的享老时光。'
              },
              {
                img: '../../../static/img/home/cd5.png',
                title: '【充实的老年学堂】',
                content: '开展书法、美术、舞蹈、摄影灯课程，让您老有所学。'
              },
              {
                img: '../../../static/img/home/cd6.png',
                title: '【特色的健康服务】',
                content: '通过智能家庭医生与互联网结合，提供实时健康服务。'
              },
            ]
          },
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/Fju8zpCOR5dfHINpeaFjYfIlPIJS',
            headImg:'../../../static/img/home/zy-head.png',
            title: '【雅安】万森康养庄园',
            intro: [
              {
                img: '../../../static/img/home/zy1.png',
                title: '【基本简介】',
                content: '基地位于雅安市雨城区上里镇白马村3组，是一家集“康养”、“医养”、“旅养”、“农养”、“森养”等于一体的综合性专业旅居康养项目。'
              },
              {
                img: '../../../static/img/home/zy2.png',
                title: '【星级住宿标准 养生休闲度假】',
                content: '项目全部按照四星级标准设计、打造，内设标间，单间、套房等三种房型，同时会议室、禅修室、茶室、中医馆等配套服务设施完善。'
              },
              {
                img: '../../../static/img/home/zy3.png',
                title: '【特色物产丰富 康养健康膳食】',
                content: '庄园自产特色农产品，生态黑猪、天然野生蜂蜜、高山野生竹笋等，香醇，天然，无污染、绿色。'
              },
              {
                img: '../../../static/img/home/zy4.png',
                title: '【丰富文娱活动 多彩旅居生活】',
                content: '特色文娱、游学、秀场等丰富多彩服务配套，如篝火晚会、棋牌、唱歌、跳舞等。'
              },
            ]
          },
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/FuRVlSGgL5UWVeNXfa-N1E-R7lGH',
            headImg:'../../../static/img/home/sf-head.png',
            title: '【雅安】上里镇四方客栈',
            intro: [
              {
                img: '../../../static/img/home/sf1.png',
                title: '【基本简介】',
                content: '基地位于雅安市雨城区上里镇水景街31号，内部设施皆按照星级打造，设施配备齐全 休闲活动丰。'
              },
              {
                img: '../../../static/img/home/sf2.png',
                title: '【文化气息浓郁, 居住环境优雅】',
                content: '全部都是木质结构的老楼，加上墙上名家字画装点，风格典雅、古色古香，文化气息浓郁。'
              },
              {
                img: '../../../static/img/home/sf3.png',
                title: '【位置得天独厚 周边景区林立】',
                content: '位于古镇景点中心，毗邻韩家大院。而且周边多处景点林立，近处有远近闻名的古戏台、湿地公园、二仙桥等景点，远处有碧峰峡、白马泉、蒙顶山等名胜，不管您是旅游落脚，还是休闲度假，都是极好的休息中转站。'
              },
            ]
          },
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/FncMeGM0yeuiDk8ubSboJclxxEB4',
            headImg:'../../../static/img/home/ky-head.png',
            title: '【雅安】万森康养中心',
            intro: [
              {
                img: '../../../static/img/home/ky1.png',
                title: '【基本简介】',
                content: '位于四川省雅安市雨城区上里古镇车站左侧上行100米，该项目按照四星级标准打造，环境优美、风格优雅，配套设施齐备，集食宿、休闲、娱乐、会议于一体。'
              },
              {
                img: '../../../static/img/home/ky2.png',
                title: '【养老养生 度假胜地】',
                content: '气候舒适、空气清新、PM2.5常年30以下，负氧离子浓度高于城市百倍。'
              },
              {
                img: '../../../static/img/home/ky3.png',
                title: '【配套完善 停车无忧】',
                content: '适老设施齐全，通行全无障碍，同时还配备超大会议厅及停车场地，休闲办公俩不误。'
              },
              {
                img: '../../../static/img/home/ky4.png',
                title: '【娱遍天下，笑口常开】',
                content: '琴棋书画尽有，麻将舞蹈不少；联谊活动常办，每日笑口常开。'
              },
              {
                img: '../../../static/img/home/ky5.png',
                title: '【区位优越、交通便利】',
                content: '万森康养中心基地毗邻上里古镇，交通便利、出游玩耍也十分的方便。'
              },
            ]
          },
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/FldeulnSc-jxcL9EZkfvrrC0lSbZ',
            headImg:'../../../static/img/home/xc-head.png',
            title: '【西昌】邛海阳光康养基地',
            intro: [
              {
                img: '../../../static/img/home/xc1.png',
                title: '【基本简介】',
                content: '基地项目位于四川省凉山州西昌市邛海国家湿地公园六期，花园洋房！每栋洋房都有超大的露台。'
              },
              {
                img: '../../../static/img/home/xc2.png',
                title: '【基地配置】',
                content: '基地住宿都是独栋别墅，室内均按照星级酒店进行配置！每栋别墅还设有独立的厨房，不想吃团餐的朋友，可以自己或几家人包下一栋，自助康养度假！'
              },
              {
                img: '../../../static/img/home/xc3.png',
                title: '【基地地理情况】',
                content: '温度：冬暖夏凉、四季如春，常年平均气温18度。能见度：全年日照时间达300多天，常年无霜期达350天。湿度：年均湿度61%，干湿季分明，长年舒适清爽，对风湿性关节炎、气管炎等常见疾病具有显著的自然疗效。海拔高度：海拔1500米的高度，是世界公认的最适宜居住的高度。它赋予空气中负氧离子强化和激活人体生理活动的作用，久居于此，对于哮喘、支气管炎、高血压、偏头痛及冠心病等老年疾病有显著疗效。'
              },
            ]
          },
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/FsG6GoxhcIVRHADk5B4J6SCNsngc',
            headImg:'../../../static/img/home/my-head.png',
            title: '【米易】长林康养中心',
            intro: [
              {
                img: '../../../static/img/home/my1.png',
                title: '【基本简介】',
                content: '“米易长林康养中心”位于草场克朗新区，紧邻西攀高速米易收费站口。康养中心依山而建，高低错落、视野开阔；长林康养是集森林康养、休闲度假、会议培训、娱乐健身为一体综合性康养项目。'
              },
              {
                img: '../../../static/img/home/my2.png',
                title: '【餐厅完善 食品营养】',
                content: '餐厅约230平方米，可接纳500余人就餐；基地设有完善食品安全体系，由专业营养师团队根据老年人胜利特点和营养需求，搭配营养餐饮。'
              },
              {
                img: '../../../static/img/home/my3.png',
                title: '【老有所学 老有所乐】',
                content: '休闲中心地域开阔， 休闲设施齐全，健身娱乐项目有乒乓球、羽毛球、卡啦OK、棋牌等。让您老有所学，老有所乐。'
              },
              {
                img: '../../../static/img/home/my4.png',
                title: '【特色配置】',
                content: '项目星级住宿标准，房型格局多样，共计51间客房，设有标间、单间和情侣包房，空调、电视、免费wifi、独立卫生间、24小时热水等一应俱全。此外项目还配备专业大型会议场所及超大停车场， 专业会议服务量身定制打造，让您办公休闲俩不误。'
              },
            ]
          },
          {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/Fh6LkcKqY_G2MFGXdSnsonSbGdSR',
            headImg:'../../../static/img/home/em-head.png',
            title: '【峨眉山】康养基地',
            intro: [
              {
                img: '../../../static/img/home/em1.png',
                title: '【峨眉山简介】',
                content: '峨眉山头位于中国四川省乐山市峨眉山市境内，是中国“四大佛教名山”之一，地势陡峭，风景秀丽，素有“峨眉天下秀”之称，山上的万佛顶最高，海拔3099米，高出峨眉平原2700多米。'
              },
              {
                img: '../../../static/img/home/em2.png',
                title: '【峨眉山特色】',
                content: '峨眉山还是多种稀有动物的栖居地，动物种类达2300多种。山路沿途有较多猴群，常结队向游人讨食，为该山一大特色。峨眉山宗教文化特别是佛教文化构成了峨眉山历史文化的主体，所有的建筑、造像、法器以及礼仪、音乐、绘画等都展示出宗教文化的浓郁气息。山上多古迹、寺庙，有报国寺、伏虎寺、洗象池、龙门洞、舍身崖、峨眉佛光等胜迹，是中国旅游、休养、避暑目的地之一。'
              },
            ]
          }, {
            img: 'http://p5kgkqzx0.bkt.clouddn.com/Fgh2rHEugvB2Ql7-m9J6oKpC3Vyo',
            headImg:'../../../static/img/home/djy-head.png',
            title: '【都江堰】康养基地',
            intro: [
              {
                img: '../../../static/img/home/djy1.png',
                title: '【基本简介】',
                content: '都江堰基地坐落在世界文化遗产都江堰市石孟江边，花木城内，项目占地面积15000平方米，绿地面积9200平方米，气候宜人、景色优美、上水环绕、星级酒店标准、配套设施完善，旅游资源丰富，是一家集餐饮、住宿、商务、会议为一体的江南园林式主题康养度假基地。'
              },
              {
                img: '../../../static/img/home/djy2.png',
                title: '【基地特色】',
                content: '江南园林建筑一步一景；厅堂随宜安排宛转其间；星级住宿标准温馨舒适配套设施完善休闲无忧；品质高端服务周到细微；多彩文娱活动应有尽有。'
              },
            ]
          },
        ],
        jidi: []
      }
    },
    mounted() {
    },
    methods: {
      open(index) {
        this.model = true;
        this.jidi = this.imgs[index].intro;
        this.modelImg=this.imgs[index].headImg;
        this.title=this.imgs[index].title;
        document.querySelector('.jidi').className = 'jidi';
        document.querySelector('body').style.overflow='hidden';
        // setTimeout(()=>{
        //   window.scroll(0, scroll);
        // },20)
      },
      close() {
        this.model = false
        document.querySelector('.jidi').className = 'active jidi'
        document.querySelector('body').style.overflow='auto'
      }
    },
    beforeRouteLeave(to,from,next){
      document.querySelector('body').style.overflow='auto'
      next()
    }
  }
</script>

<style></style>
