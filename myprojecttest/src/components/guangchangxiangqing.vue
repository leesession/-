<template>
  <div class="guangchangxiangqing" id="guangchangxiangqing" >
    <div class="guangchangdetail gxcq-guangchangdetail ">
      <div class="item">
        <div class="info">
          <!--第一排-->
          <div class="infoMsg">
            <div class="infoMsg-left">
              <img :src=detail.portrait class="guangchangheader">
              <img src="../../static/img/V@2x.png" class="gcdav" v-show="parseInt(detail.uid)==50">
              <img src="../../static/img/jinv.png" class="gcdav" v-show="detail.user_type=='1'">
            </div>

            <div class="infoMsg-info">
              <p class="name">{{detail.nickname}}
                <img src="../../static/img/huangv.png" v-show="detail.uid=='1'" class="gcxqhuangv" >
                <span v-show="detail.uid=='6463'">官方认证</span>
                <span v-show="detail.uid=='6864'">官方认证</span>
                <span v-show="detail.uid=='26'">官方认证</span>
              </p>
              <p class="time">{{detail.create_time}}</p>
            </div>
          </div>


          <div class="content" v-html="changeEmoj(detail.content)"></div>
          <!--图片列表-->
          <!--<div class="gaungchangImgg">-->
            <!--<div class="out-img" v-if="detail.image!=''&&detail.image!=null">-->
              <!--<div class="inner-img" v-lazy:background-image="detail.image"-->
                   <!--@click="previewImgUrl($event)" :value="detail.image"></div>-->
            <!--</div>-->
            <!--<div class="out-img" v-if="detail.image2!=''&&detail.image2!=null">-->
              <!--<div class="inner-img" v-lazy:background-image="detail.image2"-->
                   <!--@click="previewImgUrl($event)" :value="detail.image2"></div>-->
            <!--</div>-->


          <!--</div>-->
          <div class="gaungchangImgg" v-if="detail.images.length<3">
            <!--图一-->
            <div class="out-img" v-if="detail.images.length===1 && detail.images[0] !== ''" v-for="item in detail.images">
              <div class="inner-img" v-lazy:background-image="item"
                   @click="previewImgUrl($event)" :value="item">
              </div>
            </div>
            <!--图二-->
            <div class="out-img2" v-if="detail.images.length===2 " v-for="item in detail.images">
              <div class="inner-img" v-lazy:background-image="item"
                   @click="previewImgUrl($event)" :value="item">
              </div>
            </div>
          </div>
          <div class="gaungchangImgg1" v-if="detail.images.length>2 && detail.images.length<6">
            <!--图三-->
            <div class="out-img3" v-if="detail.images.length===3 " >
              <div class="inner-img"  v-lazy:background-image="detail.images[0]"
                   @click="previewImgUrl($event)" :value="detail.images[0]"></div>
              <div class="right">
                <div v-lazy:background-image="detail.images[1]"
                     @click="previewImgUrl($event)" :value="detail.images[1]"></div>
                <div v-lazy:background-image="detail.images[2]"
                     @click="previewImgUrl($event)" :value="detail.images[2]"></div>
              </div>
            </div>
            <!--图四-->
            <div class="out-img" v-if="detail.images.length===4" v-for="(item,index) in detail.images">
              <div class="top" v-lazy:background-image="item"
                   @click="previewImgUrl($event)" :value="item" v-if="index===0">
              </div>
              <div class="inner-img" v-lazy:background-image="item"
                   @click="previewImgUrl($event)" :value="item" v-else>
              </div>
            </div>
            <!--图五-->
            <div class="out-img1" v-if="detail.images.length===5 " >
              <div class="inner-img"  v-lazy:background-image="detail.images[0]"
                   @click="previewImgUrl($event)" :value="detail.images[0]"></div>
              <div class="right">
                <div v-lazy:background-image="detail.images[1]"
                     @click="previewImgUrl($event)" :value="detail.images[1]"></div>
                <div v-lazy:background-image="detail.images[2]"
                     @click="previewImgUrl($event)" :value="detail.images[2]"></div>
                <div v-lazy:background-image="detail.images[3]"
                     @click="previewImgUrl($event)" :value="detail.images[3]"></div>
                <div v-lazy:background-image="detail.images[4]"
                     @click="previewImgUrl($event)" :value="detail.images[4]"></div>
              </div>
            </div>

          </div>
          <!--图6 - 9 -->
          <div class="gaungchangImgg2" v-if="detail.images.length>3 && detail.images.length>5">

            <div class="out-img"  v-for="item in detail.images">
              <div class="inner-img" v-lazy:background-image="item"
                   @click="previewImgUrl($event)" :value="item">
              </div>
            </div>
          </div>
          <!--点赞div等-->
          <div class="item-c-div">
            <div class="comment-div">
              <div class="commen-middle" @click="parise(detail.id,detail.fabulous_state,detail.uid)">
                <img src="../../static/img/yidianzan.png" class="dianzan" v-if="detail.fabulous_state=='true'">
                <img src="../../static/img/dianzan.png" class="dianzan" v-else>

                <p :class="{yidianzan:detail.fabulous_state=='true'}">{{detail.support_down}}</p>
              </div>
            </div>

            <div class="comment-div pinglunanniu"
                 @click="Comment(detail.uid,detail.id,$event)">
              <div class="commen-middle ">
                <img src="../../static/img/pinglun.png" class="pinglun">
                <p>{{detail.comment_count}}</p>
              </div>
            </div>
          </div>
          <div class="gc-item-line"></div>
        </div>

      <div class="gcxq-zhanwei"></div>
        <div class="gcxq-commen-len">&nbsp;&nbsp;&nbsp;评论({{detail.comment_count}})</div>
        <div class="gc-commen-list" v-if="detail.comment.length>0">
          <div class="gc-commen-list-item-b" v-for="(item,commenindex) in detail.comment">
            <img :src="item.portrait" class="header">
            <div class="gc-commen-list-item-s">
              <p class="gc-commen-list-item-s-nickname" v-html="item.nickname"></p>
              <p class="gc-commen-list-item-s-time">{{item.create_time}}</p>
              <p class="gc-commen-list-item-s-content" v-html="changeEmoj(item.content)" @click="toComment(item.id,item.nickname,item.uid,detail.id,commenindex,item.id,0)"></p>
              <div class="gc-commen-list-item-s-fhList">
                <p class="gc-commen-list-item-s-fhList-info" v-for="(hfitem,hfindex) in detail.hf" v-if="hfitem.to_comment_id==item.id" @click="toComment(hfitem.to_comment_id,hfitem.nickname,hfitem.uid,detail.id,hfindex,hfitem.id,1)">
                  <span class="huifuren" v-html="hfitem.nickname"></span>
                  <span>回复</span>
                  <span class="huifuren" v-html="'@'+hfitem.toNickname+':'"></span>
                  <span v-html="changeEmoj(hfitem.content)"></span>
                </p>
              </div>
            </div>
          </div>

        </div>
        <div class="gc-block"></div>
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
    <div class="commen-input" @click="Comment(detail.uid,detail.id,$event)" v-if="footerInputComment">
      <textarea type="text" class="zhuangshi" id="footertextarea" disabled placeholder="请输入评论内容"></textarea>
      <div class="send">发送</div>
    </div>

  </div>
</template>
<script>

  import {changeEmoj, EmojArray} from "../../static/js/timeFormat";
  import {Toast} from 'mint-ui';

  require("../../static/css/guangchang.css")
  export default {
    name: "guangchangxiangqing",
    data() {
      return {
        changeEmoj,
        url: this.COMMEURL.commonUrl,
        loading: "",
        to_comment_id: "",//回复人id
        tocommentname: "",//回复评论对象
        footerInputComment: true,//是否显示评论输入框
        pinglunCompoholder: "请输入评论内容",//评论@谁
        user_id: "",//自己的id 用于不能给自己点赞
        cleartimeout: "",
        comment_uid: "",//记录点击评论回复的uid
        commentContent: "",//评论具体内容
        commentType: 0,//评论方式  0 为直接点击评论按钮  1 为点击评论内容
        emojArray: EmojArray(),//表情包
        commentalert: "",//评论弹窗
        elMessageCommentShow: false,//显示评论弹窗
        emojarrayphrase: [],//表情包路径
        faceTag: '',
        emojpanelshow: false,
        parseEmojarray: [],
        weiboid: "",//微博id
        detail: "",
        sheetVisible:false,//是否显示底部弹窗
        actiondata: [{ //底部弹窗数据
          name: '回复',
          method:""
        }, {
          name: '删除',
          method: ''
        }],
        clickIndex:'',//点击的index
        deleteId:"",//删除的id
        deleteType:0,
      }
    },
    watch: {
      detail: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
        },
        deep: true
      }

    },

    mounted() {
      this.weiboid = this.$route.query.weiboid;
      this.getData();
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this.beforeScrollTop = document.body.scrollTop;
      $("#guangchang").css('min-height', $(window).height() + "px")
    },

    //广场动态

    methods: {
      getData() {
        var self = this;
        this.$axios.post(self.url + "/index.php/weibo/index/weiDetails",
          qs.stringify({"weibo_id": self.weiboid})
        ).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          console.log(res);
          if (res.data.code == 200) {
            self.detail = res.data.data;
            self.user_id = res.data.uid;
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

      },
      parise: function (id, iszan, uid) {
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
            self.detail.fabulous_state = "true";
            self.detail.support_down = parseInt(self.detail.support_down) + 1;
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
      /**
       * 点击底部输入框
       * */
      Comment: function () {
        this.elMessageCommentShow = true;
        this.footerInputComment = false;//显示底部评论框
        this.pinglunCompoholder = "请输入评论内容";
        this.to_comment_id="";
        this.comment_uid="";
        setTimeout(function () {
          $("#zhuangshi").focus();
        }, 500);
        this.commentType = 0;
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
        this.footerInputComment=false;
        setTimeout(function () {
          $("#zhuangshi").focus();
        }, 500)
      },

    /**
     *commenid:
     * commentname:被回复人昵称
     * uid：评论人id
     * id:微博id
     * deletIndex:删除下标
     * deleteId：删除id
     * */
      toComment: function (commenid, commentname, uid, id, deletIndex, deleteId,type) {
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
        this.deleteType=type;


      },
      //提交评论
      /**
       *提交评论
       * @param instance
       * @param done
       */
      confirmPinglun: function () {
        if ($.trim(this.commentContent).length == 0) {
          Toast({
            message: "请输入评论内容",
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
          weibo_id: self.weiboid,
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

            self.detail.comment_count = parseInt(self.detail.comment_count) + 1;

            var data = {
              content: res.data.data[0].content,
              id: res.data.data[2].comment_id,
              nickname: res.data.data[5].nickname,
              uid: res.data.data[3].uid,
              to_comment_id: res.data.data[6].to_comment_id,
              toNickname: res.data.data[7].toNickname,
              portrait:res.data.data[1].portrait,
              create_time:res.data.data[4].create_time
            };

            //直接评论
            if(self.commentType==0){
              self.detail.comment.push(data);
            }else {
              if(self.detail.hf==null){
                self.detail.hf=[];
              }
              self.detail.hf.push(data);


            }

            self.commentContent = "";
            self.to_comment_id="";
            self.comment_uid="";

          self.footerInputComment=true;
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
        this.footerInputComment=true;

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
        var item=$(".gc-commen-list-item-b").eq(self.clickIndex).find(".gc-commen-list-item-s-fhList-info").length;
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

              if(self.deleteType==0){
                self.detail.comment.splice(self.clickIndex, 1);
                self.detail.comment_count = parseInt(self.detail.comment_count)-1-item;
              }else{
                self.detail.hf.splice(self.clickIndex, 1);
                self.detail.comment_count = parseInt(self.detail.comment_count)-1;
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
      },


    }

  }
</script>
<style>

  #guangchangxiangqing {
    width: 100%;
    position: absolute;
    /*top: 0.1rem;*/
    height: 100%;
    background-color: #ffffff;
    /*border: 1px solid seagreen;*/
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .gxcq-guangchangdetail {
    width: 100%;
    height: calc(100% - 0.7rem);
    overflow-y: scroll;
  }

  .gcxq-commen-input {
    width: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0.05rem;
    left: 0;
    z-index: 9;
  }

  .gcxq-commen-input #zhuangshi {

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
    resize: vertical;
    width: 75%;
    min-height: 0.2rem;

    margin-right: 0.1rem;
    text-align: left;

  }

  .gcxq-commen-input .emoj {
    width: 0.24rem;
    height: 0.24rem;
    margin: 0.18rem 0.10rem;
  }

  .gcxq-commen-input .send {

    padding: 0 0.15rem;
    border-radius: 0.04rem;
    margin-right: 0.1rem;
    height: 0.34rem;
    margin-top: 0.15rem;
    background-color: #DD191D;
    color: #ffffff;
    line-height: 0.34rem;
    text-align: center;
    font-size: 0.15rem;
    justify-content: flex-end;
  }


</style>
