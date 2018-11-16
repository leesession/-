<template>
  <div class="wanshanziliao">
    <div class="wszl-comen">
      <div class="sjh">手机号</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入手机号" id="shoujiyanzhengIpnut" v-model="shoujihao">
        <div class="wszl-phoneyanzheng" @click="getVerfiyCode">获取验证码</div>
      </div>
    </div>
    <div class="wszl-comen">
      <div class="sjh">验证码</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入验证码" v-model="shoujiyanzhengma">
        <input type="file" accept="image/*" @change="chooseIDCard" id="postidcard">
        <div class="wszl-phoneyanzheng  shenfenzhengshibie">身份证识别</div>
      </div>
    </div>
    <div class="wszl-comen1"></div>
    <div class="wszl-comen  ">
      <div class="sjh">姓名</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入姓名" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei">验证</div>
      </div>
    </div>

    <div class="wszl-comen">
      <div class="sjh">身份证号</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei">验证</div>
      </div>
    </div>
    <div class="wszl-comen1"></div>
    <div class="wszl-comen ">
      <div class="sjh">开户行</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入开户行名称" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei">验证</div>
      </div>
    </div>
    <div class="wszl-comen">
      <div class="sjh">银行</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入银行名称" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei">验证</div>
      </div>
    </div>
    <div class="wszl-comen">
      <div class="sjh">卡号</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="银行卡号码" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei">验证</div>
      </div>
    </div>

    <div class="wszl">完善资料</div>
    <div class="wxzl-zhanwei"></div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import md5 from 'js-md5'
  import Exif from 'exif-js'

  export default {
    name: "wanshanziliao",
    data() {
      return {
        cardid: "",
        url: this.COMMEURL.commonUrl,
        mobile: "",//手机号
        isshoujihao2: false, flag: true, //是否可点击获取验证码按钮
        zhenshixingming: "",//真实姓名
        shoujiyanzhengma: "",//输入手机验证码
        shoujifasongyanzengma: "",//手机发送的真实验证码

      }
    },

    watch: {},

    mounted() {


    },

    methods: {


      chooseIDCard: function (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue);
        this.type = "header";
      },


      PostIDCard(e) {
        if (this.shoujihao !== this.shoujihao2) {
          e.preventDefault();
          Toast({
            message: "两次输入手机号不一致",
            duration: 2000,
            position: 'middle'
          })

        } else if (this.shoujihao == "" || this.shoujihao2 == "") {
          e.preventDefault();
          Toast({
            message: "请输入手机号",
            duration: 2000,
            position: 'middle'
          })

        } else {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;
          this.picValue = files[0];
          this.imgPreview(this.picValue);
          this.type = "idcard";
        }

      },
      imgPreview(file) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
          Orientation = Exif.getTag(this, 'Orientation');
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              if (self.type == "header") {
                self.headerImg = this.result;
              } else {
                self.idcardImg = this.result;
              }

              self.postImg();
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);
                if (self.type == "header") {
                  self.headerImg = data;
                } else {
                  self.idcardImg = data;
                }
                self.postImg();
              }
            }
          }
        }
      },
      postImg() {
        console.log("身份证：" + this.idcardImg)
        //这里写接口
        var self = this;
        self.loading = self.$loading({
          lock: true,
          text: '上传中',
          background: 'transparent'
        });
        self.$loading.fullscreenLoading = true;
        console.log("type:" + self.type);
        if (self.type == "idcard") {
          self.$axios.post('http://tp.zlzjcyw.com/api/saomiao',
            qs.stringify({
              "base64": self.idcardImg,
            })
          ).then(function (res) {
            // console.log(JSON.stringify(res));
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            console.log("身份证验证:" + JSON.stringify(res))
            if (res.data.success) {
              self.IdCardImg = self.idcardImg;
              self.isshowpostIdCard = false;
              self.isshimingrenzheng = true;
              self.realName = res.data.data;

              // self.$router.push({path:'/gerenzhongxin'})
              // $(".wenzhangcontent").append('<img src=' +self.url+ res.data.data + '>')
            } else {
              Toast({
                message: "识别错误，请重新上传",
                duration: 2000,
                postion: 'middle'
              });
            }

          }).catch(function (e) {
            console.log("错误" + e);
            self.loading.close();
          })
        } else if (self.type == "header") {
          self.$axios.post(self.url + '/index.php?s=/ucenter/newindex/portrait',
            qs.stringify({
              "imgData": self.headerImg,
              // "point": type
            })
          ).then(function (res) {
            console.log(JSON.stringify(res));
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            console.log("dasd:" + JSON.stringify(res))
            if (res.data.code == 200) {
              self.grzxInfo.user.portrait = res.data.data;
              self.confirmModify("", res.data.data);
              // Toast({
              //   message: '图片上传成功',
              //   duration: 2000,
              //   position: 'middle'
              // })
            }

          }).catch(function (e) {
            console.log("错误" + e);
            self.loading.close();
          })
        }


        //接口 ajax
      },
      rotateImg(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if (Orientation != "" && Orientation != 1) {
          switch (Orientation) {
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img, 'left', canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img, 'right', canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img, 'right', canvas);//转两次
              this.rotateImg(img, 'right', canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },


      getVerfiyCode: function () {
        //获取验证码
        if (this.shoujihao == "") {
          Toast({
            message: '请输入手机号',
            duration: 3000
          });
        } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.shoujihao))) {
          Toast({
            message: '手机号格式错误',
            duration: 3000
          });
        } else {
          if (this.flag == false) {
            return false;
          } else {
            this.flag = false;
            this.getVcode(this.shoujihao);
            this.yanzhengshoujihao();
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
            // Toast({
            //   message: "验证码发送成功",
            //   position: 'middle',
            //   duration: 3000
            // });

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

  .wanshanziliao {
    width: 100%;
    background-color: #ffffff;
  }

  .wszl-comen {
    width: 94%;
    border-bottom: 1px solid #f5f5f5;
    height: 0.5rem;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    margin: 0 auto;
    position: relative;
  }

  .wszl-comen1 {
    height: 0.08rem;
    background-color: #f5f5f5;

    width: 100%
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

  .wszl-comen input {
    border: none;
    outline: none;
    text-align: left;
    font-size: 0.14rem;
    height: 0.48rem;
    width: 60%;
  }

  .wszl-comen .sjh {

    font-size: 0.15rem;
    line-height: 0.5rem;
    /*margin-left: 3%;*/
    color: #444444;

    width: 1rem;

  }

  .wszl-phoneyanzheng, .xiangxixinxizhanwei {
    font-size: 0.14rem;
    height: 0.3rem;
    line-height: 0.3rem;
    color: #dd6161;
    border-radius: 0.04rem;
    margin-top: 0.1rem;
    width: 0.9rem;
    text-align: center;
    margin-right: 0;
  }

  .shenfenzhengshibie {
    color: #2988CC;
  }

  .xiangxixinxizhanwei {
    border: none;
    color: transparent;
  }

  .psotidDiv > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  #postidcard {

    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    /*height: 100%;*/
    /*opacity: 0;*/
  }

  .messageConfirm {
    font-size: 0.16rem;
    width: 60%;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    color: #DD191D;
    border: 1px solid #DD191D;
    margin: 0.2rem auto;
  }

  .wszl {
    width: 70%;
    height: 0.4rem;
    color: white;
    font-size: 0.14rem;
    background-color: #DD191D;
    line-height: 0.4rem;
    margin: 0.5rem auto 0.5rem auto;
    /*padding-bottom: 0.5rem;*/
    text-align: center;
    border-radius: 0.04rem;
  }

  .wxzl-zhanwei {
    width: 100%;
    height: 1px;
    margin-top: 0.5rem;

  }
</style>
