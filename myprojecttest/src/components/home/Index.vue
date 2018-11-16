<template>
  <div id="index">
    <!--左右轮播图-->
    <div class="banner" @click="Toast('请到秀芳华App端操作')">
      <mt-swipe :auto="4000" >
        <mt-swipe-item >
          <div class="swipe"
               style="background-image: url('http://p5kgkqzx0.bkt.clouddn.com/%E8%BD%AE%E6%92%AD%E5%9B%BE%E7%9B%B4%E6%92%AD2.png')"></div>
        </mt-swipe-item>
        <mt-swipe-item >
          <div class="swipe"
               style="background-image: url('http://p5kgkqzx0.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BE-%E7%A7%80%E5%8F%8B%E4%BA%A4%E6%B5%81%E7%BE%A4.png')"></div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="swipe"
               style="background-image: url('http://p5kgkqzx0.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BE-%E5%9C%88%E5%AD%90.png')"></div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--秀头条-->
    <div class="news">
      <img src="../../../static/img/home/xtt.png" alt="">
      <div @click="routerTo('/topline')">
        <ul>
          <li v-for="(item,index) in news">
            <i></i> {{item}}
          </li>
        </ul>
      </div>
    </div>
    <!--同行者-->
    <div class="partner">
      <div class="partner-line"></div>
      <div class="partner-title">在这里，您有<span> {{count}} </span>位同行者</div>
      <div class="partner-line"></div>
    </div>
    <!--栏目-->
    <div class="lanmu">
      <div class="sign" style="background-image: url('../../../static/img/home/sign.png')" @click="routerTo('/newsign')"></div>
      <div class="right">
        <div class="jijin" style="background-image: url('../../../static/img/home/jijin.png')" @click="routerTo('/jijin')"></div>
        <div class="kangyang" style="background-image: url('../../../static/img/home/kangyang.png')" @click="routerTo('/kangyang')"></div>
      </div>
    </div>
    <!--干细胞专栏-->
    <div class="cell">
      <div  style="background-image: url('../../../static/img/home/newcell.png')" @click="routerTo('/cell')"></div>
    </div>
    <!--积分兑换-->
    <div class="home-modal" v-show="homeModel" @touchmove.prevent>
      <div class="success">
        <div class="img">
          <img src="../../../static/img/home/tongzhi.png" alt="">
          <p class="warn">重要通知</p>
          <p>“积分兑换卡券，折现红包”</p>
          <p>活动已经开始</p>
        </div>
        <div class="operate">
          <span @click="homeModel=!homeModel">关闭</span>
          <span @click="routerTo('/exchange')">立即查看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import { Toast  } from 'mint-ui'
  require('../../../static/css/index.css')

  export default {
    data(){
      return{
        news:[],
        count:0,
        homeModel:false,
      }
    },
    created(){
      this.Toast=Toast
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: '#fff'
      });
      this.getNews();
      this.getNum();
    },
    mounted(){
      let _this=this;
      this.$nextTick(()=>{
        //页面白色
        document.getElementsByTagName('body')[0].style.backgroundColor = '#F5F5F5';
        $('#index').height($(window).height());
      })
      // setTimeout(()=>{
      //   _this.activity();
      // },100)
    },
    methods:{
      activity(){
        this.$axios.post('http://interface.xiufanghua.com/index/one-prompt', qs.stringify({
          uid:this.COMMEURL.UID,
          secret:md5(this.COMMEURL.UID+'xfh')
        })).then(val => {
          if(val.data.success){
            this.homeModel=true
          }else {
            this.homeModel=false
          }
        }).catch(err => {})
      },
      getNews(){
        this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/headline_shortlist').then(val=>{
          this.loading.close();
          if(val.data.code === 200){
            for(let d of val.data.data){
              this.news.push(d.title)
            }
            this.news.push(this.news[0]);
            this.news.push(this.news[1]);
            this.newsScroll();
          }
        }).catch(err=>{})
      },
      newsScroll(){
        let len = this.news.length, height = -0.2;
        let i = 0;
        //一次上升的高度为 .25rem
        window.timer = setInterval(() => {
          i++;
          $(".news ul").animate({
            top: height * i + 'rem'
          }, 500, () => {
            if (i === len - 2) {
              i = 0
              $(".news ul").css('top', 0)
            }
          })
        }, 2000)
      },
      routerTo(path){
        this.$router.push(path);
      },
      getNum(){
        let _this=this;
        this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/member_count').then(val=>{
          if(val.data.code === 200){
            this.count=val.data.data
            this.COMMEURL.UID=val.data.uid
            this.activity();
          }
        }).catch(err=>{})
      }
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    beforeRouteLeave(to, from, next) {
      // $(".news ul").css('top', 0)
      clearInterval(window.timer)
      next();
    }
  }
</script>

<style>

</style>
