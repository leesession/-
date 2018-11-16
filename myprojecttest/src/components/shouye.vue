<template>
  <div class="shouye">

    <!--<div class="position-box">-->

    <vue-better-scroll
      class="shouyewrapper"
      ref="scroll"
      :probeType="2"
      :scrollbar="pullupconfig.scrollbarObj"
      :pullDownRefresh=false
      :listenScroll=true
      :pullUpLoad="pullupconfig.pullUpLoadObj"
      :startY="parseInt(pullupconfig.startY)"
      @pullingUp="onPullingUp"
      @scroll="scroll">
      <div class="dynamicList" id="dynamicList">
        <!--<div class="line"></div>-->
        <div class="item" v-for="(dynamic,index) in dynamiclist"
             @click="locationHref(noRegister,dynamic.id,dynamic.type,dynamic.rePostId,dynamic.is_delect,index)">
          <div class="info">
            <!--第一排-->
            <div class="infoMsg">
              <!--头像-->
              <div class="img-left">
                <img :src="dynamic.portrait" class="shouyeheader">
                <img src="../../static/img/V@2x.png" class="sydav" v-show="parseInt(dynamic.uid)==50">
                <img src="../../static/img/jinv.png" class="sydav" v-show="dynamic.user_type=='1'">
              </div>
              <div class="infoMsg-info">
                <p class="name">{{dynamic.nickname.length>13?dynamic.nickname.substr(0,13)+'...':dynamic.nickname}}<img
                  src="../../static/img/huangv.png" class="shouyehuangv" v-show="dynamic.uid=='1'">
                  <span v-show="dynamic.uid=='6463'">官方认证</span>
                  <span v-show="dynamic.uid=='6864'">官方认证</span>
                  <span v-show="dynamic.uid=='26'">官方认证</span>
                </p>
                <p class="time">{{dynamic.create_time}} <span>阅读次数:{{dynamic.view}}</span></p>
              </div>
              <!--+号-->
              <div v-if="dynamic.xiaobian_recommend == 0" class="dropdown">
                <img src="../../static/img/dropdown.png" class="more" @click="clickMore(index,$event)"
                     v-if="user_id!=parseInt(dynamic.uid)">
                <div class="dropdownList" v-show="(dropSelect.selectIndex===index&&dropSelect.selectBoolean)">
                  <ul>

                    <li @click="Collection(dynamic.uid,dynamic.id,dynamic.collection_state,index,dynamic.repostTitle,dynamic.repostid,dynamic.title,dynamic.type,$event)">
                      {{dynamic.collection_state=='false'?'收藏':'已收藏'}}
                    </li>
                    <li @click="follow(dynamic.uid,dynamic.gz_state,index,$event)">
                      {{dynamic.gz_state=='false'?'关注':'已关注'}}
                    </li>
                  </ul>
                </div>
              </div>
              <!--推荐-->
              <img src="../../static/img/tuijian.png" alt="" class="tuijian"  v-else>
            </div>
            <div class="info-title" v-show="dynamic.type=='release'">{{dynamic.title}}<img
              src="../../static/img/zhengwen.png" alt="" class="zhengwen" v-if="dynamic.is_essay=='1'"></div>
            <!--文章具体内容-->
            <span
              style="display:inline;font-size: 0.2rem" v-if="dynamic.type=='release'">
              <div class="content" v-html="dynamic.content"></div>
              <!--首页文章删除-->

              <span class="xsqw">[显示全文]</span>

            </span>

            <!--转发过的文章的样式-->
            <!--<router-link-->
            <!--:to="{name:'zhuanfawenzhangxiangqing',query:{rePostId: dynamic.rePostId,articleid:dynamic.id}}">-->
            <div class="content" v-html="dynamic.repostTitle?dynamic.repostTitle:'此文甚好，所以转发'"
                 v-show="dynamic.type=='repost'"></div>
            <!--</router-link>-->

            <!--<router-link :to="{name:'wenzhangxiangqing',query:{articalId: dynamic.repostid}}"-->
            <!--v-if="dynamic.type=='repost'"-->
            <!--&gt;-->
            <!--<span v-if="dynamic.type=='repost'"-->
            <!--@click="zhuanfaLocation({name:'wenzhangxiangqing',query:{articalId: dynamic.repostid}},$event,dynamic.is_delect)">   -->
            <span v-if="dynamic.type=='repost'">
              <div class="forwar-content ">
                <div class="forward-content-div ">
                  <div class="forward-content-img"
                       v-lazy:background-image="dynamic.repostImg" v-if="dynamic.repostImg!=null"></div>
                  <div class="forward-content-artical"
                       :class="{'forward_content_artical_isimg': dynamic.repostImg!=null }">
                    <p class="forward-content-title">{{dynamic.title}}</p>
                    <p class="forward-content-content" v-html="dynamic.rePostContent">
                      <!--{{dynamic.rePostContent}}-->
                    </p>
                  </div>
                     <div class="is-delect-text" v-if="dynamic.is_delect=='true'">
                       <p>抱歉，此文章已被原作者删除</p>
                     </div>
                </div>

              </div>

                </span>
            <!--</router-link>-->

            <!--图片列表-->
            <div class="infoImg" v-if="dynamic.type=='release'">
              <div class="out-img" v-for="(imgUrl,imgUrlindex) in dynamic.image " v-if="imgUrlindex<=2">
                <div class="inner-img" v-lazy:background-image="imgUrl" :value='imgUrl'
                     @click="previewImageUrl($event)"></div>
              </div>
            </div>
            <!--标签类-->
            <div class="tag" v-if="dynamic.type=='release'">
              <div v-for="tagItem in tagChange(dynamic.label)">{{tagItem}}</div>
            </div>
            <!--新发文章点赞div等-->
            <span>

                <div class="item-c-div" :class="{isdashangdivshow:dynamic.type=='repost'}">
                  <div class="comment-div">
                    <div class="commen-middle">
                      <img src="../../static/img/yidianzan.png" class="dianzan" v-if="dynamic.fabulous_state=='true'">
                      <img src="../../static/img/dianzan.png" class="dianzan" v-else>
                      <p :class="{yidianzan:dynamic.fabulous_state=='true'}">{{dynamic.fabulous}}</p>
                    </div>
                  </div>
                  <div class="comment-div">
                    <div class="commen-middle">
                      <img src="../../static/img/pinglun.png" class="pinglun">
                      <p>{{dynamic.comment}}</p>
                    </div>
                  </div>
                  <div class="comment-div">
                    <div class="commen-middle">
                      <img src="../../static/img/zhuanfa.png" class="zhuanfa">
                      <p>{{dynamic.rePostCount}}</p>
                    </div>
                  </div>
                  <div class="comment-div" v-if="dynamic.type=='release'">
                    <div class="commen-middle">
                      <img src="../../static/img/dashang.png" class="dashang">
                      <p>{{dynamic.All_money==null?0:dynamic.All_money}}</p>
                    </div>
                  </div>
                </div>
              </span>


          </div>
          <!--<div class="line"></div>-->
        </div>

      </div>
    </vue-better-scroll>
    <!--</div>-->
    <!--出现遮罩层-->
    <span>
      <div class="shouyeedit" @click="prevent(noRegister,{name:'fabuwenzhang'})">
        <img src="../../static/img/add.png" alt="">
        <p>发表</p>
      </div>
    </span>
    <div class="shouyerefreh" @click="shouyerefreh"></div>
    <!--<img src="" alt="">-->
  </div>
</template>
<script>

  import {Toast} from 'mint-ui'

  require('../../static/css/shouye.css')
  import {wxConfig, share, tabbarChange, tagChange, shareUrl} from '../../static/js/timeFormat'

  export default {
    name: "shouye",
    data() {
      return {
        tabbarChange,
        tagChange,
        count: 0,
        url: this.COMMEURL.commonUrl,//公共地址
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        dynamiclist: [],
        downIndex: 0,
        dropSelect: {
          selectIndex: '',
          selectBoolean: false
        },//控制下拉菜单
        beforeScrollTop: '',
        page: 1,//页码
        totalPage: "",//分页总页码
        loading: "",
        noRegister: "",//用戶未註冊
        user_id: "",//用户id
        commentContent: "",//转发内容 评论框
        pinglunCompoholder: "",//评论输入框提示语
      }
    },
    watch: {
      noRegister: {
        handler(curVal, oldVal) {
        },
      },
      dropSelect: {
        handler(curVal, oldVal) {
        },
      },
      dynamiclist: {
        handler(curVal, oldVal) {
        },
      },
      count: {
        handler(curVal, oldVal) {
          if (curVal == 1) {
            wxConfig(this, location.href.split("#")[0]);
            share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this, location.href), "分享你生活的每一个精彩瞬间，让我们为你点赞",10000);
          }
        },
      }
    },
    activated() {
      console.log("首页缓存");
    },
    created() {

      tabbarChange(this.COMMEURL.linkArray, this.$route.path);
    },
    mounted() {
      this.COMMEURL.Y = 0;
      $(".before-trigger span").text("");
      this.onPullingUp();
      this.beforeScrollTop = document.body.scrollTop;
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
    },
    activated() {
      var self = this;
      var originurl = this.$route.query.origin;
      if (originurl == "fabuwenzhang" || originurl == "zhuanfa") {
        this.activeInit();
        this.$router.go(-1);
      } else {
        var articleType = this.COMMEURL.article.type;
        if (articleType == "release") {
          this.activeReleaseDetail();
        } else if (articleType == "repost") {
          this.activeRepostDetail();
        }
      }
      this.$refs.scroll.scrollTo(0, self.COMMEURL.Y, 0, 'easing');
      this.$nextTick(function () {
        this.$refs.scroll.refresh();
      });
    },
    methods: {
      activeInit: function () {
        this.COMMEURL.Y = 0;
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.page = 1;
        this.dynamiclist = [];
        this.onPullingUp();
      },
      /**
       * 对type=repost(转发) 类型的文章 跳转
       * @param url 跳转的路由地址
       * @param e 事件
       * @param isdelect  是否被删除
       */
      zhuanfaLocation: function (url, e, isdelect) {
        e.preventDefault();
        e.cancelBubble = true;
        if (isdelect == 'true') {
          Toast({
            message: '抱歉,此文章已被原作者删除',
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.$router.push(url);
        }

      },
      /**
       * 对type=realease(新发布) 类型的文章 跳转
       * @param isResgiter 是否注册
       * @param id 文章id
       * @param type 文章类型
       * @param repostid 转发id
       */
      locationHref: function (isResgiter, id, type, repostid, is_delect, index) {
        this.COMMEURL.article.index = index;
        this.COMMEURL.article.type = type;
        this.COMMEURL.article.articleId = id;
        this.COMMEURL.article.responstId = repostid;
        if (isResgiter) {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({path: '/xiangxixinxi'})
            }
          });
        } else {
          if (is_delect == 'true') {
            Toast({
              message: '抱歉,此文章已被原作者删除',
              duration: 2000,
              position: 'middle'
            })
          } else {
            if (type == "release") {
              this.$router.push({name: 'wenzhangxiangqing', query: {articalId: id}})
            } else {
              this.$router.push({name: 'zhuanfawenzhangxiangqing', query: {rePostId: repostid, articalId: id}})
            }
          }

        }

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
          $(".shouyerefreh").removeClass("shouyerefreshhup");
          $(".shouyerefreh").addClass("shouyerefreshdown");
        } else {
          $(".shouyerefreh").addClass("shouyerefreshhup");
          $(".shouyerefreh").removeClass("shouyerefreshdown");
        }
        this.beforeScrollTop = obj.y;
        if (parseInt(obj.y) >= 0) {
          $(".shouyerefreh").removeClass("shouyerefreshhup");
          $(".shouyerefreh").addClass("shouyerefreshdown");
          return false;
        }

      },
      /**
       *分页 获取列表项数据
       * @returns {Promise<any>}
       */
      getData() {
        var self = this;

        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/news/newindex/article",
            qs.stringify({"page": self.page})
          ).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            // console.log("datashuju:" + JSON.stringify(res.data));
            if (res.data.code == 200) {
              self.user_id = res.data.user_id;
              if (res.data.is_mobile == 'false') {
                self.noRegister = true;
              }
              resolve(res.data);
            } else if (res.data.code == 404) {
              self.$router.push({path: '/login'});
            } else {
              Toast({
                message: res.data.msg,
                position: "middle",
                duration: 2000
              })
            }
          }).catch(function (e) {
            console.log("cuowu:" + e);
          })
        });
      },
      /**
       * 上拉加载
       */
      onPullingUp: function () {
        //上拉加载

        // console.log('上拉加载')
        var self = this;
        this.getData().then(function (res) {
          self.dynamiclist = self.dynamiclist.concat(res.data.article);
          self.page++;
          self.totalPage = res.data.totalPage;

          if (self.page <= self.totalPage) {
            self.$refs.scroll.forceUpdate(true);

          } else {
            self.$refs.scroll.forceUpdate(false);
            $(".before-trigger span").text("暂无更多数据了");
          }
          self.$refs.scroll.refresh();
          self.count++;
        }).catch(function (e) {
          console.log("文章：" + e);
        });


      },
      /**
       * 点击+按钮
       * @param index 当前列表项的index
       * @param e  事件 阻止默认事件
       */
      clickMore: function (index, e) {
        e.preventDefault();
        e.cancelBubble = true;
        this.dropSelect.selectIndex = index;
        this.dropSelect.selectBoolean = !this.dropSelect.selectBoolean;

      },
      /**
       * 关注
       * @param uid 用户id
       * @param isgz 是否关注
       * @param index 当前列表项的index
       * @param e 阻止默认事件
       */
      follow: function (uid, isgz, index, e) {
        var self = this;
        e.preventDefault();
        e.cancelBubble = true;
        if (this.noRegister) {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({path: '/xiangxixinxi'})
            }
          });
        } else {
          if (isgz == "true") {
            return;
          }
          //点击完成后 直接回显状态，并隐藏下拉框
          self.dynamiclist[index].gz_state = 'true';
          setTimeout(function () {
            self.dropSelect.selectIndex = index;
            self.dropSelect.selectBoolean = !self.dropSelect.selectBoolean;
          }, 800)
          this.$axios.post(self.url + '/index.php/ucenter/newindex/follow', qs.stringify({
            uid: uid
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              self.dynamiclist[index].gz_state = 'true';
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
        }
      },
      /**
       * 收藏
       * @param uid 用户id
       * @param articleid 文章id
       * @param isclolection  是否收藏
       * @param index 当前列表项index
       * @param repostTitle 转发理由
       * @param repostid 转发id
       * @param title 原文章标题
       * @param type 文章类型
       * @param e 阻止默认事件
       * @constructor
       */

      // dynamic.repostTitle,dynamic.repostid?dynamic.id:dynamic.repostid,dynamic.title
      Collection: function (uid, articleid, isclolection, index, repostTitle,repostid,title,type,e) {
        var self = this;
        e.preventDefault();
        e.cancelBubble = true;
        if (this.noRegister) {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({path: '/xiangxixinxi'})
            }
          });
        } else {
          if (isclolection == "true") {
            return;
          }
          //点击完成后 直接回显状态，并隐藏下拉框
          self.dynamiclist[index].collection_state = "true";
          setTimeout(function () {
            self.dropSelect.selectIndex = index;
            self.dropSelect.selectBoolean = !self.dropSelect.selectBoolean;
          }, 800);
          //新发布的文章
          var json;
          var repostreason="";
          var artid="";
          if(type=="repost"){
            repostreason=repostTitle;
            artid=repostid;
          }else{
            artid=articleid;
          }
          this.$axios.post(self.url + '/index.php?s=/news/newindex/collection', qs.stringify({
            article_id:articleid,
            is_release: repostreason,
            release_id: artid,
            title:title,
          })).then(function (res) {
            if (res.data.code == 200) {
              self.dynamiclist[index].collection_state = "true";
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
        }
      },
      /**
       * 刷新当前页面
       */
      shouyerefreh: function () {
        //刷新
        this.page = 1;
        this.totalPage = "";
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
       * 权限跳转（是否已经注册）
       * @param boolean 判断是否注册
       * @param url 跳转路由地址
       */

      prevent: function (boolean, url) {
        // e.preventDefault();
        var self = this;
        if (boolean) {
          this.$alert('注册用户方可执行该操作！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({path: '/xiangxixinxi'})
            }
          });
        } else {
          self.$router.push(url);
        }
      },
      /**
       * 微信 查看图片
       * @param e 阻止默认事件
       */
      previewImageUrl: function (e) {

        e.stopPropagation();
        var nowurl = $(e.target).attr("value");
        // console.log("nowUrl:"+nowurl);
        var imgArray = [];

        $(e.target).parents(".infoImg").find(".out-img").each(function (index, el) {
          var itemSrc = $(el).find(".inner-img").attr('value');
          // console.log(el);
          // console.log("itemSrc:" + itemSrc);
          imgArray.push(itemSrc);
        });
        // console.log("imgsurl:" + imgArray);
        wx.previewImage({
          current: nowurl,
          urls: imgArray
        });
      },
      /**
       * 缓存 更新列表情况 新发布的文章
       */
      activeReleaseDetail: function () {
        var index = this.COMMEURL.article.index;
        var self = this;
        self.$axios.post(self.url + "/index.php?s=/news/newindex/detail", qs.stringify({
          id: self.COMMEURL.article.articleId,
          page: 1
        })).then(function (res) {
          if (res.data.code == 200) {
            self.dynamiclist[index].fabulous_state = res.data.data.article.fabulous_state;//点赞状态
            self.dynamiclist[index].fabulous = res.data.data.article.fabulous_count;//点赞数量
            self.dynamiclist[index].All_money = res.data.data.article.allMoney; //打赏金额
            self.dynamiclist[index].rePostCount = res.data.data.article.rePostNum; //转发数量
            self.dynamiclist[index].comment = res.data.data.article.comment; //评论数量
            self.dynamiclist[index].collection_state = res.data.data.article.collection_state; //收藏
            self.dynamiclist[index].gz_state = res.data.data.article.gz_state; //关注

            console.log(self.dynamiclist[index]);
          }
        }).catch(function (e) {
          console.log("错误：" + e);
        })
      },
      /**
       * 缓存 更新列表情况 转发的文章
       */
      activeRepostDetail: function () {
        var index = this.COMMEURL.article.index;
        var self = this;
        self.$axios.post(self.url + "/index.php?s=/news/newindex/detail", qs.stringify({
          repostid: self.COMMEURL.article.articleId,
          id: self.COMMEURL.article.responstId,
          page: 1
        })).then(function (res) {

          if (res.data.code == 200) {
            self.dynamiclist[index].fabulous_state = res.data.data.repostarticle.repostfabulous_state;//点赞状态
            self.dynamiclist[index].fabulous = res.data.data.repostarticle.repostfabulous_count;//点赞数量
            self.dynamiclist[index].comment = res.data.data.repostarticle.repostcomment; //评论数量
            self.dynamiclist[index].collection_state = res.data.data.repostarticle.collection_state; //收藏
            self.dynamiclist[index].gz_state = res.data.data.repostarticle.gz_state; //关注

          }
        }).catch(function (e) {

          console.log("错误：" + e);
        });

      },

    }

  }
</script>
