<template>
  <div class="tianxian">
    <div class="chongzhidiv">
      <p class="czje">提现金额</p>
      <div class="tx-div">
        <label for="czje-moneny">￥</label>
        <input type="number" id="czje-moneny" v-model="chongzhimoney" >

        <div class="tx">当前可提现{{allMoney}}元,<p class="alltx" @click="allMoneyWithdrawals">全部提现</p></div>
      </div>
      <div class="next" @click="tixian">提现</div>
    </div>

    <!--钱包弹出输入密码框-->
    <div class="mask out" id="mywalletalert" v-show="ismywallet">
      <div class="pay-mask-box">
        <div class="clear tab1-img border-bottom padding-bottom">
          <h3 class="text-align pay-h lf">请输入钱包支付密码</h3>
          <div class="text-right pay-close rg" @click="closewallet">×</div>
        </div>
        <h3 class="text-align message1 pay-h-lg" id="pay-money">￥{{amount}}元</h3>
        <div class="pwd-box">
          <form action="">
            <input type="number" maxlength="6" class="pwd-input" id="pwd-input" autofocus="" v-on:input="InputMoney"
                   v-model="inputpwd">
            <div class="fake-box">
              <input type="password" readonly="">
              <input type="password" readonly="">
              <input type="password" readonly="">
              <input type="password" readonly="">
              <input type="password" readonly="">
              <input type="password" readonly="">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import md5 from 'js-md5'
  export default {
    name: "tixian",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        chongzhimoney: "",
        loading: "",
        ismywallet:false,
        inputpwd:"",//密码
        amount:"",//输入金额
        allMoney:"",//当前用户总金额
      }
    },
watch:{
  inputpwd: {
    handler(curVal, oldVal) {
    },
  },
},
    mounted() {
      //获取当前用户的总金额
     this.allMoney=this.$route.query.allMoney;
      $("#czje-moneny").focus();
    },
    methods: {
      tixian: function () {
        var self=this;
        var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
        console.log(this.chongzhimoney);
        console.log($.trim(self.chongzhimoney));
      if(!exp.test(self.chongzhimoney)){
          Toast({
            message: "提现金额格式错误",
            duration: 2000,
            postion: 'middle'
          })
        }else  if(self.chongzhimoney==""){
          Toast({
            message: "请输入提现金额",
            duration: 2000,
            postion: 'middle'
          })
        }else if(parseFloat(self.chongzhimoney)<1){
        Toast({
          message: "提现金额必须大于1元",
          duration: 2000,
          postion: 'middle'
        })
      }else if(parseFloat(self.chongzhimoney)>parseFloat(self.allMoney)){
        Toast({
          message: "账户余额不足",
          duration: 2000,
          postion: 'middle'
        })
      }else if(parseFloat(self.chongzhimoney)>1000){
        Toast({
          message: "单次提现金额最多为1000元",
          duration: 2000,
          postion: 'middle'
        })
      }else {
          this.amount=this.chongzhimoney;
            this.ismywallet=true;
        }

      },

      /**
       * 提现
       * @constructor
       */
      Withdrawals:function () {
        var self = this;
        this.loading = this.$loading({
          lock: true,
          text: '提现中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.$axios.post(self.url + "/index.php/news/newindex/tx", qs.stringify({
          money:self.chongzhimoney,
          pay_password: md5($.trim(self.inputpwd).substr(0,6))
        })).then(function (res) {
          if (res.data.code == 200) {

            Toast({
              message: "提现成功",
              duration: 2000,
              postion: 'middle'
            })
            self.$router.replace({path: '/wodeqianbao', query:{type:'tixian'}});
          } else {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            Toast({
              message: res.data.msg,
              duration: 2000,
              postion: 'middle'
            });
            self.ismywallet=false;
            self.inputpwd="";

            $(".fake-box input").val("");
            $("#pwd-input").val("");

          }
        }).catch(function (e) {

        })
      },
      /**
       * 全部提现
       */
      allMoneyWithdrawals:function () {
        this.chongzhimoney=this.allMoney;
      },


      clearNoNum: function (obj) {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          obj.value = parseFloat(obj.value);
        }
      },
      InputMoney: function () {
        // trim(): 去两边空格的方法；

        // var pwd = $(this).val().trim();
        var self = this;
        var pwd = $.trim(self.inputpwd);

        for (var i = 0; i < pwd.length; i++) {
          $(".fake-box input").eq(i).val(pwd[i]);
        }
        $(".fake-box input").each(function () {
          var index = $(this).index();
          if (index >= pwd.length) {
            $(this).val("");
          }
        });
        if (pwd.length == 6) {
          this.pwd = pwd;
          //执行其他操作 获取值判断是否与系统值一样，一样则支付成功，不一样则提示密码错误
          //获取用户输入的密码,调用验证密码的接口
          // var secret = $.md5(member_id + pwd + "z!l@z#j$");
          self.ismywallet=false;
          self.Withdrawals();
        }
        //密码错误
        else {

          console.log(pwd);
          $.prop("请重新输入密码", "密码错误", function () {
            $(".fake-box input").val("");
            pwd.length = 0;
            pwd = "";
            $("#pwd-input").val("");
          })
        }
      },
      //关闭支付弹窗
      closewallet: function () {
        this.ismywallet = false;
        $(".fake-box input").val("");
        $("#pwd-input").val("");
        this.inputpwd="";
      },
    }

  }
</script>
<style>
  .tixian {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ffffff;
  }

  .chongzhidiv {
    width: 94%;
    height: 3rem;
    background-color: #ffffff;
    border-radius: 0.04rem;
    /*border: 1px solid seagreen;*/
    margin: 0.2rem auto;
  }

  .czje {
    margin-left: 4%;
    color: #444444;
    font-size: 0.14rem;
    padding-top: 0.15rem;

  }

  .tx-div {
    width: 92%;
    margin: 0.2rem auto;
    /*height: 0.4rem;*/
    line-height: 0.3rem;
    margin-top: 0.2rem;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*border: 1px solid slateblue;*/
    border-bottom: 1px solid #f5f5f5;
  }

  .tx-div > label {
    font-weight: bold;
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: black;
  }

  .tx-div > input {
    width: 60%;
    font-size: 0.3rem;
    color: black;
    height: 0.39rem;
    /*flex: 1;*/
    border: none;
    outline: none;
    /*margin-left: -0.2rem;*/

  }

  .next {
    width: 70%;
    height: 0.44rem;
    background-color: #f5746f;
    color: white;
    font-size: 0.15rem;
    margin: 0 auto;
    text-align: center;
    line-height: 0.44rem;
    border-radius: 0.04rem;
  }
  .tx{
    font-size: 0.12rem;
    color: #333333;
    display: flex;
    flex-direction: row;
    margin-top: 0.15rem;
    padding-bottom: 0.08rem;
  }
  .alltx{
    color: #f5746f;
    font-size: 0.12rem;
    margin-left: 0.1rem;
  }

  /*密码弹窗输入框*/
  .mask {
    padding: 15% 3% 0;
    margin: auto;
    opacity: 1;
    visibility: visible;
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    transition-duration: .3s;
  }

  .pay-mask-box {
    width: 80%;
    height: auto;
    padding: 3% 0;
    background-color: #fff;
    border-radius: 10px;
    font-size: .75rem;
    color: #666;
    margin: 10% auto;
  }

  .padding-bottom {
    padding-bottom: 10px;
  }

  .tab1-img {
    position: relative;
  }

  .border-bottom {
    border-bottom: 1px solid #d6d6d6;
  }

  .pay-h {
    width: 80%;
    margin-left: 6%;
    font-weight: 500;
    font-size: .15rem;
    color: #333;
  }

  .text-align {
    text-align: center;
  }

  /*.lf {*/
  /*float: left;*/
  /*}*/
  .pay-close {
    font-weight: 300;
    font-size: 32px;
    width: 20%;
    position: absolute;
    right: 3%;
    top: -0.1rem;
  }

  .text-right {
    text-align: right;
  }

  .rg {
    float: right;
  }

  #pay-money {
    font-weight: 500;
    font-size: 0.3rem;
    color: #333;
    line-height: 0.6rem;
  }

  .message1 {
    /*padding: 12px 4%;*/
    margin-top: 0.2rem;
    margin-bottom: 0.12rem;
  }

  .pwd-box {
    width: 230px;
    position: relative;
    border: 1px solid #9f9fa0;
    border-radius: 5px;
    overflow: hidden;
    margin: 0 auto 10px;
  }

  .pwd-box input[type="number"] {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    font-size: 18px;
    opacity: 0;
    z-index: 1;
    outline: 0;
  }

  .fake-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
  }

  .fake-box input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: 0;
    border-right: 1px solid #e5e5e5;
    text-align: center;
    font-size: 35px;
    float: left;
  }



</style>
