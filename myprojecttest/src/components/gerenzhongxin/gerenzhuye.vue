<template>
  <div class="gerenzhuye">
    <div :class="userInfo.userInfo.sex=='2'?'grgz-back-nv':'grgz-back'" class="grzy-back-div">
      <div class="grzy-back-div1">

        <div class="grzy-header-img">
          <img :src="userInfo.userInfo.portrait" class="grzy-header">
          <img src="../../../static/img/jinv.png" class="grzydav" v-show="userInfo.userInfo.user_type=='1'">
          <!--<img src="../../../static/img/jinv.png" class="grzydav" >-->
        </div>
        <div class="grzy-info-div">
          <p class="grzy-name">
            {{userInfo.userInfo.nickname.length>15?userInfo.userInfo.nickname.substr(0,15)+'...':userInfo.userInfo.nickname}}
            <img src="../../../static/img/huangv.png" class="grzyhuangv" v-show="userInfo.userInfo.uid=='1'">
            <span v-show="userInfo.userInfo.uid=='6463'">官方认证</span>
            <span v-show="userInfo.userInfo.uid=='6864'">官方认证</span>
            <span v-show="userInfo.userInfo.uid=='26'">官方认证</span>
          </p>
          <p class="grzy-info">{{gradation(userInfo.userInfo.score1)}}</p>
          <p class="grzy-info">
            <span>关注({{userInfo.userInfo.count}})</span><span>|</span><span>粉丝({{userInfo.userInfo.fans_count}})</span>
          </p>

          <div class="grzy-addgz" @click="addGuanzhu(userInfo.userInfo.uid)" >{{userInfo.userInfo.state=='false'?'加关注':'已关注'}}</div>



        </div>

      </div>
      <!--<div class="grzy-addgz" v-else v-show="user_id!=userInfo.userInfo.uid">已关注</div>-->
    </div>
    <div class="grzy-nav">
      <ul class="grgz-nav-ul">
        <li @click="clickItem(item.id,index,item.type)"
            v-for="(item,index) in tabbar">
          <span :class="{ isSelected: selected == item.id}"> {{item.name}}</span>

        </li>

      </ul>

    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="shuoshuo">
        <div id="grzy-guangchang">
          <vue-better-scroll
            class="zhuyeweibowrapper"
            ref="grzyguangchangscroll"
            :probeType="2"
            :scrollbar="pullupconfig.scrollbarObj"
            :pullDownRefresh=false
            :listenScroll=true
            :pullUpLoad="pullupconfig.pullUpLoadObj"
            :startY="parseInt(pullupconfig.startY)"
            @pullingUp="onZhuyeGuangcPullingUp()"
          >
            <div class="shuoshuo">
              <div class="shuoshuoItem" v-for="guangchangItem in weiboList"
                   @click="LocationDetail({name:'guangchangxiangqing',query:{weiboid:guangchangItem.id}})">
                <div class="grzy-ss-item">
                  <div class="ss-img" :style="{backgroundImage:'url('+guangchangItem.image+')'}"
                       v-if="guangchangItem.image!=''"></div>
                  <div class="ss-info">
                    <div class="grzy-ss-content" v-html="changeEmoj(guangchangItem.content)"></div>

                  </div>

                  <div class="grzy-ss-time">{{guangchangItem.create_time}}</div>
                </div>
                <div class="fb-zhanwei"></div>
              </div>

            </div>
          </vue-better-scroll>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="xiufengcai">
        <div id="grzy_xiufengcai">
          <vue-better-scroll
            class="grzy_xiufengcaiwrapper"
            ref="xiufengcaiscroll"
            :probeType="2"
            :scrollbar="pullupconfig.scrollbarObj"
            :pullDownRefresh=false
            :listenScroll=true
            :pullUpLoad="pullupconfig.pullUpLoadObj"
            :startY="parseInt(pullupconfig.startY)"
            @pullingUp="onXFCPullingUp()"
          >
            <div class="xiufengcai">
              <div class="wdfc-xfc-item " v-for="(item,index) in xfcList"
                   @click="xfcContentInfo(item.id)">
                <div class="wdfb-xfc-content-info">
                  <div class="wdfc-xfc-item-left" v-if="changeImgUrl(item).length==1">
                    <div class="wdfc-xfc-item-left-1-picture"
                         v-lazy:background-image="changeImgUrl(item)[0]"></div>
                  </div>
                  <div class="wdfc-xfc-item-left" v-if="changeImgUrl(item).length==2">
                    <div class="wdfc-xfc-item-left-2-picture"
                         v-lazy:background-image="changeImgUrl(item)[0]"></div>
                    <div class="wdfc-xfc-item-left-2-picture"
                         v-lazy:background-image="changeImgUrl(item)[1]"></div>
                  </div>
                  <div class="wdfc-xfc-item-left" v-if="changeImgUrl(item).length==3">
                    <div class="wdfc-xfc-item-left-3-picture"
                         v-lazy:background-image="changeImgUrl(item)[0]"></div>
                    <div class="wdfc-xfc-item-left-right-picture">
                      <div class="wdfc-xfc-item-left-3-picture-ri"
                           v-lazy:background-image="changeImgUrl(item)[1]"></div>
                      <div class="wdfc-xfc-item-left-3-picture-ri"
                           v-lazy:background-image="changeImgUrl(item)[2]"></div>
                    </div>
                  </div>
                  <div class="wdfc-xfc-item-left" v-if="changeImgUrl(item).length>3">
                    <div class="wdfc-xfc-item-left-4-picture"
                         v-for="(imgItem,itemindex) in changeImgUrl(item)"
                         v-if="itemindex<4" v-lazy:background-image="imgItem"></div>
                  </div>
                  <div class="wdfc-xfc-item-right">
                    <div class="wdfc-xfc-item-right-content">{{item.content}}</div>
                    <p class="totalCount" v-show="changeImgUrl(item).length>1">
                      共{{changeImgUrl(item).length}}张</p>
                  </div>

                  <div class="grzy-wz-time">{{item.create_time}}</div>
                </div>
                <div class="fb-zhanwei"></div>
              </div>


            </div>
          </vue-better-scroll>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="wenzhang">
        <div id="grzy_article">
          <vue-better-scroll
            class="zhuyearticlewrapper"
            ref="guangchangarticlescroll"
            :probeType="2"
            :scrollbar="pullupconfig.scrollbarObj"
            :pullDownRefresh=false
            :listenScroll=true
            :pullUpLoad="pullupconfig.pullUpLoadObj"
            :startY="parseInt(pullupconfig.startY)"
            @pullingUp="onZhuyeArticalPullingUp()"
          >
            <div class="wenzhang">
              <div class="wenzhangItem" v-for="item in articleList">

                <div v-if="item.type=='release'" class="wenzhangItemdiv"
                     @click="LocationArticleDetail({name:'wenzhangxiangqing',query:{articalId:item.id}},item.is_delect)">
                  <div class="grzy-fb-content">
                    <div class="grzy-fb-img" v-lazy:background-image="item.image[0]" v-if="item.image.length!=0"></div>
                    <div class="content-info">
                      <p class="fa-title">{{item.title}}</p>
                      <p v-html="item.content"></p>
                    </div>
                    <!--</router-link>-->
                  </div>
                  <div class="grzy-wz-time">{{item.create_time}}</div>
                </div>
                <div v-if="item.type=='repost'" class="wenzhangItemdiv"
                     @click="LocationArticleDetail({name:'zhuanfawenzhangxiangqing',query:{articalId:item.id,rePostId:item.repostid}},item.is_delect)">
                  <div class="repostTitle">
                    {{item.repostTitle==null||item.repostTitle==''?'此文甚好,所以转发':item.repostTitle}}
                  </div>
                  <div class="grzy-fb-content grzy-fb-content-repost">
                    <div class="grzy-fb-img" v-lazy:background-image="item.image[0]" v-if="item.image.length!=0"></div>
                    <div class="content-info">
                      <p class="fa-title">{{item.title}}</p>
                      <p v-html="item.content"></p>
                    </div>
                    <!--</router-link>-->
                    <div class="is-delect-text" v-if="item.is_delect=='true'">
                      <p>抱歉，此文章已被原作者删除</p>
                    </div>
                  </div>
                  <div style="height: 0.15rem"></div>
                  <div class="grzy-wz-repost-time">{{item.create_time}}</div>
                </div>


                <!--<div class="fb-zhanwei"></div>-->
              </div>


            </div>
          </vue-better-scroll>
        </div>
      </mt-tab-container-item>


    </mt-tab-container>


    <div class="xfc-dialog" v-show="xfcdialogShow" @click="xfcshadwo($event)">
      <div class="xfc-dialog-m" @click="xfcshadwodialog($event)" :class="{'xfc-xpl-info-null':detail.comment==null}">
        <div class="xfc-dialog-div">
          <div class="xfc-infoImg " v-if="imgarray.length>4">
            <div class="out-img " v-for="(item,index) in imgarray" v-bind:class="{'out-img1':index<3}"
                 @click="previewImg(item,imgarray)">
              <div class="inner-img" v-lazy:background-image="item"></div>
            </div>
          </div>

          <div class="xfc-infoImg-2-picture" v-if="imgarray.length<=4&&imgarray.length>=2">
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
        <div class="xfc-header">
          <img :src="detail.portrait" class="xfc-header">
          <div>
            <p>{{detail.nickname}}<img
              src="../../../static/img/huangv.png" class="grzyhuangv" v-show="detail.uid=='1'"></p>
            <p>{{detail.establish_time}}</p>
          </div>
        </div>

        <div class="option-div">
          <div class="xfc-commen-option xfc-iszan">
            <div v-if="detail.fabulous_state=='false'"><img
              src="../../../static/img/dianzan.png" alt=""><span>({{detail.abulous_count}})</span></div>
            <div v-else><img src="../../../static/img/yidianzan.png" alt=""><span class="yidianzan">({{detail.abulous_count}})</span>
            </div>
          </div>
          <div class="xfc-commen-option xfc-commen" @click="LocationToInfo(detail.id)">
            <div><img
              src="../../../static/img/pinglun.png" alt=""><span>({{detail.comment_count}})</span></div>

          </div>
        </div>
        <div class="xfc-new-commen" @click="LocationToInfo(detail.id)" v-if="detail.comment!=null">
          <div class="xpl" >新评论</div>
          <div class="xfc-xpl-info"  v-html="detail.comment==null?'添加评论...':changeEmoj(detail.comment.content)"></div>
        </div>

        <!--<span class="xfc-dialog-close" @click="closeDialog">-->
        <!--<img src="../../../static/img/close.png">-->
        <!--</span>-->
      </div>
    </div>
  </div>
</template>
<script>

  import {Toast} from 'mint-ui';
  import {wxConfig, changeEmoj,changeImgUrl,gradation} from '../../../static/js/timeFormat'
  require("../../../static/css/alertDialog.css")
  require("../../../static/css/gerenzhuye.css")


  export default {
    name: "gerenzhuye",

    data() {
      return {
        gradation,
        changeImgUrl,
        changeEmoj,
        userInfo: "",
        selected: 'shuoshuo',
        selectedIndex: 0,
        url: this.COMMEURL.commonUrl,
        pullupconfig: this.COMMEURL.pullupConfig, //上拉加载配置项
        tabbar: [],
        articleList: [],
        weiboList: [],
        beforeScrollTop: '',
        articlepage: 1,//文章 页码
        weibopage: 1,//说说页码
        articletotalPage: "",//文章分页总页码
        weibototalPage: "",//说说分页总页码
        loading: '',
        xfcpage: 1,
        xfctotalPage: '',
        xfcList: [],//秀风采数组
        type: "article",//当前类型
        toUid: "",
        user_id: "",//用户id
        uid: "",//服务器返回id
        gz_state: false,
        xfcdialogShow: false,
        detail: '',

        imgarray: [],//九宫格图片
        news_count: '', style_count: "", weibo_count: '',
        scrollTop:""
      }

    },
    watch: {
      userInfo: {
        handler(curVal, oldVal) {
          // console.log(curVal, oldVal)
        },
      },
      gz_state: {
        handler(curVal, oldVal) {

          // console.log(curVal, oldVal)
        },
      },
      articleList: {
        handler(curVal, oldVal) {

          if (curVal.length == 0) {

            $("#grzy_article .before-trigger span").text("发文章获赏金，快去发表文章吧！");
          }
        },
      },
      // weiboList: {
      //   handler(curVal, oldVal) {
      //
      //     if (curVal.length == 0) {
      //
      //       $("#grzy-guangchang .before-trigger span").text("没有更多数据了");
      //     }
      //   },
      // },
    },
    mounted() {

      wxConfig(this, location.href.split("#")[0]);
      this.toUid = this.$route.query.toUid;
      $(".before-trigger span").text("");
      this.beforeScrollTop = document.body.scrollTop;
      var self = this;
       setTimeout(function () {
         self.onZhuyeGuangcPullingUp();
        },100)
      setTimeout(function () {
        self.onXFCPullingUp();
      }, 1000)
      self.onZhuyeArticalPullingUp();

      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
    },

    methods: {
      clickItem: function (id, index, type) {
        this.selected = id;
        this.selectedIndex = index;
        this.type = type;
        if (index == 0) {
          $(".wenzhang").css("pointer-events", "auto");
          $(".shuoshuo").css("pointer-events", "auto");
          $(".pullup-wrapper").css("pointer-events", 'none')
          // this.articlepage = 1;
          // this.articleList = [];

          // this.onZhuyeArticalPullingUp();
        } else if (index == 1) {
          // this.weibopage = 1;
          // this.weiboList = [];
          $(".wenzhang").css("pointer-events", "auto");
          $(".shuoshuo").css("pointer-events", "auto");
          // this.onZhuyeGuangcPullingUp();
          $(".pullup-wrapper").css("pointer-events", 'none');
          // $(".before-trigger span").text("");
        } else if (index == 2) {
          // this.type = "style";
          // this.xfcpage = 1;
          // this.onXFCPullingUp();
          // this.xfcList = [];
          // $(".before-trigger span").text("");
          $(".wenzhang").css("pointer-events", "auto");
          $(".shuoshuo").css("pointer-events", "auto");
          $(".pullup-wrapper").css("pointer-events", 'none')
        }

      },

      ArticalData() {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/weibo/index/homepage",
            qs.stringify({
              type: "news",
              page: self.articlepage,
              toUid: self.toUid
            })
          ).then(function (res) {
            // console.log("info:" + JSON.stringify(res));
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {

              self.user_id = res.data.user_id
              self.articlepage++;
              self.userInfo = res.data.user;
              if (self.userInfo.userInfo.state == "false") {
                //未关注
                self.gz_state = false;
              } else {
                self.gz_state = true;
              }

              // console.log("info:" + JSON.stringify(self.userInfo));
              resolve(res.data);
            }
          }).catch(function (e) {
            console.log(e);
          })
        });
      }, //文章
      onZhuyeArticalPullingUp: function () {
        var self = this;
        this.ArticalData().then(function (res) {

          self.articletotalPage = parseInt(res.totalPage);

          if (res.data.length == 0) {

            if (self.articleList.length == 0) {

              $(" #grzy_article .before-trigger span").text("发文章获赏金，快去发表文章吧！");
            } else {
              self.$refs.guangchangarticlescroll.forceUpdate(false);
              $("#grzy_article .before-trigger span").text("没有更多数据了");
            }
          } else {
            self.articleList = self.articleList.concat(res.data);
            if (self.articlepage <= self.articletotalPage) {
              self.$refs.guangchangarticlescroll.forceUpdate(true);
            } else {
              self.$refs.guangchangarticlescroll.forceUpdate(false);
            }

          }


        });
      },
      GuangchangData() {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/weibo/index/homepage",
            qs.stringify({
              toUid: self.toUid,
              type: "weibo",
              page: self.weibopage
            })
          ).then(function (res) {
            if (res.data.code == 200) {
              self.weibopage++;
              self.user_id = res.data.user_id;
              self.news_count = res.data.count.news_count;
              self.style_count = res.data.count.style_count;
              self.weibo_count = res.data.count.weibo_count;
              self.tabbar = [
                {
                  id: "shuoshuo",
                  name: "秀生活(" + self.weibo_count + ")",
                  type: "weibo"
                },

                {
                  id: "xiufengcai",
                  name: "秀风采(" + self.style_count + ")",
                  type: "style"
                },
                {
                  id: "wenzhang",
                  name: "秀文采(" + self.news_count + ")",
                  type: "news"
                },

              ],
                resolve(res.data);
            }
          }).catch(function (e) {
            console.log(e);
          })
        });
      },
      onZhuyeGuangcPullingUp: function () {
        var self = this;
        this.GuangchangData().then(function (res) {
          self.weibototalPage = parseInt(res.totalPage);

          if (res.data.length == 0) {
            self.$refs.grzyguangchangscroll.forceUpdate(false);
            $("#grzy-guangchang .before-trigger span").text("没有更多数据了");
          } else {
            self.weiboList = self.weiboList.concat(res.data);
            if (self.weibopage <= self.weibototalPage) {
              self.$refs.grzyguangchangscroll.forceUpdate(true);
            } else {
              $("#grzy-guangchang .before-trigger span").text("没有更多数据了");
              self.$refs.grzyguangchangscroll.forceUpdate(false);
            }

          }


        });

      },
      getReleaseXFCSee() {
        var self = this;

        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/weibo/index/homepage",
            qs.stringify({
              type: "style",
              toUid: self.toUid,
              // toUid:8,
              page: self.xfcpage
            })
          ).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {

              resolve(res.data);
            }
          }).catch(function (e) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            console.log(e);
          })
        });
      },
      onXFCPullingUp: function () {
        var self = this;
        this.getReleaseXFCSee().then(function (res) {
          self.xfcpage++;

          if (res.data.length == 0) {
            self.xfcList = [];
            self.$refs.xiufengcaiscroll.forceUpdate(false);
            $("#grzy_xiufengcai .before-trigger span").text("没有更多数据了");
          } else {

            self.xfcList = self.xfcList.concat(res.data);
            self.xfctotalPage = parseInt(res.totalPage);
            if (self.xfcpage <= self.xfctotalPage) {
              self.$refs.xiufengcaiscroll.forceUpdate(true);
            } else {
              self.$refs.xiufengcaiscroll.forceUpdate(false);
              $("#grzy_xiufengcai .before-trigger span").text("没有更多数据了");
            }
          }
        });
      },
      addGuanzhu: function (uid) {
        if(this.gz_state){
          return ;
        }else{
            var self = this;
            this.$axios.post(self.url + "/index.php/ucenter/newindex/follow", qs.stringify({
              uid: uid
            })).then(function (res) {

              if (res.data.code == 200) {

                Toast({
                  message: "关注成功",
                  duration: 2000,
                  position: 'middle'
                });
                self.userInfo.userInfo.state = 'true';
                self.gz_state = true;
                self.userInfo.userInfo.fans = parseInt(self.userInfo.userInfo.fans) + 1;

              }
            })

        }

      },
      /**
       * 显示弹窗
       * @param id  id
       */
      xfcContentInfo: function (id) {
        this.xfcdialogShow = true;
        var self = this;
        this.$axios.post(self.url + "/index.php/home/index/detail", qs.stringify({
          style_id: id
        })).then(function (res) {
          if (res.data.code == 200) {
            self.detail = res.data.data;
            for (var i in res.data.data) {
              // console.log(res.data.data[i]);
              if (i.indexOf("url") > -1&&i.indexOf('urlsize1')==-1) {
                if (res.data.data[i] == null || res.data.data[i] == '') {

                } else {
                  self.imgarray.push(res.data.data[i]);
                }
              }
            }

          }
        })
      },
      closeDialog: function () {
        this.xfcdialogShow = false
        this.imgarray = [];
      },
      /**
       * 预览图片
       * @param item 当前链接
       * @param imgarray 图片数组
       */
      previewImg: function (item, imgarray) {
        wx.previewImage({
          current: item, // 当前显示图片的http链接
          urls: imgarray// 需要预览的图片http链接列表
        });
      },
      LocationDetail: function (url) {
        this.$router.push(url);
      },
      LocationArticleDetail: function (url, is_delect) {

        if (is_delect == 'true') {
          Toast({
            message: "抱歉,此文章已被原作者删除",
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.$router.push(url);
        }
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
      LocationToInfo:function(id){
        this.$router.push({path: "/xiufengcaixiangqing", query: {typeid: id}});
      },

    }
  }
</script>
<style>
  /*@import "../../../static/css/wodefabu.css";*/
</style>
