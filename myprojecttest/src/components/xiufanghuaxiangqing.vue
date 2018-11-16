<template>
  <div class="xiufanghuaxiangqing">
    <div class="xfhxq-back">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-if="img!=''">
          <div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img+')'}"></div>
        </mt-swipe-item>
        <mt-swipe-item v-if="img1!=''">
          <div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img1+')'}"></div>

        </mt-swipe-item>
        <mt-swipe-item v-if="img2!=''">
          <div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img2+')'}"></div>

        </mt-swipe-item>
        <mt-swipe-item v-if="img3!=''">
          <div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img3+')'}"></div>
        </mt-swipe-item>


      </mt-swipe>
    </div>
    <!--<div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img+')'}"></div>-->
    <p class="xfhxq-title">排名{{sort}}:{{title}}</p>
    <p class="xfhxq-content">{{intro}}</p>
    <video class="xfhxq-video" controls :poster="'http://tp.zlzjcyw.com'+img">
      <!--<source src="movie.ogg" type="video/ogg" />-->
      <source :src=videosrc type="video/mp4"/>
      <!--Your browser does not support the video tag.-->
    </video>
    <div class="xfhxq-zhanwei"></div>
  </div>
</template>
<script>

  export default {
    name: "xiufanghuaxiangqing",
    data() {
      return {
        title: "",//标题
        intro: "",//内容
        videosrc: "",//视屏地址
        img: "",//图片
        img1: "",//图片
        img2: "",//图片
        img3: "",//图片
        sort: ""//排名
      }
    },
    mounted() {


      this.title = this.$route.query.title;
      this.intro = this.$route.query.intro;
      this.videosrc = this.$route.query.videosrc;
      this.img = this.$route.query.img;
      this.img1 = this.$route.query.img1;
      this.img2 = this.$route.query.img2;
      this.img3 = this.$route.query.img3;
      this.sort = this.$route.query.sort;
      console.log("img3:" + this.img3)
      console.log("img2:" + this.img2)
      console.log("img1:" + this.img1)
    },
    methods: {}
  }
</script>
<style>
  .xfhxq-back {
    width: 100%;
    height: 2rem;
  }

  .xfhxq-img {
    width: 100%;
    height: 2rem;
    /*background-image: url('../../static/img/fengjing.jpg');*/
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  .xfhxq-title {
    width: 100%;
    text-align: center;
    font-size: 0.2rem;
    font-weight: bold;
    color: #444444;
    margin-top: 0.2rem;
  }

  .xfhxq-content {
    width: 94%;
    margin: 0.2rem auto;
    /*border: 1px solid slateblue;*/
    font-size: 0.15rem;
    text-indent: 0.2rem;
  }

  .xfhxq-video {
    width: 94%;
    margin: 0 auto;
    /*border: 1px solid seagreen;*/
    display: block;
    height: 2rem;
    object-fit:fill

  }

  .xfhxq-zhanwei {
    width: 100%;
    height: 1rem;
  }
</style>
