<template>
  <div class="faqizhifu">

    <div class="zhifu-div">
      <p class="zffs">支付方式</p>
      <div class="zhifufangshi" >
        <img src="../../../static/img/walletzhifu.png" alt="">
        <div class="zhifu-text">
          <p>账户支付</p>
          <p v-if="isEnoughMon">爱心账户支付</p>
          <p class="yuebuzu" v-else>可用于打赏余额不足,为<span>{{yue}}</span>元</p>
        </div>
        <img :src=selectArray[0].select?selectArray[0].selectImage:selectArray[0].imgurl class="correct-img"
             @click="changeImage(0)">
      </div>
      <div class="zhifufangshi zhifufangshi2">
        <img src="../../../static/img/wechatzhifu.png" alt="">
        <div class="zhifu-text">
          <p>微信支付</p>
          <p>微信安全支付</p>
        </div>
        <img :src=selectArray[1].select?selectArray[1].selectImage:selectArray[1].imgurl class="correct-img"
             @click="changeImage(1)">
      </div>
      <!--<p class="r-text">同意并接受<span>《秀芳华平台支付协议》</span></p>-->
      <div class="confirm" @click="confirm">确认提交</div>
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
                   v-model="inputmoney">
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
    name: "faqizhifu",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        chongzhimoney: "",
        loading: "",
        ismywallet: false,//是否显示密码输入框
        isEnoughMon: true,//控制余额支付下面小字
        inputmoney: "",//输入的金额
        balance:"",//账户余额
        selectArray: [
          {
            select: true,
            index: 0,
            selectImage: require('../../../static/img/correct.png'),
            imgurl: require("../../../static/img/unselected-1.png")
          },
          {
            select: false,
            index: 1,
            selectImage: require('../../../static/img/correct.png'),
            imgurl: require("../../../static/img/unselected-1.png")
          }
        ],
        zhifufangshi: 2,//支付方式，默认为余额支付
        paychal: "2",//微信支付  2为钱包
        amount: '',
        articleid: '',//文章id
        pwd: '',//支付密码
        yue: "",//余额
        oriangle: "",//来源
        back: "",//设置返回基层路径
      }
    },
    watch: {
      yue: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      ismywallet: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },

    },
    mounted() {

      $("#czje-moneny").focus();
      this.amount = this.$route.query.money;//打赏金鹅
      this.articleid = this.$route.query.articalId;
      this.id = this.$route.query.rePostId;//转发id
      this.balance=this.$route.query.balance;//账户余额

      if(parseFloat(this.balance)<parseFloat(this.amount)){
        this.isEnoughMon=false; //微信支付，显示余额不足
        this.yue=this.balance;
        this.paychal = '0';
        this.zhifufangshi = 0;
        this.selectArray[1].select=true;
        this.selectArray[0].select=false;
      }// this.selectArray[1].select=true;
      //来源
      this.oriangle = this.$route.query.type;
      var back = this.$route.query.back;
      console.log("faqizhifu-back:"+back);
      if (back == "shezhimima") {
        this.back = "shezhimima"
      } else {
        this.back = "faqizhifu"
      }
      console.log(this.amount + "  " + this.articleid)
    },
    methods: {
//支付方式切换
      changeImage: function (index) {

        if(parseFloat(this.balance)>=parseFloat(this.amount)){
          if (index == 1) {
            //微信支付
            this.paychal = '0';
            this.zhifufangshi = 0
          } else {
            //余额支付
            this.paychal = '2';
            this.zhifufangshi = 2
          }
          for (var i = 0, len = this.selectArray.length; i < len; i++) {
            if (i == index) {
              this.selectArray[i].select = true;
            } else {
              this.selectArray[i].select = false;
            }
          }
        }
      },
      //关闭支付弹窗
      closewallet: function () {
        this.ismywallet = false;
        $(".fake-box input").val("");
        $("#pwd-input").val("");
        this.inputmoney="";
      },
      //确认支付
      confirm: function () {
        var self = this;
        if (this.paychal == '2') {
          //微信支付 paychal=0   余额支付  paychal=2
          this.$axios.post(self.url + "/index.php?s=/news/newindex/ispay_password").then(function (res) {
            if (res.data.code == 200) {
              self.ismywallet = true;
            } else if (res.data.code == 402) {
              if (self.oriangle == "wenzhangxiangqing") {
                self.$router.replace({
                  path: '/shezhizhifumima',
                  query: {articalId: self.articleid, money: self.amount, oriangle: "wenzhangxiangqing"}
                });
              } else {

                self.$router.replace({
                  path: '/shezhizhifumima',
                  query: {
                    money: self.amount,
                    articalId: self.id,
                    rePostId: self.articleid,
                    oriangle: "zhuanfawenzhangxiangqing"
                  }
                });
              }
              // self.$router.replace({path: '/shezhizhifumima', query: {money: self.amount, articleid: self.articleid}});
            } else {
              Toast({
                message: res.data.msg,
                position: 'middle',
                duration: 2000
              })
            }

          }).catch(function (e) {

          });
        } else {
          // self.loading = this.$loading({
          //   lock: true,
          //   text: '加载中',
          //   background: 'transparent'
          // });
          // self.$loading.fullscreenLoading = true;
          this.getReward();
        }
      },
      //发起支付
      getReward: function () {
        var self = this;
        self.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });

        self.$loading.fullscreenLoading = true;
        this.$axios.post(self.url + "/index.php?s=/news/newindex/reward", qs.stringify({

          amount: self.amount,
          pay_type: self.paychal,
          article_id: self.articleid,
          pay_password: md5(self.pwd)
        })).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            //余额支付
            if (self.paychal == 2) {
              //发起余额支付
              self.ismywallet = false;
              Toast({
                message: "支付成功",
                positon: 'middle',
                duration: 2000,
              });
              self.inputmoney = "";
              if (self.oriangle == "wenzhangxiangqing") {
                self.$router.replace({
                  path: '/wenzhangxiangqing',
                  query: {articalId: self.articleid, back: self.back}
                });
              } else {

                self.$router.replace({
                  path: '/zhuanfawenzhangxiangqing',
                  query: {articalId: self.id, rePostId: self.articleid, back: self.back}
                });
              }


            } else {
              console.log("微信支付");
              //发起微信支付
              self.weixinPay(res.data.data);
              self.ismywallet = false;
            }

          } else if (res.data.code == 401) {
            //余额不足 关闭loading加载
            self.ismywallet = false;
            self.isEnoughMon = false;//显示余额支付不足
            self.yue = res.data.data;
            $(".fake-box input").val("");
            self.inputmoney = "";

          } else {
            $(".fake-box input").val("");
            self.inputmoney = "";
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 2000
            })
            self.ismywallet = false;
          }


        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })
      },
      /**
       * @method :微信支付方法
       * @param data
       */
      weixinPay: function (data) {
        console.log("weixinPay" + JSON.stringify(data));
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
                message: "打赏成功",
                duration: 2000,
                position: 'middle'
              });
              self.chongzhimoney = ""
              // vm.$router.push("/reservedBerth");
              self.$loading.fullscreenLoading = false;
              self.loading.close();
              if (self.oriangle == "wenzhangxiangqing") {
                self.$router.replace({
                  path: '/wenzhangxiangqing',
                  query: {articalId: self.articleid,back:'faqizhifu'}
                });
              } else {
                self.$router.replace({
                  path: '/zhuanfawenzhangxiangqing',
                  query: {articalId: self.id, rePostId: self.articleid, back:'faqizhifu'}
                });
              }

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
      },
      InputMoney: function () {
        // trim(): 去两边空格的方法；
        console.log("dasda");
        // var pwd = $(this).val().trim();
        var self = this;
        var pwd = $.trim(self.inputmoney);

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
          self.getReward();
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
      }
    }

  }
</script>
<style>
  .zhifu-div {
    width: 100%;
    position: absolute;
    /*bottom: 0;*/
    top: 0;
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
    /*margin-bottom: 0.4rem;*/
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
    font-size: .16rem;
  }

  .zhifufangshi .correct-img {
    width: 0.3rem;
    height: 0.3rem;
    /*float: right;*/
    margin-right: 0.2rem;
    margin-top: 0.3rem;
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
