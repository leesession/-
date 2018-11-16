<template>
  <div class="yonghumingxiugai">
    <div class="Signaturediv">
      <textarea type="text" id="modifySignature" placeholder="请输入个性签名" v-model="modifySignature"></textarea>
    </div>


    <div class="xgyhm-confirm" @click="confirmModify">确认修改</div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "gexingqianming",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        modifySignature: "",

      }
    },
    mounted() {
      this.modifySignature=this.$route.query.signature;
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
        // var nickname = $.trim(self.modifySignature);
        // if (nickname == "") {
        //   Toast({
        //     message: "用户名不能为空",
        //     duration: 2000,
        //     positon: 'middle'
        //   })
        // } else {
        self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/upDate", qs.stringify({
          nickname: "",
          mobile: "",
          sex: "",
          birthday: "",
          portrait: "",
          IdCard: "",
          realname: "",
          IdCardImg: "",
          IdCardImgSide: "",
          signature: $.trim(self.modifySignature)
        })).then(function (res) {
          console.log(JSON.stringify(res));
          if (res.data.code == 200) {
            Toast({
              message: "修改成功",
              position: 'middle',
              duration: 3000
            })
            self.modifySignature = "";
            self.$router.push({path: '/gerenzhongxin'});
          } else {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 3000
            })
          }
        })
        // }
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
    overflow-x: hidden;
  }

  .Signaturediv {
    /*border: 1px solid seagreen;*/
    width: 100%;
    height: 1.2rem;
    background-color: #ffffff;
    margin-top: 0.1rem;
  }

  #modifySignature {
    width: 96%;
    height: 1rem;
    background-color: #ffffff;
    border: none;
    outline: none;
    /*margin-top: 0.1rem;*/
    /*padding-left: 0.1rem;*/
    padding-top: 0.1rem;
    overflow-x: hidden;
    text-align: left;
    font-size: 0.16rem;
    line-height: 0.3rem;
    /*border: 1px solid slateblue;*/
    margin: 0rem auto;
    display: block;

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
