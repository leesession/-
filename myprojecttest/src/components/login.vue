<template>
  <div class="Login">

    <div class="login">
      <div class="commendiv">
        <!--<img src="../../static/img/phone.png" alt="">-->
        <label for="phonenumber">手机号</label>
        <div class="login-pub">
          <input type="number" placeholder="请输入手机号" id="phonenumber" v-model="phone">
          <div class="send" @click="sendVerCode">{{number}}</div>
        </div>

      </div>
      <div class="commendiv">
        <label for="verify">验证码</label>
        <div class="login-pub">
        <!--<img src="../../static/img/yanzhegnma.png">-->
        <input type="number" placeholder="请输入验证码" id="verify" v-model="verfiy">
        </div>
      </div>

      <div class="dologin" @click="dologin">登录</div>
    </div>
 <div class="login-zhanwei"></div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import md5 from 'js-md5'


  export default {
    name: "login",
    data() {
      return {
        selected: "zhanghaomimadenglu",
        phone: "", //手机号
        url: this.COMMEURL.commonUrl,
        flag: true,//发送验证码是否可点击
        vercode: '',//发送的验证码
        verfiy: '',//输入的验证码
        t: '', //定时器
        i: 60,//定时器初始值
        number: "发送验证码"


      }
    },
    mounted() {
$(".Login").css("height",$(window).height());
    },
    watch: {
      number: {
        handler(curVal, oldVal) {
          console.log(curVal);
        },
      },
    },

    methods: {
      /**
       * 发送验证码
       */
      sendVerCode: function () {
        var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if ($.trim(this.phone) == '') {
          Toast({
            message: '请输入手机号',
            duration: '2000',
            positon: 'middle'
          })
        } else if (!reg.test(this.phone)) {
          Toast({
            message: '手机号格式错误',
            duration: '2000',
            positon: 'middle'
          })
        } else {
          if (this.flag == false) {
            return;
          } else {
            this.flag = false;
            this.getVcode(this.phone);
          }
        }
      },
      /**
       * 获取验证码
       * @param mobile 手机号
       */
      getVcode: function (mobile) {

        var self = this;
        this.t = setInterval(function () {
          console.log(self.i)
          self.number = self.i + "s";
          self.i--;
          if (self.i < 0) {
            clearInterval(self.t);
            self.number = "发送验证码";
            self.i = 60;
            self.flag = true;
          }
        }, 1000);

        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/actionSms", qs.stringify({
          mobile: mobile,
          secret: md5(mobile + "z!l@z#j$")

        })).then(function (res) {
          console.log("获取验证码：" + JSON.stringify(res));

          if (res.data.success) {
            self.vercode = res.data.captcha;
          } else {
            Toast({
              message: res.data.msg,
              duration: '2000',
              positon: 'middle'
            })
            clearInterval(self.t);
            self.flag = true;
            self.i = 60;
            self.number = "发送验证码";
            // $(".send").text("发送验证码");
          }
          // if (data.data.code == 400) {
          //   Toast({
          //     message: data.data.msg,
          //     position: 'middle',
          //     duration: 3000
          //   });
          //   self.flag = true;
          //   clearInterval(t);
          // } else if (data.data.code = 200) {
          //   Toast({
          //     message: "验证码发送成功",
          //     position: 'middle',
          //     duration: 3000
          //   });
          //   self.vercode=
          //   var i = 60;
          //   t = setInterval(function () {
          //     $(".send").text(i + "s");
          //     i--;
          //     if (i < 0) {
          //       clearInterval(t);
          //       $(".send").text("获取验证码");
          //       i = 60;
          //       self.flag = true;
          //     }
          //   }, 1000);
          // }
        }).catch(function (e) {
          console.log("验证码错误：" + JSON.stringify(e));
          clearInterval(self.t);
          self.flag = true;
        });
      },
      /**
       * 登录
       */
      dologin: function () {
        if ($.trim(this.phone) == "") {
          Toast({
            message: "请输入手机号",
            duration: 2000,
            positon: "middle"
          })
        } else if ($.trim(this.verfiy) == "" || $.trim(this.verfiy) == '') {
          Toast({
            message: "请输入验证码",
            duration: 2000,
            positon: "middle"
          })
        } else if (this.verfiy != this.vercode) {
          Toast({
            message: "验证码错误",
            duration: 2000,
            positon: "middle"
          })
        } else {
          var self = this;
          this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/oldUserInfo", qs.stringify({
            mobile: self.phone,

            uid: self.$route.query.uid
            // uid:window.location.split("?")[1]

          })).then(function (res) {

            if (res.data.code == 200) {
              Toast({
                message: "登录成功",
                duration: 2000,
                positon: "middle"
              });
              location.href="http://xfhwx.xiufanghua.com/#/"

            } else {
              Toast({
                message: res.data.msg,
                duration: 2000,
                positon: "middle"
              })
            }
          }).catch(function (e) {
            Toast({
              message: JSON.stringify(e),
              duration: 2000,
              positon: "middle"
            })
          })
        }


      },



    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  .Login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    background-color: #ffffff;
  }
  label{
    font-size: 0.15rem;
    /*line-height: 0.7rem;*/
    line-height: 0.45rem;
    color: #444444;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999999;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999;
  }
  .login {
    width:90%;
    /*border: 1px solid black;*/
    position: absolute;
    z-index: 2;
    top:0.3rem;
    left: 5%;
    height: 1.85rem;
    /*margin-left: 10%;*/
    /*margin-top: 2rem;*/
    /*margin-top: calc((100% - 1.85rem)/2);*/
    /*left: 10%;*/
    background-color: #ffffff !important;
    /*border: 1px solid seagreen;*/
  }

  .commendiv {
    width: 94%;
    margin: 0.1rem auto 0 auto;
    display: flex;
    flex-direction: row;
    height: 0.45rem;
    border-bottom: 1px solid #f5746f;
  }

  .commendiv img {
    width: 0.15rem;
    height: 0.24rem;
    margin-top: 0.105rem;
    margin-left: 0.1rem;
  }

  .login-pub{

    /*width: 100%;*/
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: row;
  }
  .login-pub input {
    width: 70%;
    height: 0.44rem;

    margin-left: 0.3rem;

    border: none;
    outline: none;
    margin-right: 0.1rem;

  }

  .send {
    /*width: 0.56rem;*/
    height: 0.22rem;
    /*background-color: #f5746f;*/
    font-size: 0.13rem;
    color: #f5746f;
    margin-right: 0.02rem;
    text-align: center;
    line-height: 0.22rem;
    border-radius: 0.11rem;
    margin-top: 0.11rem;
    position: absolute;
    right: 0;
  }

  .zhuce {
    width: 2.35rem;
    height: 0.45rem;
    left: calc((100% - 2.35rem) / 2);
    top: 4.7rem;
    position: absolute;
  }

  .dologin {
    width: 86%;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    background-color: #f5746f;
    font-size: 0.15rem;
    color: white;
    border-radius: 0.04rem;
    margin: 0.4rem auto 0 auto;
  }
  .login-zhanwei{
    width: 100%;
    height: calc(100% - 2.7rem);
    /*border: 1px solid slateblue;*/
    position: absolute;
    bottom: 0;
    overflow-x: hidden;
    background-color: #f5f5f5;
  }
</style>
