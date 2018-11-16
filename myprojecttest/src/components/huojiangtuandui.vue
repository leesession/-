<template>
  <div class="tuanduihuojiang">
    <div class="tdfc-back">
      <mt-swipe >
        <mt-swipe-item >
          <div class="tdfc-img xfhxq-img1" style="background-image:url('../../static/img/xiufanghua/banner.jpg')" ></div>
        </mt-swipe-item>
        <mt-swipe-item >
          <div class="tdfc-img xfhxq-img2"   style="background-image:url('../../static/img/xiufanghua/banner2.png')"></div>
        </mt-swipe-item>
        <mt-swipe-item >
          <div class="tdfc-img xfhxq-img3"  style="background-image:url('../../static/img/xiufanghua/banner3.jpg')"></div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="tdfc-nav">
      <ul class="tdfc-nav-ul">
        <li @click="clickItem(item.id,index,item.type)"
            v-for="(item,index) in tabbar">
          <span :class="{ isSelected: selected == item.id }">{{item.name}}</span>
        </li>

      </ul>

    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="tuanduifengcai">
        <div id="xfh">
          <vue-better-scroll
            class="tdhjwrapper"
            ref="scroll"
            :probeType="2"
            :scrollbar="pullupconfig.scrollbarObj"
            :pullDownRefresh=false
            :listenScroll=true
            :pullUpLoad="pullupconfig.pullUpLoadObj"
            :startY="parseInt(pullupconfig.startY)"
            @pullingUp="onPullingUp"
          >
            <div class="hjtdcommen">
              <div class="commenItem" v-for="item in tuanduifengcaiList ">
                <router-link :to="{name:'xiufanghuaxiangqing',query:{intro: item.intro,img:item.img,img1:item.img1,img2:item.img2,img3:item.img3,videosrc:item.video,title:item.title,sort:item.sort}}">
          <span>
            <div class="commenItemImg"  v-lazy:background-image="'http://tp.zlzjcyw.com'+item.img">
              <p>《{{item.title}}》{{item.name}}</p>
            </div>
                </span>
                </router-link>
              </div>

            </div>
          </vue-better-scroll>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="dskx">
        <div class="dskx">
        </div>
      </mt-tab-container-item>
    </mt-tab-container>




  </div>
</template>
<script>
  require("../../static/css/xiufanghua.css")
  import {wxConfig, share,shareUrl,tabbarChange} from "../../static/js/timeFormat";
  export default {
    name: "huojiangtuandui",

    data() {
      return {
        pullupconfig: this.COMMEURL.pullupConfig, //上啦加载配置项
        selected: 'tuanduifengcai',
        selectedIndex: 0,
        url: this.COMMEURL.commonUrl,
        tuanduifengcaiList: [],
        beforeScrollTop:"",
        imgarray:[],//图片
        page:0,//分页
        totalPage:"",//总页数
        tabbar: [
          {
            id: "tuanduifengcai",
            name: "获奖团队",
            type: "article"
          },
          {
            id: "dskx",
            name: "才艺大赛",
            type: "weibo"
          }
        ],
        count:0,


      }

    },
    watch:{
      count:{
        handler(curVal, oldVal) {
          if(curVal==1){
            wxConfig(this,window.location.href.split('#')[0]);
            share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this,location.href),"分享你生活的每一个精彩瞬间，让我们为你点赞",10000);

          }
        },
      }
    },
    created(){
      tabbarChange(this.COMMEURL.linkArray, this.$route.path);
    },
    mounted() {

      this.beforeScrollTop = document.body.scrollTop;
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      $(".before-trigger span").text("");
      this.onPullingUp();
      $(".pullup-wrapper").css("pointer-events", "none");
      $(".commen").css("pointer-events", "none");

      // this.getData();
    },
    methods: {
      getData: function () {
        var self = this;
        return new Promise(function (resolve) {
          self.$axios.post("http://tp.zlzjcyw.com/api/xfh2",qs.stringify({
            page:self.page
          })).then(function (res) {
            console.log(res);
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.success) {
              self.totalPage = res.data.page;
              // self.tuanduifengcaiList = res.data.data;
              resolve(res.data);
            }

          }).catch(function (e) {
            console.log("cuowu:" + e);
          })
        });
      },
      onPullingUp: function () {
        //上拉加载
        var self = this;
        this.getData().then(function (res) {
          self.tuanduifengcaiList =  self.tuanduifengcaiList.concat(res.data);
          self.page++;
          if (self.page <self.totalPage) {
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
      clickItem: function (id, index, type) {
        this.selected = id;
        this.selectedIndex = index;
        if (index == 0) {
          this.type = "article";
          $(".shuoshuo").css("pointer-events", "auto");
        } else {
          this.type = "weibo";
          $(".shuoshuo").css("pointer-events", "none");
        }
      },
      locationHref: function () {
        location.href = 'http://mp.weixin.qq.com/s/NCUieswD7Eu03XGhKhAa8g';
      }


    },


  }
</script>
<style>
  /*@import "../../../static/css/wodefabu.css";*/
  .tuanduihuojiang{
    width: 100%;
  }
  .hjtdcommen{
    width: 100%;
  }
  .tdhjwrapper{

    position: fixed;
    top: 2.46rem;
    left: 0;
    right: 0;
    bottom: 0.52rem;
    width: 100%;
    height: calc(100% - 2.5rem);
    overflow-x: hidden;
    overflow-y: scroll;

    background-color: #ffffff;

  }
.tdfc-back{
      width: 100%;
      height: 2rem;


  }
  .tdfc-img {
    width: 100%;
    height: 2rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
   .tdfc-nav {
     width: 100%;
     height: 0.46rem;

     position: fixed;
     top: 2rem;
     left: 0;

   }
   .tdfc-nav-ul {
     width: 100%;
     margin: 0 auto;
     height: 0.43rem;
     display: flex;
     flex-direction: row;
     list-style: none;

   }

  .tdfc-nav-ul> li {
    flex-grow: 1;

    text-align: center;
    line-height: 0.43rem;
    color: #999999;
    font-size: 0.16rem;
  }
  .tdfc-nav-ul> li > span {

      display: inline-block;
      height: 0.42rem;
      padding: 0 0.2rem;
      font-size: 0.16rem !important;
    }
  .tdfc-nav-ul> li .isSelected {
      color: #f5746f;
      border-bottom: 1px solid #f5746f;
    }
.dskx{
  /*background-color: #ffffff;*/
}
#dskx{

}
</style>
