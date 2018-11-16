<template>
  <div class="xiangxixinxi">

    <div class="comen commen-header">
      <input type="file" accept="image/*" class="commen-header-upload-input" @change="chooseHeaderImg($event)"
             id="chooseHeaderImg">
      <div class="commen-header-upload">
        <p>头像</p>
        <div class="commen-div">
          <img :src='grzxInfo.user.portrait' class="commen-divheader" id="img">
          <img src="../../../static/img/right.png">
        </div>
      </div>
    </div>

    <router-link :to="{name:'xiugaiyonghuming'}">
      <div class="comen">
        <p>用户名</p>
        <div class="commen-div">
          <p>{{grzxInfo.user.nickname}}</p>
          <!--<img src="../../../static/img/header.jpg" alt="">-->
          <img src="../../../static/img/right.png" alt="">
        </div>
      </div>
    </router-link>
    <router-link :to="{name:'gexingqianming',query:{signature:grzxInfo.user.signature}}">
      <div class="comen">
        <p>个性签名</p>
        <div class="commen-div ">
          <p class="signaturep">{{grzxInfo.user.signature==null?'未填写':grzxInfo.user.signature}}</p>
          <!--<img src="../../../static/img/header.jpg" alt="">-->
          <img src="../../../static/img/right.png" alt="">
        </div>
      </div>
    </router-link>
    <div class="comen">
      <div class="sjh">入学时间</div>

      <div class="commen-div">
        <p>{{isruxueshijian=='true'?grzxInfo.user.reg_time:lastlogintime}}</p>
      </div>
    </div>
    <div class="comen">
      <div class="sjh">学籍号</div>

      <div class="commen-div">
        <!--<p>{{grzxInfo.user.uid}}</p>-->
        <p>{{xuejihao}}</p>
      </div>
    </div>


    <div class="comen">
      <div class="sjh">手机号</div>
      <div class="shoujiyanzheng" v-if="isshoujihao">
        <input type="number" placeholder="请输入手机号" id="shoujiyanzhengIpnut" v-model="shoujihao">
        <div class="phoneyanzheng" @click="getVerfiyCode">验证码</div>
      </div>
      <div class="commen-div" v-else>
        <p>{{grzxInfo.user.mobile}}</p>
      </div>
    </div>
    <div class="comen" v-if="isshoujihao">
      <div class="sjh">验证码</div>
      <div class="shoujiyanzheng">
        <input type="number" placeholder="请输入验证码" id="shoujiyanzhengma" v-model="shoujiyanzhengma">
        <div class="phoneyanzheng xiangxixinxizhanwei">验证</div>
      </div>
    </div>
    <div class="comen" v-if="grzxInfo.user.realname!=''&&grzxInfo.user.realname!=null">
      <div class="sjh">真实姓名</div>
      <div class="commen-div">
        <p>{{grzxInfo.user.realname}}</p>
      </div>
    </div>

    <span @click="shimingrenzheng(grzxInfo.user.IdCard,{name:'shenfenrenzheng'})">
    <div class="comen">
      <p>实名认证</p>
      <div class="commen-div ">
        <p class="signaturep">{{grzxInfo.user.IdCard==''||grzxInfo.user.IdCard==null?'待完善':grzxInfo.user.IdCard}}</p>
        <img src="../../../static/img/right.png" v-if="grzxInfo.user.IdCard==null">
      </div>
    </div>
    </span>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  // import {formatDate} from '../../../static/js/timeFormat'
  import md5 from 'js-md5'
  import Exif from 'exif-js'

  require('../../../static/css/cliper.css')
  export default {
    name: "xiangxixinxi",
    data() {
      return {
        disabled: false,//邀请码  正确 不可以输入
        isshoujihao: false,
        cardid: "",
        realName: "",
        isshimingrenzheng: true,
        value: "",
        popupVisible: false,
        pickerValue: "",
        startDate: new Date('1918'),
        endDate: new Date(),
        url: this.COMMEURL.commonUrl,
        imgUrl: "",
        mobile: "",//手机号
        nickname: "",//昵称
        username: "",//手机号
        sex: "男",//性别
        birthday: "",//生日
        shoujihao: "",
        ispassyanzheng: false,
        isnotpassYanzheng: false,
        passYanzheng: "",
        grzxInfo: "",
        isshowpostIdCard: false,
        realInfo: "",
        baoming_time: "", IdCardImg: "",
        shoujihao2: "",
        imgbase64: "",
        picValue: "",
        idcardImg: "",
        headerImg: "",
        yaoqingma: false,//是否显示邀请码
        pictureType: "",
        inviteCode: "",///邀请码
        isRightStatus: false,//判断邀请码是否正确
        isshoujihao2: false, flag: true, //是否可点击获取验证码按钮
        zhenshixingming: "",//真实姓名
        shoujiyanzhengma: "",//输入手机验证码
        shoujifasongyanzengma: "",//手机发送的真实验证码
        isruxueshijian: '',//入学时间
        xuejihao: '',//学籍号
        lastlogintime: "",//最后登录时间，在未实名认证的情况
        token:'',
      }
    },
    watch: {
      yaoqingma: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      grzxInfo: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      isshoujihao: {
        handler(curVal, oldVal) {
        },
      },
      birthday: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      ispassyanzheng: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      isnotpassYanzheng: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      isshimingrenzheng: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      realName: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      passYanzheng: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      }

    },
    created(){
      this.getToken();
    },
    mounted() {

      this.isruxueshijian = this.$route.query.ruxueshijian;
      this.lastlogintime = this.$route.query.lastlogintime;

      var self = this;
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/xx").then(function (res) {
        self.$loading.fullscreenLoading = false;
        self.loading.close();
        if (res.data.code == 200) {

          self.isshoujihao = false;
          self.grzxInfo = res.data.data;
          self.xuejihao = self.grzxInfo.user.uid

          if (self.xuejihao.length < 6) {
            while (self.xuejihao.length < 6) {
              self.xuejihao = '0' + self.xuejihao;
            }
          }
          // console.log(self.grzxInfo);
          if (res.data.data.user.mobile == "") {
            self.isshoujihao = true;
            self.yaoqingma = true;
            // self.isshoujihao2=true
          } else {
            self.isshoujihao = false;
            self.yaoqingma = false;
            // self.isshoujihao2=false
          }
        } else {
          Toast({
            message: res.data.msg,
            duration: 2000,
            postion: 'middle'
          });
        }
      }).catch(function (e) {
        self.$loading.fullscreenLoading = false;
        self.loading.close();
        console.log("錯誤：" + e);
      })
    },

    methods: {
      getToken(){
        let self=this;
        this.$axios.post("http://xfhapi.xiufanghua.com/qiniu/token").then(function (res) {
          self.COMMEURL.token=res.data.token;
        }).catch(function (e) {})
      },
      modifyBirthday: function () {
        this.$refs.picker.open();
      },
      chooseHeaderImg: function (e) {
        let image = document.getElementById('img'); //预览对象e
        this.clip(event, {
          resultObj: image,
          aspectRatio: 1
        })

      },
      confirmModify: function (date, imgUrl, _this) {

        var self = _this;
        // console.log(self.value);
        self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/upDate", qs.stringify({
          nickname: "",
          mobile: "",
          sex: "",
          birthday: date,
          portrait: imgUrl,
          IdCard: "",
          realname: "",
          IdCardImg: "",
          IdCardImgSide: "",
          invite: ""
        })).then(function (res) {
          if (res.data.code == 200) {
            Toast({
              message: "修改成功",
              position: 'middle',
              duration: 3000
            })
            if (imgUrl !== "") {
              $(".header").attr("src", self.imgUrl);
            } else if (data !== "") {
              // $(".birthday").text(self.pickerValue);
              self.birthday = self.pickerValue;
            }


          } else {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 3000
            })
          }
        })
      },
      yanzhengshoujihao: function () {

        var self = this;
        var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (reg.test(self.shoujihao)) {
          self.$axios.post("http://tp.zlzjcyw.com/api/login", qs.stringify({
            mobile: self.shoujihao,
            secret: md5(self.shoujihao + "z!l@z#j$")
          })).then(function (res) {


            self.yaoqingma = true;
            if (res.data.code == 200) {


//验证成功
              Toast({
                message: "验证成功",
                duration: 2000,
                postion: 'middle'
              });
              self.ispassyanzheng = true;
              self.isnotpassYanzheng = false;
              self.passYanzheng = res.data.data;
              // self.ispassyanzheng = true;
              self.realName = res.data.data;

            } else {


              self.ispassyanzheng = false;
              self.isnotpassYanzheng = true;


            }

          }).catch(function (e) {
            console.log("錯誤：" + e);
          })
        } else {
          Toast({
            message: "手机号格式错误",
            duration: 2000,
            positon: "middle"
          })
        }
      },
      tijiaoxinxi: function (name) {
        var self = this;
        if (self.shoujifasongyanzengma != self.shoujiyanzhengma) {
          Toast({
            message: "验证码输入错误",
            duration: 2000,
            position: 'middle'
          })
        } else {


          this.loading = this.$loading({
            lock: true,
            text: '提交中',
            background: 'transparent'
          });
          this.$loading.fullscreenLoading = true;
          // var realName;
          // if( self.ispassyanzheng){
          //   realName
          // }
          this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/upDate", qs.stringify({
            IdCard: self.realName.card_id,
            realname: name,
            IdCardImg: self.IdCardImg,
            portrait: "",
            nickname: "",
            mobile: self.shoujihao,
            sex: "",
            birthday: "",
            IdCardImgSide: "",
            invite: self.inviteCode,
            code: self.shoujiyanzhengma
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              Toast({
                message: "提交成功",
                position: 'middle',
                duration: 3000
              });
              //判断邀请码不为空并且正确
              if (self.inviteCode !== "" && self.isRightStatus) {
                self.InvitedCode(self.inviteCode, 1);
              } else {
                self.$router.push({path: '/gerenzhongxin'});
              }

            } else {
              Toast({
                message: res.data.msg,
                position: 'middle',
                duration: 3000
              })
            }
          }).catch(function (e) {
            console.log("res:" + e);
          })
        }
      },
      checkPhone: function () {
        var phone = document.getElementById('phone').value;
        if (!(/^1[34578]\d{9}$/.test(phone))) {

          Toast({
            message: "手机号码有误，请重填",
            duration: 2000,
            position: 'middle'
          })
          return false;
        }
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

              self.postIDcardImg();
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);
                if (self.type == "header") {
                  self.headerImg = data;
                } else {
                  self.idcardImg = data;
                }
                self.postIDcardImg();
              }
            }
          }
        }
      },
      postIDcardImg() {

        //这里写接口
        var self = this;
        self.loading = self.$loading({
          lock: true,
          text: '上传中',
          background: 'transparent'
        });
        self.$loading.fullscreenLoading = true;


        if (self.type == "idcard") {
          self.$axios.post('http://tp.zlzjcyw.com/api/saomiao',
            qs.stringify({
              "base64": self.idcardImg,
            })
          ).then(function (res) {
            // console.log(JSON.stringify(res));
            self.$loading.fullscreenLoading = false;
            self.loading.close();

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
      InvitedCode: function (invited, status) {
        //获取邀请码
        if (this.inviteCode == "") {
          return;
        }
        var self = this;
        this.$axios.post("http://tongji.zlzjcyw.com/api/invite", qs.stringify({
          invite: invited,
          status: status,
          secret: md5(invited + status + "qrcode")
        })).then(function (res) {

          if (status == 0) {
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
          } else if (status == 1) {
            if (res.data.success) {
              self.$router.push({path: '/gerenzhongxin'})
            } else {
              self.disabled = false;
              Toast({
                message: "邀请码不能使用",
                duration: 2000,
                position: 'middle'
              });
            }
          }

        })
      },
      testPhone2: function () {
        if (this.shoujihao !== this.shoujihao2) {
          Toast({
            message: "两次手机号输入不一致",
            duration: 2000,
            position: 'middle'
          })
        } else if (this.shoujihao == "" || this.shoujihao2 == "") {
          Toast({
            message: "两次手机号输入不一致",
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.isshimingrenzheng = false;
          this.isshowpostIdCard = true;
          this.isnotpassYanzheng = true;
        }
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

          clearInterval(t);
          self.flag = true;
        });
      },
      shimingrenzheng: function (info, url) {

        if (info == ''||info==null) {
          this.$router.push(url);
        }
      }
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
    /*border: 1px solid seagreen;*/
    /*width: 1rem;*/
  }

  .commen-header p {
    line-height: 0.8rem;
  }

  .comen .commen-div {
    /*flex-grow: 4;*/
    justify-content: flex-end;
    /*border: 1px solid slateblue;*/
    display: flex;
    flex-direction: row;
    margin-right: 3%;
    flex: 1;
    width: 70%;
  }

  .commen-div p {
    color: #666666;
    font-size: 0.14rem;
    line-height: 0.5rem;
    margin-right: 0.13rem;

    /*border: 1px solid saddlebrown;*/
  }

  .commen-div .signaturep {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }

  .commen-header .commen-div p {
    line-height: 0.8rem;
  }

  .commen-div > img {
    /*width: 0.12rem;*/
    height: 0.147rem;
    margin-top: 0.1765rem;
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
</style>
