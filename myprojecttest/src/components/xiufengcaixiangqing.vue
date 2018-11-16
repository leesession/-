<template>
  <div class="xiufengcaixiangqing">
    <vue-better-scroll
      class="xfcxqwrapper"
      ref="scroll"
      :probeType="2"
      :scrollbar="pullupconfig.scrollbarObj"
      :pullDownRefresh=false
      :listenScroll=true
      :pullUpLoad="pullupconfig.pullUpLoadObj"
      :startY="parseInt(pullupconfig.startY)"
      @pullingUp="onCommentPullingUp">
      <div class="xfcxq">
        <img :src="detail.portrait" class="xfcxq-header" @click="LocationTozhuye(detail.uid)">
        <div class="xfcxq-left">
          <p class="xfcxq-nickname">{{detail.nickname}}
            <img src="../../static/img/huangv.png" v-show="detail.uid=='1'" class="grzxhuangv" >
            <span class="yunying" v-show="detail.uid=='6463'">官方认证</span>
            <span class="yunying" v-show="detail.uid=='6864'">官方认证</span>
            <span class="yunying" v-show="detail.uid=='26'">官方认证</span>

          </p>
          <p class="xfcxq-time">{{detail.establish_time}}</p>
          <p class="xfcxq-content">{{detail.brief_introduction}}</p>
          <div class="xfcxq-infoImg">
            <div class="xfcxq-out-img" v-for="(item,index) in imgarray" @click="previewImg(item,imgarray)">
              <div class="xfcxq-inner-img" v-bind:style="{backgroundImage:'url('+item+')'}"></div>
            </div>
          </div>
          <div class="xfcxq-option-div">
            <div class="xfc-commen-option xfc-iszan">
              <div v-if="detail.fabulous_state=='false'" @click="praise($event,detail.id,detail.uid)"><img
                src="../../static/img/dianzan.png" alt=""><span>({{detail.abulous_count}})</span></div>
              <div v-else><img src="../../static/img/yidianzan.png" alt=""><span class="yidianzan">({{detail.abulous_count}})</span>
              </div>
            </div>
            <div class="xfc-commen-option xfc-commen">
              <div @click="CommentChoose"><img
                src="../../static/img/pinglun.png" alt=""><span>({{detail.comment_count}})</span></div>

            </div>
          </div>
        </div>
      </div>
      <div class="xfcxq-zhanwei"></div>
      <div class="xfcxq-comment">
        <p class="xfcxq-comment-p">评论({{detail.comment_count}})<span></span></p>
        <div class="xfcxq-commen-list">
          <div class="xfcxq-commen-list-item-b" v-for="(item,index ) in commentList">
            <div class="xfcxq-commen-list-item-b-item">
              <img :src="item.portrait" class="header">
              <div class="xfcxq-commen-list-item-b-info">

                <div class="info">
                  <p v-html="item.nickname"></p>
                  <p>{{item.create_time}}</p>
                </div>
                <!--uid, name, commenId,type,tocommenId-->
                <p class="xfcxq-commen-list-item-b-info-commen" v-html="changeEmoj(item.content)"
                   @click="ReplyComment(item.uid,item.nickname,item.id,1,item.id,index,item.id,0)"></p>
                <div class="xfcxq-commen-list-item-s">
                  <p class="item-s-p-1" v-for="(hfitem,hfindex) in hfList" v-if="hfitem.to_comment_id==item.id"
                     @click="ReplyComment(hfitem.uid,hfitem.nickname,hfitem.to_comment_id,1,hfitem.comment_id,hfindex,hfitem.comment_id,1)"><span
                    class="s-name" v-html="hfitem.nickname">张三</span><span><span>:回复</span><span
                    class="huifuren">@{{hfitem.toNickname}}:</span> <span
                    v-html="changeEmoj(hfitem.content)"></span></span></p>

                </div>
              </div>
            </div>
            <div class="xfcxq-com-zhanwei" v-if="index!=commentList.length-1"></div>
          </div>


        </div>
        <div style="width: 100%;height: 0.4rem"></div>
      </div>

    </vue-better-scroll>

    <div class="xfcxq-comment-div" @click="CommentChoose" v-if="footerInputComment">
  <textarea type="text" class="zhuangshi" id="footertextarea"
            placeholder="请输入评论" disabled></textarea>
      <div class="send">发送</div>
    </div>

    <mt-actionsheet
      :actions="actiondata"
      v-model="sheetVisible">
    </mt-actionsheet>

    <div class="el-message-comment" v-show="elMessageCommentShow">
      <div class="el-message-box">
        <div class="el-comment-header">
          <p>评论</p>
          <img src="../../static/img/close.png" alt="" @click="cancelComment">
        </div>

        <div class="el-message-comment-comment">
          <div class="el-message-comment-comment-text">
            <textarea type="text" id="zhuangshi" v-model="commentContent" :placeholder="commentPlaceholder"></textarea>
            <img src="../../static/img/emoj.png" class="emoj" @click="emojpanelclick">
            <div class="emojpanel" v-show="emojpanelshow">
              <img :src="imgitem.url" v-for="(imgitem,index) in emojArray"
                   @click="clickImg(imgitem.phrase,index,imgitem.url)">
            </div>
          </div>
          <div class="el-message-comment-comment-button">
            <div @click="cancelComment">取消</div>
            <div @click="sendCommen">评论</div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<script>


  import {wxConfig, share, shareUrl, EmojArray, changeEmoj} from "../../static/js/timeFormat";
  import {Toast} from 'mint-ui';

  require("../../static/css/xiufengcaixiangqing.css")
  require("../../static/css/commentalert.css")
  export default {
    name: "xiufengcaixiangqing",
    data() {
      return {
        changeEmoj,
        url: this.COMMEURL.commonUrl, pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        style_id: '',
        detail: '',
        imgarray: [],
        actiondata: [{ //底部弹窗数据
          name: '回复',
          method: ""
        }, {
          name: '删除',
          method: ''
        }],
        sheetVisible: false,//显示底部弹窗
        elMessageCommentShow: false,//显示评论弹窗
        emojpanelshow: false,//表情包面板
        emojArray: EmojArray(),//表情包
        commentPlaceholder: "请输入评论",
        page: 1,//
        commentList: [],//评论列表
        hfList: [],//回复列表
        commentContent: "",//回复具体内容
        pinglunType: 0,//评论类型  直接回复1 或者评论0
        footerInputComment: true,//显示底部评论框
        user_id: "",
        pinglunrenname: "",//评论人昵称
        Replies: "",//被回复人的姓名
        toUid: "",
        commentId: "",//评论id
        deleteid: "",//删除id
        deleteIndex: "",
        deletType: 0,//删除类型  直接删除0 或者删除回复1
      }
    },
    watch: {
      commentList: {
        handler(curVal, oldVal) {
        },
        deep: true
      },
      hfList: {
        handler(curVal, oldVal) {
        },
        deep: true
      },
      detail: {
        handler(curVal, oldVal) {
        },
      },
    },
    mounted() {

      $(".before-trigger span").text("");

      this.style_id = this.$route.query.typeid;

      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'rgba(255,255,255)'
      });
      this.$loading.fullscreenLoading = true;
      this.getdata();
      this.onCommentPullingUp();
      wxConfig(this, window.location.href.split('#')[0]);
      share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this, location.href), "分享你生活的每一个精彩瞬间，让我们为你点赞");

    },
    methods: {
      getdata: function () {
        var self = this;
        this.$axios.post(self.url + "/index.php/home/index/detail", qs.stringify({
          style_id: self.style_id
        })).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.detail = res.data.data;
            self.user_id = res.data.uid;
            for (var i in res.data.data) {
              if (i.indexOf("url") > -1 && i.indexOf('urlsize1') == -1) {
                if (res.data.data[i] == null || res.data.data[i] == '') {
                } else {
                  self.imgarray.push(res.data.data[i]);
                }
              }
            }
          }
        });
      },
      Comment: function () {
        //文章详情
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php/home/index/comment_detail", qs.stringify({
            style_id: self.style_id,
            page: self.page
          })).then(function (res) {
            // self.$loading.fullscreenLoading = false;
            // self.loading.close();

            if (res.data.code == 200) {
              resolve(res.data.data);
            } else {
              Toast({
                message: res.data.msg,
                duration: 2000,
                position: "middle"
              })
            }
          }).catch(function (e) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            console.log("错误：" + e);
          })
        });
      },
      //评论上啦加载
      onCommentPullingUp: function () {
        var self = this;
        this.Comment().then(function (res) {
          if (res.comment) {
            self.commentList = self.commentList.concat(res.comment);
            self.hfList = self.hfList.concat(res.hf);
            self.page++;

            if (self.page <= res.totalPage) {
              self.$refs.scroll.forceUpdate(true);
            } else {
              self.$refs.scroll.forceUpdate(false);
              $(".before-trigger span").text("");
            }
            console.log(self.commentList);
          } else {
            self.$refs.scroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          }

        })
      },
      previewImg: function (curUrl, imgarray) {
        wx.previewImage({
          current: curUrl,
          urls: imgarray
        });
      },
      CommentChoose: function () {
        //输入评论 直接发送评论内容
        // this.pinglunType = 0;
        // this.footerInputComment = false;//显示底部评论框
        // this.elMessageCommentShow = true;
        // this.commentPlaceholder = "请输入评论内容";
        // this.footerInputComment = false;
        // setTimeout(function () {
        //   $("#zhuangshi").focus();
        // }, 500)
        Toast({
          message: "秀风采已合并到秀生活，请移步到秀生活进行评论与点赞",
          duration: 2000,
          position: 'middle'
        })
      },
      /**
       * 取消评论*/
      cancelComment: function () {
        this.elMessageCommentShow = false;
        this.commentContent = "";
        this.pinglunCompoholder = "请输入评论内容"
        this.emojpanelshow = false;
        this.str = "";
        this.footerInputComment = true;

      },
      /**
       * 控制表情包面板显示
       */
      emojpanelclick: function () {
        this.emojpanelshow = !this.emojpanelshow;
      },
      /**
       * 选择是回复评论还是删除评论
       * @param uid 评论人id
       * @param name 评论人姓名
       * @param commenId 评论id

       * @param type 评论类型  直接评论0  回复1
       * @param tocommenId 被评论人id
       * @constructor
       */
      // hfitem.uid,hfitem.nickname,hfitem.to_comment_id,0,hfitem.id,hfindex

      ReplyComment: function (uid, name, commenId, type, tocommenId, index, deleteid, deleteType) {
        this.sheetVisible = true;
        if (this.user_id == uid) {
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
        this.deleteIndex = index;
        this.sheetVisible = true;
        //判断回复类型
        this.pinglunType = type;
        this.toUid = uid;
        this.commentId = commenId;
        this.deleteId = deleteid;

        this.deletType = deleteType


        this.pinglunrenname = "@" + name + ":";
        this.commentPlaceholder = "@" + name + "";
        this.Replies = name; //被回复人的姓名

      },
      sendCommen: function () {
        if ($.trim(this.commentContent).length == 0) {
          Toast({
            message: "请输入评论内容",
            duration: 2000,
            position: "middle"
          })
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '评论中',
            background: 'transparent'
          });

          var toUid = "";
          var to_comment_id = "";
          if (this.pinglunType == 0) {
            //直接评论
          } else {

            toUid = this.toUid;
            to_comment_id = this.commentId;
          }
          var self = this;
          this.$axios.post(self.url + '/index.php/home/index/comment', qs.stringify({
            style_id: self.style_id, //文章id
            content: self.commentContent,
            toUid: toUid,
            to_comment_id: to_comment_id,

          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();

            if (res.data.code == 200) {
              // console.log("评论：" + JSON.stringify(res));
              Toast({
                message: "评论成功",
                position: 'middle',
                duration: 2000
              })
              self.commentContent = "";
              self.elMessageCommentShow = false;
              self.emojpanelshow = false;
              self.footerInputComment = true;
              // $(".specilaContent").text("");
              self.detail.comment_count = parseInt(self.detail.comment_count) + 1
              if (self.pinglunType == 0) {
                var coomentListItem = {
                  content: res.data.data[0].content,
                  id: res.data.data[2].commentId,
                  portrait: res.data.data[1].portrait,
                  uid: res.data.data[3].uid,
                  create_time: res.data.data[4].create_time,
                  nickname: res.data.data[7].user.nickname,
                  commentFabulous: res.data.data[5].commentFabulous,
                  fabulous: res.data.data[6].fabulous,
                  user_type: res.data.data[9].user_type

                };
                // console.log("dasda:" + coomentListItem);
                self.commentList.push(coomentListItem);
                console.log(self.commentList);

                // console.log("回复啊哈哈：" + parseInt(self.articalDetail.comment));
                // self.articalDetail.comment = parseInt(self.articalDetail.comment) + 1;
              } else {
                var huifuItem = {
                  comment_id: res.data.data[8].to_comment_id,
                  content: res.data.data[0].content,
                  nickname: res.data.data[7].user.nickname,
                  uid: res.data.data[3].uid,
                  to_comment_id: res.data.data[2].commentId,
                  toNickname: res.data.data[10].toNickname,
                  id: res.data.data[8].to_comment_id
                };
                if (self.hfList == null) {
                  self.hfList = [];
                }
                self.hfList.push(huifuItem);
                console.log(self.hfList);
              }

              self.commentContent = "";
              self.commentPlaceholder = "请输入评论内容";
              self.focusState = false;
              $("#zhuangshi").blur();
              self.$refs.scroll.refresh();
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
        //
        //   this.$axios.post(self.url + '/index.php/home/index/styleFabulous', qs.stringify({
        //     style_id: id
        //   })).then(function (res) {
        //     if (res.data.status == '1') {
        //
        //       self.detail.fabulous_state = 'true';
        //       self.detail.abulous_count = parseInt(self.detail.abulous_count) + 1;
        //
        //     }
        //   })
        //
        //
        // }

      },
      clickCommenList: function () {
        //评论评论  被评论人id  评论人id 文章id
        this.elMessageCommentShow = true;
        this.footerInputComment = false;
        setTimeout(function () {
          $("#zhuangshi").focus();
        }, 500)
      },
      // deletepinglun: function (e, id, index, leixing)
      deletepinglun: function () {
        var self = this;
        var item = $(".xfcxq-commen-list-item-s").eq(self.deleteIndex).find(".item-s-p-1").length;
        this.$confirm("是否删除该评论?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          self.loading = self.$loading({
            lock: true,
            text: '删除中',
            background: 'transparent'
          });
          self.$axios.post(self.url + '/index.php/home/index/comment_delete', qs.stringify({
            comment_id: self.deleteId,
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              Toast({
                message: "删除成功",
                duration: 2000,
                postion: 'middle'
              })
              if (self.deletType == 0) {
                //指定删除某数组项目
                self.commentList.splice(self.deleteIndex, 1);
                self.detail.comment_count = parseInt(self.detail.comment_count) - item - 1
              } else if (self.deletType == 1) {
                self.hfList.splice(self.deleteIndex, 1);
                self.detail.comment_count = parseInt(self.detail.comment_count) - 1
              }


              console.log(self.hfList);
            }

          }).catch(function (e) {

          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });

      },
      clickImg: function (value, index, url) {
        this.commentContent += value;
      },
      LocationTozhuye: function (uid) {
        this.$router.push({name: 'gerenzhuye', query: {toUid: uid}})
      }
    },


  }
</script>
<style>

</style>
