<template>
  <div class="shenfenrenzheng">




    <div class="sfrzcomen" >
      <div class="sjh">实名认证</div>
      <div class="sfyz-commendiv">
        <input type="number" placeholder="(可扫描身份证)"   disabled>
        <div class="saomiao">
          <input type="file" id="postIdCard1" accept="image/*"
                 @change="PostIDCard($event)">
          <img src="../../../static/img/saomiao.png" alt="">
          <p>扫描</p>
        </div>
      </div>
    </div>


    <div class="sfrzcomen" >
      <div class="sjh">真实姓名</div>
      <div class="sfyz-commendiv">
        <input type="text" placeholder="请输入您的真实姓名"  v-model="realname">

      </div>
    </div>
    <div class="sfrzcomen" >
      <div class="sjh">身份证号</div>
      <div class="sfyz-commendiv">
        <input type="number" placeholder="请输入您的身份证号"  v-model="idcard">

      </div>
    </div>
    <div class="sfrz-confirm" @click="tijiaoxinxi">提交</div>
    <div class="hongbao-dialog" v-show="isshowhongbao">
      <div class="hongbaoDialogImg" v-if="isdianjihongbao">
        <div class="dianhongbao" @click="dianhongbao"></div>
      </div>
      <div class="hongbaoDialogImg2" v-else>
        <div class="hongbaoedit">
          <p>{{hongbaoMoney}}<span>元</span></p>
          <p>已存入钱包</p>

          <p @click="closehongbao">关闭</p>
        </div>

      </div>
    </div>
    </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  // import {formatDate} from '../../../static/js/timeFormat'
  import md5 from 'js-md5'
  import Exif from 'exif-js'

  require('../../../static/css/cliper.css')
  export default {
    name: "shenfenrenzheng",
    data() {
      return {
        idcard: "",
        realname: "",
        url: this.COMMEURL.commonUrl,
        picValue: "",
        idcardImg:'',
        isshowhongbao:false,
        isdianjihongbao:true,
        hongbaoMoney:''

      }
    },
    watch: {
      realname: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      idcard: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },  hongbaoMoney: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
    },


    methods: {
      PostIDCard(e) {
        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;
          this.picValue = files[0];
          this.imgPreview(this.picValue);
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

                self.idcardImg = this.result;


              self.postIDcardImg();
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);

                  self.idcardImg = data;

                self.postIDcardImg();
              }
            }
          }
        }
      },
      postIDcardImg() {
        var self = this;
        self.loading = self.$loading({
          lock: true,
          text: '上传中',
          background: 'transparent'
        });
        self.$loading.fullscreenLoading = true;
        console.log("type:" + self.type);

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
              self.realname = res.data.data.name;
              self.idcard = res.data.data.card_id;
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
      tijiaoxinxi: function () {

        var self = this;
        var regsp = /^[\u4E00-\u9FA5]{2,10}$/;

        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if ($.trim(this.realname).length==0) {
          Toast({
            message: "请输入您的真实姓名",
            duration: 2000,
            position: 'middle'
          })
        } else if($.trim(this.idcard).length==0) {
          Toast({
            message: "请输入您的身份证号",
            duration: 2000,
            position: 'middle'
          })
        }else if(!reg.test(this.idcard)){
          Toast({
            message: "身份证号格式错误",
            duration: 2000,
            position: 'middle'
          })
        }else if(!regsp.test(this.realname)){
          Toast({
            message: "真实姓名格式错误",
            duration: 2000,
            position: 'middle'
          })
        }else{
          this.$confirm('一旦确绑不可修改，提现会核实实名信息，信息不匹配不与提现', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.postData();
          }).catch(() => {

          });

        }
      },
      postData:function () {
        var self=this;
        this.loading = this.$loading({
          lock: true,
          text: '提交中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/upDate", qs.stringify({
          idCard: self.idcard,
          realname: self.realname,
          IdCardImg: self.idcardImg,
          portrait: "",
          nickname: "",
          mobile:"",
          sex: "",
          birthday: "",
          IdCardImgSide: "",
          invite:"",
          code: ""
        })).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            Toast({
              message: "认证成功",
              position: 'middle',
              duration: 3000
            });
          if(res.data.data){
            if(parseFloat(res.data.data)>0){
              self.isshowhongbao=true;
              self.hongbaoMoney=res.data.data;
            }
          }else{
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
      },
      dianhongbao: function () {
        $(".dianhongbao").addClass("dianhongbaoactive");
        var self = this;
        setTimeout(function () {
          self.isdianjihongbao = false;
        }, 2000)
      },
      closehongbao: function () {
        this.isshowhongbao = false;//是否显示红包
        this.isdianjihongbao = false;//是否显示点红包
        this.$router.push({path: '/gerenzhongxin'});
      }


    },
  }
</script>
<style>
.shenfenrenzheng{
  margin-top: 0.1rem;
}
  html, body {
    background-color: #f5f5f5;
  }

  .sfrzcomen {
    width: 100%;
    /*border: 1px solid slateblue;*/
    border-bottom: 1px solid #f5f5f5;
    height: 0.5rem;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
  }

.sjh{
  color: #333333;
  font-size: 0.15rem;
  margin-left: 3%;
  line-height: 0.5rem;
}
.sfyz-commendiv{
  /*border: 1px solid seagreen;*/
  position: relative;
  flex: 1;
}

  .sfrzcomen .sfyz-commendiv {

    /*justify-content: flex-end;*/
    display: flex;
    flex-direction: row;
    margin-right: 3%;
    flex: 1;
    width: 70%;
    margin-left: 0.1rem;
  }
.sfrzcomen .sfyz-commendiv input{
  border: none;
  outline: none;
  font-size: 0.15rem;
}
.saomiao{
  display: flex;
  flex-direction: column;
  height: 0.5rem;
  width: 0.9rem;
  /*position: relative;*/
  margin-top: 0;
  position: absolute;
  top: 0;
  right: -0.3rem;
  /*border: 1px solid slateblue;*/
}
.saomiao>img{
  width: 0.2rem;
  /*height: 0.23rem;*/
  margin-left: 0.345rem;
  margin-top: 0.08rem;
}
  .saomiao>p{
    font-size: 0.13rem;
    /*border: 1px solid seagreen;*/
    line-height: 0.2rem;
    width: 0.9rem;
    text-align: center;
    color: #444444;
    margin-top: 0.02rem;
    margin-right: 0.1rem;
  }





  #postIdCard1 {
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.4rem;
    background-color: #ffffff;
    border: 1px solid #DD191D;
    color: #444444;
    border-radius: 0.04rem;
    position: absolute;
    width: 0.9rem;
    height: 0.5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;
    /*line-height: tex;*/
  }

.sfrz-confirm{
    font-size: 0.16rem;
    width: 2.6rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    color: #ffffff;
  border-radius: 0.08rem;
  background-color: #f5746f;
    /*border: 1px solid #DD191D;*/
    margin: 0.2rem auto;
  }
  input:disabled{
    border:none;
    background-color:#ffffff;
    /*color:#ACA899;*/
  }

.hongbao-dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}

.hongbao-dialog .hongbaoDialogImg {
  width: 3.28rem;
  height: 4.165rem;
  background-image: url("../../../static/img/hongbao.png");
  background-size: 100% 100%;
  background-position: 0;
  background-repeat: no-repeat;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.hongbao-dialog .dianhongbao {
    width: 1.27rem;
    height: 1.27rem;
    background-image: url("../../../static/img/dianhongbao.png");
    background-size: 100% 100%;
    background-position: 0;
    background-repeat: no-repeat;
    left:33%;
    top: 17%;
    position: absolute;

  }
.hongbao-dialog .dianhongbaoactive {

    animation: hongbaorourate 2s linear;
  }


@keyframes hongbaorourate {
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(180deg);
  }
  50% {
    transform: rotateY(360deg);
  }
  75% {
    transform: rotateY(540deg);
  }
  100% {
    transform: rotateY(720deg);
  }
}
.hongbao-dialog .hongbaoDialogImg2 {
  width: 3.28rem;
  height: 4.165rem;
  background-image: url(../../../static/img/hongbaokai.png);
  background-size: 100% 100%;
  background-position: 0;
  background-repeat: no-repeat;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.hongbao-dialog  .hongbaoedit {
  display: flex;
  flex-direction: column;

  top: 60%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -60%);
}
.hongbao-dialog  .hongbaoedit >p:nth-child(1) {
  color: #ffcc00;
  font-size: 0.37rem;
  padding-top: 0.15rem;
}
.hongbao-dialog  .hongbaoedit >p:nth-child(1) >span{
   font-size: 0.25rem;
 }

.hongbao-dialog  .hongbaoedit >p:nth-child(2){
    color:#ffcc00 ;
    font-size: 0.16rem;
    text-align: center;
    padding-top: 0.15rem;
  }
.hongbao-dialog  .hongbaoedit >p:nth-child(3){
    color:#ffcc00 ;
    font-size: 0.16rem;
    text-align: center;
    padding-top: 0.2rem;
    text-decoration: underline;
  }

.dian{
  width: .1rem;
  height: .1rem;
  border-radius: 50%;
  display: inline-block;
  background-color: #dd191d;
  /* padding: 0.01rem; */
  line-height: 0.05rem;
  text-align: center;
  position: absolute;
  top: 40%;
  margin-left: 0.04rem;
  transform: translateY(-50%);

}
</style>
