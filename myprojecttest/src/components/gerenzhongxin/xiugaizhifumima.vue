<template>
  <div class="xiugaizhifumima">
    <div class="comen">
      <div class="sjh">手机号</div>
      <div class="shoujiyanzheng" >
        <input type="number" placeholder="请输入手机号" id="shoujiyanzhengIpnut" v-model="mobile" disabled>
        <div class="phoneyanzheng" @click="getVerfiyCode">验证码</div>
      </div>
    </div>
    <div class="comen" >
      <div class="sjh">验证码</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入验证码" id="shoujiyanzhengma" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei" @click="getVerfiyCode">验证码</div>
      </div>
    </div>
    <div class="xgzfmm-confirm" @click="confirm">提交</div>
  </div>


</template>
<script>
  import {Toast} from 'mint-ui';
  import {formatDate} from '../../../static/js/timeFormat'
  import md5 from 'js-md5'
  import Exif from 'exif-js'

  export default {
    name: "xiugaizhifumima",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        imgUrl: "",
        mobile: sessionStorage.getItem("phone"),//手机号
        shoujiyanzhengma: "",//输入手机验证码
        shoujifasongyanzengma: "",//手机发送的真实验证码

      }
    },

    methods: {

      confirm: function () {

        var self = this;
       if($.trim(this.shoujiyanzhengma).length==0){
          Toast({
            message: "请输入手机验证码",
            duration: 2000,
            position: 'middle'
          })
        } else if (self.shoujifasongyanzengma != self.shoujiyanzhengma) {
          Toast({
            message: "验证码输入错误",
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.$router.replace({path:'/shezhizhifumima',query:{type:'xiugai'}});
        }

      },

      getVerfiyCode: function () {
        //获取验证码
        if (this.shoujihao == "") {
          Toast({
            message: '请输入手机号',
            duration: 3000
          });
        } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.mobile))) {
          Toast({
            message: '手机号格式错误',
            duration: 3000
          });
        } else {
          if (this.flag == false) {
            return false;
          } else {
            this.flag = false;
            this.getVcode(this.mobile);

          }
        }
      },
      getVcode: function (mobile) {
        var t;
        var self = this;
        var i = 60;
        t = setInterval(function () {
          $(".phoneyanzheng").text(i + "s");
          i--;
          if (i < 0) {
            clearInterval(t);
            $(".phoneyanzheng").text("获取验证码");
            i = 60;
            self.flag = true;
          }
        }, 1000);
        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/actionSms", qs.stringify({
          mobile: mobile,
          secret: md5(mobile + "z!l@z#j$")
        })).then(function (data) {
          console.log("获取验证码：" + JSON.stringify(data));
          if (data.data.success) {
            self.shoujifasongyanzengma = data.data.captcha;
          } else {
            Toast({
              message: data.data.msg,
              position: 'middle',
              duration: 3000
            });
            self.flag = true;
            clearInterval(t);
          }
        }).catch(function (e) {
          console.log("验证码错误：" + JSON.stringify(e));
          clearInterval(t);
          self.flag = true;
        });
      },
    },


  }
  // },
</script>
<style>
  html, body {
    background-color: #f5f5f5;
  }

  .comen {
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: 0.5rem;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
  }

  .commen-header {
    height: 0.8rem;
    width: 100%;
    position: relative;
  }

  .commen-header-upload-input {
    width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    /*border: 1px solid slateblue;*/
    opacity: 0;
    z-index: 12;

  }

  .commen-header-upload {
    width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    /*border: 1px solid slateblue;*/
    display: flex;
    flex-direction: row;
  }

  .comen p {
    color: #333333;
    font-size: 0.15rem;
    margin-left: 3%;
    line-height: 0.5rem;
  }

  .commen-header p {
    line-height: 0.8rem;
  }

  .comen .commen-div {
    flex-grow: 4;
    justify-content: flex-end;
    /*border: 1px solid slateblue;*/
    display: flex;
    flex-direction: row;
    margin-right: 3%;
  }

  .commen-div p {
    color: #666666;
    font-size: 0.14rem;
    line-height: 0.5rem;
    margin-right: 0.13rem;
  }

  .commen-header .commen-div p {
    line-height: 0.8rem;
  }

  .commen-div > img {
    width: 0.12rem;
    height: 0.18rem;
    margin-top: 0.18rem;
  }

  .commen-header .commen-div img {
    margin-top: 0.31rem;
  }

  .commen-header .commen-div .commen-divheader {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin: 0.15rem 0.13rem;
    font-size: 0.5rem;
    /*margin-right: 0.13rem;*/
  }

  .choose {
    width: 100%;
    list-style: none;
    background-color: #f5f5f5;
  }

  .choose li {
    width: 100%;
    background-color: #ffffff;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.17rem;
    border-bottom: 1px solid #f5f5f5;
  }

  .choose li:nth-child(3) {
    margin-top: 0.15rem;
  }

  .mint-popup-bottom {
    width: 100%;
  }

  .mint-datetime-action {
    color: #E51C23;
  }

  .shoujiyanzheng {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 0.5rem;
    /*flex: 1;*/
    margin-right: 0.2rem;
    justify-content: flex-end;
  }

  #shoujiyanzhengIpnut, #shoujiyanzhengIpnut2, #yaoqingma, #yaoqingma1, #shoujiyanzhengma, #zhenshixingming {
    border: none;
    outline: none;
    text-align: left;
    font-size: 0.14rem;
    height: 0.48rem;
    width: 60%;
  }
  input:disabled{

    background-color: #ffffff;

  }
  .comen .sjh {
    font-size: 0.15rem;
    line-height: 0.5rem;
    margin-left: 3%;
    color: #333333;
    /*border: 1px solid slateblue;*/
    /*width: 1.5rem;*/
    width: 1rem;
    /*flex-grow: 5;*/
    /*width: 50%;*/
  }

  .phoneyanzheng, .xiangxixinxizhanwei {
    font-size: 0.14rem;
    height: 0.3rem;
    line-height: 0.3rem;
    /*padding: 0 0.15rem;*/
    border: 1px solid #DD191D;
    color: #dd6161;
    border-radius: 0.04rem;
    /*margin: 0.1rem 0;*/
    margin-top: 0.1rem;
    width: 0.9rem;
    text-align: center;

  }

  .xiangxixinxizhanwei {
    border: none;
    color: transparent;
  }

  .psotidDiv {
    position: relative;
    width: 60%;
    height: 0.4rem;
    margin: 0.2rem auto;

    /*border: 1px solid seagreen;*/
  }

  .psotidDiv > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .postIdcard {
    width: 100%;
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.4rem;
    background-color: #ffffff;
    border: 1px solid #DD191D;
    color: #444444;
    border-radius: 0.04rem;
    /*line-height: tex;*/
  }

  /*.yanzhengweitongguo{*/
  /*display: none;*/
  /*}*/
  /*.yanzhengtongguo{*/
  /*display: none;*/
  /*}*/

  .xgzfmm-confirm {
    font-size: 0.16rem;
    width: 2.6rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    color: #ffffff !important;
    border-radius: 0.08rem;
   background-color: #f5746f;
    margin: 0.2rem auto;
    border: none !important;
  }
</style>
