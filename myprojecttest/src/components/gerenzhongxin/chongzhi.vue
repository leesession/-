<template>
  <div class="chongzhi">
    <div class="chongzhidiv">
      <p class="czje">充值金额</p>
      <div class="czje-div">
        <label for="czje-moneny">￥</label>
        <input type="number" id="czje-moneny" pattern="/^\d+(?=\.{0,1}\d+$|$)/" v-model="chongzhimoney" >
      </div>
      <div class="next" @click="chongzhi">充值</div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "chongzhi",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        chongzhimoney: "",
        loading: "",
      }
    },

    mounted() {
      $("#czje-moneny").focus();
    },
    methods: {
      chongzhi: function () {

        if (this.chongzhimoney == "") {
          Toast({
            message: "请输入充值金额",
            duration: 2000,
            postion: 'middle'
          })
        } else {
          var self = this;
          this.loading = this.$loading({
            lock: true,
            text: '充值中',
            background: 'transparent'
          });
          this.$loading.fullscreenLoading = true;
          this.$axios.post(self.url + "/index.php?s=/news/newindex/recharge", qs.stringify({

            money: self.chongzhimoney,

          })).then(function (res) {
            if (res.data.code == 200) {
              self.weixinPay(res.data.data);
            } else {
              self.$loading.fullscreenLoading = false;
              self.loading.close();
              Toast({
                message: res.data.msg,
                duration: 2000,
                position: 'middle'
              });
            }
          }).catch(function (e) {
            console.log("res:" + JSON.stringify(e));
            self.$loading.fullscreenLoading = false;
            self.loading.close();
          })
        }


      },
      /**
       * @method :微信支付方法
       * @param data
       */
      weixinPay: function (data) {
        var vm = this;
        if (typeof WeixinJSBridge == "undefined") {//微信浏览器内置对象。参考微信官方文档
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
            document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data));
          }
        } else {
          vm.$loading.fullscreenLoading = false;
          vm.loading.close();
          vm.onBridgeReady(data);
        }


      },
      /**
       * @method 支付费用方法
       * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
       */
      onBridgeReady: function (data) {
        var self = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": data.appId,     //公众号名称，由商户传入
            "timeStamp": data.timeStamp.toString(), //时间戳，自1970年以来的秒数
            "nonceStr": data.nonceStr, //随机串
            "package": data.package,
            "signType": data.signType, //微信签名方式：
            "paySign": data.paySign //微信签名
          },
          function (res) {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              Toast({
                message: "充值成功",
                duration: 2000,
                position: 'middle'
              });
              self.chongzhimoney = ""
              // vm.$router.push("/reservedBerth");
              self.$loading.fullscreenLoading = false;
              self.loading.close();
              self.$router.replace({path: '/wodeqianbao',query:{type:'chongzhi'}});
            } else {

              self.$loading.fullscreenLoading = false;
              self.loading.close();
            }
          }
        );
      },
      clearNoNum: function (obj) {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          obj.value = parseFloat(obj.value);
        }
      }
    }

  }
</script>
<style>
  .chongzhi {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f5f5f5;
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

  .czje-div {
    width: 92%;
    margin: 0.2rem auto;
    height: 0.4rem;
    line-height: 0.3rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    /*border: 1px solid slateblue;*/
    border-bottom: 1px solid #f5f5f5;
  }

  .czje-div > label {
    font-weight: bold;
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: black;
  }

  .czje-div > input {
    width: 60%;
    font-size: 0.3rem;
    color: black;
    height: 0.39rem;
    flex: 1;
    border: none;
    outline: none;

  }

  .next {
    width: 2.6rem;
    height: 0.4rem !important;
    background-color: #f5746f !important;
    color: white;
    font-size: 0.15rem;
    margin: 0 auto;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.08rem;
  }
</style>
