<template>
  <div class="xiufanghuaxiangqing">
    <div class="xfhxq-back">
      <div class="xfhxq-img" :style="{backgroundImage:'url('+img+')'}"></div>
    </div>
    <!--<div class="xfhxq-img" :style="{backgroundImage:'url(http://tp.zlzjcyw.com'+img+')'}"></div>-->
    <p class="xfhxq-title">{{sort}}</p>
    <p class="xfhxq-content" v-html="intro"></p>
    <!--<video class="xfhxq-video yxtdxq-video" controls :poster="'http://tp.zlzjcyw.com'+img">-->
      <!--<source src="movie.ogg" type="video/ogg" />-->
      <!--<source :src=videosrc type="video/mp4"/>-->
      <!--Your browser does not support the video tag.-->
    <!--</video>-->
    <div class="xfhxq-zhanwei"></div>
  </div>
</template>
<script>

  export default {
    name: "youxiutuanduixiangqing",
    data() {
      return {
        title: "",//标题
        intro: "",//内容
        videosrc: "",//视屏地址
        img: "",//图片
        sort: ""//排名
      }
    },
    mounted() {

var tit;
      tit = this.$route.query.title;
      tit=tit.split("《")[1];
      this.title=tit.split("》")[0]
      this.intro = this.$route.query.intro;
      // this.videosrc = this.$route.query.videosrc;
      this.img = this.$route.query.img;
      this.sort = this.$route.query.sort;

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


  .yxtdxq-video{
    display: none;
  }

  .xfhxq-zhanwei {
    width: 100%;
    height: 1rem;
  }
</style>
