<template>
  <div class="xiufanghua">

    <div id="xfh">
      <!--<vue-better-scroll-->
      <!--class="xfhwrapper"-->
      <!--ref="scroll"-->
      <!--:probeType="2"-->
      <!--:scrollbar="pullupconfig.scrollbarObj"-->
      <!--:pullDownRefresh=false-->
      <!--:listenScroll=true-->
      <!--:pullUpLoad="pullupconfig.pullUpLoadObj"-->
      <!--:startY="parseInt(pullupconfig.startY)"-->
      <!--@pullingUp="onPullingUp"-->
      <!--&gt;-->
      <div class="xfhxq-back">
        <mt-swipe>
          <mt-swipe-item>
            <div class="xfhxq-img xfhxq-img1"
                 style="background-image:url('../../static/img/xiufanghua/banner1.jpg')"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="xfhxq-img xfhxq-img2"
                 style="background-image:url('../../static/img/xiufanghua/banner2.png')"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="xfhxq-img xfhxq-img3"
                 style="background-image:url('../../static/img/xiufanghua/banner3.jpg')"></div>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <div class="rukou">
        <div class="rukoudiv">
          <div class="commen">
            <div class="commenImg baomingrukou" @click="choosesaiqu">
              <p class="text">报名入口</p>
            </div>

          </div>
          <!--toupiaoOver：无投票  baomingrukou：有投票 -->
          <div class="commen" @click="baomingrukou">
            <div class="commenImg toupiaorukou"><p class="text">投票入口</p>

            </div>

          </div>
          <div class="commen">
            <div class="commenImg huojiangrukou" @click="Tuanduihuojiang">
              <p class="text">获奖团队</p>
            </div>
            <!--<div class="text">获奖团队</div>-->
          </div>
        </div>
      </div>
      <div class="dasaikuaixun">
        <img src="http://xfhwx.xiufanghua.com/social/Public/images/title.png" alt="" class="dskx-img">
        <div class="dskx-wenang">
          <p class="item1" @click="dasaiKX(index)" v-for="(item,index) in news">{{index+1}}、{{item.title}}</p>
        </div>
      </div>
      <div class="xfh-zhanwei"></div>
      <div class="xfh-nav">
        <ul class="xfh-nav-ul">
          <li @click="clickItem(item.id,index,item.type)"
              v-for="(item,index) in tabbar">
            <span :class="{ isSelected: selected == item.id }">{{item.name}}</span>
          </li>

        </ul>
      </div>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="tuanduifengcai">
          <div id="xfh3">

            <div class="commenrk">
              <div class="commenItem" v-for="(item,index) in tuanduifengcaiList " v-if="index<3">
                <router-link
                  :to="{name:'tuanduifengcaixiangqing',query:{intro: item.content,img:item.cover_img,videosrc:item.video_url,title:item.sub_title}}">
          <span>
            <div class="commenItemImg" v-lazy:background-image="item.cover_img">
              <p>{{item.title}}</p>
            </div>
                </span>
                </router-link>
              </div>

            </div>

          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="dasaikuaixun">

          <div id="xfh4">
            <div class="commenrk">
              <div class="commenItem" v-for="(item,index) in excellentTeamList ">
                <router-link
                  :to="{name:'youxiutuanduixiangqing',query:{intro: item.content,img:item.cover_img,title:item.title,sort:item.sub_title}}">
          <span>
            <div class="commenItemImg" v-lazy:background-image="item.cover_img">
              <p>{{item.title}}</p>
            </div>
                </span>
                </router-link>
              </div>

            </div>

          </div>
        </mt-tab-container-item>
      </mt-tab-container>

      <!--</vue-better-scroll>-->
    </div>


    <div class="xfh-action-back" @touchmove.prevent @click="ActinSheetShadwo($event)"
         :class="[actinsheetVisible?'xfh-action-back-show':'xfh-action-back-none']">
      <ul>

        <li class="action-sheet-li-fir"><p>请参赛团体的领队或负责人<br>按照所属区域进行报名，谢谢合作。</p></li>
        <li class="action-sheet-li-commen" @click="renshouDivision">四川彭州赛区(综合专场)</li>
        <!--<li class="action-sheet-li-commen" @click="yiYangDivision">四川绵竹赛区(综合专场)</li>-->
        <li class="action-sheet-li-commen" @click="fangshanDivision">秦皇岛赛区(综合专场)</li>
        <li class="action-sheet-li-commen" @click="penglaiDivision">京津冀赛区(综合专场)</li>
        <!--<li class="action-sheet-li-commen" @click="chengdeDivision">成都崇州赛区(综合专场)</li>-->
        <!--<li class="action-sheet-li-commen" @click="beijingDivision">北京赛区温都水城(综合场专场)</li>-->
        <li class="action-sheet-li-commen" @click="xinduDivision">天津赛区(时装模特专场)</li>
        <!--<li class="action-sheet-li-commen" @click="huaYangDivision">北京怀柔区分赛场(综合专场)</li>-->
      </ul>
      <div class="xfh-action-zhanwei"></div>
      <div class="xfh-quxiao" @click="cancelAcionsheet">取消</div>
    </div>
    <div class="actinsheet" v-show="actinsheetVisible" @click="ActinSheet($event)" @touchmove.prevent></div>

    <mt-actionsheet
      :actions="actiondata"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
  require("../../static/css/xiufanghua.css")
  import {wxConfig, share, shareUrl, tabbarChange} from "../../static/js/timeFormat";
  import {Toast} from 'mint-ui'


  export default {
    name: "xiufanghua",

    data() {
      return {
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        selected: 'tuanduifengcai',
        selectedIndex: 0,
        url: this.COMMEURL.commonUrl,
        tuanduifengcaiList: [{
          intro: "秀芳华“助老之家杯”中老年才艺大赛北京赛区（时装专场）报名队伍赛前风采展",
          img: ["http://p3chch3rg.bkt.clouddn.com/shiyunjiangnan.png"],
          name: "华美印象艺术团(北京西城区广外街道)",
          video: "http://p3chch3rg.bkt.clouddn.com/b3a33b138f9e566203605882fbd2c7f8.mp4",
          title: "华美印象艺术团 《诗韵江南》",
        },
          {
            intro: "秀芳华“助老之家杯”中老年才艺大赛北京赛区（时装专场）报名队伍赛前风采展",
            img: ["http://p5kgkqzx0.bkt.clouddn.com/gujinhanzi1.png", "http://p5kgkqzx0.bkt.clouddn.com/gujinhanzi2.png", "http://p5kgkqzx0.bkt.clouddn.com/gujinhanzi3.png", "http://p5kgkqzx0.bkt.clouddn.com/gujinhanzi4.png"],
            name: "老育工作者协会时装队（北京西城）",
            video: "http://p5kgkqzx0.bkt.clouddn.com/%E5%88%98%E5%86%9B-%E8%A5%BF%E5%9F%8E%E8%80%81%E6%95%99%E5%8D%8F%E6%97%B6%E8%A3%85%E9%98%9F-%E5%8F%A4%E4%BB%8A%E6%B1%89%E5%AD%97_x264.mp4",
            title: "西城老教协时装队 《古今汉字》",

          },
        ],
        beforeScrollTop: "",
        imgarray: [],//图片
        page: 0,//分页
        totalPage: "",//总页数
        tabbar: [
          {
            id: "tuanduifengcai",
            name: "赛前风采"
          },
          {
            id: "dasaikuaixun",
            name: "历届优秀",
          }
        ],
        count: 0,
        sheetVisible: false,
        excellentTeamList: [],
        actinsheetVisible: false,
        actiondata: [
          {
            name: '四川绵竹赛区(综合专场)',
            method: this.changpingDivision
          },
          // {
          //   name: '湖南益阳赛区(舞蹈专场)',
          //   method: this.LocationWenjiang
          // },
          // {
          //   name: '北京温都水城分赛场(综合专场)',
          //   method: this.wenjiangDivision
          // }
        ],
        news:[]

      }

    },
    watch: {
      count: {
        handler(curVal, oldVal) {
          if (curVal == 1) {
            wxConfig(this, window.location.href.split('#')[0]);
            share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this, location.href), "分享你生活的每一个精彩瞬间，让我们为你点赞",10000);

          }
        },
      },
      actinsheetVisible: {
        handler(curVal, oldVal) {
        }
      },
    },
    created() {
      tabbarChange(this.COMMEURL.linkArray, this.$route.path);
      this.kuaixun();
      // this.tpEnroll();
    },
    mounted() {

      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this.Excellentteam();
    },
    methods: {
      tpEnroll(){
        this.$axios.post('http://tp.zlzjcyw.com/xiucaiyi/tp-list').then(val=>{
          console.log(val.data)
        }).catch(err=>{})
      },//投票入口
      kuaixun(){
        let _this=this;
        this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/matchlist/').then(function (res) {
          if(res.data.code == 200){
            _this.news=res.data.data
          }else {
            Toast({
              message: "网络不稳定",
              duration: 2000,
              position: "middle"
            })
          }
        }).catch(()=>{})
      },//大赛快讯
      toupiaoOver(){
        Toast({
          message: "暂无投票活动",
          duration: 2000,
          position: "middle"
        })
      },
      getData: function () {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post("http://tp.zlzjcyw.com/api/xfh2", qs.stringify({
            page: self.page
          })).then(function (res) {
            // console.log(res);
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.success) {
              self.totalPage = res.data.page;
              resolve(res.data);
            }

          }).catch(function (e) {
            console.log("cuowu:" + e);
          })
        });
      },
      onPullingUp: function () {
        //上拉加载
        var self = this;
        this.getData().then(function (res) {
          self.tuanduifengcaiList = self.tuanduifengcaiList.concat(res.data);
          // self.page++;
          // if (self.page < self.totalPage) {
          //   self.$refs.scroll.forceUpdate(true);
          // } else {
          //   self.$refs.scroll.forceUpdate(false);
          //   $(".before-trigger span").text("暂无更多数据了");
          // }
          // self.$refs.scroll.refresh();
          // self.count++;
        }).catch(function (e) {
          console.log("文章：" + e);
        });


      },
      choosesaiqu: function () {
        if (this.COMMEURL.isMobile) {
          this.actinsheetVisible = true;
        } else {
          Toast({
            message: "您还未注册,请先注册",
            duration: 2000,
            position: "middle"
          })
        }

      },
      /**
       * 点击背景 关闭底部菜单栏
       * */
      ActinSheet: function (e) {
        e.preventDefault();

        this.actinsheetVisible = false;

      },
      /**
       * 阻止事件冒泡
       * */
      ActinSheetShadwo: function (e) {
        e.preventDefault();
        e.cancelBubble = true;
      },
      /**
       * 取消底部菜单栏
       * */
      cancelAcionsheet: function () {
        this.actinsheetVisible = false;
      },
      /**
       * 成都崇州（报名）
       */
      chengdeDivision: function () {
        location.href = "http://tp.zlzjcyw.com/baoming/chongzhou?mobile=" + this.COMMEURL.Mobile;
      },

      /**
       * 京津冀赛区（报名）
       */
      penglaiDivision: function () {
        location.href = "http://tp.zlzjcyw.com/baoming/jjy?mobile=" + this.COMMEURL.Mobile;
      },
      /**
       * 秦皇岛赛区投票）
       */
      changpingDivision(){
        location.href = "http://xfhwx.xiufanghua.com/social/index.php?s=/ucenter/newindex/baomingLogin/sign_id/31";
      },
      /**
       * 龙泉驿赛区（报名）
       */
      fangshanDivision(){
        location.href = "http://tp.zlzjcyw.com/baoming/qinhuangdao?mobile=" + this.COMMEURL.Mobile;
      },
      /**
       * 彭州赛区（报名）
       */
      renshouDivision: function () {
        location.href = "http://tp.zlzjcyw.com/baoming/pengzhou?mobile=" + this.COMMEURL.Mobile;
      },
      /**
       * 华阳赛区（报名）
       */
      huaYangDivision: function () {
        location.href = "http://tp.zlzjcyw.com/baoming/huairou?mobile=" + this.COMMEURL.Mobile;
      },
      /**
       * 绵竹（报名）
       */
      yiYangDivision(){
        location.href = "http://tp.zlzjcyw.com/baoming/mianzhu?mobile=" + this.COMMEURL.Mobile;
      },
      /**
       * 天津赛区（报名）
       */
      xinduDivision(){
        location.href = "http://tp.zlzjcyw.com/baoming/tianjin?mobile=" + this.COMMEURL.Mobile;
      },
      /**
       * 北京 6-23（投票）
       */
      wenjiangDivision: function () {
        location.href = "http://xfhwx.xiufanghua.com/social/index.php?s=/ucenter/newindex/baomingLogin/sign_id/24";
      },
      /**
       * 北京赛区-温都水城综合场（报名）
       */
      beijingDivision: function () {
        location.href = "http://tp.zlzjcyw.com/baoming/wendu?mobile=" + this.COMMEURL.Mobile;
      },

      Tuanduihuojiang: function () {
        // location.href="https://mp.weixin.qq.com/s/SO2CgsFZN6fAHLza__pbHw";
        this.$router.push({path: '/huojiangtuandui'})
      },

      clickItem: function (id, index, type) {
        this.selected = id;
        this.selectedIndex = index;
        if (index == 0) {
          this.type = "article";
          $(".shuoshuo").css("pointer-events", "auto");
        } else {
          this.type = "weibo";
          $(".shuoshuo").css("pointer-events", "none");
        }
      },
      /**
       * 优秀团队
       * @constructor
       */
      Excellentteam: function () {
        var self = this;
        //http://tp.zlzjcyw.com/api/youxiu
        this.$axios.post("http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/mienlist").then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code===200) {

            self.excellentTeamList = res.data.data.past
            self.tuanduifengcaiList = res.data.data.mien
          }

        }).catch(function (e) {
          console.log("cuowu:" + e);
        })
      },
      dasaiKX: function (index) {
        location.href=this.news[index].jump_url
      },
      baomingrukou: function () {
        this.sheetVisible = true;
      },
      // 投票
      LocationWenjiang: function () {
        //湖南益阳
        location.href = "http://xfhwx.xiufanghua.com/social/index.php?s=/ucenter/newindex/baomingLogin/sign_id/27";

      },
      compileStr: function (code) { //对字符串进行加密
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        return escape(c);
      }


    },


  }
</script>
<style>
  /*.xiufanghua .mint-actionsheet-list > .mint-actionsheet-listitem:nth-child(1) {*/
  /*color: #f5746f;*/
  /*}*/

</style>
