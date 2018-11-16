<template>
    <div id="honor">
      <div class="back-honor" style="background-image: url('../../../static/img/sign/honor.png')">
        <div class="header">
          <p>
            <img :src="userinfo.portrait" alt="" >
          </p>
          <p>{{userinfo.nickname}}</p>
        </div>
        <div class="compare">
          <p>累计签到<span>{{sign.num}}</span>天，排名<span>{{sign.rank}}</span>位，超过<span>{{sign.more}}</span>位秀友</p>
          <p>累计红花<span>{{safflower.num}}</span>朵，排名<span>{{safflower.rank}}</span>位，超过<span>{{safflower.more}}</span>位秀友</p>
          <p>累计学分<span>{{integral.num}}</span>分，排名<span>{{integral.rank}}</span>位，超过<span>{{integral.more}}</span>位秀友</p>
        </div>
        <div class="code">
          <div>
            <p>签到得学分</p>
            <p>红花开宝箱</p>
            <p>快乐得惊喜！</p>
          </div>
          <div style="background-image: url('../../../static/img/sign/code.png')"></div>
        </div>
      </div>
      <div class="share">
        <mt-button @click="share">分享</mt-button>
      </div>
    </div>
</template>

<script>
  require('../../../static/css/sign.css');
  import {wxConfig, share, shareUrl} from "../../../static/js/timeFormat";
  import { Toast } from 'mint-ui'

    export default {
      name: "honor",
      data(){
        return{
          load:true,
          uid:'',
          integral:'',
          safflower:'',
          sign:'',
          userinfo:{},
          isself:false
        }
      },
      created(){},
      mounted(){
        this.uid=this.$route.query.uid
        this.getData();
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: '#fff'
        });
        wxConfig(this, window.location.href.split('#')[0]);
      },
      methods: {
        getData(){
          let _this=this;
          this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/user_honor_card',qs.stringify({
            uid:this.uid
          })).then(val=>{
            this.loading.close();
            if(val.data.success){
              this.integral=val.data.integral;
              this.safflower=val.data.safflower;
              this.sign=val.data.sign;
              this.userinfo=val.data.userinfo;
              this.isself=val.data.isself
              share("秀芳华-我的荣誉卡", this.userinfo.portrait, shareUrl(_this, location.href), "点击查看-秀芳华用户："+_this.userinfo.nickname+"的荣誉卡",2);
            }
          }).catch()
        },
        share() {

          if(this.isself){
            Toast({
              message: '请点击右上角"..."，分享你的荣誉卡给朋友看哦',
              position: 'center',
              duration: 3000
            });
          }else {
            Toast({
              message: '只能分享自己的荣誉卡哦',
              position: 'center',
              duration: 3000
            });
          }
        },
      },
    }
</script>

<style scoped>

</style>
