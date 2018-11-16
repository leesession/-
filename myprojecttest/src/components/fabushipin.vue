<template>
  <div class="fabushuoshuo">
    <div class="shuoshuo-div">
      <textarea name="" id="" cols="30" rows="10" placeholder="这一刻的想法..." class="shuoshuocontent" v-model="weiboContent"
                v-on:input="searchInput"></textarea>
      <p><span>{{number}}</span>&nbsp;/&nbsp;140</p>
      <div v-show="toastcontentlen">输入内容过长，不能超过140个字</div>
    </div>
    <div class="fbwz-zhanwei"></div>
    <div class="div-img">
      <div class="emoj-fss" @click="isshowEmoj"></div>
      <div class="div-input" @click="chooseFile">
        <!--<input accept="image/*" type="file" id="fileInput" class="pictureImg" @change="changeUrl">-->
        <!--<div class="choosePict">选择视频</div>-->
      </div>
      <div class="wenzhangsend" @click="sendShuoshuo">发布</div>
    </div>
    <div class="emojdiv" v-show="isShow">
      <!--<div class="emojImg" >-->
      <img :src="emojImg.url" v-for="(emojImg,index) in emojArray" @click="choiceEmoj(emojImg.phrase,emojImg.url)">
      <!--</div>-->
    </div>

    <div class="outerImg-ss" v-if="ImgArray.length>0">
      <div class="outer-img-ss" v-for="(imgItem,index) in ImgArray">
        <div class="inner-img-ss" :style="{backgroundImage:'url('+imgItem+')'}"></div>
        <span class="deleteImgUrl" @click="deteletImgUrl(index)">&times</span>
      </div>
    </div>

  </div>
</template>
<script>

  import { EmojArray} from "../../static/js/timeFormat";
  import {Loading} from 'element-ui';
  import {Toast} from 'mint-ui';
  import Exif from 'exif-js'
  // require('../../node_modules/qiniu-js/dist/qiniu.js');
  // require('../../node_modules/qiniu-js/dist/plupload.full.min');
  // import qiniu from 'qiniu-js/dist/qiniu.js'
  // var qiniu = require('qiniu-js')
  export default {
    name: "fabushipin",
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
        if (newValue > 140) {
          this.toastcontentlen = true;
        } else {
          this.toastcontentlen = false;
        }
      }
    },
    mounted(){

    },
    methods: {
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
          self.$axios.post(self.url + '/index.php?s=/news/newindex/notifyImg',
            qs.stringify({
              "imgData": self.imgUrl,
            })
          ).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              self.ImgArray.push(res.data.data)
            }
          }).catch(function (e) {
            console.log("错误" + e);
            self.loading.close();
          })
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
        if ($.trim(this.weiboContent).length == 0 && self.ImgArray.length == 0) {

          Toast({
            message: '请输入简文内容',
            position: 'middle',
            duration: 2000
          });
          // return;
        } else {
          if(this.number>140){
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
              'image': self.ImgArray,
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
        this.ImgArray.splice(index,1);
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
      upLoadQiniu() { // 加载七牛
        let qiniuSetInter = setInterval(() => {
            if (this.uptokenObj.upToken) {
              this.initQiniu();
              // 清除定时器
              clearInterval(qiniuSetInter);
            }
          }, 1000);
          },
      chooseFile:function () {
this.initQiniu();
      },
        initQiniu() { // 初始化七牛
          let self = this;
          var uploader = qiniu.uploader({
            runtimes: 'html5,flash,html4',    //上传模式,依次退化
            browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
            uptoken_url: '/token',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
            // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
            // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
            domain: 'http://p5kgkqzx0.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
            container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '100mb',           //最大文件体积限制
            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3,                   //上传失败最大重试次数
            dragdrop: true,                   //开启可拖曳上传
            drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                //分块上传时，每片的体积
            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            init: {
              'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                  // 文件添加进队列后,处理相关的事情
                });
              },
              'BeforeUpload': function(up, file) {
                // 每个文件上传前,处理相关的事情
              },
              'UploadProgress': function(up, file) {
                // 每个文件上传时,处理相关的事情
              },
              'FileUploaded': function(up, file, info) {
                alert(info)
                // 每个文件上传成功后,处理相关的事情
                // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                // {
                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                //    "key": "gogopher.jpg"
                //  }
                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                // var domain = up.getOption('domain');
                // var res = parseJSON(info.response);
                // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
              },
              'Error': function(up, err, errTip) {
                //上传出错时,处理相关的事情
              },
              'UploadComplete': function() {
                //队列文件处理完毕后,处理相关的事情
              },
              'Key': function(up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效

                var key = "";
                // do something with key here
                return key
              }
            }
          });

        }

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
    bottom: 0;
    font-size: 0.16rem;
    color: #444444;
  }
  .shuoshuo-div > p > span{
    color: #dd191d;
  }

  .shuoshuo-div > div {
    color: #dd191d;
    font-size: 0.15rem;
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
    background-color: #f5746f;
    color: white;
    font-size: 0.14rem;
    /*border: 1px solid slateblue;*/
    height: 0.3rem;
    width: 0.5rem;
    line-height: 0.3rem;
    text-align: center;
    /*padding: 0.1rem;*/
    border-radius: 0.06rem;

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
    border: 1px solid #f5f5f5 !important;
    height: 2rem;

    display: flex;

    flex-direction: row;
    width: 98%;
    margin: 0 auto;
    overflow-y: scroll;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
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
</style>
