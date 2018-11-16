<template>
  <div class="shezhizhifumima">
    <form>
      <h3 class="text-align message pay-h-lg setpwd-margin">请设置6位数字支付密码</h3>
      <div class="pwd-box">
        <form action="">
          <a href="javascript:;" class="open-popup" data-target="#half">
            <input type="number" maxlength="6" class="pwd-input" id="pwd-input" autofocus="autofocus" v-on:input="InputPwd"
                   v-model="pwd">
          </a>
          <div class="fake-box fake-box-pwd">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
          </div>
        </form>
      </div>
    </form>
    <form>
      <h3 class="text-align message pay-h-lg setpwd-margin">确认支付密码</h3>
      <div class="pwd-box">
        <form action="">
          <a href="javascript:;" class="open-popup" data-target="#half">
            <input type="number" maxlength="6" class="pwd-input" autofocus="autofocus" id="new-input" v-on:input="InputRePwd"
                   v-model="repwd">
          </a>
          <div class="fake-box fake-box-new">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
            <input type="password" readonly="">
          </div>
        </form>
      </div>
    </form>
    <div class="szzfmm-confirm" @click="confirm">确认</div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import md5 from 'js-md5'

  export default {
    name: "shezhizhifumima",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        firstPwd: "",
        checkPwd: "",
        pwd: "",
        repwd: '',
        amount: "",//金额
        articleid: '',//文章id
        wherefrom: "",
        oriangle:"",//判断来自文章详情 还是 转发文章详情
        repostid:""//来自转发文章详情，回传转发id
      }
    },

    mounted() {
      this.amount = this.$route.query.money;
      this.articleid = this.$route.query.articalId;
      this.oriangle=this.$route.query.oriangle;
      this.repostid=this.$route.query.rePostId;
      if (this.$route.query.type == 'xiugai') {
        this.wherefrom = 1
      } else {
        this.wherefrom = 0
      }
    },
    methods: {

      InputPwd: function () {

        // trim(): 去两边空格的方法；
        var self = this;
        var pwd = $.trim(self.pwd);

        for (var i = 0; i < pwd.length; i++) {
          $(".fake-box-pwd input").eq(i).val(pwd[i]);
        }
        $(".fake-box-pwd input").each(function () {
          var index = $(this).index();
          if (index >= pwd.length) {
            $(this).val("");
          }
        });
        this.firstPwd = pwd;
        // console.log("pwd:" + pwd);
      },
      InputRePwd: function () {
        // trim(): 去两边空格的方法；
        var self = this;
        var pwd = $.trim(self.repwd);
        for (var i = 0; i < pwd.length; i++) {
          $(".fake-box-new input").eq(i).val(pwd[i]);
        }
        $(".fake-box-new input").each(function () {
          var index = $(this).index();
          // console.log(index);
          if (index >= pwd.length) {
            $(this).val("");
          }
        });
        this.checkPwd = pwd;
        if(this.checkPwd.length==6){
          $("#new-input").blur();
        }

      },
      confirm: function () {
        //判断 第一次和第二次的密码是否相同
        var self = this;
        console.log(this.firstPwd.substr(0, 6) + "    " + this.checkPwd.substr(0, 6))
        if($.trim(this.firstPwd)==""||$.trim( this.checkPwd)==""){
          Toast({
            message:"请输入支付密码",
            duration:2000,
            position:'middle'
          })
        }else if(this.firstPwd.substr(0, 6) != this.checkPwd.substr(0, 6)){
          $("input").val("");
          Toast({
            message: '密码不相同,请重新输入',
            duration: 2000,
            postion: 'middle'
          })
          this.firstPwd = "";
          this.checkPwd = "";
          this.pwd="";
          this.repwd="";
        }else if($.trim(this.firstPwd.substr(0, 6)).length<6||$.trim(this.checkPwd.substr(0, 6) ).length<6){
          Toast({
            message: '请输入六位支付密码',
            duration: 2000,
            postion: 'middle'
          })
          $("input").val("");
          this.firstPwd = "";
          this.checkPwd = "";
          this.pwd="";
          this.repwd="";
        }else {
          self.$axios.post(self.url + "/index.php/ucenter/newindex/pay_password", qs.stringify({
            // pay_password: md5(self.firstPwd)
            pay_password: md5($.trim(this.firstPwd).substr(0,6))
          })).then(function (res) {
            if (res.data.code == 200) {
              Toast({
                message: "设置支付密码成功",
                duration: 2000,
                position: 'middle'
              });
              if (self.wherefrom == 1) {
                self.$router.replace({path: '/wodeqianbao',query:{type:'shezhizhifumima'}});
              } else {
                if(self.oriangle=="wenzhangxiangqing"){
                  self.$router.push({path: '/faqizhifu', query: {money: self.amount, articalId: self.articleid,type:'wenzhangxiangqing',back:'shezhimima'}});
                }else{
                  self.$router.push({path: '/faqizhifu', query: {money: self.amount, articalId: self.repostid,rePostId:self.articleid,type:'zhuanfawenzhangxiangqing',back:'shezhimima'}});
                }
              }

            } else {

              Toast({
                message: res.data.msg,
                duration: 2000,
                position: 'middle'
              });
              $("input").val("");
              self.firstPwd = "";
              self.checkPwd = "";
              self.pwd="";
              self.repwd="";
            }
          }).catch(function (e) {

          })
        }

      },

    }

  }
</script>
<style>
  .zhifu-div {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #ffffff;
    overflow-x: hidden;
  }

  .zffs {
    width: 96%;
    color: #444444;
    font-weight: bold;
    line-height: 0.4rem;
    font-size: 0.2rem;
    padding-left: 3%;
    height: 0.4rem;
    /*margin-bottom: 0.2rem;*/
  }

  .zhifufangshi {
    width: 100%;
    height: 1rem;
    /*border: 1px solid seagreen;*/
    border-top: 1px solid #f5f5f5;
    display: flex;
    flex-direction: row;
  }

  .zhifufangshi2 {
    border-bottom: 1px solid #f5f5f5;
  }

  .zhifufangshi > img {
    width: 0.52rem;
    height: 0.52rem;
    margin: 0.24rem 0.2rem;
  }

  .zhifu-text {
    height: 0.52rem;
    margin: 0.24rem 0;
    flex: 1;
  }

  .zhifu-text > p:nth-child(1) {
    color: #444444;
    font-size: 0.2rem;
  }

  .zhifu-text > p:nth-child(2) {
    color: #444444;
    font-size: 0.14rem;
    margin-top: 0.1rem;
  }

  .r-text {
    width: 100%;
    margin-top: 0.2rem;
    text-align: center;
    font-size: 0.18rem;
    color: #666666;
  }

  .r-text > span {
    color: #DD191D;
    font-weight: bold;
  }

  .confirm {
    width: 60%;
    height: 0.4rem;
    border-radius: 0.04rem;
    line-height: 0.4rem;
    text-align: center;
    background-color: #DD191D;
    color: #ffffff;
    margin: 0.2rem auto 0.5rem auto;
  }

  .zhifufangshi .correct-img {
    width: 0.3rem;
    height: 0.3rem;
    /*float: right;*/
    margin-right: 0.2rem;
  }

  .zhifu-text .yuebuzu {
    color: #DD191D !important;
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

  .pay-h-lg {
    font-weight: 500;
    font-size: 0.15rem;
    color: #333;
    line-height: 0.6rem;
  }

  .message {
    /*padding: 12px 4%;*/
    /*margin-top: 0.2rem;*/
    /*margin-bottom: 0.12rem;*/
  }

  .pwd-box {
    width: 2.34rem;
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
    line-height: 0.383rem;
    float: left;
    width: 0.383rem;
    height: 0.383rem;

  }

  .szzfmm-confirm {
    width: 60%;
    height: 0.4rem;
    background-color: #DD191D;
    line-height: .4rem;
    text-align: center;
    font-size: 0.15rem;
    color: #ffffff;
    border-radius: 0.04rem;
    margin: 0.3rem auto;
  }
</style>
