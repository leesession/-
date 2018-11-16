<template>
  <div class="register">

    <div class="registerDiv">
      <div class="yaoqingma">
        <input type="text" id="yaoqingma" placeholder="请输入邀请码" v-model="inviteCode" :disabled="disabled"
               v-on:blur="InvitedCode(inviteCode,0)">
      </div>
      <div class="public">
        <input type="text" id="phone" placeholder="请输入手机号" v-model="phone">
      </div>
      <div class="public public-verfiy">

        <input type="text" id="verfiy" placeholder="请输入验证码" v-model="verfiy">
        <div class="getcode" @click="flag&&getVerfiyCode(phone)">获取验证码</div>
      </div>
      <div class="public">
        <input type="password" id="pwd" placeholder="请输入密码" v-model="pwd">
      </div>
      <div class="public">
        <input type="password" id="repwd" placeholder="请确认密码" v-model="repwd">
      </div>
    </div>
    <div class="dologin commenaction" @click="phonelogin">注册</div>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import md5 from 'js-md5'

  export default {
    name: "register",
    data() {
      return {
        disabled: false,//邀请码  正确 不可以输入
        pwd: "",
        phone: "",
        verfiy: "",
        repwd: "",
        jinyong: true,
        flag: true,
        inviteCode: "",
        url: this.COMMEURL.commonUrl,
        status: 0,
        isRightStatus: false,//判断邀请码是否正确
        // t:""//定时器
      }
    },

    methods: {
      clickTabItem: function () {
        var index = $(this).index();
        console.log(index);
      },
      login: function (username, pwd) {
        //密码账号登录
        this.username = username;
        this.pwd = pwd;
        this.$axios.post('', {
          username: username,
          password: pwd
        }).then(function () {

        }).catch(function (e) {

        })
      },
      phonelogin: function () {
        //手机号登录
        if (this.pwd == "" || this.repwd == "") {
          Toast({
            message: "请输入密码",
            duration: 2000,
            positon: "middle"
          })
        } else if (this.pwd !== this.repwd) {
          Toast({
            message: "两次密码输入不一致，请重新输入",
            duration: 2000,
            positon: "middle"
          })
        } else {
          var self = this;
          this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/register", qs.stringify({
            mobile: self.phone,
            code: self.verfiy,
            password: self.pwd,
            invite: self.inviteCode

          })).then(function (res) {
            console.log("注册：" + JSON.stringify(res));
            if (res.data.code == 200) {
              Toast({
                message: "注册成功",
                duration: 2000,
                positon: "middle"
              })
              if (self.inviteCode !== "" && self.isRightStatus) {
                self.InvitedCode(self.inviteCode, 1);
              }
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
      getVerfiyCode: function (phone) {
        // var i = 0;
        //获取验证码
        if (phone == "") {
          Toast({
            message: '请输入手机号',
            duration: 3000
          });
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
          Toast({
            message: '手机号格式错误',
            duration: 3000
          });
        } else {
          if (this.flag == false) {
            return false;
          } else {
            this.flag = false;
            this.getVcode(phone);
          }

        }
      },
      getVcode: function (mobile) {
        var t;
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/actionSms", qs.stringify({
          mobile: mobile,
          secret: md5(mobile + "z!l@z#j$")

        })).then(function (data) {
          console.log("获取验证码：" + JSON.stringify(data));

          if (data.data.code == 400) {
            Toast({
              message: data.data.msg,
              position: 'middle',
              duration: 3000
            });
            self.flag = true;
            clearInterval(t);
          } else if (data.data.code = 200) {
            Toast({
              message: "验证码发送成功",
              position: 'middle',
              duration: 3000
            });
            var i = 60;
            t = setInterval(function () {
              $(".getcode").text(i + "s");
              i--;
              if (i < 0) {
                clearInterval(t);
                $(".getcode").text("获取验证码");
                i = 60;
                self.flag = true;
              }
            }, 1000);
          }
        }).catch(function (e) {
          console.log("验证码错误：" + JSON.stringify(e));
          clearInterval(t);
          self.flag = true;
        });
      },
      InvitedCode: function (invited, status) {
        //获取邀请码
        console.log("dsad:" + invited);

        if (inviteCode == "") {
          return;
        }
        var self = this;
        this.$axios.post("http://tongji.zlzjcyw.com/api/invite", qs.stringify({
          invite: invited,
          status: status,
          secret: md5(invited + 0 + "qrcode")
        })).then(function (res) {
          console.log(res);
          if (res.data.success) {
            self.disabled = true;
            if (status == 0) {
              self.isRightStatus = true;
            }
          } else {
            self.inviteCode = "";
            Toast({
              message: "邀请码错误",
              duration: 2000,
              position: 'middle'
            });
          }
        })
      }
    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  [v-clock] {
    display: none;
  }

  html, body {
    /*background-color: #FAF5F5;*/
  }

  .register {

    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    position: absolute;
    top: 0;
    left: 0;
  }

  .registerDiv {
    background-color: #ffffff;
    margin-top: 0.1rem;
  }

  .public {
    width: 100%;
    height: 0.5rem;

    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    border-top: 1px solid #f5f5f5;
    margin-top: 1px;
  }

  .public:nth-child(1) {
    border-top: none;
  }

  .public input {

    flex-grow: 22;
    outline: none;
    height: 46px;
    margin: 0px 10px;
    /*line-height: 20px;*/
    font-size: 15px;
    border: none;
    /*border: 1px solid seagreen;*/
  }

  .yaoqingma #yaoqingma {
    width: 100%;
    height: 0.5rem;
    border: none;
    padding-left: 3%;

    outline: none;
    font-size: 0.14rem;
  }

  .commenaction {
    width: 80%;
    height: 45px;
    line-height: 45px;
    color: white;
    background-color: #dd191d;
    font-size: 15px;
    border-radius: 6px;
    text-align: center;
    margin: 25px auto;
  }

  .public-verfiy {
    display: flex;
    flex-direction: row;
  }

  .getcode {
    /*width: 70px;*/
    height: 25px;
    border: 1px solid #dd191d;
    border-radius: 6px;
    text-align: center;
    line-height: 25px;
    margin: 13px;
    color: #dd191d;
  }
</style>
