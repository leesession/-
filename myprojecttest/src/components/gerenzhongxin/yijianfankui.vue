<template>
  <div class="yjfk">
<textarea class="textarea" placeholder="请留下你宝贵意见，我们将不断完善，对于有价值的建议，我们将给与一定的现金奖励。" v-model="data">
</textarea>
    <div class="yjfk-send" @click="sendGus">发送</div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "yijianfankui",
    data() {
      return {
        data: "",
        url: this.COMMEURL.commonUrl,
        loading: ""
      }
    },
    mounted() {

    },
    methods: {
      sendGus: function () {
        if($.trim(this.data)==""){
          Toast({
            message: "请输入您的宝贵意见",
            duration: 2000,
            postion: 'middle'
          })
        }else{


        var self = this;
        this.loading = this.$loading({
          lock: true,
          text: '反馈中',
          background: 'transparent'
        });
        self.$loading.fullscreenLoading = true;
        self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/opinion", qs.stringify({
          opinion: self.data
        })).then(function (res) {
          console.log(JSON.stringify(res));
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            Toast({
              message: "反馈成功",
              duration: 2000,
              postion: 'middle'
            });
            self.data = "";
            self.$router.push({path:'/gerenzhongxin'});

          }
        }).catch(function () {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        });
      }
    }
    }
  }
</script>
<style>
  .yjfk{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
  }
  .textarea {
    width: 94%;
    margin: 0.2rem auto;
    height: 1.5rem;
    display: block;
    outline: none;
    /*border: none;*/
    font-size: 0.15rem;
    border: 1px solid #f0f0f0;
    padding-top: 0.1rem;
    padding-left: 0.1rem;
    /*line-height: 11;*/
  }

  .yjfk-send {
    height: 0.3rem;
    line-height: 0.3rem;
    background-color: #f5746f;
    color: white;
    font-size: 0.14rem;
    float: right;
    margin-right: 3%;
    border-radius: 0.06rem;
    padding: 0 0.1rem;
  }
</style>
