<template>
  <div class="xiufengcai">


    <div id="xfc">
      <vue-better-scroll
        class="xfcwrapper"
        ref="scroll"
        :probeType="2"
        :scrollbar="pullupconfig.scrollbarObj"
        :pullDownRefresh=false
        :listenScroll=true
        :pullUpLoad="pullupconfig.pullUpLoadObj"
        :startY="parseInt(pullupconfig.startY)"
        @pullingUp="onPullingUp"
        @scroll="scroll"
      >
        <div class="xfc-container">
          <div class="xfc-container-item" v-for="(item,index) in xfcArray">
            <div class="xfc-item"
                 v-lazy:background-image="xfcArray[index][0].url1"
                 v-if="xfcArray[index][0]" @click="clickItem(xfcArray[index][0].id,index)">
              <!--<p >{{xfcArray[index][0].brief_introduction==""?(xfcArray[index][0].user.nickname.length>6?xfcArray[index][0].user.nickname.substr(0,6)+'... ':xfcArray[index][0].user.nickname+' '):(xfcArray[index][0].brief_introduction.length>6?xfcArray[index][0].brief_introduction.substr(0,6)+'... ':xfcArray[index][0].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][0].time}}</span></p>  -->
              <p><span class="view">{{xfcArray[index][0].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][0].time}}</span></p>
            </div>
            <div class="xfc-item xfc-item2"
                 v-lazy:background-image="xfcArray[index][1].url1"
                 v-if="xfcArray[index][1]" @click="clickItem(xfcArray[index][1].id,index)">
              <!--<p >{{xfcArray[index][1].brief_introduction==""?(xfcArray[index][1].user.nickname.length>6?xfcArray[index][1].user.nickname.substr(0,6)+'... ':xfcArray[index][1].user.nickname+' '):(xfcArray[index][1].brief_introduction.length>6?xfcArray[index][1].brief_introduction.substr(0,6)+'... ':xfcArray[index][1].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][1].time}}</span></p> -->
              <p><span class="view">{{xfcArray[index][1].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][1].time}}</span></p>
            </div>
            <div class="xfc-item xfc-item3"
                 v-lazy:background-image="xfcArray[index][2].url1"
                 v-if="xfcArray[index][2]" @click="clickItem(xfcArray[index][2].id)">
              <!--<p >{{xfcArray[index][2].brief_introduction==""?(xfcArray[index][2].user.nickname.length>6?xfcArray[index][2].user.nickname.substr(0,6)+'... ':xfcArray[index][2].user.nickname+' '):(xfcArray[index][2].brief_introduction.length>6?xfcArray[index][2].brief_introduction.substr(0,6)+'... ':xfcArray[index][2].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][2].time}}</span></p>-->
              <p><span class="view">{{xfcArray[index][2].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][2].time}}</span></p>
            </div>
            <div class="xfc-item xfc-item5 xfc-item4"
                 v-lazy:background-image="xfcArray[index][3].url1"
                 v-if="xfcArray[index][3]" @click="clickItem(xfcArray[index][3].id,index)">
              <!--<p >{{xfcArray[index][3].brief_introduction==""?(xfcArray[index][3].user.nickname.length>6?xfcArray[index][3].user.nickname.substr(0,6)+'... ':xfcArray[index][3].user.nickname+' '):(xfcArray[index][3].brief_introduction.length>6?xfcArray[index][3].brief_introduction.substr(0,6)+'... ':xfcArray[index][3].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][3].time}}</span></p>-->
              <p><span class="view">{{xfcArray[index][3].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][3].time}}</span></p>
            </div>
            <div class="xfc-item xfc-item2"
                 v-lazy:background-image="xfcArray[index][4].url1"
                 v-if="xfcArray[index][4]" @click="clickItem(xfcArray[index][4].id,index)">
              <!--<p >{{xfcArray[index][4].brief_introduction==""?(xfcArray[index][4].user.nickname.length>6?xfcArray[index][4].user.nickname.substr(0,6)+'... ':xfcArray[index][4].user.nickname+' '):(xfcArray[index][4].brief_introduction.length>6?xfcArray[index][4].brief_introduction.substr(0,6)+'... ':xfcArray[index][4].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][4].time}}</span></p>  -->
              <p><span class="view">{{xfcArray[index][4].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][4].time}}</span></p>
            </div>
            <div class="xfc-item "
                 v-lazy:background-image="xfcArray[index][5].url1"
                 v-if="xfcArray[index][5]" @click="clickItem(xfcArray[index][5].id,index)">
              <!--<p >{{xfcArray[index][5].brief_introduction==""?(xfcArray[index][5].user.nickname.length>6?xfcArray[index][5].user.nickname.substr(0,6)+'... ':xfcArray[index][5].user.nickname+' '):(xfcArray[index][5].brief_introduction.length>6?xfcArray[index][5].brief_introduction.substr(0,6)+'... ':xfcArray[index][5].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][5].time}}</span></p>  -->
              <p><span class="view">{{xfcArray[index][5].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][5].time}}</span></p>
            </div>
            <div class="xfc-item xfc-item4"
                 v-lazy:background-image="xfcArray[index][6].url1"
                 v-if="xfcArray[index][6]" @click="clickItem(xfcArray[index][6].id,index)">
              <!--<p >{{xfcArray[index][6].brief_introduction==""?(xfcArray[index][6].user.nickname.length>6?xfcArray[index][6].user.nickname.substr(0,6)+'... ':xfcArray[index][6].user.nickname+' '):(xfcArray[index][6].brief_introduction.length>6?xfcArray[index][6].brief_introduction.substr(0,6)+'... ':xfcArray[index][6].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][6].time}}</span></p> -->
              <p><span class="view">{{xfcArray[index][6].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][6].time}}</span></p>
            </div>
            <div class="xfc-item xfc-item3"
                 v-lazy:background-image="xfcArray[index][7].url1"
                 v-if="xfcArray[index][7]" @click="clickItem(xfcArray[index][7].id,index)">
              <!--<p >{{xfcArray[index][7].brief_introduction==""?(xfcArray[index][7].user.nickname.length>6?xfcArray[index][7].user.nickname.substr(0,6)+'... ':xfcArray[index][7].user.nickname+' '):(xfcArray[index][7].brief_introduction.length>6?xfcArray[index][7].brief_introduction.substr(0,6)+'... ':xfcArray[index][7].brief_introduction+" ")}}-->
              <!--<span class="xfc-time">{{xfcArray[index][7].time}}</span></p>  -->
              <p><span class="view">{{xfcArray[index][7].view}}浏览</span>
                <span class="xfc-time">{{xfcArray[index][7].time}}</span></p>
            </div>


          </div>
        </div>
      </vue-better-scroll>


    </div>


    <div class="xfc-dialog" v-show="xfcdialogShow" @click="xfcshadwo($event)">
      <div class="xfc-dialog-m" @click="xfcshadwodialog($event)" :class="{'xfc-xpl-info-null':detail.comment==null}">
        <div class="xfc-dialog-div">
          <div class="xfc-infoImg " v-if="imgarray.length==3 || imgarray.length>4">
            <div class="out-img " v-for="(item,index) in imgarray" v-bind:class="{'out-img1':index<3}" v-if="index<9"
                 @click="previewImg(item,imgarray)">
              <div class="inner-img" v-lazy:background-image="item"></div>
            </div>
          </div>
          <div class="xfc-infoImg-2-picture" v-if="imgarray.length==4||imgarray.length==2">
            <div class="out-img out-img-2-picture" v-for="(item,index) in imgarray" @click="previewImg(item,imgarray)">
              <div class="inner-img" v-lazy:background-image="item"></div>
            </div>
          </div>
          <div class="xfc-infoImg-1-picture" v-if="imgarray.length<2">
            <div class="out-img out-img-1-picture" v-for="(item,index) in imgarray" @click="previewImg(item,imgarray)">
              <div class="inner-img" v-lazy:background-image="item"></div>
            </div>
          </div>


        </div>
        <p class="jianjie">{{detail.brief_introduction}}</p>
        <div class="xfc-header" @click="LocationGerenzhuye(detail.uid)">
          <img :src="detail.portrait">
          <div>
            <p>{{detail.nickname}}<img src="../../static/img/huangv.png" class="xfchuangv" v-show="detail.uid=='1'">
              <span v-show="detail.uid=='6463'">官方认证</span>
              <span v-show="detail.uid=='6864'">官方认证</span>
              <span v-show="detail.uid=='26'">官方认证</span>
            </p>
            <p>{{detail.establish_time}}</p>
          </div>
        </div>
        <div class="option-div">
          <div class="xfc-commen-option xfc-iszan">
            <div v-if="detail.fabulous_state=='false'" @click="praise($event,detail.id,detail.uid)"><img
              src="../../static/img/dianzan.png" alt=""><span>({{detail.abulous_count}})</span></div>
            <div v-else><img src="../../static/img/yidianzan.png" alt=""><span class="yidianzan">({{detail.abulous_count}})</span>
            </div>
          </div>
          <div class="xfc-commen-option xfc-commen" @click="LocationToInfo(detail.id)">
            <div><img
              src="../../static/img/pinglun.png" alt=""><span>({{detail.comment_count}})</span></div>
          </div>
        </div>
        <div class="xfc-new-commen" @click="LocationToInfo(detail.id)" v-if="detail.comment!=null">
          <div class="xpl">新评论</div>
          <div class="xfc-xpl-info" :class="{'xfc-xpl-info-null':detail.comment==null}"
               v-html="detail.comment==null?'添加评论...':changeEmoj(detail.comment.content)"></div>
        </div>
        <!--<span class="xfc-dialog-close" @click="closeDialog">-->
        <!--<img src="../../static/img/close.png" >-->
        <!--</span>-->
      </div>
    </div>
    <!--<router-link :to="{name:'fabuxiufengcai'}" style="display:inline;font-size: 0.2rem">-->
      <!--<div class="xiufengcaiedit"></div>-->
    <!--</router-link>-->

    <!--<div class="xiufengcaifreh" @click="refresh"></div>-->
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'

  require("../../static/css/xiufengcai.css")
  import {wxConfig, share, shareUrl, tabbarChange, changeEmoj} from "../../static/js/timeFormat";

  export default {
    name: "xiufengcai",
    data() {
      return {
        changeEmoj,
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        url: this.COMMEURL.commonUrl,//公共地址
        beforeScrollTop: "",
        page: 1,//分页
        totalPage: "",//总页数
        groupArray: [],//将数据分为4个一组
        loading: "",
        xfcArray: [],
        xfcdialogShow: false,//是否显示弹窗
        detail: '',//详情
        imgarray: [],//九宫格图片
        user_id: '',
        iszan: false,//是否点赞过
        count: 0,
        chooseIndex:0,
      }
    },
    watch: {
      detail: {
        handler(curVal, oldVal) {
        },
      },
      count: {
        handler(curVal, oldVal) {
          if (curVal == 1) {
            wxConfig(this, window.location.href.split('#')[0]);
            share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this, location.href), "分享你生活的每一个精彩瞬间，让我们为你点赞");

          }
        },
      }
    },
    created() {
      tabbarChange(this.COMMEURL.linkArray, this.$route.path);
    },
    mounted() {
      this.beforeScrollTop = document.body.scrollTop;
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      $(".before-trigger span").text("");
      $(".pullup-wrapper").css("pointer-events", 'auto')
      $(".xfc-container").css("pointer-events", 'auto')
      this.onPullingUp();
      this.COMMEURL.Y = 0;
      //缓存期间 评论数量 点赞数量 点赞状态  最新评论的更新  初始化为空
      sessionStorage.setItem("xfcdetail","");
    },
    activated() {
      var self = this;
      var originurl = this.$route.query.origin;
      if (originurl == "xiufengcai") {
        this.activeInit();
        this.$router.go(-1);
      }else{
        //更新点赞  评论
       this.activeDeatail();
      }
      this.$refs.scroll.scrollTo(0, self.COMMEURL.Y, 0, 'easing');
      this.$nextTick(function () {
        this.$refs.scroll.refresh();
      });
    },
    methods: {
      /**
       * 发布说说跳转回广场，刷新页面
       * */
      activeInit:function () {
        this.COMMEURL.Y=0;
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.page=1;
        this.xfcArray=[];
        this.onPullingUp();
      },

      getData: function () {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php/home/index/index", qs.stringify({
            page: self.page
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            console.log(res);
            if (res.data.code == 200) {
              self.totalPage = res.data.data.totalPage;
              resolve(res.data.data.style);
            }

          })
        });
      },
      /**
       * 滚动监听 控制回到顶部按钮出现
       * @param obj
       * @returns {boolean}
       */
      scroll: function (obj) {
        this.COMMEURL.Y = obj.y;
        var delta = obj.y - this.beforeScrollTop;
        if (delta === 0) return false;
        if (delta > 0) {
          $(".xiufengcaifreh").removeClass("shouyerefreshhup");
          $(".xiufengcaifreh").addClass("shouyerefreshdown");
        } else {
          $(".xiufengcaifreh").addClass("shouyerefreshhup");
          $(".xiufengcaifreh").removeClass("shouyerefreshdown");
        }
        this.beforeScrollTop = obj.y;
        if (parseInt(obj.y) >= 0) {
          $(".xiufengcaifreh").removeClass("shouyerefreshhup");
          $(".xiufengcaifreh").addClass("shouyerefreshdown");
          return false;
        }

      },
      onPullingUp: function () {
        //上拉加载
        var self = this;
        this.getData().then(function (res) {
          for (var i = 0, len = res.length; i < len; i += 8) {
            self.xfcArray.push(res.slice(i, i + 8));
          }
          self.page++;
          if (self.page <= self.totalPage) {
            self.$refs.scroll.forceUpdate(true);
          } else {
            self.$refs.scroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          }
          self.$refs.scroll.refresh();
          self.count++;
        }).catch(function (e) {
          console.log("文章：" + e);
        });

      },
      /**
       * 显示弹窗
       * @param id  id
       */
      clickItem: function (id,index) {
        this.xfcdialogShow = true;
        this.COMMEURL.xfcdetail.index=index;
        this.COMMEURL.xfcdetail.id=id;
        var self = this;
        this.$axios.post(self.url + "/index.php/home/index/detail", qs.stringify({
          style_id: id
        })).then(function (res) {
          // self.$loading.fullscreenLoading = false;
          // self.loading.close();
          if (res.data.code == 200) {
            self.detail = res.data.data;
            self.user_id = res.data.uid;
            if(res.data.data.comment==null){
              self.COMMEURL.xfcdetail.commentcontent="";
            }else{
              self.COMMEURL.xfcdetail.commentcontent=res.data.data.comment.content;
            }

            self.COMMEURL.xfcdetail.comment_count=res.data.data.comment_count;
            self.COMMEURL.xfcdetail.fabulous_state=res.data.data.fabulous_state;
            self.COMMEURL.xfcdetail.abulous_count=res.data.data.abulous_count;
            if (res.data.data.fabulous_state == 'false') {
              self.iszan = true;
            } else {
              self.iszan = false;
            }
            for (var i in res.data.data) {

              if (i.indexOf("url") > -1 && i.indexOf('urlsize1') == -1) {
                if (res.data.data[i] == null || res.data.data[i] == '') {

                } else {
                  self.imgarray.push(res.data.data[i]);
                }
              }
            }
            console.log(self.imgarray);
          }
        })
      },

      activeDeatail:function () {
        var self=this;
        this.$axios.post(self.url + "/index.php/home/index/detail", qs.stringify({
          style_id:self.COMMEURL.xfcdetail.id
        })).then(function (res) {
          // self.$loading.fullscreenLoading = false;
          // self.loading.close();
          if (res.data.code == 200) {
            self.detail = res.data.data;
            self.user_id = res.data.uid;
            if (res.data.data.fabulous_state == 'false') {
              self.iszan = true;
            } else {
              self.iszan = false;
            }
          }
        })
      },

      /**
       * 预览图片
       * @param item 当前链接
       * @param imgarray 图片数组
       */
      previewImg: function (item, imgarray) {
        // this.previewImgBackshow=true;
        wx.previewImage({
          current: item, // 当前显示图片的http链接
          urls: imgarray// 需要预览的图片http链接列表
        });
      },
      /**
       * 点赞
       * @param id  id
       * @param uid  用户id
       */
      praise: function (e, id, uid) {
          Toast({
            message: "秀风采已合并到秀生活，请移步到秀生活进行评论与点赞",
            duration: 2000,
            position: 'middle'
          })
        // e.preventDefault();
        // e.cancelBubble = true;
        // var self = this;
        // if (uid == this.user_id) {
        //   Toast({
        //     message: "不能给自己点赞",
        //     duration: 2000,
        //     position: 'middle'
        //   })
        // } else {
        //   if (this.iszan) {
        //     this.$axios.post(self.url + '/index.php/home/index/styleFabulous', qs.stringify({
        //       style_id: id
        //     })).then(function (res) {
        //       if (res.data.status == '1') {
        //         self.iszan = false;
        //         self.detail.fabulous_state = 'true';
        //         self.detail.abulous_count = parseInt(self.detail.abulous_count) + 1;
        //       }
        //     })
        //   } else {
        //     Toast({
        //       message: "已点赞过",
        //       duration: 2000,
        //       position: 'middle'
        //     })
        //   }
        //
        // }

      },
      LocationGerenzhuye: function (uid) {
        this.$router.push({name: 'gerenzhuye', query: {toUid: uid}});
      },
      refresh: function () {
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.page = 1;
        this.xfcArray = [];
        this.$loading.fullscreenLoading = true;
        $(".before-trigger span").text("");
        $(".pullup-wrapper").css("pointer-events", 'auto')
        $(".xfc-container").css("pointer-events", 'auto')
        this.onPullingUp();
      },
      xfcshadwo: function (e) {
        console.log(e);
        this.xfcdialogShow = false
        this.imgarray = [];
      },
      xfcshadwodialog: function (e) {
        e.preventDefault();
        e.cancelBubble = true;
      },
      /**
       * 跳转到秀风采详情页面
       * @param id
       * @constructor
       */
      // LocationDetail: function (id) {
      //
      // },
      LocationToInfo: function (id) {
        this.$router.push({path: "/xiufengcaixiangqing", query: {typeid: id}});
      }
    },

  }
</script>
<style>
  /*@import "../../../static/css/wodefabu.css";*/
</style>
