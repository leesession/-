<template>
  <div class="fabushuoshuo">
    <div class="shuoshuo-div">
      <textarea name="" id="" cols="30" rows="10" placeholder="这一刻的想法..." class="shuoshuocontent" v-model="weiboContent"
                v-on:input="searchInput"></textarea>
      <p><img src="../../static/img/emoj.png" alt="" @click="isshowEmoj"><span>{{number}}</span>&nbsp;/&nbsp;700</p>
      <div v-show="toastcontentlen">输入内容过长，不能超过700个字</div>
    </div>
    <div class="fbwz-zhanwei"></div>
    <!--<div class="div-img">-->
      <!--<div class="emoj-fss" @click="isshowEmoj"></div>-->
      <!--<div class="div-input">-->
        <!--<input accept="image/*" type="file" id="fileInput" class="pictureImg" @change="changeUrl">-->
        <!--<div class="choosePict"></div>-->
      <!--</div>-->
      <!--<div class="wenzhangsend" @click="sendShuoshuo">发布</div>-->
    <!--</div>-->
    <div class="imgTotal">
      <div class="imgLi">
        <div class="imgLiImgItem" v-for="(imgItem,index) in photoList">
          <img :src="imgItem" class="postImg">
          <img src="../../static/img/close.png" class="deletePic" @click="deteletImgUrl(index)">
        </div>
        <div class="clickPhoto" v-show="isphoto" @click="chooseImg">
          <img src="../../static/img/photo.png" alt="">
          <p>上传照片</p>
        </div>
      </div>
      <div class="emojdiv" v-show="isShow">
        <img :src="emojImg.url" v-for="(emojImg,index) in emojArray" @click="choiceEmoj(emojImg.phrase,emojImg.url)">
      </div>
    </div>
    <!--<div class="emojdiv" v-show="isShow">-->
      <!--<img :src="emojImg.url" v-for="(emojImg,index) in emojArray" @click="choiceEmoj(emojImg.phrase,emojImg.url)">-->
    <!--</div>-->
    <div class="outerImg-ss" v-if="ImgArray.length>0">
      <div class="outer-img-ss" v-for="(imgItem,index) in ImgArray">
        <div class="inner-img-ss" :style="{backgroundImage:'url('+imgItem+')'}"></div>
        <span class="deleteImgUrl" @click="deteletImgUrl(index)">&times</span>
      </div>
    </div>
    <div class="wenzhangsend" @click="sendShuoshuo">发 布</div>
  </div>
</template>
<script>
// alert(1312)
  import { EmojArray} from "../../static/js/timeFormat";
  import {Loading} from 'element-ui';
  import {Toast} from 'mint-ui';
  import Exif from 'exif-js'
  import {wxConfig, share, shareUrl} from "../../static/js/timeFormat";

  export default {
    name: "fabushuoshuo",
    data() {
      return {
        title: "",
        url: this.COMMEURL.commonUrl,
        emojArray: EmojArray(),
        TagLength: 1,
        isShowAddTag: true,
        options: {
          text: "上传中"
        },
        loading: "",
        content: "",
        number: 0,
        diabled: true,
        isShow: false,
        imgUrl: "",
        picValue: "",
        shuoshuoImg: false,
        ImgArray: [],
        weiboContent: "",//发布说说内容
        searchinputContent: "",//输入的内容，计算字符长度,
        toastcontentlen: false,//提示用户输入过长
        str:'',
        token:"",//七牛上传凭证
        photoList: [],//图片回显
        isphoto: true,//是否显示相机图片
        i: 0,//上传图片循环
        count: '',  //只能选择图片的数量
        mid: [],    //wx 选择图片 或者拍照
      }
    },

    watch: {
      ImgArray: function (newValue, oldValue) {
        // console.log(newValue + "  " + oldValue);
        if (newValue.length > 3) {
          Toast({
            message: "最多上传2张图片",
            duration: 2000,
            position: 'middle'
          });
        }
      },
      number: function (newValue, oldValue) {
        if (newValue > 700) {
          this.toastcontentlen = true;
        } else {
          this.toastcontentlen = false;
        }
      },
      photoList(newValue,oldValue){
        if (newValue.length > 5) {
          this.isphoto = false;
        } else {
          this.isphoto = true;
        }
      }
    },
    mounted(){
      // this.getToken();
      wxConfig(this, window.location.href.split('#')[0]);
    },
    methods: {
      /**
       * 七牛云上传图片 获取上传token
       */
      chooseImg: function () {
        var self = this;
        this.i = 0;
        this.count = 6 - this.photoList.length;
        wx.chooseImage({
          count: self.count,
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            self.photoList = self.photoList.concat(res.localIds);
            self.syncUpload(res.localIds);
          }
        });
      },
      syncUpload: function (localIds) {
        var self = this;
        wx.uploadImage({
          localId: localIds[self.i],
          isShowProgressTips: 1,
          success: function (res) {
            self.i++;
            var serverId = res.serverId; // 返回图片的服务器端ID
            self.mid.push(serverId);
            if (self.i < localIds.length) {
              setTimeout(function () {
                self.syncUpload(localIds);
              }, 100)
            }
          },
          fail: function (res) {

          }
        });
      },
      getToken:function () {
        var self=this;
        this.$axios.post("http://xfhapi.xiufanghua.com/qiniu/token").then(function (res) {
          self.token=res.data.token;
          console.log(self.token);
        }).catch(function (e) {
          console.log(e);
        })
      },
      changeUrl(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue);
      },
      postImg() {
        //这里写接口
        var self = this;
        if (self.ImgArray.length > 1) {
          Toast({
            message: "最多上传2张图片",
            duration: 2000,
            position: 'middle'
          });
          this.$loading.fullscreenLoading = false;
          this.loading.close();
        } else {
          self.loading = self.$loading({
            lock: true,
            text: '上传中',
            background: 'transparent'
          });
          self.$loading.fullscreenLoading = true;
          var pic = this.imgUrl.replace("data:image/jpeg;base64,","");
          var url = "http://upload-z2.qiniu.com/putb64/-1"; //注意事项 1 修改上传域名  2 -1为Fsize：图片大小可以传入-1
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if(xhr.status==200){
                self.$loading.fullscreenLoading = false;
                  self.loading.close();
                console.log(JSON.parse(xhr.responseText).hash);
                console.log(xhr.responseText);
                self.ImgArray.push("http://p5kgkqzx0.bkt.clouddn.com/"+JSON.parse(xhr.responseText).hash);
              }else{
                self.$loading.fullscreenLoading = false;
                self.loading.close();
              }

            }
          }
          xhr.open("post", url, true);
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.setRequestHeader("Authorization", "UpToken "+self.token);
          xhr.send(pic);
          // self.$axios.post(self.url + '/index.php?s=/news/newindex/notifyImg',
          //   qs.stringify({
          //     "imgData": self.imgUrl,
          //   })
          // ).then(function (res) {
          //   self.$loading.fullscreenLoading = false;
          //   self.loading.close();
          //   if (res.data.code == 200) {
          //     self.ImgArray.push(res.data.data)
          //   }
          // }).catch(function (e) {
          //   console.log("错误" + e);
          //   self.loading.close();
          // })
        }

      },
      upload(e) {
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
              self.imgUrl = this.result;
              self.postImg();
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);
                self.imgUrl = data;
                self.postImg();
              }
            }
          }
        }
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
        let ndata = canvas.toDataURL('image/jpeg', 0.4);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      choiceEmoj: function (value, url) {

        this.weiboContent += value;
        this.number+=1;
      },
      sendShuoshuo: function () {
        //发布文章
        var self = this;
        this.str = this.weiboContent.replace(new RegExp("\n", "gm"), "<br>").replace(new RegExp(/\s/g),"&nbsp;&nbsp;");
        if ($.trim(this.weiboContent).length == 0) {
          //  说说栏目   && self.ImgArray.length == 0 //只判断内容
          Toast({
            message: '请输入简文内容',
            position: 'middle',
            duration: 2000
          });
          // return;
        } else {
          if(this.number>700){
            return;
          }
          self.loading = this.$loading({
            lock: true,
            text: '发布中',
            background: 'transparent'
          });
          self.$loading.fullscreenLoading = true;
          this.$axios.post(self.url + "/index.php?s=/weibo/index/something", qs.stringify(
            {
              'image': self.mid,
              'content': self.str,
            }
          )).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              Toast({
                message: '发布成功',
                position: 'middle',
                duration: 2000
              });
              self.title = "";
              self.weiboContent = "";
              self.imgUrl = "";
              self.$router.replace({path: '/guangchang',query:{origin:"fabushuoshuo"}});

            } else {
              Toast({
                message: res.data.msg,
                position: 'middle',
                duration: 2000
              });
            }
          });
        }
      },
      isshowEmoj: function () {
        this.isShow = !this.isShow
      },
      //删除上传图片
      deteletImgUrl: function (index) {
        // this.ImgArray.splice(index,1);
        this.photoList.splice(index, 1);
        this.mid.splice(index, 1);
      },
      searchInput: function () {
        //输入文字最大为420个字符

        this.searchinputContent = this.weiboContent;
        for (var m = 0, len = this.emojArray.length; m < len; m++) {

          if (this.searchinputContent.indexOf(this.emojArray[m].phrase) > -1) {
            // console.log(this.emojArray[m].url);
            this.searchinputContent = this.searchinputContent.replace(new RegExp('\\' + this.emojArray[m].phrase.split("]")[0] + '\\]',"g"), "哈");
          }
        }
        // console.log("das:"+this.searchinputContent );
        this.number = this.searchinputContent.length;

      },
    },

  }
</script>
<style>
  html, body {
    background-color: #f5f5f5;
  }

  .fabushuoshuo {
    background-color: #ffffff;
    width: 100%;
    min-height: 100%;
    /*height: 100%;*/
    position: absolute;
    top: 0;
    left: 0;
  }

  .wenzhangtitle {
    width: 94%;
    margin: 0.1rem auto;
    height: 0.5rem;
    line-height: 0.5rem;
    display: block;
    border: none;
    border-bottom: 1px solid #f5f5f5;
    outline: none;
  }

  .shuoshuo-div {
    width: 94%;
    /*border: 1px solid seagreen;*/
    position: relative;
    margin: 0 auto;
  }

  .shuoshuocontent {
    width: 100%;
    outline: none;
    /*border: none;*/
    font-size: 0.2rem;
    padding-top: 0.1rem;
    line-height: 0.25rem;
    position: relative;
    /*border: 1px solid slateblue;*/
    height: 2.5rem;
    max-height: 2.5rem;
    overflow-y: scroll;
    border: none;
  }

  .shuoshuocontent div {
    font-size: 0.2rem;
  }

  .shuoshuo-div > p {
    position: absolute;
    right: 0;
    bottom: .03rem;
    font-size: 0.16rem;
    color: #444444;
  }
  .shuoshuo-div > p > span{
    color: #dd191d;
  }
  .shuoshuo-div > p>img{
    width: .22rem;
    height: .22rem;
    margin-right: .2rem;
    vertical-align: bottom;
  }
  .shuoshuo-div > div {
    color: #dd191d;
    font-size: 0.15rem;
    position: absolute;
    left: 0;
    bottom: .03rem;
  }

  .shuoshuocontent:empty:before {
    content: attr(placeholder);
    /*color:#bbb;*/
    color: #666666;
  }

  .shuoshuocontent:focus:before {
    content: none;
  }

  .emoj-fss {
    /*width: 0.2rem;*/
    height: 0.27rem;
    margin-left: 3%;
    /*justify-content: flex-start;*/
    float: left;
    flex: 1;
    /*border: 1px solid seagreen;*/
    background-image: url("../../static/img/emoj.png");
    background-position: 0 0;
    background-size: 0.22rem 0.22rem;
    background-repeat: no-repeat;
  }

  .wenzhangcontent img {
    width: 60%;
    max-height: 2rem;
    display: block;
    margin: 0.1rem auto;
  }

  .div-img {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 94%;
    margin: 0.1rem auto;
    /*border: 1px solid seagreen;*/
    position: relative;
  }

  .div-img .div-input {
    width: 0.35rem;
    height: 0.27rem;
    margin-right: 0.15rem;
    background-image: url("../../static/img/Pictureimg.png");
    position: relative;
    background-size: auto 95%;
    background-position: center center;
    background-repeat: no-repeat;

  }

  .div-img .div-input input {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
    /*visibility: hidden;*/
  }

  .div-img .wenzhangEmoj {
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.15rem;
    /*border: 1px solid slateblue;*/
    margin-bottom: 0.15rem;
  }

  .wenzhangsend {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .5rem;
    background-color: #EA5038;
    color: white;
    font-size: 0.15rem;
    line-height: .5rem;
    text-align: center;
    z-index: 12;

  }

  .chooseTag {
    width: 100%;
    background-color: #ffffff;
  }

  .chooseTag p {
    margin-left: 3%;
    font-size: 0.15rem;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 1px solid #f5f5f5;
  }

  .chooseTags {
    width: 94%;
    margin: 0.1rem auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .chooseTags div {
    height: 0.2rem;
    line-height: 0.2rem;
    padding: 0 0.1rem;
    border: 1px solid #999999;
    margin-right: 0.1rem;
    border-radius: 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.12rem;
    color: #999999;
    margin-bottom: 0.1rem;
  }

  .chooseTag .infoTag {
    height: 0.2rem;
    line-height: 0.2rem;
    padding: 0 0.1rem;
    border: none;
    margin-right: 0.1rem;
    border-radius: 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.12rem;
    color: #ffffff;
    margin-bottom: 0.1rem;
    background-color: #E51C23;
  }

  .zhuanfaemoj {
    width: 100%;
    max-height: 200px;
    margin: 0 auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;

  }

  .fbwz-zhanwei {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #f5f5f5;
  }

  .el-message-box {
    display: inline-block;
    width: 70%;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .emojdiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /*border: 1px solid #f5f5f5 !important;*/
    height: 3rem;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    overflow-y: scroll;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    background-color: #f5f5f5;
    z-index: 11;
    padding-bottom: .1rem;
  }

  /*.emojImg {*/
  /*width: 0.40rem;*/
  /*height: 0.40rem;*/

  /*}*/

  .emojdiv img {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.03rem;
    margin-left: 0.15rem;
    margin-top: 0.1rem;
    /* margin-top: 0.1rem; */
  }

  .outerImg-ss {
    width: 94%;
    margin: 0 auto;
    /*border: 1px solid slateblue;*/
    display: flex;
    flex-direction: row;
    margin-bottom: 0.1rem;
  }

  .outer-img-ss {
    width: 33%;
    margin: 2% 0 0 1.5%;
    position: relative;
  }

  .outer-img-ss > div {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding-bottom: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /*background-image: url("../../static/img/fengjing.jpg");*/
  }

  .deleteImgUrl {
    border-radius: 50%;
    /*border: 1px solid #8D8D8D;*/
    font-size: 0.15rem;
    /*padding: 0.1rem;*/
    position: absolute;
    right: -0.02rem;
    top: -0.02rem;
    width: 0.16rem;
    height: 0.16rem;
    text-align: center;
    line-height: 0.16rem;
    background-color: #8D8D8D;
    color: white;
  }
  .imgTotal {
    padding-top: 0.1rem;
    position: relative;
  }

  .imgLi {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .imgLiImgItem {
    position: relative;
    width: 1.11rem;
    height: 1.11rem;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
  }

  .postImg {
    width: 1.1rem;
    height: 1.1rem;
  }

  .imgTotal > .infoImg {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .imgTotal > .infoImg > .out-img {
    margin-left: 0.1rem;
    width: 30%;
    border-radius: 0.04rem;
    margin-top: 0.1rem;
    position: relative;
  }

  .imgTotal > .infoImg > .out-img > .inner-img {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding-bottom: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../static/img/fengjing.jpg");
    border-radius: 0.04rem;
  }

  .deletePic {
    position: absolute;
    top: -0.03rem;
    right: -0.027rem;
    width: 0.16rem;
    height: 0.16rem;
    border: 1px solid #8D8D8D;
    z-index: 10;
    background-color: #ffffff;
    border-radius: 50%;
  }
  .clickPhoto {
    width: 1.11rem;
    height: 1.11rem;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    background-color: #f5f5f5;
    position: relative;
  }

  .clickPhoto > img {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    left: 0.3rem;
    top: 0.15rem;
  }

  .clickPhoto > p {
    font-size: 0.15rem;
    text-align: center;
    line-height: 1.1rem;
    padding-top: 0.25rem;
    color: #444444;
  }

</style>
