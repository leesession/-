<template>
  <div class="xiufanghuaxiangqing">
    <div class="xfhxq-back">
      <mt-swipe :auto="3000">
        <mt-swipe-item >
          <div class="xfhxq-img" :style="{backgroundImage:'url('+imgarray+')'}"></div>
        </mt-swipe-item>


      </mt-swipe>
    </div>
    <!--<div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img+')'}"></div>-->
    <p class="xfhxq-title" v-html="title"></p>
    <p class="xfhxq-content">{{intro}}</p>
    <video class="xfhxq-video" controls :poster="''+imgarray">
      <!--<source src="movie.ogg" type="video/ogg" />-->
      <source :src=videosrc type="video/mp4"/>
      <!--Your browser does not support the video tag.-->
    </video>
    <div class="xfhxq-zhanwei"></div>
  </div>
</template>
<script>

  export default {
    name: "tuanduifengcaixiangqing",
    data() {
      return {
        title: "",//标题
        intro: "",//内容
        videosrc: "",//视屏地址
        imgarray: "",//图片
        img1: "",//图片
        img2: "",//图片
        img3: "",//图片

      }
    },
    mounted() {


      this.title = this.$route.query.title;
      this.intro = this.$route.query.intro;
      this.videosrc = this.$route.query.videosrc;
      this.imgarray = this.$route.query.img;


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
  .tdfcxq-name{
    margin-top: 0.03rem;
    display:block;
    text-align:center;
    font-size:0.2rem;
  }
</style>
