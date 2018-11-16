<template>
  <div id="register">
    <!-- header start -->
    <!-- header end -->
    <!-- 签到积分 start -->
    <div class="register-score" style="background-image: url('../../../static/img/home/registerBg.png')">
      <p class="notice" @click="popupVisible=!popupVisible"><img src="../../../static/img/home/notice.png" alt="">喜讯：签到积分兑换</p>
      <p class="score-title">可用积分</p>
      <p class="scores" @click="RouterTo('/signdetail')">{{this.COMMEURL.signAll!=null?this.COMMEURL.signAll:0}}</p>
      <div class="click-register">
        <div v-show="!duihuan" :class="this.COMMEURL.sign?'click-img signed':'click-img sign'" style="background-image: url('../../../static/img/home/registerButton.png')" @click="userSign">
          <p v-html="this.COMMEURL.sign?'已签到':'签到'"></p>
          <p class="jifen" v-html="this.COMMEURL.sign?'积分已领':'+'+score+'积分'"></p>
          <div class="animate" v-show="clickSign">{{content}}</div>
        </div>
        <div v-show="duihuan" class="click-img sign" style="background-image: url('../../../static/img/home/exchange.png')">
          <div class="dihuan" @click="RouterTo('/exchange')">兑换</div>
        </div>
      </div>
    </div>
    <!-- 签到积分 end -->

    <!-- 签到状态 start -->
    <div class="register-status">
      <!-- 签到获得的积分 -->
      <div class="integral">
        <div :class="item>0?'integral-item color-red':'integral-item'" v-for="(item,index) in sign" >+{{scoreArr[index]}}</div>
      </div>

      <!-- 状态点 -->
      <div class="integral-status">
        <div class="line-short"></div>
        <div v-for="(item,index) in sign" class="sign">
          <div class="status-img" style="background-image: url('../../../static/img/home/register.png')" v-show="item===1"></div>
          <div class="status-img" style="background-image: url('../../../static/img/home/noregister.png')" v-show="item===0"></div>
          <div class="line-long" v-show="index<6"></div>
        </div>
        <div class="line-short"></div>
      </div>

      <!-- 天数 -->
      <div class="integral one-week" >
        <div class="integral-item" v-for="item in 7">{{item++}}天</div>
      </div>
    </div>
    <!-- 签到状态 end -->

    <!-- 兑换 start -->
    <div class="exchange">
      <!-- 积分标题 -->
      <div class="exchange-title">
        <div class="exchange-line"></div>
        <div class="exchange-style">积分兑好礼</div>
        <div class="exchange-line"></div>
      </div>

      <!-- 兑换列表 -->
      <div class="exchagne-list">
        <div class="exchange-item" @click="RouterTo('/exchange')" v-for="(item,index) in cards" :style="{backgroundImage: 'url(' + item + ')'}"></div>
      </div>
    </div>
    <!-- 兑换 end -->

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
    name: "register",
    data() {
      return {
        buttonTrue:true,
        time:10,
        duihuan:false,
        popupVisible:true,
        uid:87,//用户uid
        scoreArr: [1,2,3,4,5,6,7],//分数变化 1-7
        score:1,
        sign:[],//每日签到
        content:'+5',//显示动画的内容
        clickSign:false,
        cards:['../../../static/img/home/liliaocard.png','../../../static/img/home/kycard.png'],//积分兑换
      };
    },
    created(){
      this.getData();
      //积分断了就重来
    },
    mounted() {
      if(this.COMMEURL.buttonTrue) this.readTime(); else this.popupVisible=!this.popupVisible;
      this.buttonTrue=this.COMMEURL.buttonTrue;
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: '#fff'
      });
    },
    methods: {
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
      getData(){
        this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/signinfo').then(val=>{
          this.loading.close();
          if(val.data.code === 200){
            this.COMMEURL.signAll=val.data.data.num;//总积分
            this.COMMEURL.sign=val.data.data.sign_in;//今日签到没有
            this.duihuan=val.data.data.exchange;
            for(let i=0;i<7;i++){
              if(i<val.data.data.day){
                this.sign.push(1)
              }else{
                this.sign.push(0)
              }
            }//签到的过程
            //判断分数为多少
            let num=this.sign.indexOf(0);
            this.score=this.scoreArr[num];
            this.content='+'+this.score;
          }
        }).catch(err=>{
        })
      },//获取进入签到的数据
      RouterTo(path) {
        if(path==='/exchange'){
          if(this.duihuan){
            this.$router.push(path);
          }else {
            Toast({
              message: '活动尚未开始',
              position: 'center',
              duration: 3000
            });
          }
        }else {
          this.$router.push(path);
        }
      },//跳转路由
      userSign(){
        // //是否签到
       if(!this.COMMEURL.sign){
          this.clickSign=true;
          this.COMMEURL.sign=true;
          //动画添加class
          setTimeout(() => {
            document.querySelector('.animate').className='animate active';
          }, 20);
          //判断是否满足七天
          let num = this.sign.indexOf(0);
          this.sign[num]=1;
          this.COMMEURL.signAll=parseInt(this.COMMEURL.signAll)+parseInt(this.score);//积分总数+当日的分数
          this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/dosign').then(val=>{}).catch(err=>{})
        }else {
          Toast({
            message: '您已签到，明日再来',
            position: 'center',
            duration: 3000
          });
        }
      },//点击签到

    },
    beforeRouteLeave(to, from, next) {
      clearInterval(window.readTimer)
      next();
    }

  };
</script>

<style scoped>

</style>
