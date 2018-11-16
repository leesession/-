<template>
  <div class="xitongxiaoxipinglunxiangqing" @click="blurInput($event)">
    <div class="xitongxiaoxipinglunxiangqingdiv">
      <div class="wenzhangItem" @click="locationWenzhangxiangqing(articleInfo.id)" v-show="articleInfo!=null">
        <div class="releaseeWS">
          <img :src="articleInfo.portrait" alt="">
          <img src='../../../static/img/jinv.png' class="xtxxplxq-dav" v-show="articleInfo.user_type=='1'">
          <div>
            <p>{{articleInfo.nickname}}</p>
            <p>{{articleInfo.create_time}}</p>
          </div>
        </div>
        <!--<div class="xtxxplxq-line"></div>-->
        <div class="xtxxplxq-fb-content">
          <div class="fb-img"
               :style="{backgroundImage:'url('+articleInfo.url1+')'}" v-if="type=='style_comment'"></div>
          <div class="fb-img" v-else
               v-show="articleInfo.image!=''&&articleInfo.image!=null&&articleInfo.image!=undefined"
               :style="{backgroundImage:'url('+articleInfo.image+')'}"></div>

          <!--<router-link  style='flex: 1'>-->
          <div class="content-info"
               :class="{contentinfo2:articleInfo.image!=''&&articleInfo.image!=null&&articleInfo.image!=undefined}">
            <p class="fa-title" v-if="articleInfo.title">{{articleInfo.title}}</p>
            <p v-html="changeEmoj(articleInfo.content)" class="fb-content-info"></p>
          </div>
          <!--</router-link>-->
        </div>
      </div>
      <!--<div class="xtxxplxq-zhanwei"></div>-->
      <div class="xtxxpl-info" v-for="(commentitem,commenindex) in commentList">
        <img :src=commentitem.portrait alt="">

        <img src='../../../static/img/jinv.png' class="xtxxplxqc-dav" v-show="commentitem.user_type=='1'">
        <div class="xtxxpl-info-right">
          <div class="xtxxpl-info-right-info">
            <p class="xtxxplxq-nickname">{{commentitem.nickname}}</p>
            <p>{{commentitem.create_time}}</p>
          </div>

          <div class="xtxxpl-info-right-commen-list"
               v-show="type=='Article_comment'||type=='Article_comment_fabulous'">
            <div class="item" @click="blurInput($event)">
              <div class="ArticleCcommentFabulous">
                <p v-html="changeEmoj(commentitem.content)"
                   @click="CommenInput(commentitem.uid,commentitem.to_comment_id,commentitem.nickname,commenindex)"
                   class="fhliebiaoItem">
                </p>
                <div class="xtxxpl-dianzan-person" v-if="type=='Article_comment_fabulous'">
                  <img src="../../../static/img/yidianzan.png" class="xtxxpl-dianzan">
                  <span>({{articleInfo.fabulous.length}})</span>
                </div>
              </div>
              <p v-for="hfitem in hfList" v-show="commentitem.to_comment_id==hfitem.commentid"
                 @click="huifuContent(hfitem.uid,hfitem.commentid,hfitem.nickname)" class="fhliebiaoItem">
                <span style="color: #DD191D">{{hfitem.nickname}}:</span>
                <span>
                  回复<span class="xtxxplxqhuifuren">@{{hfitem.toNickname}}:</span>
                  <span v-html="changeEmoj(hfitem.content)"></span>
                </span>
              </p>
            </div>
          </div>
          <div class="xtxxpl-info-right-commen-list"
               v-show="type=='style_comment'">
            <div class="item" @click="blurInput($event)">
              <div class="ArticleCcommentFabulous">
                <p v-html="changeEmoj(commentitem.content)"
                   @click="CommenInput(commentitem.uid,commentitem.comment_id,commentitem.nickname,commenindex)"
                   class="fhliebiaoItem">
                </p>

              </div>
              <p v-for="hfitem in hfList" v-show="commentitem.comment_id==hfitem.to_comment_id"
                 @click="huifuContent(hfitem.uid,hfitem.to_comment_id,hfitem.nickname)" class="fhliebiaoItem">
                <span style="color: #DD191D">{{hfitem.nickname}}:</span>
                <span>
                  回复<span class="xtxxplxqhuifuren">@{{hfitem.toNickname}}:</span>
                  <span v-html="changeEmoj(hfitem.content)"></span>
                </span>
              </p>
            </div>
          </div>
          <div class="xtxxpl-info-right-commen-list" v-show="type=='square_comment'">
            <div class="item" @click="blurInput($event)">
              <p v-html="changeEmoj(commentitem.content)"
                 @click="CommenInput(commentitem.uid,commentitem.to_comment_id,commentitem.nickname,commenindex)"
                 class="fhliebiaoItem"></p>
              <!--uid,commentid,name-->
              <p v-for="hfitem in hfList"
                 v-show="hfitem.to_comment_id?commentitem.to_comment_id==hfitem.to_comment_id:commentitem.to_comment_id==hfitem.commentid"
                 @click="huifuContent(hfitem.uid,hfitem.to_comment_id?hfitem.to_comment_id:hfitem.commentid,hfitem.nickname)"
                 class="fhliebiaoItem">
                <span>{{hfitem.nickname}}:</span>
                <span v-if="hfitem.toNickname!=''">
                  回复<span class="xtxxplxqhuifuren">@{{hfitem.toNickname}}:</span>
                  <span v-html="changeEmoj(hfitem.content)"></span>
                </span>
                <!--<span v-html="changeEmoj(hfitem.content)"></span>-->
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xtxxpl-commen-input" @click="CommenInput(toUID,commentid,nickname,0)">

      <textarea type="text" class="zhuangshi" id="pingluncontent" :placeholder="contentplaceholder"
                v-model="commentcontent" @click="inputClick($event)"></textarea>

      <div class="send" @click="sendComment($event)">发送</div>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  import {changeEmoj} from "../../../static/js/timeFormat";

  export default {
    name: "xitongxiaoxipinglunxiangqing",
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

        louzhuuid: "",
        pinglunType: 0,//评论类型 0：回复楼主  1：回复评论
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
          from_uid: self.toUID
        })).then(function (res) {
          console.log(res);
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.commentList = res.data.data.comment;
            // console.log("dasdas");
            self.hfList = res.data.data.hf;
            self.louzhuuid = self.commentList[0].uid;
            self.commentid = self.commentList[0].to_comment_id;
            self.louzhunickname = self.commentList[0].nickname;
            self.louzhucommentid = self.commentList[0].to_comment_id;
            self.articleInfo = res.data.data.article
            console.log(JSON.stringify(self.commentList));
            self.repostid = res.data.data.article.repost_id;
            if (self.commentList.length == 0) {
              Toast({
                message: "评论内容删除",
                duration: 3000,
                position: 'middle'
              })
            }
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
          // this.contentplaceholder="(点谁，回复谁)"
          // this.commentcontent="";

        }


      },
      //点击底部评论框
      CommenInput: function (uid, commentid, nickname, index) {


        this.toUID = uid;
        this.commentid = commentid;
        this.contentplaceholder = "@" + this.louzhunickname;
        this.nickname = this.louzhunickname;
        this.commentcontent = "";

      },
      inputClick: function (e) {
        e.preventDefault();
        e.cancelBubble = true;
      },
      huifuContent: function (uid, commentid, name) {
        this.commentcontent = "";
        this.contentplaceholder = "@ " + name;
        this.toUID = uid;
        this.commentid = commentid;
        this.nickname = name;


      },
      //发送评论
      sendComment: function (e) {

        e.preventDefault();
        e.cancelBubble = true;
        if (this.type == "Article_comment" || this.type == "Article_comment_fabulous") {
          this.ArticleComment();
        } else if (this.type == "style_comment") {
          this.styleComment();
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
          self.$loading.fullscreenLoading = true;
          this.$axios.post(self.url + '/index.php?s=/news/newindex/comment', qs.stringify({
            article_id: self.typeid, //文章id 或者weibo id
            // content: "回复<span class='huifuren'>@" + self.nickname + ":</span>" + self.commentcontent,
            content: self.commentcontent,
            toUid: self.toUID,
            commentId: self.commentid,
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              $("#pingluncontent").val("");
              var coomentListItem = {
                content: res.data.data[0].content,
                commentid: res.data.data[2].commentId,
                portrait: res.data.data[1].portrait,
                uid: res.data.data[3].uid,
                nickname: res.data.data[7].user.nickname,
                type: 'reply',
                toNickname: res.data.data[10].toNickname,
              };
              // console.log("dasda:" + coomentListItem);
              self.hfList.push(coomentListItem);
              self.commentcontent = "";
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
          this.contentplaceholder = "(点谁，回复谁)";
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
            content: self.commentcontent,
            to_comment_id: self.commentid,
            toUid: self.toUID
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            $("#pingluncontent").val("");
            self.commentcontent = "";
            self.contentplaceholder == "(点谁，回复谁)"

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
                to_comment_id: res.data.data[6].to_comment_id,
                toNickname: res.data.data[7].toNickname,
              };
              self.hfList.push(data);
              self.commentcontent = "";
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


      styleComment: function () {
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
          this.$axios.post(self.url + '/index.php/home/index/comment', qs.stringify({
            style_id: self.typeid, //文章id 或者weibo id
            content: self.commentcontent,
            toUid: self.toUID,
            to_comment_id: self.commentid,
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              $("#pingluncontent").val("");
              var coomentListItem = {
                content: res.data.data[0].content,
                to_comment_id: res.data.data[2].commentId,
                portrait: res.data.data[1].portrait,
                uid: res.data.data[3].uid,
                nickname: res.data.data[7].user.nickname,
                type: 'reply',
                toNickname: res.data.data[10].toNickname,
              };
              console.log("dasda:" + coomentListItem);
              self.hfList.push(coomentListItem);
              self.commentcontent = "";
              self.contentplaceholder = "(点谁，回复谁)";
              self.toUid = self.louzhuuid;
              self.nickname = self.louzhunickname;
              self.commentid = self.louzhucommentid;
              console.log(self.hfList);
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

      locationWenzhangxiangqing: function (articalId) {
        if (this.type == "Article_comment" || this.type == 'Article_comment_fabulous') {
          if (this.repostid == null) {
            this.$router.push({name: 'wenzhangxiangqing', query: {articalId: articalId}})
          } else {
            this.$router.push({
              name: 'zhuanfawenzhangxiangqing',
              query: {articalId: articalId, rePostId: this.repostid}
            })
          }
        } else if (this.type == 'square_comment') {
          this.$router.push({name: 'guangchangxiangqing', query: {weiboid: articalId}})
        }else if(this.type == 'style_comment'){
          this.$router.push({name: 'xiufengcaixiangqing', query: {typeid: articalId}})
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

  .xtxxplxq-fb-content {
    width: 94%;
    /*height: 0.9rem;*/
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    background-color: #f5f5f5;
    padding: 0.1rem 0;
  }

  .xtxxplxq-fb-content .fb-img {
    width: 0.9rem;
    height: 0.9rem;
    /*background-image: url('../../../static/img/fengjing.jpg');*/
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.06rem;
    flex-basis: 0.9rem;
    display: block;
    /*margin-right: 0.1rem;*/
    margin-left: 0.1rem;
  }

  .xtxxplxq-fb-content .content-info {
    justify-content: center;
    align-items: center;
    height: auto;
    display: inline;
    margin-left: 0.1rem;
    flex: 1;
    width: calc(100% - 0.2rem);
    /*border: 1px solid seagreen;*/
    position: relative;
    min-height: 0.8rem;

  }

  .contentinfo2 {
    width: calc(100% - 1.2rem) !important;
  }

  .xtxxplxq-fb-content .fa-title {
    font-size: 0.15rem;
    color: #333333;
    /*margin-top: 0.05rem;*/
    margin-bottom: 0.05rem;
    /*border: 1px solid seagreen;*/

    overflow-x: hidden;
    /*word-wrap: ;*/
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 0.1rem;
  }

  .xitongxiaoxipinglunxiangqingdiv .xtxxplxq-fb-content .fb-content-info {
    font-size: 0.14rem !important;
    color: #5c5c5c;
    /*margin-top: 0.1rem;*/
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    position: absolute;
    top: 50%;
    margin-top: 0.1rem;
    /*line-height: 0.25rem;*/
    transform: translateY(-50%);
  }

  .fb-content-info img {
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
    position: relative;
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
    width: calc(100% - 0.52rem);
  }

  .xtxxplxq-nickname {
    font-size: 0.15rem;
    color: #333333;
    line-height: 0.3rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  /*.xtxxpl-info-right-info > p:nth-child(1) {*/
  /*font-size: 0.15rem;*/
  /*color: #333333;*/
  /*line-height: 0.3rem;*/
  /*overflow-x: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*max-width:100%*/

  /*}*/

  .xtxxpl-info-right-info > p:nth-child(2) {
    font-size: 0.12rem;
    color: #999999;
    line-height: 0.12rem;

  }

  .xtxxpl-info-right-commen-list {
    width: 100%;
    /*border: 1px solid slateblue;*/
  }

  .xtxxpl-info-right-commen-list .item .fhliebiaoItem {
    color: #444444;
    font-size: 0.15rem;
    line-height: 0.25rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #d6d6d6;
    max-width: 100%;

  }

  .xtxxpl-info-right-commen-list .item .fhliebiaoItem span {
    font-size: 0.14rem;
  }

  .xtxxpl-info-right-commen-list .item .fhliebiaoItem > span:nth-child(1) {
    color: #6b94b3 !important
  }

  .item {
    width: calc(100%);
  }

  .xtxxpl-info-right-commen-list .item .ArticleCcommentFabulous {
    position: relative;
    /*border: 1px solid slateblue;*/
  }

  .xtxxpl-dianzan-person {
    position: absolute;
    top: -0.3rem;
    right: 0;
    /*border: 1px solid slateblue;*/
    display: flex;
    flex-direction: row;
  }

  .xtxxpl-dianzan-person span {
    font-size: 0.13rem;
    color: #dd191d;

  }

  .xtxxpl-dianzan-person .xtxxpl-dianzan {
    width: 0.18rem;
    height: 0.167rem;
    margin-top: -0.03rem;
    border-radius: 0;
  }

  .xtxxpl-info-right-commen-list .item .xtxxplxqhuifuren {
    color: #6b94b3 !important;
    font-size: 0.14rem !important;
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
    margin-left: 0.06rem;
    margin: 0.07rem 0.07rem;
    border-radius: 0.08rem;
    outline: none;
    padding-left: 0.05rem;
    border: 1px solid #f0f0f0;
    padding-top: 0.1rem;
    font-size: 0.16rem;
    color: #444444;
    height: auto;
    resize: vertical;
    min-height: 0.2rem;
    margin-right: 0.1rem;
    text-align: left;
    width: 75%;

  }

  .xtxxpl-commen-input .send {

    padding: 0 0.15rem;
    border-radius: 0.08rem;
    margin-right: 0.06rem;
    height: 0.34rem;
    margin-top: 0.15rem;
    background-color: #f5746f;
    color: #ffffff;
    line-height: 0.34rem;
    text-align: center;
    font-size: 0.15rem;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
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
    max-width: calc(100% - 0.6rem);
    /*border: 1px solid seagreen;*/
  }

  .releaseeWS div > p {
    font-size: 0.15rem;
    color: #444444;
    max-width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .releaseeWS div > p:nth-child(2) {
    margin-top: 0.08rem;
  }

  .xtxxplxq-line {
    width: 100%;
    height: 0.1rem;
    border-top: 1px solid #f5f5f5;
  }

  .xtxxplxq-dav {
    width: 0.12rem !important;
    height: 0.12rem !important;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;

  }

  .xtxxplxqc-dav {
    width: 0.12rem !important;
    height: 0.12rem !important;
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
  }
</style>
