<template>
  <div class="wenzhangxiangqing">

    <!--详细信息-->
    <vue-better-scroll
      class="wzxqwrapper"
      ref="scroll"
      :probeType="2"
      :scrollbar="pullupconfig.scrollbarObj"
      :pullDownRefresh=false
      :listenScroll=true
      :pullUpLoad="pullupconfig.pullUpLoadObj"
      :startY="parseInt(pullupconfig.startY)"
      @pullingUp="onCommentPullingUp"
    >
      <div class="wzxq-info" @click="locationPersonalHomepage(repostContent.repostuid)">
        <div class="wzxq-info-left">
          <img :src="repostContent.repostportrait" class="wzxq-info-header">
          <img src="../../static/img/V@2x.png" class="wzxqdav" v-show="parseInt(repostContent.repostuid)==50">
          <img src="../../static/img/jinv.png" class="wzxqdav" v-show="repostContent.user_type=='1'">
        </div>
        <div class="info-Msg">
          <div class="name">{{repostContent.repostnickname}}<img src="../../static/img/huangv.png" class="zfwzxqhuangv" v-show="repostContent.repostuid=='1'">
            <span v-show="repostContent.repostuid=='6463'">官方认证</span>
            <span v-show="repostContent.repostuid=='6864'">官方认证</span>
            <span v-show="repostContent.repostuid=='26'">官方认证</span>
          </div>
          <div class="time">
            <span>{{repostContent.repostcreate_time}}</span>
            <span class="personNuM">阅读次数:{{repostContent.repostview}}<span></span></span>
          </div>
        </div>
        <div class="wzxq-dropdown" v-show="user_id!=repostContent.repostuid">
          <img src="../../static/img/dropdown.png" class="more" @click="clickMore($event)">
          <div class="wzxq-dropdownList" v-show="isshowdropList">
            <ul>
              <li @click="Collection($event,repostContent.collection_state,repostContent.repostuid)">

                {{repostContent.collection_state=='false'?'收藏':'已收藏'}}
              </li>
              <!--uid, isgz, e-->
              <li @click="follow(repostContent.uid,repostContent.gz_state,$event)">
                {{repostContent.gz_state=='false'?'关注':'已关注'}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="zfwzxq-content" v-html="repostContent.reposttitle==''?'此文甚好，所以转发':repostContent.reposttitle"></div>
      <div class="detail">


        <!--</div>-->

        <div class="title">{{articalDetail.title}}</div>
        <div class="zfwzxq-nickname">作者:{{articalDetail.nickname}}</div>
        <div class="content-info" v-html="articalDetail.content" @click="previewImgUrl($event)"></div>

        <div class="banquanshengming">声明：本文由秀芳华用户撰写并发布，观点仅代表作者本人，不代表秀芳华立场。</div>
        <img src="../../static/img/dashangx2x.png" class="dashangx2x" @click="dashang(articalDetail.uid)">
        <div class="zhanwei"></div>
      </div>
      <div class="item-c-button">

        <div class="zan"
             @click="praise(id,repostContent.repostuid,'Article_fabulous','',repostContent.repostfabulous_state,'')">
          <img src="../../static/img/yidianzan.png" v-if="repostContent.repostfabulous_state=='true'">
          <img src="../../static/img/dianzan.png" v-else>
          <p :class="{yidianzan:repostContent.repostfabulous_state=='true'}">
            ({{repostContent.repostfabulous_count==null?0:repostContent.repostfabulous_count}})</p>
        </div>
      </div>
      <!--占位符-->
      <div class="wenzhangxiangqingline"></div>


      <!--评论列表-->
      <div class="wzxq-commen">
        <div class="pl">评论({{repostContent.repostcomment}})</div>

        <div class="wzxq-commen-list">
          <div class="wzxq-item" v-bind:class="{ isMarginTop: index==0 }"
               v-for="(commentItem,index) in repostcommentList">
            <div class="wzxq-left">
              <img class="wzxq-header" :src="commentItem.portrait">
              <img src="../../static/img/V@2x.png" class="commendav" v-show="parseInt(commentItem.uid)==50">
              <img src="../../static/img/jinv.png" class="commendav" v-show="commentItem.user_type=='1'">
            </div>
            <div class="wzxq-item-info">
              <div class="item-info-right">
                <div class="wzxq-info-msg">
                  <div class="name">{{commentItem.nickname}}</div>
                  <div class="time">{{commentItem.create_time}}</div>
                </div>
                <div class="shanchu-zan-btn">
                  <!--<div class="shanchu"-->
                       <!--@click="deletepinglun($event,commentItem.to_comment_id?commentItem.to_comment_id:commentItem.id,index,'')"-->
                       <!--v-if="commentItem.uid==user_id">-->
                    <!--<img src="../../static/img/shanchu.png">-->
                  <!--</div>-->
                  <div class="zan" v-if="commentItem.uid!=user_id"
                       @click="praise(articalDetail.id, commentItem.uid,'Article_comment',index,commentItem.commentFabulous,commentItem.id)">
                    <img src="../../static/img/dianzan.png" v-if="commentItem.commentFabulous=='false'">
                    <img src="../../static/img/yidianzan.png" v-else>
                    <p :class="{'yidianzan':commentItem.commentFabulous=='true'}">({{commentItem.fabulous}})</p>
                  </div>
                </div>

              </div>
              <!---->
              <div class="wzxq-content"
                   @click="commentary(commentItem.uid,commentItem.nickname,commentItem.id,index,true,'','')"
                   v-html="changeEmoj(commentItem.content)"></div>

              <!--回复列表-->
              <div class="wzxq-commen-list">
                <ul>
                  <li v-for="(hfItem,hfindex) in hfList" v-if="hfItem.commentid==commentItem.id">
                    <p class="huifuliebiaoFir"
                       @click="commentary(hfItem.uid,hfItem.nickname,hfItem.commentid,hfindex,true,'hfpl',hfItem.to_comment_id)">
                      <span class="commen-list-name">{{hfItem.nickname}}:</span>
                      <span class="commen-list-content" >
                        回复<span class="huifuren" >@{{hfItem.toNickname}}:</span>
                        <span v-html="changeEmoj(hfItem.content)"></span>
                      </span>
                      <!--<img src="../../static/img/shanchu.png" class="lajixiang" v-if="hfItem.uid==user_id"-->
                           <!--@click="deletepinglun($event,hfItem.to_comment_id?hfItem.to_comment_id:hfItem.commentid,hfindex,'huifu')">-->
                    </p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </vue-better-scroll>
    <!--</scroller>-->
    <!--打赏弹窗-->
    <div class="dashangDialog" v-bind:class="{'dashangDialogActive':isdashangDialog}" v-show="isdashangDialog">
      <div class="dashangD-Out">
        <img src="../../static/img/close.png" class="dashang_close" @click="closeDashang">
        <div class="dashangD_div">
          <img :src="articalDetail.portrait" class="dashang_header">
          <img src="../../static/img/jinv.png" class="dasahngdav" v-show="articalDetail.user_type=='1'">
          <p>{{articalDetail.user.nickname}}</p>
          <div class="money">
            <span>￥</span>
            <span class="Num" v-if="boolean">{{randomMoney}}</span>
            <!--<input type="text" v-else>-->
            <input class="input-div" v-else type="number"/>
          </div>
          <router-link
            :to="{name:'faqizhifu',query:{money: randomMoney,articalId:repostid,rePostId:id,balance:balance,type:'zhuanfawenzhangxiangqing'}}">
            <!--<div class="shang" @click="payMent">赏</div>-->
            <div class="shang">赏</div>
          </router-link>
        </div>

      </div>
    </div>


    <div class="commen-input" @click="CommenInput" v-show="footerInputComment">

      <textarea type="text" class="zhuangshi" id="footertextarea" disabled placeholder="请输入评论内容"
                ref="pinglunshurukuang"></textarea>
      <div class="send" @click="sendCommentToTal">发送</div>
    </div>
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
            <div @click="sendCommentToTal">评论</div>
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
  import {Toast} from 'mint-ui';
  import {wxConfig, share, shareUrl, changeEmoj, EmojArray} from "../../static/js/timeFormat";

  require("../../static/css/wenzhangxiangqing.css")
  export default {
    name: "zhuanfawenzhangxiangqing",
    data() {
      return {
        changeEmoj,
        commentContent: "",
        url: this.COMMEURL.commonUrl,//公共地址
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        repostContent: "",//转发的文章详情内容
        articalDetail: "",//文章详情
        isdashangDialog: false,//打赏弹窗弹出
        boolean: true, //显示是否修改打赏金额
        randomMoney: '',//随机显示金额
        balance: "",//账户余额
        id: "",//文章id
        repostid: "",//转发id
        uid: "",//评论人id
        toUid: "",//回复评论必填【回复人id】评论时为空
        repostcommentList: [],//评论列表
        hfList: [],//回复列表
        commentId: "",//评论回复的id

        loading: "",//过渡动画
        code: "",
        amount: "",//打赏金额
        beforeScrollTop: '',
        wzxqpage: 1,
        ispinglunEmoj: false,//是否显示评论emoj
        iszhuanfaEmoj: false,//是否显示转发emoj
        zhaunfaUid: '',//被转发文章的用户的id

        pinglunrenname: "",//点击评论人回复
        pinglunrencontent: "",//小评论框content
        zhaunfaContent: "",//转发内容
        user_id: "",//自己的id 用于不能给自己点赞和打赏
        is_mobile: false,//判断用户是否实名认证过
        pinglunType: '',//评论内容的type,为空时表示直接点击发送按钮；为hfpl时表示 点击评论具体内容进行回复
        commentPlaceholder: "请输入评论内容",//评论输入框的placeholder 回复评论内容时  值为@xxx
        clickrepostrepostcommentListIndex: "",//记录点击评论的index;
        commentName: "",//表示被回复人的姓名
        focusState: false,//评论输入框获取焦点
        footerInputComment: true,//底部评论框是否可见
        ispay: "",//是否打赏过
        paycount: "",//今日打赏次数
        isshowdropList: false,//是否显示下拉列表
        isshowdropList: false,//是否显示下拉列表
        elMessageCommentShow: false,//是否显示评论弹窗
        emojArray: EmojArray(),//表情包
        emojpanelshow: false,//是否显示表情面板
        actiondata: [{ //底部弹窗数据
          name: '回复',
          method: this.clickCommenList
        }, {
          name: '删除',
          method: ''
        }],
        sheetVisible: false,//显示底部弹窗
        clickIndex: '',
        leixing:'',
      }
    },
    watch: {
      repostcommentList: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
          if (curVal.length > 0) {
            $(".before-trigger span").text("");
          } else {
            $(".before-trigger span").text("沙发还在,快给楼主评论一番`  吧");
          }

        },
        deep: true
      },
      repostContent: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
          // console.log(curVal, oldVal)
        },
      },
      footerInputComment: {
        handler(curVal, oldVal) {
        },
      },

      articalDetail: {
        handler(curVal, oldVal) {
          // console.log(curVal, oldVal)
        },
      },
      hfList: {
        handler(curVal, oldVal) {
        },
        deep: true
      }
    },
    mounted() {
      wxConfig(this, window.location.href.split('#')[0]);
      $("#zhuangshi").blur();
      $(".wzxqwrapper").css("height", $(window).height());
      this.id = this.$route.query.articalId;
      this.repostid = this.$route.query.rePostId;
      var back = this.$route.query.back;
      if (back == "faqizhifu") {
        this.$router.go(-1);
      } else if (back == "shezhimima") {
        this.$router.go(-2);
      }
      this.onCommentPullingUp();
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });

    },

    created() {
      this.msg = this.$route.params.content;
    },
    methods: {
      // 文章分享回调
      articleShare(){
        this.$axios.post(this.url + '/index.php?s=/ucenter/task/task_share').then(function (val) {}).catch()
      },
      //查看图片
      previewImgUrl: function (e) {
        var target = $(e.target);
        var self = this;
        if (target[0].tagName == 'IMG') {
          var nowUrl = target[0].currentSrc;
          var imgArray = self.articalDetail.image;
          wx.previewImage({
            current: nowUrl,
            urls: imgArray
          });
        }
      },

//获取详情
      articalInfo: function () {
        //文章详情
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/news/newindex/detail", qs.stringify({
            //   this.id = this.$route.query.articleid;
            // this.repostid = this.$route.query.rePostId;
            repostid: self.id,
            id: self.repostid,
            page: self.wzxqpage
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              //is_yes 为null  还未打赏
              self.ispay = res.data.data.is_yes == null ? false : true;
              //今日打赏次数
              self.paycount = parseInt(res.data.data.count);
              self.balance = res.data.data.balance;
              self.articalDetail = res.data.data.article;
              self.repostContent = res.data.data.repostarticle;
              self.uid = res.data.data.article.uid;
              self.hfList = res.data.data.reposthf;
              self.user_id = res.data.user_id;
              console.log(self.repostContent)
              var shareImg = "";
              if (res.data.data.article.image == null) {
                shareImg = self.url + '/Public/upload/mr/logo.png'

              } else {
                shareImg = res.data.data.article.image[0]
              }
              share("秀芳华-记录您的精彩", shareImg, shareUrl(self, location.href), res.data.data.article.content.replace(/<\/?.+?>/g, "").replace(/ /g, "").replace(/&nbsp;/ig, '').substr(0, 150) + "...",1);

              if (res.data.is_mobile == "false") {
                self.is_mobile = false;
              } else {
                self.is_mobile = true;
              }
              resolve(res.data);
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
        this.articalInfo().then(function (res) {
          if (res.data.repostcomment.length > 0) {
            self.repostcommentList = self.repostcommentList.concat(res.data.repostcomment);
            self.wzxqpage++;
            if (self.wzxqpage <= res.totalPage) {
              self.$refs.scroll.forceUpdate(true);
            } else {
              self.$refs.scroll.forceUpdate(false);
              $(".before-trigger span").text("");
            }
          } else {
            self.$refs.scroll.forceUpdate(false);
            $(".before-trigger span").text("沙发还在,快给楼主评论一番吧");
          }
        })
      },
      //显示打赏
      dashang: function (uid) {
        if (this.is_mobile) {
          if (this.user_id == uid) {
            Toast({
              message: "不能给自己打赏",
              position: 'middle',
              duration: 2000
            })
          } else if (this.paycount >= 5) {
            Toast({
              message: "您已到每日打赏五次上限，请于次日凌晨后再试",
              position: 'middle',
              duration: 2000
            })
          } else if (this.ispay) {
            Toast({
              message: "感谢您的喜爱，您在今天已经打赏过该篇文章了，请于次日凌晨后再试",
              position: 'middle',
              duration: 2000
            })
          } else {
            // 点击打赏按钮
            (function ($) {
              $.fn.numberAnimate = function (setting) {
                var defaults = {
                  speed: 800,//动画速度
                  num: "", //初始化值
                  iniAnimate: true, //是否要初始化动画效果
                  symbol: '',//默认的分割符号，千，万，千万
                  dot: 0 //保留几位小数点
                }
                //如果setting为空，就取default的值
                var setting = $.extend(defaults, setting);

                //如果对象有多个，提示出错
                if ($(this).length > 1) {

                  return;
                }

                //如果未设置初始化值。提示出错
                if (setting.num == "") {

                  return;
                }
                var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

                //数字处理
                var numToArr = function (num) {
                  num = parseFloat(num).toFixed(setting.dot);
                  if (typeof(num) == 'number') {
                    var arrStr = num.toString().split("");
                  } else {
                    var arrStr = num.split("");
                  }
                  //console.log(arrStr);
                  return arrStr;
                }

                //设置DOM symbol:分割符号
                var setNumDom = function (arrStr) {
                  var shtml = '<div class="mt-number-animate">';
                  for (var i = 0, len = arrStr.length; i < len; i++) {
                    if (i != 0 && (len - i) % 3 == 0 && setting.symbol != "" && arrStr[i] != ".") {
                      shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
                    } else {
                      shtml += nHtml.replace("{{num}}", arrStr[i]);
                    }
                  }
                  shtml += '</div>';
                  return shtml;
                }

                //执行动画
                var runAnimate = function ($parent) {
                  $parent.find(".mt-number-animate-dom").each(function () {
                    var num = $(this).attr("data-num");
                    num = (num == "." ? 10 : num);
                    var spanHei = $(this).height() / 11; //11为元素个数
                    var thisTop = -num * spanHei + "px";
                    if (thisTop != $(this).css("top")) {
                      if (setting.iniAnimate) {
                        //HTML5不支持
                        if (!window.applicationCache) {
                          $(this).animate({
                            top: thisTop
                          }, setting.speed);
                        } else {
                          $(this).css({
                            'transform': 'translateY(' + thisTop + ')',
                            '-ms-transform': 'translateY(' + thisTop + ')', /* IE 9 */
                            '-moz-transform': 'translateY(' + thisTop + ')', /* Firefox */
                            '-webkit-transform': 'translateY(' + thisTop + ')', /* Safari 和 Chrome */
                            '-o-transform': 'translateY(' + thisTop + ')',
                            '-ms-transition': setting.speed / 1000 + 's',
                            '-moz-transition': setting.speed / 1000 + 's',
                            '-webkit-transition': setting.speed / 1000 + 's',
                            '-o-transition': setting.speed / 1000 + 's',
                            'transition': setting.speed / 1000 + 's'
                          });
                        }
                      } else {
                        setting.iniAnimate = true;
                        $(this).css({
                          top: thisTop
                        });
                      }
                    }
                  });
                }

                //初始化
                var init = function ($parent) {
                  //初始化
                  $parent.html(setNumDom(numToArr(setting.num)));
                  runAnimate($parent);
                };

                //重置参数
                this.resetData = function (num) {
                  var newArr = numToArr(num);
                  var $dom = $(this).find(".mt-number-animate-dom");
                  if ($dom.length < newArr.length) {
                    $(this).html(setNumDom(numToArr(num)));
                  } else {
                    $dom.each(function (index, el) {
                      $(this).attr("data-num", newArr[index]);
                    });
                  }
                  runAnimate($(this));
                }
                //init
                init($(this));
                return this;
              }
            })(jQuery);

            this.isdashangDialog = true;
            var num = (2 * Math.random() + 1).toFixed(2);
            console.log(num);
            this.randomMoney = num
            var t = setTimeout(function () {
              $(".Num").numberAnimate({num: num, dot: 2, speed: 2000});
            }, 100);
            // this.getOpenID();
          }
        } else {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({path: '/xiangxixinxi'})
            }
          });
        }
      },
      //关闭打赏
      closeDashang: function () {
        //关闭打赏弹窗
        this.isdashangDialog = false;

      },

      //显示转发弹窗
      zhuanfa: function () {
        var self = this;
        if (this.is_mobile) {
          const h = this.$createElement;
          this.$msgbox({
            title: '转发',
            message: '   <div>' +
            '<textarea type="text" class="zhuanfa" id="zhuanfainput"  v-model="zhaunfaContent" placeholder="转发理由"></textarea>' +
            '<div class="zhaunfacontent">' +
            '<p class="zhaunfa-title">' + self.articalDetail.title + '</p>' +
            '<p>' + self.articalDetail.repost_content.substr(0, 50) + '...</p></div> ' +
            '</div> ',
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: '转发',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                self.zhuanfaConfirm(instance, done);
                // done();
              } else {

                $("#zhuanfainput").val("");
                self.zhaunfaContent = "";
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = '转发';
                done();
              }
            }
          }).then(action => {
            if (action == 'confirm') {
            }
          });
        } else {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({path: '/xiangxixinxi'})
            }
          });
        }


      },
      //提交转发
      zhuanfaConfirm: function (instance, done) {
        //提交转发
        var self = this;

        this.$axios.post(self.url + '/index.php?s=/news/newindex/forward', qs.stringify({
          article_id: self.id,	  //文章id
          title: self.articalDetail.title,	//文章标题
          content: $("#zhuanfainput").val(),//转发内容
          toUid: self.uid
        })).then(function (res) {

          instance.confirmButtonLoading = false;
          instance.confirmButtonText = '转发';
          done();
          $("#zhuanfainput").val("");
          if (res.data.code == 200) {
            Toast({
              message: "转发成功",
              position: 'middle',
              duration: 3000
            });
            self.footerInputComment = true;//转发时 隐藏底部评论框
            self.zhaunfaContent = "";
            self.$router.push({path: "/shouye"});
          } else {

            $("#zhuanfainput").val("")
            self.footerInputComment = false;
            self.isshowzhuanfa = true;
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 3000
            })
          }
        }).catch(function (e) {

        })
      },

      //点赞
      praise: function (repostid, uid, type, index, bolean, commentId) {
        //点赞
        var self = this;
        if (self.is_mobile) {

          if (self.user_id == uid) {

          } else {
            if (bolean == 'false') {


              if (type == "Article_fabulous") {

                self.repostContent.repostfabulous_state = 'true';
                self.repostContent.repostfabulous_count = parseInt(self.repostContent.repostfabulous_count) + 1;

              } else if (type == "Article_comment") {
                self.repostcommentList[index].commentFabulous = 'true'
                self.repostcommentList[index].fabulous = parseInt(self.repostcommentList[index].fabulous) + 1;
              }
              this.$axios.post(self.url + "/index.php?s=/news/newindex/fabulous", qs.stringify({
                appname: 'Article',
                article_id: repostid,	//简文id
                table: type,
                uid: uid,
                jump: 'article / index / weibodetail',
                comment_id: commentId

              })).then(function (res) {
                self.$loading.fullscreenLoading = false;
                self.loading.close();
                if (res.data.status == 1) {
                  // if (type == "Article_fabulous") {
                  //   self.articalDetail.fabulous_state = 'true'
                  //   self.articalDetail.fabulous_count = parseInt(self.articalDetail.fabulous_count) + 1;
                  // } else if (type == "Article_comment") {
                  //   self.repostrepostcommentList[index].commentFabulous = 'true'
                  //   self.repostrepostcommentList[index].fabulous = parseInt(self.repostrepostcommentList[index].fabulous) + 1;
                  // }

                } else if (res.data.status == 0) {
                  console.log("点赞失败")
                  Toast({
                    message: res.data.info,
                    position: 'middle',
                    duration: 3000
                  })
                }
              }).catch(function (e) {
                self.$loading.fullscreenLoading = true;
                self.loading.close();
                console.log("点赞报错：" + e);
              })
            } else {
              Toast({
                message: "已点赞",
                position: 'middle',
                duration: 3000
              })
            }
          }
        } else {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({path: '/xiangxixinxi'})
            }
          });
        }
      },

      clickCommenList: function () {
        //评论评论  被评论人id  评论人id 文章id
        this.elMessageCommentShow = true;
        this.footerInputComment = false;
        setTimeout(function () {
          $("#zhuangshi").focus();
        }, 500)
      },
      //点击评论列表评论
      commentary: function (touid, name, commenId, index, boolean, type, tocommenId) {
        //评论评论  被评论人id  评论人id 文章id

        if (this.is_mobile) {

          if (touid == this.user_id) {
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
          this.sheetVisible = true;
          this.pinglunType = "hfpl";
          this.toUid = touid;
          this.commentId = commenId;
          this.pinglunrenname = "@" + name + ":";
          this.commentPlaceholder = "@" + name + "";
          this.clickrepostrepostcommentListIndex = index;//评论列表项
          this.commentName = name; //被回复人的姓名
          this.clickIndex = index;
          this.leixing=type;
          if (type == "") {
            this.delethuifuId = commenId;
          } else {
            this.delethuifuId = tocommenId;
          }


        } else {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({path: '/xiangxixinxi'})
            }
          });
        }

      },

      //点击底部评论框
      CommenInput: function () {
        if (this.is_mobile) {
          //输入评论 直接发送评论内容
          this.pinglunType = "";
          this.footerInputComment = false;//显示底部评论框
          this.elMessageCommentShow = true;
          this.commentPlaceholder = "请输入评论内容"
          this.footerInputComment = false;
          setTimeout(function () {
            $("#zhuangshi").focus();
          }, 500)

        } else {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({path: '/xiangxixinxi'})
            }
          });
        }

      },
      //发送评论
      sendComment: function () {
        var self = this;
        if ($.trim(this.commentContent).length == 0 || $.trim(this.commentContent).length >140) {
          Toast({
            message: "评论的字数为 0 或小于 140",
            duration: 2000,
            position: "middle"
          })
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '评论中',
            background: 'transparent'
          });
          self.$loading.fullscreenLoading = true;
          //评论具体内容
          var content;
          //评论人的uid
          var uid;
          //回复
          var toUid
          //评论id
          var commentId;

          if (this.pinglunType == "") {
            uid = self.uid;
            content = this.commentContent;
            toUid = "";
            commentId = "";
          } else {
            uid = self.user_id;
            // content = "回复<span class='huifuren'>@" + this.commentName + ":</span>" + this.commentContent;
            content = this.commentContent;
            toUid = self.toUid;
            commentId = self.commentId;
          }
          this.$axios.post(self.url + '/index.php?s=/news/newindex/comment', qs.stringify({
            article_id: self.repostContent.repostid, //文章id
            uid: self.uid,
            content: content,
            toUid: toUid,
            commentId: commentId

          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();

            if (res.data.code == 200) {
              Toast({
                message: "评论成功",
                position: 'middle',
                duration: 2000
              })
              self.emojpanelshow = false;
              self.footerInputComment = true;
              self.elMessageCommentShow = false;
              self.commentContent = "";
              self.repostContent.repostcomment=parseInt(self.repostContent.repostcomment)+1;
              if (self.pinglunType == "") {
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
                self.repostcommentList.push(coomentListItem);
              } else {
                var huifuItem = {
                  commentid: res.data.data[2].commentId,
                  content: res.data.data[0].content,
                  nickname: res.data.data[7].user.nickname,
                  uid: res.data.data[3].uid,
                  to_comment_id: res.data.data[8].to_comment_id,
                  toNickname:res.data.data[10].toNickname
                };
                if (self.hfList == null) {
                  self.hfList = [];
                }
                self.hfList.push(huifuItem);
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
      //删除评论
      /*
      id ：评论id
       */
      sendCommentToTal: function () {
        //评论文章
        this.sendComment();
      },
      deletepinglun: function () {
        var self = this;
        var item=$(".wzxq-item").eq(self.clickIndex).find(".huifuliebiaoFir").length;

        this.$confirm("是否删除该评论?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(() => {
          self.loading = self.$loading({
            lock: true,
            text: '删除中',
            background: 'transparent'
          });


          self.$axios.post(self.url + '/index.php?s=/weibo/index/deleteComment', qs.stringify({
            comment_id: self.delethuifuId,
            type: 'article_comment'

          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              Toast({
                message: "删除成功",
                duration: 2000,
                postion: 'middle'
              })
              if (self.leixing == "") {
                //指定删除某数组项目
                self.repostcommentList.splice(self.clickIndex, 1);
                self.repostContent.repostcomment = parseInt(self.repostContent.repostcomment) - 1-item;
              } else  {
                self.hfList.splice(self.clickIndex, 1);
                self.repostContent.repostcomment = parseInt(self.repostContent.repostcomment) - 1;
              }
            }

          }).catch(function (e) {

          })
        }).catch(() => {
        });

      },
      /**
       * 跳转到个人主页
       */
      locationPersonalHomepage: function (uid) {
        this.$router.push({name: 'gerenzhuye', query: {toUid: uid}})
      },
      /**
       * 点击加号
       * @param e
       */
      clickMore: function (e) {
        e.preventDefault();
        e.cancelBubble = true;
        this.isshowdropList = !this.isshowdropList;
      },
      Collection: function (e, isclolection, uid) {
        var self = this;
        e.preventDefault();
        e.cancelBubble = true;
        if (isclolection == "true") {
          return;
        }
        //点击完成后 直接回显状态，并隐藏下拉框
        self.repostContent.collection_state = 'true';
        setTimeout(function () {
          self.isshowdropList = false;
        }, 800)
        // repostContent
        var repostreason=self.repostContent.reposttitle==""?'此文甚好,所以转发':self.repostContent.reposttitle
        this.$axios.post(self.url + '/index.php?s=/news/newindex/collection', qs.stringify({
          article_id: self.repostContent.repostid, //文章id
          user_id: uid,
          is_release:repostreason, //转发理由
          release_id:self.articalDetail.id, //原文id
          title:self.articalDetail.title //原文标题
        })).then(function (res) {
          if (res.data.code == 200) {
            self.articalDetail.collection_state = 'true';
            Toast({
              message: "收藏成功",
              duration: 2000,
              position: 'middle'
            });
          } else {
            Toast({
              message: res.data.msg,
              duration: 2000,
              position: 'middle'
            });
          }
        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          // Toast({
          //   message: "服务器错误",
          //   duration: 2000,
          //   position: 'middle'
          // })
          console.log("cuowu:" + e);
        })
        // }
      },
      follow: function (uid, isgz, e) {
        var self = this;
        e.preventDefault();
        e.cancelBubble = true;
        if (isgz == "true") {
          return;
        }
        //点击完成后 直接回显状态，并隐藏下拉框
        self.articalDetail.gz_state = 'true';
        setTimeout(function () {
          self.isshowdropList = false;
        }, 800)
        this.$axios.post(self.url + '/index.php/ucenter/newindex/follow', qs.stringify({
          uid: uid
        })).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.repostContent.gz_state = 'true';
            Toast({
              message: "关注成功",
              position: 'middle',
              duration: 2000
            });
          } else {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 2000
            });
          }
        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })
        // }
      },
      /**
       *取消评论输入
       */
      cancelComment: function () {
        this.elMessageCommentShow = false;
        this.commentContent = "";
        this.pinglunCompoholder = "请输入评论内容"
        this.emojpanelshow = false;
        this.str = "";
      },
      //取消评论
      cancelComment: function () {
        this.elMessageCommentShow = false;
        this.commentContent = "";
        this.pinglunCompoholder = "请输入评论内容"
        this.emojpanelshow = false;
        this.str = "";
        this.emojpanelshow = false;
        this.footerInputComment = true;

      },
      //控制表情面板的显示
      emojpanelclick: function () {
        this.emojpanelshow = !this.emojpanelshow;
      },
      clickImg: function (value, index, url) {
        this.commentContent += value;
      },

    },


  }
</script>

