<template>
  <div class="wodeshoucang">
    <div class="wdsc-search">
      <div class="serch-div">
        <input type="text" v-model="seachwords">
        <img src="../../../static/img/search.png" alt="" @click="seachWords">
      </div>
    </div>
    <div class="collection">
      <vue-better-scroll
        class="wodeshoucang-wrapper"
        ref="collectionscroll"
        :probeType="2"
        :scrollbar="pullupconfig.scrollbarObj"
        :pullDownRefresh=false
        :listenScroll=true
        :pullUpLoad="pullupconfig.pullUpLoadObj"
        :startY="parseInt(pullupconfig.startY)"
        @pullingUp="onCollectionPullingUp()"
      >

        <div class="CollectionList">
          <div class="collectionItem" v-for="item in collectionList"
               @click="locationDetail(item.is_delect,item.type,item.old_articleid,item.id)">
            <div class="info">
              <img :src=item.portrait alt="">
              <!---->
              <img src="../../../static/img/jinv.png" class="wdscdav" v-show="item.user_type=='1'">
              <p class="name">{{item.nickname}}</p>
              <p class="timer">{{item.create_time}}</p>
            </div>
            <p v-if="item.type=='repost'" class="wdsc-repostTitle">
              {{item.repostTitle==''?"此文甚好,所以转发":item.repostTitle}}</p>
            <div  v-if="item.type=='release'">
              <div class="sc-content">
                <div class="sc-img" :style="{backgroundImage:'url('+item.image+')'}" v-if="item.image!=null"></div>
                <div class="sc-info" :class="{'scinfomaxwidth':item.image!=null}">
                  <p>《{{item.title}}》</p>
                  <p v-html="item.content"></p></div>
              </div>
            </div>
            <div  v-if="item.type=='repost'" :class="{'zhuanfaItem':item.type=='repost'}">
              <div class="sc-content">
                <div class="sc-img" :style="{backgroundImage:'url('+item.image+')'}" v-if="item.image!=null"></div>
                <div class="sc-info" :class="{'scinfomaxwidth':item.image!=null}">
                  <p>《{{item.title}}》</p>
                  <p v-html="item.content"></p></div>
              </div>
            </div>
            <div class="line"></div>
            <div class="scTags">
              <div v-for="tagItem in tagChange(item.label) " v-if="tagItem!=''">{{tagItem}}</div>
            </div>
            <div class="is-delect-text is-delect-text1" v-if="item.is_delect=='true'">
              <p>抱歉，此文章已被原作者删除</p>
            </div>

          </div>
        </div>
      </vue-better-scroll>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  require("../../../static/css/wodeshoucang.css")
  import {tagChange} from "../../../static/js/timeFormat"

  export default {
    name: "wodeshoucang",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        tagChange,
        collectionList: [],
        seachwords: "",
        collectionpage: 1,
        beforeScrollTop: '',
        loading: "",
        collectionTotalpage: ""
      }
    },
    watch: {
      seachwords: {
        handler: function (curVal, oldVal) {
          if (curVal == "") {
            this.collectionpage = 1;
            this.collectionList = [],
              $(".before-trigger span").text("");
            this.onCollectionPullingUp();
          }
        },
      }
    },
    mounted() {
      this.onCollectionPullingUp();
    },
    methods: {
      getcollectionList() {
        var self = this;
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        return new Promise(function (resolve) {
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/collectionSee", qs.stringify({
              search: self.seachwords,
              page: self.collectionpage
            })
          ).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              self.collectionpage++;
              resolve(res.data);
              // console.log(res.data);
            }
          }).catch(function (e) {
            console.log(e);
          })
        });
      },

      onCollectionPullingUp: function () {
        var self = this;
        this.getcollectionList().then(function (res) {
          if (res.data == null) {
            self.$refs.collectionscroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
            return;
          }
          self.collectionList = self.collectionList.concat(res.data);
          // console.log(self.collectionList )
          self.collectionTotalpage = parseInt(res.totalCount);
          if (self.collectionpage <= self.collectionTotalpage) {
            self.$refs.collectionscroll.forceUpdate(true);
          } else {
            self.$refs.collectionscroll.forceUpdate(false);
            $(".before-trigger span").text("没有更多数据了");
          }
        });
      },

      seachWords: function () {
        //搜索按钮
        this.collectionpage = 1;
        this.collectionList = [];
        $(".before-trigger span").text("");
        this.onCollectionPullingUp();
      },
      /**
       * 跳转到文章详情
       * @param is_delect 是否被删除
       * @param type 转发或者发布
       * @param old_articleid 原文章id
       * @param is_release 判断转发删除 还是 原文被删除  有值转发被删除
       * @param id 文章id
       */
      locationDetail(is_delect,type, old_articleid, id) {
        if(is_delect=='true'){
          Toast({
            message:"抱歉，此文章已被原作者删除",
            duration:2000,
            position:'middle'
          });
        }else{
          if (type == "repost") {
            this.$router.push({name: 'zhuanfawenzhangxiangqing', query: {rePostId: old_articleid, articalId: id}});
          } else {
            this.$router.push({name: 'wenzhangxiangqing', query: {articalId: id}})
          }
        }

      },

    }

  }
</script>
<style>

</style>
