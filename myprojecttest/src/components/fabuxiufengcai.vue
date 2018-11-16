<template>
  <div class="fabuxiufengcai">


    <div class="imgTotal">
      <!--<div class="infoImg">-->
      <!--<div class="out-img" v-for="(imgItem,index) in photoList">-->
      <!--<div class="inner-img" v-bind:style="{backgroundImage:'url('+imgItem+')'}"></div>-->
      <!--<img src="../../static/img/close.png" class="deletePic" @click="deletePic(index)">-->
      <!--</div>-->


      <!--</div>-->
      <div class="imgLi">
        <div class="imgLiImgItem" v-for="(imgItem,index) in photoList">
          <img :src="imgItem" class="postImg">
          <img src="../../static/img/close.png" class="deletePic" @click="deletePic(index)">
        </div>

        <!--<div class="imgLiImgItem" >-->
        <!--<img src="../../static/img/timg.jpg" class="postImg" >-->
        <!--</div>-->
        <div class="clickPhoto" v-show="isphoto" @click="chooseImg">
          <img src="../../static/img/photo.png" alt="">
          <p>上传照片</p>
        </div>
      </div>

    </div>
    <div class="textarea-div">
      <textarea placeholder="描述一下你的美图吧(6个字刚刚好)" class="textarea" v-model="dongtai" id="fbxfc"
                v-on:input="searchInput"> </textarea>
      <p class="number"><span>{{number}}</span>/10</p>

    </div>
    <div v-show="toastcontentlen" class="toastcontentlen">输入内容过长，不能超过10个字(包括符号)</div>
    <div class="dongtai " @click="realseseeXFC" id="fbxfcdongtai"> 发布</div>

    <div class="test"></div>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {wxConfig, share, shareUrl} from "../../static/js/timeFormat";

  export default {
    name: "fabuxiufengcai",
    data() {
      return {

        url: this.COMMEURL.commonUrl,
        dongtai: "",
        //记录选择图片的总长度
        imgLen: 0,
        imgIndex: '',
//只能选择图片的数量
        count: '',
//wx 选择图片 或者拍照
        mid: [],
        searchinputContent: '',
        photoList: [],//图片回显
        isphoto: true,//是否显示相机图片
        number: 0,//字数统计
        toastcontentlen: false,
        arr: [],
        // clickIndex:0,//计算点击上传照片的次数
        i: 0,//上传图片循环
      }
    },
    watch: {
      photoList: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {

          if (curVal.length > 8) {
            this.isphoto = false;
          } else {
            this.isphoto = true;
          }
        },
        deep: true
      }, downloadImag: {
        handler(curVal, oldVal) {

          if (curVal.length > 8) {
            this.isphoto = false;
          } else {
            this.isphoto = true;
          }
        },
        deep: true
      },

      number: function (newValue, oldValue) {
        if (newValue > 10) {
          this.toastcontentlen = true;
        } else {
          this.toastcontentlen = false;
        }
        // newValue=this.weiboContent.length;
      }
    },
    mounted() {

      wxConfig(this, window.location.href.split('#')[0]);
      share("秀芳华-记录您的精彩", this.url + '/Public/upload/mr/logo.png', shareUrl(this, location.href), "分享你生活的每一个精彩瞬间，让我们为你点赞");
    },
    methods: {

      chooseImg: function () {
        var self = this;
        this.i = 0;
        this.count = 9 - this.photoList.length;
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
            // if(self.i < localIds.length){
            //   self.syncUpload(localIds);
            // }
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
      /**
       * 删除图片
       * @param index 图片角标
       */
      deletePic: function (index) {
        this.photoList.splice(index, 1);
        this.mid.splice(index, 1);
      },
      realseseeXFC: function () {
        if (this.number > 10) {
          return;
        } else if (this.mid.length == 0) {
          Toast({
            message: "请选择图片",
            duration: 2000,
            position: 'middle'
          })
        } else {
          this.loading = this.$loading({
            lock: true,
            text: '发布中',
            background: 'transparent'
          });
          this.$loading.fullscreenLoading = true;
          var self = this;
          this.$axios.post(self.url + "/index.php/home/index/addStyle", qs.stringify({
            brief_introduction: self.dongtai,
            media_id: self.mid
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              self.$router.replace({path: '/', query: {origin: "xiufengcai"}});
            }
          }).catch(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();

          })
        }
      },
      searchInput: function () {
        //输入文字最大为420个字符

        this.searchinputContent = this.dongtai;
        this.number = this.searchinputContent.length;

      },

    }


  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  html, body {
    width: 100%;
    background-color: #ffffff;
    overflow-x: hidden;
  }

  #fbxfc {
    height: 1rem;
    width: 94%;
    resize: none;
    margin-left: 3%;
    font-size: 0.2rem;
    line-height: 0.25rem;
    outline: none;
    background-color: #fff;
    margin-top: 0.1rem;
    color: #333333;
    border: none;
  }

  .clickPhoto {
    /*border: 1px solid silver;*/
    width: 1.1rem;
    height: 1.1rem;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    background-color: #f5f5f5;
    position: relative;
    /*background-position: ;*/
    /*background-size: 50% auto;*/

    /*background-repeat: no-repeat;*/
    /*background-image: url(../../static/img/photo.png);*/
  }

  .clickPhoto > img {
    width: 0.5rem;
    height: 0.5rem;
    /*border: 1px solid seagreen;*/
    position: absolute;
    left: 0.3rem;
    top: 0.15rem;
    /*margin-left: 0.3rem;*/
    /*margin-top: 0.3rem;*/

  }

  .clickPhoto > p {
    font-size: 0.15rem;
    text-align: center;
    line-height: 1.1rem;
    padding-top: 0.25rem;
    color: #444444;
  }

  .textarea-div {
    /*border: 1px solid seagreen;*/
    position: relative;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin-top: 0.2rem;
    background-color: #ffffff;
  }

  #fbxfcdongtai {
    width: 85%;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    background-color: #f5746f;
    margin: 0.3rem auto;
    color: white;
    border-radius: 0.08rem;
    font-size: 0.18rem;
  }

  .imgTotal {
    margin-top: 0.1rem;
  }

  .imgLi {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .imgLiImgItem {
    position: relative;
    /*border: 1px solid seagreen;*/
    width: 1.1rem;
    height: 1.1rem;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    /*border: 1px solid slateblue;*/
  }

  .postImg {
    width: 1.1rem;
    height: 1.1rem;
    /*margin-left: 0.1rem;*/
    /*margin-top: 0.1rem;*/
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

  .number {
    font-size: 0.15rem;
    float: right;
    margin-right: 0.15rem;
    position: absolute;
    bottom: 0.1rem;
    right: 0;
  }

  .toastcontentlen {
    font-size: 0.14rem;
    color: #DD191D;
    margin-left: 0.1rem;
    padding: 0rem 0 0.1rem 0;
  }

  .test {
    width: 94%;
    height: auto;
    font-size: 0.15rem;
    margin-left: 3%;
    word-wrap: break-word;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #BFBFBF;
    font-size: 16px;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #BFBFBF;
    font-size: 16px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #BFBFBF;
    font-size: 16px;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #BFBFBF;
    font-size: 16px;
  }
</style>
