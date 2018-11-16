<template>
  <div id="toutiao-detail">
    <!--顶图-->
    <div class="head-img" :style="'backgroundImage: url('+article.banner+')'"></div>
    <!--标题-->
    <div class="title" v-html="article.title"></div>
    <!--作者-->
    <!--<div class="author">作者：{{article.author}}</div>-->
    <!--内容-->
    <div class="content" v-html="article.content"></div>
    <!--底部-->
    <!--<div class="bottom">-->
      <!--<span></span>-->
      <!--{{article.from}}-->
    <!--</div>-->
  </div>
</template>

<script>
  require('../../../static/css/index.css');
  export default {
    data(){
      return{
        article:{
          banner:'../../static/img/banner.png',
          title:'',
          // author:'张三',
          content:'',
          // from:'本文来自环球网科技综合报道，作者张三.'
        }
      }
    },
    mounted(){
      this.article = this.$route.params
      //页面白色
      document.getElementsByTagName('body')[0].style.backgroundColor='#fff';
    }
  }
</script>
