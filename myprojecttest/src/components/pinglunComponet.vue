<template>
  <div class="pinglun">
    <div class="pinglunCom">
      <textarea id="pinglunCompo" v-model="commentnamepl"></textarea>
      <div class="pldiv">
        <div class="cancelpl">取消</div>
        <div class="confrimpl" @click="confirmPinglun" >评论</div>
      </div>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';


  export default {
    name: "pinglun",
    props:['weiboid','commenid','commentnamepl','ispinglunomponet'],
    data() {
      return {
        // pinglunContent: this.commentnamepl,
        url: this.COMMEURL.commonUrl,
        // weibo_id:'weibo-id'
      }
    },

    methods: {
      confirmPinglun: function () {
        alert(this.weiboid+"  "+this.commenid+"  "+this.commentnamepl);
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/weibo/index/weiComment", qs.stringify({
          weibo_id: self.weiboid,
          content: self.commentnamepl,
          to_comment_id: self.commenid
        })).then(function (res) {
          if (res.data.code == 200) {
            Toast({
              message: "评论成功",
              duration: 2000,
              position: 'middle'
            })
          }
        })
      },
      cancelpl:function () {
        // this.$emit('cancelpl', false);//这里的this指的是当前子组件
        this.ispinglunomponet=false;
      }
    }


  }
</script>
<style>
  .pinglunCom {
    width: 100%;
    height: 1.3rem;
    outline: none;
  }

  #pinglunCompo {
    width: 95%;
    min-height: 0.6rem;
    padding-left: 0.1rem;
    line-height: 0.25rem;
    outline: none;
  }

  .pldiv {
    height: 0.3rem;
    display: flex;
    flex-direction: row;
    margin-top: 0.1rem;

  }

  .pldiv div {
    line-height: 0.3rem;
    font-size: 0.14rem;
    text-align: center;
    padding: 0 0.15rem;
    border-radius: 0.04rem;

  }

  .pldiv .cancelpl {
    border: 1px solid #999999;
    color: #999999;
  }

  .pldiv .confrimpl {

    margin-left: 0.1rem;
    background-color: #DD191D;
    color: white;
    justify-content: flex-end;
  }
</style>
