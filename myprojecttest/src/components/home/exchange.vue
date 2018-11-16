<template>
  <div id="exchange">
    <div class="card">
      <img src="../../../static/img/home/mt.png" alt="" v-show="mtCard">
      <mt-button @click="duihuan()" v-show="mtCard">兑换</mt-button>
      <img src="../../../static/img/home/mt-over.png" alt="" v-show="!mtCard">
    </div>
    <div class="card">
      <img src="../../../static/img/home/ky.png" alt="" v-show="kyCard">
      <mt-button @click="duihuan()" v-show="kyCard">兑换</mt-button>
      <img src="../../../static/img/home/ky-over.png" alt="" v-show="!kyCard">
    </div>
    <div class="account1">
      <p class="title">卡券具体使用流程</p>
      <p>1、用户消耗一定积分，兑换相应卡券，在“我的钱包”-卡包“里查看兑换的电子卡券。</p>
      <p>2、请在微信里添加“秀芳华管理员”微信号：xiufanghua1218，咨询卡券的具体使用问题。</p>
    </div>
    <!--签到model层-->
    <div class="modal" v-show="popupVisible">
      <div class="content">
        <div class="title">“积分兑换卡券，折现红包”通知</div>
        <div class="detail">
          <div class="jiantou">
            <img src="../../../static/img/home/jiantou.png" alt="">
          </div>
          <p class="reason">
            为答谢广大用户对<b>秀芳华平台“签到领积分活动”</b>的大力支持，现开展<b>“积分兑换卡券，折现红包”</b>活动，每日限量兑换卡券，剩余积分到期后自动折现为红包。
          </p>
          <div class="card">卡券兑换</div>
          <div class="card-time">
            <p><b>兑换时间：</b></p>
            <p>2018年8月13日00:00--2018年8月19日24:00</p>
            <p>(注：<span class="tip">8月13日起就不能进行签到活动，8月19日正式下线旧版签到活动，8月20日上线新版签到活动</span>)</p>
          </div>
          <div class="card-time">
            <p><b>兑换使用规则</b></p>
            <p class="tip">（1）消耗对应积分兑换卡券（一个用户最多只能兑换一张卡券）。</p>
            <p>（2）卡券一旦兑换，不退不换，自兑换之日起至2018年12月31日有效，过期作废。</p>
            <p>（3）兑换成功后的电子卡券请在“我的钱包”--“卡包”里查看。</p>
            <p>（4）卡券使用，请添加“秀芳华管理员”微信号：<span class="tip">xiufanghua1218</span></p>
          </div>
          <div class="card">折现红包</div>
          <div class="card-time">
            <p>1、折现时间：在规定时间内没有兑换则默认同意签到积分折现；</p>
            <p>2、折现规则：平台统一按照“1积分=0.05元”将用户当前积分自动折成现金红包。</p>
            <p>3、折现查看：在秀芳华APP“我的钱包”里，查看折现的红包记录和金额。</p>
          </div>
          <div class="remark">备注：本次活动最终解释权归秀芳华所有。</div>
        </div>
        <div class="button" v-show="this.buttonTrue">知道了 ( <span>{{time}}</span>S )</div>
        <div class="button" v-show="!this.buttonTrue" @click="popupVisible=!popupVisible">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  require("../../../static/css/register.css");

  export default {
    data(){
      return{
        cardModal:false,
        mtCard:true,
        kyCard:true,
        popupVisible:true,
        buttonTrue:true,
        time:10
      }
    },
    mounted(){
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: '#fff'
      });
      this.checkCard();
      if(this.COMMEURL.buttonTrue){//true ,倒计时
        this.readTime();
      }else this.popupVisible=!this.popupVisible
      this.buttonTrue=this.COMMEURL.buttonTrue
    },
    methods:{
      readTime(){
        let _this=this;
        window.readTimer=setInterval(()=>{
          if(_this.time === 1){
            clearInterval(readTimer);
            _this.buttonTrue=false
            _this.COMMEURL.buttonTrue=false
          }else _this.time-=1
        },1000)
      },
      checkCard(){
        this.$axios.post(this.COMMEURL.commonUrl + "/index.php/ucenter/newindex/check_exchange",qs.stringify({
          uid:this.COMMEURL.UID,
        })).then(val=>{
          this.loading.close();
          if(val.data.success){
            this.mtCard=!val.data.data.mt_card;
            this.kyCard=!val.data.data.ky_card
          }else {
            Toast({
              message: val.data.msg,
              position: 'center',
              duration: 3000
            });
          }
        }).catch(err=>{
          this.load=false
        })
      },
      duihuan(){
        Toast({
          message: '兑换操作请前往秀芳华APP操作',
          position: 'center',
          duration: 3000
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(window.readTimer)
      next();
    }
  }
</script>

<style>

</style>
