<template>
  <div class="xitongxiaoxipinglunxiangqing">
    <div class="xitongxiaoxipinglunxiangqingdiv">
      <div class="wenzhangItem" @click="locationWenzhangxiangqing(articleInfo.id)" v-show="articleInfo!=null">
        <div class="releaseeWS">
          <img :src="articleInfo.portrait" alt="">
          <img src='../../../static/img/jinv.png' class="xtxxdzxq-dav" v-show="articleInfo.user_type=='1'">
          <div>
            <p>{{articleInfo.nickname}}</p>
            <p>{{articleInfo.create_time}}</p>
          </div>
        </div>
        <!--<div class="xtxxplxq-line"></div>-->
        <div class="xtxxdzxq-fb-content">
          <div class="fb-img" v-if="articleInfo.image!=''&&articleInfo.image!=null&&articleInfo.image!=undefined" :style="{backgroundImage:'url('+articleInfo.image+')'}"></div>
          <!--<router-link  style='flex: 1'>-->
          <div class="content-info"  :class="{contentinfo2:articleInfo.image!=''&&articleInfo.image!=null&&articleInfo.image!=undefined}">
            <p class="fa-title" v-if="articleInfo.title">{{articleInfo.title}}</p>
            <p v-html="changeEmoj(articleInfo.content)" class="fb-content-info"></p>
          </div>
          <!--</router-link>-->
        </div>
      </div>
      <!--<div class="xtxxplxq-zhanwei"></div>-->
      <div class="dianzanList">
        <img src="../../../static/img/dianzan.png" alt="">
        <span>
          <!--<span  v-for="(fabulousItem,index) in articleInfo.fabulous">{{index>10?'等'+articleInfo.fabulous.length+"人为您点赞":fabulousItem.nickname}}{{index==articleInfo.fabulous.length-1?'':'、'}}</span>-->
          <span >{{articleInfo.fabulous}}</span>
          </span>
      </div>

    </div>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {changeEmoj} from "../../../static/js/timeFormat";
  export default {
    name: "xitongxiaoxidianzanxiangqing",
    data() {
      return {
        changeEmoj,
        url: this.COMMEURL.commonUrl,
        contentplaceholder: "(点谁，回复谁)", //评论框提示内容
        commentcontent: "",//评论具体内容
        type: "",//评论类型
        typeid: "",//文章或者微博id
        commentList: [],//评论列表
        hfList: [],//回复列表
        toUID: "",//被回复人uid
        commentid: "",//评论id
        commentId: "",//评论id
        pingluntype: "",//评论类型
        nickname: "",// 默认昵称
        articleInfo: "",//文章或者微博详情
        repostid: "",//转发文章的id
        count: 0,//计算点击底部评论框的次数
        louzhuuid: "",
        louzhunickname: "",
        louzhucommentid: ""
      }
    },
    watch: {
      commentList: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
        },
        deep: true
      },
      hfList: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
        },
        deep: true
      },
    },
    mounted() {

      this.type = this.$route.query.type; //评论类型

      this.typeid = this.$route.query.typeid;//文章或者weibo  id
      this.commentId = this.$route.query.commentId;//评论id
      this.commentid = this.$route.query.commentId;//评论id
      this.nickname = this.$route.query.nickname;//默认回复人昵称
      this.toUID = this.$route.query.uid;//默认回复人uid
      // this.contentplaceholder = "@" + this.nickname; //默认placeholder

      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this.getData();

    },
    methods: {
      /**
       * 获取评论详细信息
       */
      getData: function () {
        var self = this;
        this.$axios.post(self.url + "/index.php/ucenter/newindex/comment_details", qs.stringify({
          type: self.type,
          type_id: self.typeid,
          comment_id: self.commentId,
          from_uid:self.toUID
        })).then(function (res) {
          console.log(res);
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.commentList = res.data.data.comment;
            self.hfList = res.data.data.hf;
            // self.louzhuuid = self.commentList[0].uid;
            // self.commentid = self.commentList[0].to_comment_id;
            // self.louzhunickname = self.commentList[0].nickname;
            // self.louzhucommentid = self.commentList[0].to_comment_id;
            self.articleInfo = res.data.data.article;
            // console.log(JSON.stringify(self.commentList));
            self.repostid = res.data.data.article.repost_id;
            // if (self.commentList.length == 0) {
            //   Toast({
            //     message: "评论内容删除",
            //     duration: 3000,
            //     position: 'middle'
            //   })
            // }
          } else {
            Toast({
              message: res.data.msg,
              duration: 3000,
              position: 'middle'
            })
          }

        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })
      },
      blurInput: function (e) {
//点击其他地方 input失去焦点
        var target = $(e.target);
        // var self=this;
        console.log(target);
        if (target[0].className == "zhuangshi" || target[0].className == 'item' || target.hasClass("fhliebiaoItem") || target.parents(".fhliebiaoItem").hasClass("fhliebiaoItem")) {
          $("#pingluncontent").focus();
        } else {
          $("#pingluncontent").blur();
          // this.commentPlaceholder = "";
        }


      },
      //点击底部评论框
      CommenInput: function (uid, commentid, nickname) {

        this.commentcontent = "";
        $("#pingluncontent").val("");
        // this.contentplaceholder = "@ " + nickname;
        this.toUID = uid;
        this.commentid = commentid;
        this.count++;
      },
      huifuContent: function (uid, commentid, name) {
        this.commentcontent = "";
        $("#pingluncontent").val("");
        this.contentplaceholder = "@ " + name;
        this.toUID = uid;
        this.commentid = commentid;
        this.nickname = name;
        console.log("uid:" + uid + "commentid:" + commentid + "name:" + name);

      },
      //发送评论
      sendComment: function () {
        if (this.type == "Article_comment") {
          this.ArticleComment();
        } else {
          this.weiboComment();
        }
      },
      ArticleComment: function () {
        if ($.trim(this.commentcontent).length == 0) {
          Toast({
            message: "请输入评论内容",
            duration: 2000,
            position: "middle"
          });
        } else {
          var self = this;
          this.loading = this.$loading({
            lock: true,
            text: '评论中',
            background: 'transparent'
          });
          console.log("uid:" + self.toUID + "commentid:" + self.commentid + "name:" + self.nickname);
          self.$loading.fullscreenLoading = true;
          this.$axios.post(self.url + '/index.php?s=/news/newindex/comment', qs.stringify({
            article_id: self.typeid, //文章id 或者weibo id
            content: "回复<span class='huifuren'>@" + self.nickname + ":</span>" + self.commentcontent,
            toUid: self.toUID,
            commentId: self.commentid

          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();

            if (res.data.code == 200) {
              console.log("dasda3123131");
              console.log("评论：" + JSON.stringify(res));
              $("#pingluncontent").val("");
              var coomentListItem = {
                content: res.data.data[0].content,
                commentid: res.data.data[2].commentId,
                portrait: res.data.data[1].portrait,
                uid: res.data.data[3].uid,
                nickname: res.data.data[7].user.nickname,
                type: 'reply'
              };
              // console.log("dasda:" + coomentListItem);
              self.hfList.push(coomentListItem);
              self.commentContent = "";
              self.contentplaceholder = "(点谁，回复谁)";
              self.toUid = self.louzhuuid;
              self.nickname = self.louzhunickname;
              self.commentid = self.louzhucommentid;
            } else {
              Toast({
                message: res.data.msg,
                position: 'middle',
                duration: 3000
              })
            }
          }).catch(function (e) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            console.log("cuowu:" + e);
          })
        }
      },
      weiboComment: function () {
        console.log("dasd:" + this.commentid);
        if ($.trim(this.commentcontent).length == 0) {
          Toast({
            message: "请输入评论内容",
            duration: 2000,
            position: "middle"
          });

        } else {
          var self = this;
          this.loading = this.$loading({
            lock: true,
            text: '评论中',
            background: 'transparent'
          });
          self.$loading.fullscreenLoading = true;
          this.$axios.post(self.url + "/index.php?s=/weibo/index/weiComment", qs.stringify({
            weibo_id: self.typeid,
            content: "回复<span class='huifuren'>@" + self.nickname + ":</span>" + self.commentcontent,
            to_comment_id: self.commentid,
            toUid: self.toUID
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            $("#pingluncontent").val("");
            self.commentcontent = "";

            if (res.data.code == 200) {
              Toast({
                message: "评论成功",
                duration: 2000,
                position: 'middle'
              });
              var data = {
                content: res.data.data[0].content,
                commentid: res.data.data[2].comment_id,
                nickname: res.data.data[5].nickname,
                uid: res.data.data[3].uid,
                to_comment_id: res.data.data[6].to_comment_id
              };
              self.hfList.push(data);
              self.commentContent = "";
              self.contentplaceholder = "(点谁，回复谁)";
              self.toUid = self.louzhuuid;
              self.nickname = self.louzhunickname;
              self.commentid = self.louzhucommentid;
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
        }
      },
      locationWenzhangxiangqing: function (articalId) {

        if (this.type == "Article_comment"||this.type=='Article_fabulous') {
          if (this.repostid == null) {
            this.$router.push({name: 'wenzhangxiangqing', query: {articalId: articalId}})
          } else {
            this.$router.push({
              name: 'zhuanfawenzhangxiangqing',
              query: {articalId: articalId, rePostId: this.repostid}
            })
          }

        }else if(this.type=="square_dz"){
          this.$router.push({
            name: 'guangchangxiangqing',
            query: {weiboid: articalId}
          })
        }

      }

    }

  }
</script>
<style>
  .xitongxiaoxipinglunxiangqingdiv {
    position: absolute;
    /*height: calc(100% - 0.56rem);*/
    bottom: 0.6rem;
    top: 0;
    width: 100%;
    overflow-y: scroll;
    /*border: 1px solid seagreen;*/
  }

  .xitongxiaoxipinglunxiangqing {
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

  }

  .wenzhangItem {
    width: 100%;
    /*border: 1px solid slateblue;*/
    margin-top: 0.15rem;
  }

  .xtxxdzxq-fb-content{
    width: 94%;
    /*height: 0.9rem;*/
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    background-color: #f5f5f5;
    padding: 0.1rem 0;
  }

  .fb-img {
    width: 0.9rem;
    height: 0.9rem;
    /*background-image: url('../../../static/img/fengjing.jpg');*/
    background-position:center;
    background-repeat: no-repeat;
    background-size:cover;
    border-radius: 0.06rem;
    flex-basis: 0.9rem;
    display: block;
    /*margin-right: 0.1rem;*/
    margin-left: 0.1rem;
  }

  .content-info {
    justify-content: center;
    align-items: center;
    height: auto;
    display: inline;
    margin-left: 0.1rem;
    flex: 1;
    width: 100%;
    /*border: 1px solid seagreen;*/
    position: relative;
    min-height: 0.8rem;
  }

  .contentinfo2 {
    width: calc(100% - 1.2rem);
    margin-right: 2%;
  }

  .fa-title {
    font-size: 0.15rem;
    color: #333333;
    /*margin-top: 0.05rem;*/
    margin-bottom: 0.05rem;
    /*border: 1px solid seagreen;*/

    overflow-x: hidden;
    /*word-wrap: ;*/
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .xitongxiaoxipinglunxiangqingdiv .xtxxdzxq-fb-content .fb-content-info {
    font-size: 0.15rem !important;
    color: #5c5c5c;
    /*margin-top: 0.1rem;*/
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .fb-content-info img{
    width: 0.18rem;
    height: 0.18rem;
    vertical-align: middle;
  }
  .fb-line {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #f5f5f5;
    margin-top: 0.1rem;
  }

  .xtxxplxq-zhanwei {
    width: 100%;
    height: 0.1rem;
    background-color: #f5f5f5;
    margin-top: 0.15rem;
  }

  .xtxxpl-info {
    width: 94%;
    margin: 0.1rem;
    /*border: 1px solid slateblue;*/
    display: flex;
    flex-direction: row;
  }

  .xtxxpl-info img {
    display: block;
    border-radius: 50%;
    width: 0.42rem;
    height: 0.42rem;
    margin-right: 0.1rem;
  }

  .xtxxpl-info-right {
    /*border: 1px solid seagreen;*/
    flex: 1;
  }

  .xtxxpl-info-right-info {
    width: 100%;
  }

  .xtxxpl-info-right-info > p:nth-child(1) {
    font-size: 0.15rem;
    color: #333333;
    line-height: 0.3rem;

  }

  .xtxxpl-info-right-info > p:nth-child(2) {
    font-size: 0.12rem;
    color: #999999;
    line-height: 0.12rem;

  }

  .xtxxpl-info-right-commen-list {
    width: 100%;
    /*border: 1px solid slateblue;*/
  }

  .xtxxpl-info-right-commen-list .item p {
    color: #444444;
    font-size: 0.16rem;
    line-height: 0.25rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #d6d6d6;
    /*display: flex;*/
    /*flex-direction: row;*/
  }

  .xtxxpl-info-right-commen-list .item .huifuren {
    color: #DD191D;
    font-size: 0.16rem;
    line-height: 0.25rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .fhliebiaoItem img {
    width: 0.2rem;
    height: 0.2rem;
    display: inline !important;
    margin-right: 0rem !important;
    vertical-align: middle;
  }

  .xtxxpl-commen-input {
    width: 100%;
    background-color: #ffffff;

    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    /*border: 1px solid seagreen;*/
    overflow-x: hidden;

  }

  .xtxxpl-commen-input #pingluncontent {
    margin-left: 0.1rem;

    margin: 0.07rem 0.07rem;

    border-radius: 0.04rem;
    outline: none;
    padding-left: 0.05rem;
    border: 1px solid #f0f0f0;
    padding-top: 0.1rem;
    font-size: 0.16rem;
    color: #444444;
    height: auto;

    /*flex: 1;*/
    width: 75%;
    resize: vertical;
    min-height: 0.2rem;

    margin-right: 0.1rem;
    text-align: left;

  }

  .xtxxpl-commen-input .send {

    padding: 0 0.15rem;
    border-radius: 0.04rem;
    margin-right: 0.1rem;
    height: 0.34rem;
    margin-top: 0.12rem;
    background-color: #f5746f;
    color: #ffffff;
    line-height: 0.34rem;
    text-align: center;
    font-size: 0.15rem;
    justify-content: flex-end;
  }

  /*头部*/
  .releaseeWS {
    width: 94%;
    /*height: 1rem;*/
    /*border: 1px solid seagreen;*/
    margin: 0.1rem auto;
    display: flex;
    flex-direction: row;
  }

  .releaseeWS img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }

  .releaseeWS div {
    flex: 1;
    margin-left: 0.1rem;
    height: 0.5rem;
    max-width:calc(100% - 0.6rem);
    /*border: 1px solid seagreen;*/
  }

  .releaseeWS div > p {
    font-size: 0.15rem;
    color: #444444;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width:100%;

  }

  .releaseeWS div > p:nth-child(2) {
    margin-top: 0.08rem;
  }

  .xtxxplxq-line {
    width: 100%;
    height: 0.1rem;
    border-top: 1px solid #f5f5f5;
  }

  /*点赞列表*/
  .dianzanList{
    width: 94%;
    /*height: 1rem;*/
    /*border: 1px solid slateblue;*/
    margin: 0.1rem auto;
  }
  .dianzanList img{
    width: 0.18rem;
    height: 0.167rem;
  }
  .dianzanList span{
    font-size: 0.15rem;
    color: #333333;
    display: inline;
    line-height: 0.3rem;
  }
  .xtxxdzxq-dav{
    width: 0.12rem !important;
    height: 0.12rem !important;
    position: absolute;
    left: 0.47rem;
    top: 0.55rem;

  }
</style>
