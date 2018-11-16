<template>
  <div class="guangchang" id="guangchang">
    <!--<div class="position-box">-->
    <!--:startY="parseInt(pullupconfig.startY)"-->
    <vue-better-scroll
      class="guangchangwrapper"
      ref="scroll"
      :probeType="2"
      :scrollbar="pullupconfig.scrollbarObj"
      :pullDownRefresh=false
      :listenScroll=true
      :beforeScroll="true"
      :pullUpLoad="pullupconfig.pullUpLoadObj"
      :startY="parseFloat(pullupconfig.startY)"
      @pullingUp="onPullingUp"
      @scroll="scroll"
    >

      <div class="wddt"></div>
      <div class="scrollMsg" id="scrollMsg">
        <ul class="msg" id="msg">
          <!--<div class="zhanwei"></div>-->
          <li v-for="msg in dynamicMsgList">
            <p v-show="msg.uid">
              <router-link :to="{name:'gerenzhuye',query:{'toUid':msg.uid}}" style="display: inline">
                <span class="type">[{{msg.nickname}}]</span>
              </router-link>
              <span v-html="msg.content==''?'[图片]':changeEmoj(msg.content)"></span>
              <!--<span v-html="changeEmoj(msg.content)"></span>-->
              <img src="../../static/img/new@2x.png"
                   v-show="new Date().getTime() - parseInt(msg.create_time)*1000<86400000" class="huo">
            </p>

            <p v-show="!msg.uid">
              <span @click="LocationWodexiaoxi({name:'wodexiaoxi'},msg.type)" style="display: inline-block">
                <span class="type2">[系统消息]</span>
              </span>
              <span v-html="msg.title"></span>

              <img src="../../static/img/new@2x.png" class="huo"
                   v-show="new Date().getTime() - parseInt(msg.create_time)*1000<86400000">
            </p>

          </li>

        </ul>
        <ul id="con2">
          <li v-for="(msgitem,index) in dynamicMsgList" v-if="index<6">
            <p v-show="msgitem.uid">
              <router-link :to="{name:'gerenzhuye',query:{'toUid':msgitem.uid}}" style="display: inline">
                <span class="type">[{{msgitem.nickname}}]</span>
              </router-link>
              <span v-html="msgitem.content==''?'[图片]':changeEmoj(msgitem.content)"></span>
              <img src="../../static/img/new@2x.png"
                   v-show="new Date().getTime() - parseInt(msgitem.create_time)*1000<86400000" class="huo">
            </p>

            <p v-show="!msgitem.uid">
              <span @click="LocationWodexiaoxi({name:'wodexiaoxi'},msg.type)" style="display: inline-block">
                <span class="type2">[系统消息]</span>
              </span>
              <span v-html="msgitem.title"></span>

              <img src="../../static/img/new@2x.png" class="huo"
                   v-show="new Date().getTime() - parseInt(msgitem.create_time)*1000<86400000">
            </p>
          </li>
        </ul>

      </div>
      <div class="gc-seat">
        <div style="height: 0.1rem;background-color: #ffffff;width: 100%"></div>
      <div class="guangchangline"></div>
      <div class="guangchangdetail">
        <router-link :to="{name:'fabushuoshuo'}" class="wuhaoyoua">
          <p class="wuhaoyou">您还没有发表动态，所以空空如也。点击这里快速发布……</p>
        </router-link>
        <router-link :to="{name:'xiangxixinxi'}" v-if="isnotRegister">
          <div class="weizhuce"
               style="color: #444444;font-size: 0.15rem;width: 100%;line-height: 0.25rem;text-align: center;margin-top: 0.2rem">
            <!--请先<span style="color: #DD191D">注册</span>，才能加好友，发说说，一起嗨起来！-->
            <div class="weizhuce-div">
              <div class="weizhuce-div-item">请先<span style="color: #DD191D">注册</span></div>
              <div class="weizhuce-div-item-line"></div>
              <div class="weizhuce-div-item">才能找到，志同道合的好朋友</div>
              <div class="weizhuce-div-item-line"></div>
              <div class="weizhuce-div-item">发说说，一起嗨起来</div>
            </div>
          </div>
        </router-link>
        <div :class="'item item'+index" v-for="(dynamic,index) in dynamiclist" v-else>
          <!--<div class="item-back">-->
          <div class="info">
            <!--第一排-->
            <span style="display: inherit"
                  @click="preventRouterlink(isnotRegister,{name:'gerenzhuye',query:{toUid:dynamic.uid}})">
              <div class="infoMsg">
                <div class="infoMsg-left">
                   <img :src=dynamic.portrait class="guangchangheader">
                  <img src="../../static/img/V@2x.png" class="gcdav" v-show="parseInt(dynamic.uid)==50">
                <img src="../../static/img/jinv.png" class="gcdav" v-show="dynamic.user_type=='1'">
                </div>

                <div class="infoMsg-info">
                  <p class="name">{{dynamic.nickname}}
                    <img src="../../static/img/huangv.png" class="huangv" v-show="dynamic.uid=='1'">
                    <span v-show="dynamic.uid=='6463'">官方认证</span>
                    <span v-show="dynamic.uid=='6864'">官方认证</span>
                    <span v-show="dynamic.uid=='26'">官方认证</span>
                  </p>
                  <p class="time">{{dynamic.create_time}}</p>
                </div>
              </div>
            </span>
            <!--文章具体内容-->
            <div class="content" v-html="changeEmoj(dynamic.content)"></div>
            <!--图片列表-->
            <!--<div class="gaungchangImgg">-->
              <!--<div class="out-img" v-if="dynamic.image!=''&&dynamic.image!=null">-->
                <!--<div class="inner-img" v-lazy:background-image="dynamic.image"-->
                     <!--@click="previewImgUrl($event)" :value="dynamic.image"></div>-->
              <!--</div>-->
              <!--<div class="out-img" v-if="dynamic.image2!=''&&dynamic.image2!=null">-->
                <!--<div class="inner-img" v-lazy:background-image="dynamic.image2" :value="dynamic.image2"-->
                     <!--@click="previewImgUrl($event)"></div>-->
              <!--</div>-->
            <!--</div>-->
            <!--图片列表-->
            <div class="gaungchangImgg" v-if="dynamic.images.length<3">
              <!--无图-->
              <!--<div class="out-img" v-if="dynamic.images.length===0" v-for="item in dynamic.images"></div>-->
              <!--图一-->
              <div class="out-img" v-if="dynamic.images.length===1 && dynamic.images[0] !== ''" v-for="item in dynamic.images">
                <div class="inner-img" v-lazy:background-image="item"
                     @click="previewImgUrl($event)" :value="item">
                </div>
              </div>
              <!--图二-->
              <div class="out-img2" v-if="dynamic.images.length===2 " v-for="item in dynamic.images">
                <div class="inner-img" v-lazy:background-image="item"
                     @click="previewImgUrl($event)" :value="item">
                </div>
              </div>
            </div>
            <div class="gaungchangImgg1" v-if="dynamic.images.length>2 && dynamic.images.length<6">
              <!--图三-->
              <div class="out-img3" v-if="dynamic.images.length===3 " >
                <div class="inner-img"  v-lazy:background-image="dynamic.images[0]"
                     @click="previewImgUrl($event)" :value="dynamic.images[0]"></div>
                <div class="right">
                  <div v-lazy:background-image="dynamic.images[1]"
                       @click="previewImgUrl($event)" :value="dynamic.images[1]"></div>
                  <div v-lazy:background-image="dynamic.images[2]"
                       @click="previewImgUrl($event)" :value="dynamic.images[2]"></div>
                </div>
              </div>
              <!--图四-->
              <div class="out-img" v-if="dynamic.images.length===4" v-for="(item,index) in dynamic.images">
                <div class="top" v-lazy:background-image="item"
                     @click="previewImgUrl($event)" :value="item" v-if="index===0">
                </div>
                <div class="inner-img" v-lazy:background-image="item"
                     @click="previewImgUrl($event)" :value="item" v-else>
                </div>
              </div>
              <!--图五-->
              <div class="out-img1" v-if="dynamic.images.length===5 " >
                <div class="inner-img"  v-lazy:background-image="dynamic.images[0]"
                     @click="previewImgUrl($event)" :value="dynamic.images[0]"></div>
                <div class="right">
                  <div v-lazy:background-image="dynamic.images[1]"
                       @click="previewImgUrl($event)" :value="dynamic.images[1]"></div>
                  <div v-lazy:background-image="dynamic.images[2]"
                       @click="previewImgUrl($event)" :value="dynamic.images[2]"></div>
                  <div v-lazy:background-image="dynamic.images[3]"
                       @click="previewImgUrl($event)" :value="dynamic.images[3]"></div>
                  <div v-lazy:background-image="dynamic.images[4]"
                       @click="previewImgUrl($event)" :value="dynamic.images[4]"></div>
                </div>
              </div>

            </div>
            <!--图6 - 9 -->
            <div class="gaungchangImgg2" v-if="dynamic.images.length>3 && dynamic.images.length>5">

              <div class="out-img"  v-for="item in dynamic.images">
                <div class="inner-img" v-lazy:background-image="item"
                     @click="previewImgUrl($event)" :value="item">
                </div>
              </div>
            </div>
            <!--点赞div等-->
            <div class="item-c-div">
              <div class="comment-div">
                <div class="commen-middle" @click="parise(index,dynamic.id,dynamic.fabulous_state,dynamic.uid)">
                  <img src="../../static/img/yidianzan.png" class="dianzan" v-if="dynamic.fabulous_state=='true'">
                  <img src="../../static/img/dianzan.png" class="dianzan" v-else>

                  <p :class="{yidianzan:dynamic.fabulous_state=='true'}">{{dynamic.fabulous}}</p>
                </div>
              </div>
              <div class="comment-div pinglunanniu"
                   @click="isShowComponetDiv(index,isnotRegister,dynamic.uid,dynamic.id)">
                <div class="commen-middle ">
                  <img src="../../static/img/pinglun.png" class="pinglun">
                  <p>{{dynamic.comment_count}}</p>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="gc-zhanwei"></div>-->
          <div class="gc-commen-list" v-if="dynamic.weibo_comment.length>0">
            <div class="gc-commen-list-item-b" v-for="(item,commenindex) in dynamic.weibo_comment">
              <img :src="item.portrait" class="header">
              <div class="gc-commen-list-item-s">
                <p class="gc-commen-list-item-s-nickname" v-html="item.nickname"></p>
                <p class="gc-commen-list-item-s-time">{{item.create_time}}</p>
                <p class="gc-commen-list-item-s-content" v-html="changeEmoj(item.content)"
                   @click="toComment(index,item.id,item.nickname,item.uid,dynamic.id,commenindex,item.id,0)"></p>
                <div class="gc-commen-list-item-s-fhList">
                  <div class="gc-commen-list-item-s-fhList-info" v-for="(hfitem,hfindex) in dynamic.hf"
                       v-if="hfitem.to_comment_id==item.id"
                       @click="toComment(index,hfitem.to_comment_id,hfitem.nickname,hfitem.uid,dynamic.id,hfindex,hfitem.id,1)">
                    <span class="huifuren" v-html="hfitem.nickname"></span>
                    <span>回复</span>
                    <span class="huifuren" v-html="'@'+hfitem.toNickname+':'"></span>
                    <span v-html="changeEmoj(hfitem.content)"></span>

                  </div>
                </div>
              </div>
            </div>
            <!--<div class="gc-commen-list-item-b-line">dsadad</div>-->
          </div>
          <div class="gc-block"></div>

          <div class="gc-item-line" v-show="dynamic.weibo_comment.length==0"></div>
        </div>
      </div>
      </div>
    </vue-better-scroll>
    <span @click="preventRouterlink(isnotRegister,{name:'fabushuoshuo'})">
      <div class="guangchangedit" v-show="editRefresh">
        <img src="../../static/img/add.png" alt="">
        <p>发表</p>
      </div>
    </span>
    <div class="guangchangrefresh" @click="guangchangRefresh" v-show="editRefresh"></div>
    <div class="addFriensshow">
      <div class="addFriensshow-div">
        <div class="addFriensshow-div-img">
          <router-link :to="{name:'haoyoutuijian'}">
            <img src="../../static/img/quguanzhu.png" class="qugaunzhu">
          </router-link>
          <img src="../../static/img/closeguanzhu.png" class="guanbiguanzhu" @click="closeAddFriendShow">
        </div>
      </div>

    </div>


    <div class="el-message-comment" v-show="elMessageCommentShow">
      <div class="el-message-box">
        <div class="el-comment-header">
          <p>评论</p>
          <img src="../../static/img/close.png" alt="" @click="cancelComment">
        </div>

        <div class="el-message-comment-comment">
          <div class="el-message-comment-comment-text">
            <textarea type="text" id="zhuangshi" v-model="commentContent" :placeholder="pinglunCompoholder"></textarea>
            <img src="../../static/img/emoj.png" class="emoj" @click="emojpanelclick">
            <div class="emojpanel" v-show="emojpanelshow">
              <img :src="imgitem.url" v-for="(imgitem,index) in emojArray"
                   @click="clickImg(imgitem.phrase,index,imgitem.url)">
            </div>
          </div>
          <div class="el-message-comment-comment-button">
            <div @click="cancelComment">取消</div>
            <div @click="confirmPinglun">评论</div>
          </div>
        </div>
      </div>
    </div>

    <mt-actionsheet
      :actions="actiondata"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
  import {changeEmoj, EmojArray, share, shareUrl, tabbarChange, wxConfig} from "../../static/js/timeFormat";
  import {Toast} from 'mint-ui';
  // import BScroll from 'better-scroll'

  require("../../static/css/guangchang.css")
  require("../../static/css/commentalert.css")
  export default {
    name: "guangchang",

    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      clearInterval(this.mytimer);
      clearTimeout(this.cleartimeout);
      next();
    },

    data() {
      return {
        tabbarChange,
        changeEmoj,
        url: this.COMMEURL.commonUrl,
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        dynamiclist: [],
        beforeScrollTop: '',
        page: 1,
        loading: "",
        msgPage: 1,//动态消息页码
        dynamicMsgList: [], //动态消息列表
        to_comment_id: "",//回复人id
        tocommentname: "",//回复评论对象
        ispinglunComponetShow: false,//是否显示评论输入框
        pinglunCompoholder: "请输入评论内容",//评论@谁
        isnotRegister: false,//未注册用户
        isnotRegistershow: false,//未注册提示显示
        editRefresh: true,//是否显示edit 和刷新按钮
        mytimer: "",//消息滚动时间
        user_id: "",//自己的id 用于不能给自己点赞
        cleartimeout: "",
        comment_uid: "",//记录点击评论回复的uid
        messageId: "",//用id进行分页，传每页走后一个数据的id
        commentContent: "",//评论具体内容
        commentType: "",//评论方式  0 为直接点击评论按钮  1 为点击评论内容
        weibo_id: "",//微博id
        dynamicIndex: "",//列表项
        emojArray: EmojArray(),//表情包
        commentalert: "",//评论弹窗
        elMessageCommentShow: false,//显示评论弹窗
        emojarrayphrase: [],//表情包路径

        emojpanelshow: false,
        count: 0,
        actiondata: [{ //底部弹窗数据
          name: '回复',
          method: this.clickCommenList
        }, {
          name: '删除',
          method: ''
        }],
        sheetVisible: false,//显示底部弹窗
        leixing: 1,//点击评论还是回复的评论 直接评论为1  回复为0
        delethuifuId: '',
        clickIndex: "",
        deleteId: "",//评论删除时的id
        deleteType: 0,
        scrollstart: 0,
        scrollResh: "",


      }
    },
    watch: {
      dynamiclist: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
        },
        deep: true
      },
      isnotRegistershow: {

        handler(curVal, oldVal) {
        },

      },
      isnotRegister: {
        handler(curVal, oldVal) {
        },
      },
      editRefresh: {
        handler(curVal, oldVal) {
        },
      },
      scrollstart: {
        handler(curVal, oldVal) {
        },
      },
      count: {
        handler(curVal, oldVal) {
          if (curVal == 1) {
            wxConfig(this, window.location.href.split('#')[0]);
            share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this, location.href), "分享你生活的每一个精彩瞬间，让我们为你点赞",10000);

          }
        },
      }

    },
    created() {
      tabbarChange(this.COMMEURL.linkArray, this.$route.path);
    },
    mounted() {
      //定义初始滚动Y坐标
      this.COMMEURL.Y = 0
      $(".before-trigger span").text("");
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this._initScroll();
      // this.dynamicMsg();
      this.onPullingUp();
      var self=this;
      setTimeout(function(){
        self.dynamicMsg();
      },500)
      this.beforeScrollTop = document.body.scrollTop;

    },
    activated() {

      var self = this;

      this._initScroll();

      var originurl = this.$route.query.origin;
      if (originurl == "fabushuoshuo") {
        this.activeInit();
        this.$router.go(-1);
      }
      this.$refs.scroll.scrollTo(0, self.COMMEURL.Y, 0, 'easing');
      this.$nextTick(function () {
        this.$refs.scroll.refresh();
      });
    },
    methods: {
      /**
       *初始化
       * @constructor
       */
      _initScroll: function () {
        // setTimeout(function(){
          var time = 30;
          var self = this;
          self.mytimer = setInterval(self.scrollUp, time);
        // },200)


      },
      /**
       * 发布说说跳转回广场，刷新页面
       * */
      activeInit: function () {
        this.COMMEURL.Y = 0;
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.messageId = "";
        this.dynamiclist = [];
        this.onPullingUp();
      },
      scroll: function (obj) {

        this.COMMEURL.Y = obj.y;
        // console.log(this.COMMEURL.Y);
        //滑动事件
        var delta = obj.y - this.beforeScrollTop;
        if (delta === 0) return false;
        if (delta > 0) {
          $(".guangchangrefresh").removeClass("guangchangrefreshup");
          $(".guangchangrefresh").addClass("guangchangrefreshdown");
        } else {
          $(".guangchangrefresh").addClass("guangchangrefreshup");
          $(".guangchangrefresh").removeClass("guangchangrefreshdown");
        }
        this.beforeScrollTop = obj.y;
        if (parseInt(obj.y) >= 0) {
          $(".guangchangrefresh").removeClass("guangchangrefreshup");
          $(".guangchangrefresh").addClass("guangchangrefreshdown");
          return false;
        }

        // obj.y=sessionStorage.getItem("scrollY")


      },
      //动态消息
      dynamicMsg: function () {
        //动态消息接口
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/weibo/index/message", qs.stringify({
          page: self.msgPage
        })).then(function (res) {
          // console.log("动态消息：" + JSON.stringify(res));
          if (res.data.code == 200) {
            // var data=res.data.data.concat(res.data.message);
            if (res.data.message == "") {
              res.data.message = [];
            }
            self.dynamicMsgList = res.data.data.concat(res.data.message);
// console.log(self.dynamicMsgList );
          }
        })
      },
      //广场动态
      getData() {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/weibo/index/index.html",
            qs.stringify({"page": self.messageId})
          ).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              resolve(res.data);
              self.user_id = res.data.user_id;
              if (res.data.is_mobile == "false") {
                self.isnotRegister = true;
                if (res.data.data == null) {
                  self.isnotRegistershow = true;
                }
              }
            } else if (res.data.code == 403) {
              $(".addFriensshow").show();
              $(".wuhaoyoua").show();
            } else {
              Toast({
                message: res.data.msg,
                position: 'middle',
                duration: 2000
              })
            }
          }).catch(function (e) {
            console.log(e);
          })
        });
      },
      onPullingUp: function () {
        //上拉加载
        var self = this;
        this.getData().then(function (res) {
          self.dynamiclist = self.dynamiclist.concat(res.data);
          self.messageId = res.data[res.data.length - 1].id;
          if (self.isnotRegister) {
            $(".before-trigger span").text("");
          } else {
            if (self.page <= res.totalPage) {
              self.$refs.scroll.forceUpdate(true);
            } else {
              self.$refs.scroll.forceUpdate(false);
              $(".before-trigger span").text("没有更多数据了");
            }
          }
          self.$refs.scroll.refresh();
          self.count++;
        }).catch(function (e) {
          console.log(e);
        })
      },
      scrollUp: function () { //文字滚动
        var area = document.getElementById('scrollMsg');
        var con1 = document.getElementById('msg');

        if (area.scrollTop >= con1.offsetHeight) {
          area.scrollTop = 0;
        } else {
          area.scrollTop++;
        }

      },
      parise: function (index, id, iszan, uid) {
        //点赞
        var self = this;
        if (self.user_id == uid) {

        } else {
          if (iszan == "true") {
            Toast({
              message: "已点赞过",
              duration: 2000,
              position: 'middle'
            })
          } else {
            self.dynamiclist[index].fabulous_state = "true";
            self.dynamiclist[index].fabulous = parseInt(self.dynamiclist[index].fabulous) + 1;
            this.$axios.post(self.url + "/index.php?s=/weibo/index/weiFabulous", qs.stringify({
              weibo_id: id
            })).then(function (res) {
              self.$loading.fullscreenLoading = false;
              self.loading.close();
              // console.log("res:" + JSON.stringify(res));
              if (res.data.status == 1) {
              } else {
                Toast({
                  message: res.data.msg,
                  duration: 2000,
                  position: 'middle'
                })
              }
            }).catch(function (e) {
              self.$loading.fullscreenLoading = false;
              self.loading.close();
            })
          }
        }
      },
      guangchangRefresh: function () {
        //刷新
        this.messageId = "";

        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.dynamiclist = [];
        this.onPullingUp();
      },
      /**
       *是否显示评论框
       * @param index 列表项index
       * @param isRegister 是否注册
       * @param uid 用户uid
       * @param id 广场动态id
       */
      isShowComponetDiv: function (index, isRegister, uid, id) {

        if (isRegister) {
          Toast({
            message: "请先注册，才能加好友，发说说，一起嗨起来!",
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.pinglunCompoholder = "请输入评论内容"
          this.dynamicIndex = index;
          this.weibo_id = id;
          this.commentType = 0
          this.to_comment_id = "";
          this.tocommentname = "";
          this.comment_uid = uid;

          this.elMessageCommentShow = true;
          setTimeout(function () {
            $("#zhuangshi").focus();
          }, 500)
        }
      },
      /**
       *回复评论
       * @param index 动态列表项index
       * @param commenid 评论id
       * @param commentname 被评论人的你nickname
       * @param uid 被评论人的uid
       * @param id 微博id
       */

      clickCommenList: function () {
        //评论评论  被评论人id  评论人id 文章id
        this.elMessageCommentShow = true;

        setTimeout(function () {
          $("#zhuangshi").focus();
        }, 500)
      },
      // item.to_comment_id=='0'?item.id:item.to_comment_id
      toComment: function (index, commenid, commentname, uid, id, deletIndex, deleteId, type) {
        this.sheetVisible = true;
        if (uid == this.user_id) {
          this.actiondata = [{ //底部弹窗数据
            name: '回复',
            method: this.clickCommenList
          }, {
            name: '删除',
            method: this.deletepinglun
          }];
        } else {
          this.actiondata = [{ //底部弹窗数据
            name: '回复',
            method: this.clickCommenList
          }];
        }
        this.deleteId = deleteId;
        this.clickIndex = deletIndex;//删除
        this.commentType = 1;
        this.pinglunCompoholder = "@" + commentname + ":";  //被回复人姓名
        this.to_comment_id = commenid;
        this.comment_uid = uid; //被评论人的uid
        this.weibo_id = id;
        this.dynamicIndex = index;
        this.deleteType = type;

      },
      //提交评论
      /**
       *提交评论
       * @param instance
       * @param done
       */
      confirmPinglun: function () {
        if ($.trim(this.commentContent).length == 0 || $.trim(this.commentContent).length >140) {
          Toast({
            message: "评论的字数为 0 或小于 140",
            duration: 2000,
            position: 'middle'
          })
          return;
        }
        var self = this;
        this.loading = this.$loading({
          lock: true,
          text: '评论中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;

        this.$axios.post(self.url + "/index.php?s=/weibo/index/weiComment", qs.stringify({
          weibo_id: self.weibo_id,
          content: self.commentContent,
          to_comment_id: self.to_comment_id,
          toUid: self.comment_uid
        })).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          self.editRefresh = true;
          self.elMessageCommentShow = false;
          self.emojpanelshow = false;

          self.commentContent = "";
          if (res.data.code == 200) {
            Toast({
              message: "评论成功",
              duration: 2000,
              position: 'middle'
            });


            // console.log("评论称：" + JSON.stringify(res.data));
            var data = {
              content: res.data.data[0].content,
              id: res.data.data[2].comment_id,
              nickname: res.data.data[5].nickname,
              uid: res.data.data[3].uid,
              to_comment_id: res.data.data[6].to_comment_id,
              toNickname: res.data.data[7].toNickname,
              portrait: res.data.data[1].portrait,
              create_time: res.data.data[4].create_time
            };
            self.dynamiclist[self.dynamicIndex].comment_count = parseInt(self.dynamiclist[self.dynamicIndex].comment_count) + 1;
            //直接评论
            if (self.commentType == 0) {
              console.log(self.dynamicIndex);
              self.dynamiclist[self.dynamicIndex].weibo_comment.push(data);

            } else {
              if (self.dynamiclist[self.dynamicIndex].hf == null) {
                self.dynamiclist[self.dynamicIndex].hf = [];
              }
              self.dynamiclist[self.dynamicIndex].hf.push(data);
              console.log(self.dynamiclist[self.dynamicIndex].hf);

            }

            self.commentContent = "";

          } else {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 2000
            })
          }
        }).catch(function (e) {
          self.editRefresh = true;
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          console.log("e" + e);
        })
      },
      //取消评论
      cancelComment: function () {
        this.elMessageCommentShow = false;
        this.commentContent = "";
        this.pinglunCompoholder = "请输入评论内容"
        this.emojpanelshow = false;

        // this.$refs.scroll.forceUpdate(true);
      },
      emojpanelclick: function () {
        this.emojpanelshow = !this.emojpanelshow;
      },
      /**
       *权限跳转
       * @param isRegister 是否注册
       * @param url 路由跳转链接
       */
      preventRouterlink: function (isRegister, url) {
        if (isRegister) {
          Toast({
            message: "请先注册，才能加好友，发说说，一起嗨起来！",
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.$router.push(url);
        }
      },
      /**
       *删除评论
       * @param e 阻止默认事件
       * @param commenId 评论id
       * @param commenIndex 评论数组的index
       * @param index 列表项的index
       */
      deletepinglun: function () {

        var self = this;
        var item = $(".item").eq(self.dynamicIndex).find(".gc-commen-list-item-b").eq(self.clickIndex).find(".gc-commen-list-item-s-fhList-info").length;
        this.$confirm("是否删除该评论?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = self.$loading({
            lock: true,
            text: '删除中',
            background: 'transparent'
          });

          self.$loading.fullscreenLoading = true;
          self.$axios.post(self.url + "/index.php?s=/weibo/index/deleteComment", qs.stringify({
            comment_id: self.deleteId,
            type: "weibo_comment"
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              Toast({
                message: "删除成功",
                duration: 2000,
                position: 'middle'
              });

              if (self.deleteType == 0) {
                self.dynamiclist[self.dynamicIndex].weibo_comment.splice(self.clickIndex, 1);
                self.dynamiclist[self.dynamicIndex].comment_count = parseInt(self.dynamiclist[self.dynamicIndex].comment_count) - item - 1;
              } else {
                self.dynamiclist[self.dynamicIndex].hf.splice(self.clickIndex, 1);
                self.dynamiclist[self.dynamicIndex].comment_count = parseInt(self.dynamiclist[self.dynamicIndex].comment_count) - 1;
              }

            } else {
              Toast({
                message: res.data.msg,
                duration: 2000,
                position: 'middle'
              });
            }
          })

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });

      },
      /**
       *关闭关注好友弹窗
       *  */
      closeAddFriendShow: function () {
        $(".addFriensshow").css("display", "none");
      },
      /**
       * wx 查看图片
       * @param e 阻止默认点击事件
       */
      previewImgUrl: function (e) {
        e.stopPropagation();
        var nowurl = $(e.target).attr("value");
        var imgArray = [];
        // 图一
        $(e.target).parents(".gaungchangImgg").find(".out-img").each(function (index, el) {
          var itemSrc = $(el).find(".inner-img").attr('value');
          imgArray.push(itemSrc);
        });
        //图二
        $(e.target).parents(".gaungchangImgg").find(".out-img2").each(function (index, el) {
          var itemSrc = $(el).find(".inner-img").attr('value');
          imgArray.push(itemSrc);
        });
        //图三
        $(e.target).parents(".gaungchangImgg1").find(".out-img3").each(function (index, el) {
          var itemSrc = $(el).find(".inner-img").attr('value');
          imgArray.push(itemSrc);
        });
        $(e.target).parents(".gaungchangImgg1").find(".out-img3 .right div").each(function (index, el) {
          var itemSrc = $(el).attr('value');
          imgArray.push(itemSrc);
        });
        //图四
        $(e.target).parents(".gaungchangImgg1").find(".out-img .top").each(function (index, el) {
          var itemSrc = $(el).attr('value');
          imgArray.push(itemSrc);
        });
        $(e.target).parents(".gaungchangImgg1").find(".out-img .inner-img").each(function (index, el) {
          var itemSrc = $(el).attr('value');
          imgArray.push(itemSrc);
        });
        //图五
        $(e.target).parents(".gaungchangImgg1").find(".out-img1").each(function (index, el) {
          var itemSrc = $(el).find(".inner-img").attr('value');
          imgArray.push(itemSrc);
        });
        $(e.target).parents(".gaungchangImgg1").find(" .out-img1 .right div").each(function (index, el) {
          var itemSrc = $(el).attr('value');
          imgArray.push(itemSrc);
        });
        //图6 - 9
        $(e.target).parents(".gaungchangImgg2").find(".out-img").each(function (index, el) {
          var itemSrc = $(el).find(".inner-img").attr('value');
          imgArray.push(itemSrc);
        });
        wx.previewImage({
          current: nowurl,
          urls: imgArray
        });
      },
      clickImg: function (value, index, url) {
        this.commentContent += value;
      },

      LocationWodexiaoxi: function (url, type) {
        if (type == "register") {
        } else {
          this.$router.push(url);
        }
      }
    }

  }
</script>
<style>


</style>
