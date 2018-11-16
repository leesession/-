<template>
  <div class="fabuwenzhang">
    <input type="text" placeholder="请输入文章标题" v-model="title" class="wenzhangtitle">
    <!--<div class="wenzhangcontent" contenteditable="true" placeholder="请输入文章内容,字数多于300"></div>-->
    <div id="editorElem" style="text-align:left;width: 100%; -webkit-overflow-scrolling: touch;"></div>

    <div class="fbwz-zhanwei"></div>

    <div class="div-img">
      <div class="alreadyTag">
        <div v-for="(item,index) in tagArray" @click="deleteTag(index)">{{item}}</div>
        <!--<div>养生</div>-->
        <!--<div>养生</div>-->
      </div>
      <div class="wenzhangsend" @click="send">发布</div>

    </div>
    <div class="line"></div>
    <div class="chooseTag">
      <!--<p>添加标签</p>-->
      <div class="chooseTags">
        <div @click="choosedefault('养老',0)" class="fbwzTag">养老</div>
        <div @click="choosedefault('养生',1)" class="fbwzTag">养生</div>
        <div @click="choosedefault('健康',2)" class="fbwzTag">健康</div>
        <div @click="addTag(3)" class="fbwzTag" v-show="isShowAddTag">+ 添加标签</div>

      </div>
    </div>

  </div>
</template>
<script>


  import {Loading} from 'element-ui';
  import {Toast , MessageBox} from 'mint-ui';
  import Exif from 'exif-js'
  import E from 'wangeditor'
  import {tagChange} from '../../static/js/timeFormat'
  export default {
    name: "fabuwenzhang",
    data() {
      return {

        title: "",
        url: this.COMMEURL.commonUrl,
        TagLength: 1,
        isShowAddTag: true,
        imgurl: "",
        options: {
          text: "上传中"
        },
        loading: "",
        picValue: "",
        tagArray: [],
        editorContent: '',//具体内容,
        imgUrlBoolean: false,
        articaleId: "",//文章id
        editor: ""//编辑器
      }
    },
    watch: {
      tagArray: {
        handler(curVal, oldVal) {
          if (curVal.length > 2) {
            this.isShowAddTag = false;
          } else {
            this.isShowAddTag = true;
          }
        },
        deep: true

      }
    },
    mounted() {
      this.getToken();
      this.articaleId = this.$route.query.id;
      //来源于编辑老文章
      if (this.articaleId != undefined && this.articaleId != null && this.articaleId != "") {
        this.articleInfo();
      }else {
        this.$nextTick(()=>{
          //进入看草稿箱有没有
          _this.haveArticle();
        })
      }
      $('.w-e-up-img-container input').attr("accept", "image/* !important");
      $(".el-message-box__wrapper").css("z-index", "10000000000 !important");
      $(".w-e-text-container").css("z-index", "199 !important")
      $(".w-e-text-container").css("border", "none !important");
      $(".w-e-menu").css('z-index', '200 !important');
      let _this = this;
      _this.editor = new E('#editorElem');

      _this.editor.customConfig.onchange = (html) => {
        this.editorContent = html;
      };
      _this.editor.customConfig.menus = [
        'head',//
        'bold',//
        // 'italic',//
        'underline',//
        'list',  // 列表
        'justify',  // 对齐方式
        'image',  // 插入图片
        // 'table',  // 表格
        'undo',  // 撤销
      ]
      // 隐藏“网络图片”tab
      _this.editor.customConfig.showLinkImg = false
      _this.editor.customConfig.uploadImgShowBase64 = true;
      _this.editor.customConfig.uploadImgMaxSize = 300 * 1024 * 1024
      _this.editor.customConfig.customUploadImg = function (files, insert) {
        // console.log(files);
        // _this.insert=insert;
        // console.log( insert);
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
        _this.upload(files);
        var t = setInterval(function () {
          // console.log("dasda:"+_this.imgurl)
          if (_this.imgUrlBoolean) {
            // console.log("url:" + _this.imgurl)
            insert(_this.imgurl)
            clearInterval(t);
            _this.imgUrlBoolean = false;
            // console.log("dasdsa:" + _this.imgurl);
          }
        }, 100)
        // 上传代码返回结果之后，将图片插入到编辑器中
      };
      _this.editor.create();


    },

    methods: {
      //进入看草稿箱有没有
      haveArticle(){
        let self=this;
        this.$axios.post(self.url +"/index.php?s=/news/newindex/check_draft").then(function (res) {
          if (res.data.code == 200) {
            self.title = res.data.data.title;
            self.editor.txt.html(res.data.data.content);
            self.tagArray=tagChange(res.data.data.label);
            self.editorContent=res.data.data.content;
          }
        }).catch(function (e) {});
      },
      //从我的发布过来，进行文章编辑，获取文章详情
      articleInfo: function () {
        var self = this;
        // console.log("content:"+self.editorContent);
        this.$axios.post(self.url + "/index.php?s=/news/newindex/saveNew", qs.stringify({
          id: self.articaleId,
          'title': self.title,
          'content':self.editorContent ,
          'label1': self.tagArray[0],
          'label2': self.tagArray[1],
          'label3': self.tagArray[2],

        })).then(function (res) {
          // console.log("res:" + res);
          if (res.data.code == 200) {
            self.title = res.data.data.title;
            self.editor.txt.html(res.data.data.content);
            self.tagArray=tagChange(res.data.data.label);
            self.editorContent=res.data.data.content;
          }else if(res.data.code==201){
            Toast({
              message:'修改成功',
              duration:2000,
              position:'middle'
            })
            self.$router.replace({path: '/wodefabu'});
          }else{
            Toast({
              message:res.data.msg,
              duration:2000,
              position:"middle"
            })
          }
        }).catch(function (e) {

        });
      },
      /**
       * 七牛云上传图片 获取上传token
       */
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
      //上传图片
      postImg() {
        var self = this;
        self.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        self.$loading.fullscreenLoading = true;
        var pic = this.imgurl.replace("data:image/jpeg;base64,","");
        var url = "http://upload-z2.qiniu.com/putb64/-1"; //注意事项 1 修改上传域名  2 -1为Fsize：图片大小可以传入-1
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if(xhr.status==200){

              self.$loading.fullscreenLoading = false;
              self.loading.close();
              // console.log(JSON.parse(xhr.responseText).hash);
              // console.log(xhr.responseText);
              self.imgurl = "http://p5kgkqzx0.bkt.clouddn.com/"+JSON.parse(xhr.responseText).hash;
              self.imgUrlBoolean = true;
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
      },
      upload(files) {
        // let files = e.target.files || e.dataTransfer.files;
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
              self.imgurl = this.result;
              self.postImg();
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);
                self.imgurl = data;
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
      //添加可输入标签
      addTag: function (index) {
        //添加标签
        var self = this;
        this.$prompt('请输入标签名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '最多只能输入四个字符',

        }).then(({value}) => {
          var len = value.replace(/[^\u0000-\u00ff]/g, "aaa").length;
          if (len > 12 || len == 0) {
            $(".el-message-box__errormsg").text("输入错误");
            $(".el-message-box__errormsg").css("visibility", "visible");
            $(".el-input__inner").addClass("invalid");
            // if(len>0){
            Toast({
              message: '输入错误，请重新输入',
              position: 'middle',
              duration: 3000
            });
            // }

          } else {
            $(".el-message-box__errormsg").css("display", "none");
            $(".el-input__inner").removeClass("invalid")
            if (self.isReaptTag(value)) {

              self.tagArray.push(value);

            }

          }
        }).catch(() => {
          // Toast({
          //   message: '输入错误，请重新输入',
          //   position: 'middle',
          //   duration: 3000
          // });
        });
      },
      //选择默认标签
      choosedefault: function (text, index) {

        if (this.tagArray.length > 2) {
          Toast({
            message: "最多选择三个标签",
            duration: 2000,
            position: 'middle'
          })
        } else {
          if (this.isReaptTag(text)) {
            this.tagArray.push(text);
            // console.log("len:" + this.TagLength);
          }

        }

      },
      deleteTag: function (index) {

        this.tagArray.splice(index, 1);
      },
      //发送文章
      sendArtical: function () {
        //发布文章
        var self = this;
        var data = []
        if (this.tagArray.length == 0) {
          Toast({
            message: '请添加标签',
            position: 'middle',
            duration: 3000
          });
          return;
        }
        if (this.title.replace(/&nbsp;/ig, "") == "" || this.title.length > 20) {
          Toast({
            message: '请输入标题(20字符以内)',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        var content = $(".wenzhangcontent").html();
        if (this.editorContent.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "").length <300 || this.editorContent.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "").length >10000) {
          Toast({
            message: '文章字数在300-10000字以内',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        self.loading = this.$loading({
          lock: true,
          text: '发布中',
          background: 'transparent'
        });
        self.$loading.fullscreenLoading = true;
        this.$axios.post(self.url + "/index.php?s=/news/newindex/articleComment", qs.stringify(
          {
            'title': self.title,
            'content': self.editorContent,
            'label1': self.tagArray[0],
            'label2': self.tagArray[1],
            'label3': self.tagArray[2],
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
            $(".wenzhangcontent").html("");
            $(".chooseTags .infoTag").remove();
            self.isShowAddTag = true;
            self.$router.replace({path: '/shouye',query:{origin:'fabuwenzhang'}});
          } else {
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 2000
            })
          }
        })
      },
      //判断标签是否重复添加
      isReaptTag: function (text) {
        for (var i = 0, len = this.tagArray.length; i < len; i++) {
          if (this.tagArray[i] == text) {
            Toast({
              message: "标签已添加",
              duration: 2000,
              position: 'middle'
            });
            return false;
          }
        }
        return true;
      },
      send: function () {
        if (this.articaleId == undefined || this.articaleId == null || this.articaleId == "") {
          this.sendArtical();
        } else {
          // console.log("content:"+this.editorContent)
          this.articleInfo();
        }
      }
    },

    beforeRouteLeave( to , from , next){
      let self=this;

      if(this.articaleId === undefined){

        if(this.editorContent.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "").length>0 || this.tagArray.length>0 || this.title.length>0){
          // console.log(this.editorContent,this.tagArray,this.title)
          MessageBox.confirm('是否保存本次编辑的文章?').then(action => {
            this.$axios.post("http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/draft_save",qs.stringify({
              title:self.title,
              content:self.editorContent,
              label1: self.tagArray[0],
              label2: self.tagArray[1],
              label3: self.tagArray[2],
            })).then(function (res) {
              next()
            }).catch(function (e) {});
          }).catch(cancel=>{
            next()
          })
        }else {
          next()
        }
      }else {
        next()
      }
    }

  }
</script>
<style>
  html, body {
    background-color: #f5f5f5;
  }
  .w-e-toolbar{
    display: flex;
    justify-content: space-between;
  }

  .fabuwenzhang {
    background-color: #ffffff;
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
    font-size:0.16rem;
  }

  .wenzhangcontent {
    width: 94%;
    min-height: 2.5rem;
    margin: 0 auto;
    outline: none;
    border: none;
    font-size: 0.14rem;
  }

  .wenzhangcontent:empty:before {
    content: attr(placeholder);
    color: #666666;
  }

  .wenzhangcontent:focus:before {
    content: none;
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
    position: relative;
  }

  .div-img .alreadyTag {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .div-img .alreadyTag > div {
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
    background-color: #f5746f;
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
    right: 35px !important;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
  }

  .div-img .wenzhangEmoj {
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.15rem;
    margin-bottom: 0.15rem;
  }

  .wenzhangsend {
    background-color: #f5746f;
    color: white;
    font-size: 0.14rem;
    height: 0.3rem;
    width: 0.5rem;
    line-height: 0.3rem;
    text-align: center;
    border-radius: 0.06rem;

  }

  .chooseTag {
    width: 100%;
    background-color: #ffffff;
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

  .el-message-box__wrapper {
    z-index: 20000000000000000000000000000 !important;
  }

  .w-e-text-container {
    border: none !important;
    z-index: 199 !important;
  }

  .el-message-box {
    display: inline-block;
    width: 85% !important;
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

  .w-e-toolbar .w-e-menu {
    width: 11% !important;
    font-size: 0.12rem;
  }

</style>
