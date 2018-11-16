<template>
  <div class="wodexiaoxi">
    <div class="xiaoxidiv">
      <vue-better-scroll
        class="xiaoxi-wrapper"
        ref="scroll"
        :probeType="2"
        :scrollbar="pullupconfig.scrollbarObj"
        :pullDownRefresh=false
        :listenScroll=true
        :pullUpLoad="pullupconfig.pullUpLoadObj"
        :startY="parseInt(pullupconfig.startY)"
        @pullingUp="MessageOnPullingup()"
      >

        <ul class="xiaoxi-ul">
          <li v-for="messageItem in messageList" v-if="messageItem.type!='style_pl'">
            <span @click="ReadCommentInfo($event,messageItem.type_id,messageItem.type,messageItem.comment_id,messageItem.from_nickname,messageItem.from_uid,messageItem.register_id)">
            <!--<div class="doint" v-show="messageItem.type=='RedEnvelopes'||messageItem.type=='reward'"></div>-->
            <div class="wdxx-right">
              <p>
                <span
                  class="xiaoxi-name">{{messageItem.user==null?"系统消息":messageItem.user.nickname}}</span>
                <span
                class="xiaoxi-time">{{messageItem.create_time}}</span></p>
              <div class="xiaoxi-content" ><span class="fromNickname"></span><span class="wodexiaoxi-content-info" v-html="changeEmoj(messageItem.content)"></span></div>
            </div>
              </span>
          </li>


        </ul>
      </vue-better-scroll>


    </div>
  </div>
</template>
<script>
  import {changeEmoj} from "../../../static/js/timeFormat";
  import {Toast} from 'mint-ui'

  export default {
    name: "wodexiaoxi",
    data() {
      return {
        changeEmoj,
        url: this.COMMEURL.commonUrl,
        pullupconfig:this.COMMEURL.pullupConfig, //上啦加载配置项
        scrollbarObj: {
          fade: true
        },
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            noMore: '没有更多数据了'
          },
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        beforeScrollTop: '',
        loading: "",
        MessageTotalpage: "",
        messagepage: 1, //当前页面页码
        messageList: [],
        messageTotalPage: "",//总页码
        isReadID: [],//消息id
        isreadMsg:"",//是否有未读消息
      }
    },
    mounted() {

      this.isreadMsg=this.$route.query.isRead;
      $(".before-trigger span").text("");
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this.MessageOnPullingup();
      if(this.isreadMsg!='0'){
        this.ReadMsg();
      }

    },
    methods: {
      getMessageList() {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/message", qs.stringify({
            page: self.messagepage
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              resolve(res.data);
            }
          }).catch(function (e) {
            console.log(e);
          })
        });
      },
      MessageOnPullingup: function () {
        var self = this;
        this.getMessageList().then(function (res) {
          if (res.data == null) {
            self.$refs.scroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          } else {
            self.messageList = self.messageList.concat(res.data.message);
            self.messageTotalPage = parseInt(res.totalCount);
            self.messagepage++;
            // for(var item in res.data.message){
            //   self.isReadID.push(item.id);
            // }

            if (self.messagepage <= self.messageTotalPage) {
              self.$refs.scroll.forceUpdate(true);
            } else {
              self.$refs.scroll.forceUpdate(false);
              $(".before-trigger span").text("没有更多数据了");
            }
            self.$refs.scroll.refresh();
            var isReadMsg = [];
            for (var i = 0, len = self.messageList.length; i < len; i++) {
              // if(self.messageList[i].ty)
            }
          }
        });

      },
      ReadMsg: function () {
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/isReadMessage").then(function (res) {
          if (res.data.code == 200) {
                self.COMMEURL.isNewMessage=false;
          }
        })
      },
      /**
       *
       * @param $event 事件
       * @param type_id 消息id
       * @param type  消息类型
       * @constructor
       */
      ReadCommentInfo: function (e, type_id, type, commentid,nickname,uid,register_id) {
        // e.preventDefault();
        // e.cancelBubble = true;
        if (type == "Article_comment" || type == "square_comment"||type=="Article_comment_fabulous"||type=="style_comment") {
          this.$router.push({
            name: 'xitongxiaoxipinglunxiangqing',
            query: {typeid: type_id, type: type, commentId: commentid,nickname:nickname,uid:uid}
          });
        }else if(type=='Article_fabulous'){
          this.$router.push({
            name: 'xitongxiaoxidianzanxiangqing',
            query: {typeid: type_id, type: type, commentId: commentid,nickname:nickname,uid:uid}
          });
        }else if(type=='square_dz'){
          this.$router.push({
            name: 'guangchangxiangqing',
            query: {weiboid: type_id}
          });
        }else if(type=='style_dz'){
          this.$router.push({
            name: 'xiufengcaixiangqing',
            query: {typeid: type_id}
          });
        }else if(type=="register"){
          this.$router.push({
            name: 'gerenzhuye',
            query: {toUid:register_id}
          });
        }else if(type=="video_comment" || type=="video_comment_support" || type=="video_support" || type=="qz_article_support" || type=="qz_article_comment" ||type=="qz_wd_comment" || type=="qz_article_reply" || type=="qz_collection" || type=="qz_wd_adopt" || type=="qz_circle_audit" ||type=="qz_circle_fail" || type=="qz_circle_freeze" ||type=="qz_article_delete" ){
          Toast({
            message: "请到秀芳华App端操作",
            duration: 2000,
            position: "middle"
          })
        }
      },


    }

  }
</script>
<style>
  html, body {
    background-color: #f5f5f5;
  }

  .wodexiaoxi {
    background-color: #ffffff;
  }

  .xiaoxidiv {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0rem;

  }

  .xiaoxi-wrapper {
    height: 100%;
    overflow: hidden;

  }

  .xiaoxi-ul {
    width: 100%;
    height: auto;
    /*background-color: #ffffff;*/
    /*border: 1px solid transparent;*/
  }

  .xiaoxi-ul > li {
    list-style: none;
    margin-top: 0.01rem;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    position: relative;
    /*margin: 0 auto;*/
    /*margin-left: 3%;*/
  }

  .xiaoxi-ul > li:nth-child(1) {
    margin-top: 0;
  }

  .xiaoxi-ul > li .wdxx-right {
    /*flex: 1;*/
    /*border: 1px solid seagreen;*/
    flex: 1;
    margin-left: 0.1rem;
    /*width: 94%;*/
    margin-right: 3%;
  }
  .xiaoxi-ul > li>span{
    width: 100%;
    /*border: 1px solid slateblue;*/
  }
  .xiaoxi-ul > li p {
    padding-top: 0.1rem;
    /*width: 94%;*/
    /*width: 98%;*/
    /*margin-left: 0.2rem;*/
    width: 94%;
    margin-left: 3%;
  }

  .xiaoxi-name {
    color: #444444;
    font-size: 14px;
  }

  .xiaoxi-time {
    color: #999999;
    font-size: 12px;
    margin-left: 0.08rem;
  }

  .xiaoxi-content {
    font-size: 0.15rem;
    color: #666666;
    margin-top: 0.05rem;
    line-height: 0.21rem;
    margin-left:3%;
    width: 94%;
    /*margin-left: 3%;*/
    padding-bottom: 0.1rem;
  }
  .xiaoxi-content span{
    font-size: 0.15rem;
  }
  .wodexiaoxi-content-info{
    word-break: break-all;
  }

  .xiaoxi-content > img {
    width: 0.2rem;
    height: 0.2rem;
  }
  .wodexiaoxi-content-info>img{
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: middle;
  }

  .xiaoxi-zhanwei {
    width: 100%;
    height: 0.1rem;
    background-color: #f5f5f5;
  }

  .doint {
    width: 0.05rem;
    height: 0.05rem;

    /*color: #E51C23 ;*/
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 50%;
    background-color: #E51C23;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 3%;
  }
  .fromNickname{
    color: #dd191d;
  }
</style>

