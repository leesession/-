<template>
  <div class="wodeqianbao" >
    <!--新顶部-->
    <div class="newtop">
      <!--总余额-->
      <div class="total">
        <div>{{wallet.balance}}
          <div @click="rule=!rule">+{{wallet.redpack_money}}元
            <img src="../../../static/img/wode/question.png" alt="">
            <div v-show="rule">
              <p>注册红包：{{wallet.hongbao}}元  <span>可用红包：{{wallet.redpack_money}}元</span></p>
              <p>注意：注册红包只能用于兑换奖励，不能用于打赏，可提现。</p>
            </div>
          </div>
        </div>
        <p>当前余额</p>
      </div>
      <!--详细清单-->
      <div class="detail-money">
        <div class="show-money">
          <div>
            <p class="cash">{{wallet.redpack_money}}</p>
            <p class="describe">可用红包</p>
          </div>
          <div>
            <p class="cash">{{wallet.dashang}}</p>
            <p class="describe">累计赞赏收入</p>
          </div>
          <div>
            <p class="cash">{{wallet.zhichu}}</p>
            <p class="describe">累计赞赏支出</p>
          </div>
        </div>
        <div class="rukou">
          <mt-button @click="tixianMoney">提现</mt-button>
          <mt-button @click="$router.push('/chongzhi')">充值</mt-button>
          <mt-button @click="toast">卡包</mt-button>
        </div>
      </div>
    </div>
    <!--@click="xianshijiaoyijilu"-->
    <div class="wdqb-jyjl" >
      <p>交易记录</p>
      <!--v-bind:class="{ imgxuanzhuan: jiaoyijilushow }"-->
      <img src="../../../static/img/reset.png" class="imgxuanzhuan" @click="$router.push('/xiugaizhifumima')">
    </div>
    <ul class="jyjl-ul" v-show="jiaoyijilushow">
      <li v-for="item in list">
        <div  class="jyjl-ul-div">
          <div class="div1" >
            <p>{{item.body}}</p>
            <p>{{item.create_time}}</p>
          </div>
          <div class="div2" >
            <p :class="{jianshao:item.capital_type=='0'}">{{item.capital_type=='0'?'-':'+'}}{{item.money}}</p>
          </div>
        </div>
        <!--<div v-else class="jyjl-ul-div">-->
          <!--<div class="div1" v-if="item.capital_type=='0'">-->
            <!--<p>{{item.tobody}}</p>-->
            <!--<p>{{item.create_time}}</p>-->
          <!--</div>-->
          <!--<div class="div2" v-if="item.capital_type=='0'">-->
            <!--<p :class="{jianshao:item.capital_type=='0'}">{{item.capital_type=='0'?'-':'+'}}{{item.money}}</p>-->
          <!--</div>-->
        <!--</div>-->
      </li>

    </ul>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "wodeqianbao",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        wallet: "",
        headerUrl: "",
        loading: "",
        list: [],//交易记录
        jiaoyijilushow: true,//是否显示交易记录
        user_id: "",
        rule:false
      }
    },
    mounted() {
      // alert(1)
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      var type=this.$route.query.type;
      if(type=='shezhizhifumima'||type=='chongzhi'||type=='tixian'){
        this.$router.go(-1);
      }
      this.$loading.fullscreenLoading = true;
      this.walletFun();
      var self = this;
      this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/orderSee").then(function (res) {
        if (res.data.code == 200) {
          self.list = res.data.data;
          self.user_id = res.data.uid;
        }
      })
    },

    methods: {
      toast(){
          Toast({
            message: "请到秀芳华App端操作",
            duration: 2000,
            position: 'middle'
          })
        },
      walletFun: function () {
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/wallet").then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.wallet = res.data.data;
            console.log(res.data)
            sessionStorage.setItem("phone", self.wallet.mobile);
          }
        }).catch(function () {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })
      },
      xianshijiaoyijilu: function (e) {
        //显示交易记录
        // this.jiaoyijilushow = !this.jiaoyijilushow;
        // if (this.list.length == 0 || this.list.length == null || this.list.undefined) {
        //   Toast({
        //     message: "暂无交易记录",
        //     duration: 2000,
        //     position: 'middle'
        //   })
        // }
      },
      // 判断加减号
      addOrdec: function (item) {
        //给某人打赏的touid 不为null                       红包                 充值
        if ((item.touid != null && item.touid == this.user_id) || item.type == '4' || item.type == '2'||item.type == '5') {
          return "+";
        } else {
          return '-'
        }

      },
      tixianMoney: function () {
        // const h = this.$createElement;
        // this.$msgbox({
        //   title: '【 秀芳华APP通知】',
        //   message: h('p', null, [
        //     // h('p', null, [h('span',null,'1.根据微信支付官方有关规定，因为涉及到财务流程，秀芳华与微信支付对接程序需要一段时间调试。'),h('span',{ style: 'color: #E51C23' },'(请于4月28日登录秀芳华APP进行提现操作)')]),
        //     h('p','2018年5月4日上午11点秀芳华APP版本更新，增加了提现功能，请大家参与测试。'),
        //     h('p', {style: 'margin-top: 10px;color: #E51C23'}, '提现条件：'),
        //     h('p', {style: 'margin-top: 10px'}, '1.余额需满30元，每日可有三次提现机会，每次最低1元。'),
        //     h('p', {style: 'margin-top: 10px'}, '2.充值24小时之后才能提现。'),
        //     h('p', {style: 'margin-top: 10px'}, '3.苹果手机用户需到微信端进行提现。')
        //   ]),
        //   showCancelButton: true,
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        // }).then(action => {
        //   // self.$router.push({path: '/xiangxixinxi'})
        // }).catch(function () {
        //
        // })
        // console.log(this.wallet)
        if(this.wallet.balance>49.99&&this.wallet.is_tx=='true'){

          this.$router.push({path: '/tixian',query:{allMoney:this.wallet.balance}});
        }else{
          const h = this.$createElement;
          this.$msgbox({
            title: '提现条件',
            message: h('p', null, [
              // h('p','2018年5月4日上午11点秀芳华APP版本更新，增加了提现功能，请大家参与测试。'),
              // h('p', {style: 'margin-top: 10px;color: #E51C23'}, '提现条件：'),
              h('p', {style: 'margin-top: 10px'}, '1.账户余额大于50元可提现。'),
              h('p', {style: 'margin-top: 10px'}, '2.每10天可提现1次。'),
              h('p', {style: 'margin-top: 10px'}, '3.新注册后超过7天才能提现。'),
              h('p', {style: 'margin-top: 10px'}, '4.充值后24小时内不能提现。'),
              h('p', {style: 'margin-top: 10px'}, '5.根据国家最新支付政策调整和平台有关规定，请到App安卓端进行提现。')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(action => {
            // self.$router.push({path: '/xiangxixinxi'})
          }).catch(function () {

          })
        }

      }
    }

  }
</script>
<style>
  html, body {
    background-color: #f5f5f5;
  }
  .wodeqianbao .newtop{
    position: relative;
    height: 2.4rem;
    background-color: #2B2D41;
  }
  .wodeqianbao .newtop .total{
    padding-top: .2rem;
    text-align: center;
  }
  .wodeqianbao .newtop .total >div{
    color: #fff;
    font-size: .34rem;
    position: relative;
  }
  .wodeqianbao .newtop .total >div >div{
    position: absolute;
    right: .4rem;
    bottom: .05rem;
    font-size: .17rem;
  }
  .wodeqianbao .newtop .total >div >div img{
    width: .17rem;
    height: .17rem;
    vertical-align: text-top;
  }
  .wodeqianbao .newtop .total >div >div>div{
    background-color: #000;
    color: #fff;
    padding: .06rem;
    border: 1px solid #fff;
    opacity: .9;
    position: absolute;
    top: .21rem;
    left: -2rem;
    width: 3rem;
    text-align: left;
    z-index: 10;
    border-radius: .04rem;
  }
  .wodeqianbao .newtop .total >div >div>div p{
    font-size: .15rem;
  }
  .wodeqianbao .newtop .total >div >div>div span{
    display: inline-block;
    margin-left: .15rem;

  }
  .wodeqianbao .newtop .total >div >div>div p+p{
    margin-top: .1rem;
  }
  .wodeqianbao .newtop .total p{
    color: #fff;
    font-size: .14rem;
  }
  .wodeqianbao .newtop .detail-money{
    position: absolute;
    bottom: -.38rem;
    left: 0;
    width: 3.43rem;
    height: 1.68rem;
    margin-left: .16rem;
    background-color: #fff;
    border-radius: .04rem;
    box-sizing: border-box;
    padding: .25rem .12rem;
    box-shadow: 0 .05rem .1rem 0 #CFCFCF;
  }
  .newtop .detail-money .show-money{
    display: flex;
    color: #666;
    justify-content: space-around;
    text-align: center;
  }
  .newtop .detail-money .show-money>div{
    width: 33.3%;
  }
  .show-money .cash{
    font-size: .22rem;
  }
  .show-money .describe{
    font-size: .14rem;
    color: #999;
  }
  .newtop .rukou{
    margin-top: .4rem;
    display: flex;
    justify-content: space-around;
    height: auto;
    width:100%;
    border-bottom:none;
  }
  .newtop .rukou button{
    width: 33.3%;
    height: .34rem;
    background-color: #fff;
    color: #DCA431;
    border: 1px solid #DCA431;
    border-radius: .17rem;
    font-size: .15rem;
    margin: 0 .12rem;
  }
  .newtop .rukou button label{
    color: #dca431;
    font-size: .15rem;
    line-height: normal;
  }
  .wodeqianbao img.imgxuanzhuan{
    width: .2rem;
    height: .2rem;
  }
  .wdqb-jyjl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    font-size: 0.14rem;
    color: #666666;
    padding: .7rem .2rem .2rem;
    box-sizing: border-box;
  }
  .wdqb-jyjl p {
    color: #333333;
    font-size: .2rem;
    font-weight: bold;
  }
  .wdqb-jyjl img {
  }
  .jyjl-ul {
    width: 100%;
    height: calc(100% - 1.3rem);
    overflow-y: scroll;
    list-style: none;
    -webkit-overflow-scrolling: touch;
  }

  .jyjl-ul > li {
    width: 100%;
    /*height: 0.5rem;*/
    /*border: 1px solid seagreen;*/
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #f5f5f5;
    background-color: #ffffff;

  }
  .jyjl-ul-div{
    /*border: 1px solid seagreen;*/
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
  }
  .jyjl-ul-div  .div1 {
    flex: 1;
  }

  .jyjl-ul-div  p:nth-child(1) {
    font-size: 0.15rem;
    color: #333333;
    margin: 0.05rem 0 0.05rem 0.2rem;
    line-height: 0.25rem;
  }

  .jyjl-ul-div  p:nth-child(2) {
    font-size: 0.11rem;
    color: #666666;
    margin-left: 0.2rem;
    margin-bottom: 0.1rem;
  }

  .jyjl-ul > li .div2 {
    text-align: right;
    margin-right: 0.2rem;

  }

  .jyjl-ul > li  .div2 > p:nth-child(1) {
    font-size: 0.16rem;
    color: #f5746f;
    /*margin-left: 0.2rem;*/
  }

  .jyjl-ul > li  .div2 .jianshao {
    color: #41AD42 !important;

  }

  .jyjl-ul > li  .div2 > .fu {
    color: #E51C23 !important;
  }
  .wodeqianbao {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  .account {
    width: 100%;
    height: 0.9rem;
    background-color: #FF5353;
    display: flex;
    flex-direction: row;
  }

  .account img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin: 0.2rem 0.1rem 0.2rem 3%;
  }

  .account p {
    line-height: 0.9rem;
    color: white;
    font-size: 0.16rem;
  }

  .yue {
    width: 100%;
    height: 1.8rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
  }

  .yue > div {
    width: 50%;
    flex: 1;
    /*border: 1px solid slateblue;*/

  }

  .yue > div:nth-child(1) {
    margin-left: 3%;
    font-size: 0.15rem;
  }

  .yue > .jiaoyijilu {
    margin-right: 3%;
    line-height: 1.8rem;
    text-align: right;
    position: relative;
  }

  .yuan {
    position: relative;
  }

  .yuan p {
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%);
  }

  .yuan .zhye {
    color: #666666;
    font-size: 0.14rem;
  }

  .yuan .jine {
    color: #FF5353;
    font-size: 0.36rem;
  }

  .jiaoyijilu p {
    display: inline-block;
    line-height: 0.2rem;
    text-align: center;
    height: 0.2rem;
    width: 0.8rem;
    background-image: url("../../../static/img/right.png");
    background-position: 100% center;
    background-size: 0.12rem 0.12rem;
    background-repeat: no-repeat;
    color: #999999;
    font-size: 0.14rem;
    padding-right: 0.1rem;
  }

  .qb-commen {
    margin: 0.24rem auto;
    width: 94%;
    border-radius: 0.06rem;
    line-height: 0.44rem;
    text-align: center;
    height: 0.44rem;
    font-size: 0.14rem;
    background-color: #E51C23;
    color: white;

  }

  .chongzhi {
    background-color: #E51C23;
    color: white;
  }

  .tixian {
    border: 1px solid #E51C23;
    color: #E51C23;
  }

  .jiaoyijilubutton {
    /*border: 1px solid slateblue;*/
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translate(-65%, -50%);
  }

  .jiaoyijilubutton div {
    width: 1rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    font-size: 0.14rem;
    border-radius: 0.17rem;
  }

  .jiaoyijilubutton div:nth-child(1) {
    background-color: #f5746f;
    color: white;
  }

  .jiaoyijilubutton div:nth-child(2) {
    border: 1px solid #f5746f;
    color: #f5746f;
    background-color: #ffffff;
    margin-top: 0.15rem;
  }
  .qianbaodav{
    width: 0.12rem !important;
    height: 0.12rem !important;
    position: absolute;
    left: 0.38rem;
    top: 0.4rem;
  }
  .tiaoshi{
    color: #E51C23 !important;
  }
</style>
