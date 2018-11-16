<template>
  <div class="wodefabu">
    <div class="wdfb-search">
      <div class="serch-div">
        <input type="text" v-model="seachwords" v-on:input="searchInput(seachwords)">
        <img src="../../../static/img/search.png" alt="" @click="seachWords">
      </div>
    </div>

    <div class="nav">
      <ul class="nav-ul">
        <li @click="clickItem(item.id,index,item.type)"
            v-for="(item,index) in tabbar">
          <span :class="{ isSelected: selected == item.id }">{{item.name}}</span>
        </li>

      </ul>

    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="wenzhang">
        <div id="wdfb_article">
          <vue-better-scroll
            class="wodefabu_articlewrapper"
            ref="articlescroll"
            :probeType="2"
            :scrollbar="pullupconfig.scrollbarObj"
            :pullDownRefresh=false
            :listenScroll=true
            :pullUpLoad="pullupconfig.pullUpLoadObj"
            :startY="parseInt(pullupconfig.startY)"
            @pullingUp="onArticalPullingUp()"
          >
            <div class="wdfb-wenzhang">
              <div class="wdfb-wenzhangItem" v-for="(item,index) in articleList">
                <div class="fb-info">
                  <span>{{item.create_time}}</span>
                  <div class="fb-info-left">
                    <router-link :to="{name:'fabuwenzhang',query:{id:item.id}}" replace><img
                      src="../../../static/img/bianji.png" class="bianji" v-show="item.type=='release'">
                    </router-link>
                    <img src="../../../static/img/shanchu.png" class="shanchuwenzhang"
                         @click="deleteRealeasee($event,item.id,'article',index)">
                  </div>

                </div>
                <span
                  @click="linkArticleDetail($event,{name:'wenzhangxiangqing',query:{articalId:item.id}})"
                  v-show="item.type=='release'">
                  <div class="fb-content">
                    <div class="wdfb-fb-img" :style="{backgroundImage:'url('+item.image[0]+')'}"
                         v-if="item.image.length!=0"></div>
                    <div class="content-info">
                      <p class="wdfb-fa-title">《{{item.title}}》</p>
                      <p v-html="item.content" class="wdfb-wenzhang-p"></p>

                    </div>
                  </div>
                </span>
                <span v-show="item.type=='repost'" class="repostContent"
                      @click="linkZhuanfaArticleDetail({name:'zhuanfawenzhangxiangqing',query:{articalId:item.id ,rePostId:item.repostid}},item.is_delect)">
                  <div class="repostContentInfo" v-html="item.repostTitle==''?'此文甚好，所有转发':item.repostTitle"></div>
            <div class="forwar-content"
                 @click="linkZhuanfaArticleDetail($event,{name:'wenzhangxiangqing',query:{articalId:item.repostid}},item.is_delect)">
                <div class="forward-content-div">
                  <div class="forward-content-img"
                       :style="{backgroundImage:'url('+item.image[0]+')'}" v-if="item.image.length!=0"></div>
                  <div class="forward-content-artical">

                    <p class="forward-content-title">{{item.title}}</p>
                    <p class="forward-content-content" v-html="item.content"></p>
                  </div>
                </div>

              <div class="is-delect-text" v-if="item.is_delect=='true'">
                       <p>抱歉，此文章已被原作者删除</p>
                     </div>
              </div>
                </span>
                <div class="fb-line"></div>
                <div class="fb-tag">
                  <div v-for="tag in tagChange(item.label)" v-if="tag!=''">{{tag}}</div>
                </div>
                <span class="liulancishu">阅读次数:{{item.view}}</span>
                <div class="fb-zhanwei"></div>
              </div>

            </div>
          </vue-better-scroll>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="shuoshuo">
        <div id="wdfb_shuoshuo">
          <vue-better-scroll
            class="wodefabu_weibowrapper"
            ref="weiboscroll"
            :probeType="2"
            :scrollbar="pullupconfig.scrollbarObj"
            :pullDownRefresh=false
            :listenScroll=true
            :pullUpLoad="pullupconfig.pullUpLoadObj"
            :startY="parseInt(pullupconfig.startY)"
            @pullingUp="onWeiboPullingUp()"
          >
            <div class="shuoshuo">
              <div class="shuoshuoItem" v-for="(shuoshuoItem,shuoshuoIndex) in weiboList"
                   @click="LocationDetail({name:'guangchangxiangqing',query:{weiboid:shuoshuoItem.id}})">
                <div class="ss-item">
                  <div class="ss-img" :style="{backgroundImage:'url('+shuoshuoItem.image+')'}"
                       v-if="shuoshuoItem.image!=''"></div>
                  <div class="ss-info">
                    <!--<div class="ss-content" v-html="shuoshuoItem.content.replace(/&nbsp;/g,'')"></div>-->
                    <div class="ss-content" v-html="changeEmoj(shuoshuoItem.content)"></div>

                    <div class="ss-timer">{{shuoshuoItem.create_time}}</div>
                    <img src="../../../static/img/shanchu.png" class="shanchushuoshuo"
                         @click="deleteRealeasee($event,shuoshuoItem.id,'weibo',shuoshuoIndex)">
                  </div>
                </div>
                <div class="fb-zhanwei" v-if="weiboList.length>0"></div>
              </div>
            </div>
          </vue-better-scroll>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="xiufengcai">
        <div id="wdfb_xiufengcai">
          <vue-better-scroll
            class="wodefabu_xiufengcaiwrapper"
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
              <div class="wdfc-xfc-item " v-for="(item,index) in xfcList" v-bind:class="{'wdfc-xfc-item1':index==0}"
                   @click="xfcContentInfo(item.id)">
                <div class="wdfc-xfc-item-time">
                  <p>{{item.establish_time}}</p>
                  <div @click="deleteRealeasee($event,item.id,'style',index)"></div>


                </div>
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
                    <div class="wdfc-xfc-item-right-content">{{item.brief_introduction}}</div>
                    <p class="totalCount" v-show="changeImgUrl(item).length>1">
                      共{{changeImgUrl(item).length}}张</p>
                  </div>
                </div>
                <div class="fb-zhanwei"></div>
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
            <p>{{detail.nickname}}</p>
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
          <div class="xpl">新评论</div>
          <div class="xfc-xpl-info" :class="{'xfc-xpl-info-null':detail.comment==null}"
               v-html="detail.comment==null?'添加评论...':changeEmoj(detail.comment.content)"></div>
        </div>
        <!--<span class="xfc-dialog-close" @click="closeDialog">-->
        <!--<img src="../../../static/img/close.png">-->
        <!--</span>-->
      </div>
    </div>
  </div>
</template>
<script>
  require("../../../static/css/wodefabu.css")
  require("../../../static/css/alertDialog.css")
  import {changeEmoj, tagChange, changeImgUrl} from "../../../static/js/timeFormat";
  import {Toast} from 'mint-ui';

  export default {
    name: "wodefabu",

    data() {
      return {
        tagChange,
        changeEmoj,
        changeImgUrl,
        selected: 'shuoshuo',
        selectedIndex: 0,
        url: this.COMMEURL.commonUrl,
        pullupconfig: this.COMMEURL.pullupConfig, //上拉加载配置项
        tabbar: [
          {
            id: "shuoshuo",
            name: "秀生活",
            type: "weibo"
          },

          {
            id: "xiufengcai",
            name: "秀风采",
            type: "style"
          },
          {
            id: "wenzhang",
            name: "秀文采",
            type: "article"
          }

        ],
        articleList: [],
        weiboList: [],
        beforeScrollTop: '',
        articlepage: 1,//文章 页码
        weibopage: 1,//说说页码
        articletotalPage: "",//文章分页总页码
        weibototalPage: "",//说说分页总页码
        loading: '',
        seachwords: "",//搜索的字段
        type: "article",//当前类型,
        xfcpage: 1,
        xfctotalPage: '',
        xfcList: [],//秀风采数组
        xfcdialogShow: false,//显示详情弹窗
        detail: '',//详情
        imgarray: [],


      }

    },
    watch: {
      articleList: {
        handler(curVal, oldVal) {
        },
        deep: true
      },
      xfcList: {
        handler(curVal, oldVal) {
        },
        deep: true
      },
      weiboList: {
        handler(curVal, oldVal) {
        },
        deep: true
      },
      seachwords: {
        handler: function (curVal, oldVal) {
          if (curVal == "") {
            //重新加载说说 列表和文章列表
            this.articleList = [];
            this.articlepage = 1;
            this.onArticalPullingUp();
            this.weiboList = [];
            this.weibopage = 1;
            this.onWeiboPullingUp();
            this.xfcList = [];
            this.xfcpage = 1;
            this.onXFCPullingUp();

          }
        },
      }
    },
    mounted() {
      $(".before-trigger span").text("");
      this.onWeiboPullingUp();

      var self = this;
      setTimeout(function () {
        $(".wodefabu_articlewrapper .before-trigger span").text("");
        self.onArticalPullingUp();
      }, 500)
      setTimeout(function () {
        $(".before-trigger span").text("");
        self.onXFCPullingUp();
      }, 500)
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
          $(".wenzhang").css("pointer-events", "none");
          $(".shuoshuo").css("pointer-events", "auto");
          $(".pullup-wrapper").css("pointer-events", 'auto')
        } else if (index == 1) {
          $(".pullup-wrapper").css("pointer-events", 'none');
        } else if (index == 2) {
          $(".wenzhang").css("pointer-events", "auto");
          $(".shuoshuo").css("pointer-events", "auto");
          $(".pullup-wrapper").css("pointer-events", 'none')
        }

      },
      getReleaseArticalSee() {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/releaseSee",
            qs.stringify({
              search: self.seachwords,
              type: "article",
              page: self.articlepage
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
      onArticalPullingUp: function () {
        var self = this;
        this.getReleaseArticalSee().then(function (res) {
          self.articlepage++;
          if (res.data == null || res.data == false) {
            self.$refs.articlescroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          } else {

            self.articleList = self.articleList.concat(res.data);
            self.articletotalPage = parseInt(res.totalCount);
            if (self.articlepage <= self.articletotalPage) {

              self.$refs.articlescroll.forceUpdate(true);
              $(".wodefabu_articlewrapper .before-trigger span").text("");
            } else {

              self.$refs.articlescroll.forceUpdate(false);
              $(".wodefabu_articlewrapper  .before-trigger span").text("没有更多数据了");
            }
          }

        });
      },
      getReleaseWeiboSee() {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/releaseSee",
            qs.stringify({
              search: self.seachwords,
              type: "weibo",
              page: self.weibopage
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
      onWeiboPullingUp: function () {
        var self = this;
        this.getReleaseWeiboSee().then(function (res) {
          self.weibopage++;
          if (res.data == null || res.data == false) {
            self.weiboList = [];
            self.$refs.weiboscroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          } else {
            self.weiboList = self.weiboList.concat(res.data);
            self.weibototalPage = parseInt(res.totalCount);

            if (self.weibopage <= self.weibototalPage) {
              self.$refs.weiboscroll.forceUpdate(true);
            } else {
              self.$refs.weiboscroll.forceUpdate(false);
              $(".before-trigger span").text("没有更多数据了");
            }
          }
        });
      },
      getReleaseXFCSee() {
        var self = this;

        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/releaseSee",
            qs.stringify({
              search: self.seachwords,
              type: "style",
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

          if (res.data == null || res.data == false) {
            self.xfcList = [];
            self.$refs.xiufengcaiscroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          } else {
            self.xfcList = self.xfcList.concat(res.data);
            self.xfctotalPage = parseInt(res.totalCount);
            if (self.xfcpage <= self.xfctotalPage) {
              self.$refs.xiufengcaiscroll.forceUpdate(true);
            } else {
              self.$refs.xiufengcaiscroll.forceUpdate(false);
              $(".before-trigger span").text("没有更多数据了");
            }
          }
        });
      },
      seachWords: function () {
        //搜索关键字
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        $(".before-trigger span").text("");
        if (this.type == "article") {
          this.articleList = [];
          this.articlepage = 1;
          this.onArticalPullingUp();
        } else if (this.type == "style") {
          this.xfcList = [];
          this.xfcpage = 1;
          this.onXFCPullingUp();
        } else {
          this.weibopage = 1;
          this.weiboList = []
          this.onWeiboPullingUp();
        }
      },
      searchInput: function (seachwords) {

      },
      //跳转到文章详情
      linkArticleDetail: function (e, url) {
        e.preventDefault();
        e.cancelBubble = true;

        this.$router.push(url)


      },
      linkZhuanfaArticleDetail: function (url, is_delect) {
        if (is_delect == "true") {
          Toast({
            message: '抱歉,此文章已被原作者删除',
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.$router.push(url)
        }

      },
      //删除文章 说说 id  type:类型
      deleteRealeasee: function (e, id, type, index) {

        e.preventDefault();
        e.cancelBubble = true;
        var self = this;
        var type2 = ""
        if (type == "article") {
          type2 = "文章"
        } else if (type == 'weibo') {
          type2 = "说说"
        } else {
          type2 = '秀风采'
        }
        this.$confirm("是否删除该" + type2 + "?", '提示', {
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
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/deleteArticle", qs.stringify({
            id: id,
            type: type
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              Toast({
                message: "删除" + type2 + "成功",
                duration: 2000,
                position: "middle"
              })
              if (type == "article") {
                self.articleList.splice(index, 1);
              } else if (type == 'weibo') {
                self.weiboList.splice(index, 1);
              } else {
                self.xfcList.splice(index, 1);
              }

            }
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });

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
          // self.$loading.fullscreenLoading = false;
          // self.loading.close();
          if (res.data.code == 200) {

            self.detail = res.data.data;
            for (var i in res.data.data) {
              // console.log(res.data.data[i]);
              if (i.indexOf("url") > -1 && i.indexOf('urlsize1') == -1) {
                if (res.data.data[i] == null || res.data.data[i] == '') {

                } else {
                  self.imgarray.push(res.data.data[i]);
                }
              }
            }
          }
        })
      },
      // closeDialog: function () {
      //   this.xfcdialogShow = false
      // },
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
       * 跳转到说说详情页面
       * @param url 链接
       * @constructor
       */
      LocationDetail: function (url) {
        this.$router.push(url);
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
      LocationToInfo(id) {
        this.$router.push({path: "/xiufengcaixiangqing", query: {typeid: id}});
      }
    },


  }
</script>
<style>
  /*@import "../../../static/css/wodefabu.css";*/
</style>
