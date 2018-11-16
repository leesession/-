<template>
  <div class="yonghumingxiugai">
    <input type="text" id="modifyUsername" placeholder="请输入用户名" v-model="modifyUsername">
    <p class="xgyhm">不能超过15个字(包括符号),由中英文和数字组成</p>
    <div class="xgyhm-confirm" @click="confirmModify">确认修改</div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "xiugaiyonghuming",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        modifyUsername: ""
      }
    },
    mounted() {

      var self = this;
      this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/index").then(function (res) {
        // console.log(JSON.stringify(res));
        if (res.data.code == 200) {
          self.grzxInfo = res.data.data;
          console.log(self.grzxInfo)
        }
      });
    },
    methods: {
      confirmModify: function () {
        var self = this;
        var nickname = $.trim(self.modifyUsername);
        var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        if (nickname == "") {
          Toast({
            message: "用户名不能为空",
            duration: 2000,
            positon: 'middle'
          })
        }else if(regStr.test(self.modifyUsername)==true){
          Toast({
            message: "用户名不能输入表情符号",
            duration: 2000,
            positon: 'middle'
          });
        }else if(nickname.length>15){
          Toast({
            message: "用户名字数不能超过15个字(包括符号)",
            duration: 2000,
            positon: 'middle'
          });
        }else {
          self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/upDate", qs.stringify({
            nickname: $.trim(self.modifyUsername),
            mobile: "",
            sex: "",
            birthday: "",
            portrait: "",
            IdCard: "",
            realname: "",
            IdCardImg: "",
            IdCardImgSide: ""
          })).then(function (res) {
            console.log(JSON.stringify(res));
            if (res.data.code == 200) {
              Toast({
                message: "修改成功",
                position: 'middle',
                duration: 3000
              })
              self.modifyUsername = "";
              self.$router.push({path: '/gerenzhongxin'});
            } else {
              Toast({
                message: res.data.msg,
                position: 'middle',
                duration: 3000
              })
            }
          })
        }
      }
    }

  }
</script>
<style>
  .yonghumingxiugai {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    position: absolute;
    top: 0;
  }

  #modifyUsername {
    width: 100%;
    height: 0.5rem;
    background-color: #ffffff;
    border: none;
    outline: none;
    margin-top: 0.1rem;
    padding-left: 0.1rem;
  }

  .xgyhm {
    margin-top: 0.1rem;
    color: #999999;
    font-size: 0.12rem;
    margin-left: 0.1rem;
  }

  .xgyhm-confirm {
    width: 2.6rem;
    height: 0.4rem;
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.4rem;
    color: #ffffff;
    background-color: #f5746f;
    margin: 0.2rem auto;
    font-size: 0.16rem;
  }
</style>
