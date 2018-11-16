<template>
  <div class="tabs">
    <!--命名路由-->
    <ul>
      <router-link :to="{name:item.name}" tag="li" exact v-for="(item,index) in linkArray"
                   @click.native="changeItem(item,index)">
        <div class="icon shouyeicon">
          <img :src="item.select?item.activeImgUrl:item.imgUrl">
          <div class="icon_text">{{item.title}}</div>
          <div class="tabs-dian" v-show="item.isdian"></div>
          <div class="tabs-baoming" v-show="index==3">投票入口</div>
          <!--大赛报名 投票入口-->
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import {isNewmessage} from "../static/js/timeFormat";

  export default {
    data() {
      return {
        linkArray: this.COMMEURL.linkArray,
        isnewmessage: this.COMMEURL.isNewMessage

      };
    },
    watch: {
      linkArray: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      isnewmessage: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      }
    },
    mounted() {
      this.isMessage();
    },
    methods: {

      changeItem: function (item, index) {
        console.log(index);
        item.select ? item.select = false : item.select = true;
        for (var i = 0, len = this.linkArray.length; i < len; i++) {
          if (index == i) {
            this.linkArray[i].select = true;
          } else {
            this.linkArray[i].select = false;
          }
        }
        if (index == 4) {
          if (this.COMMEURL.isNewMessage) {
            this.linkArray[4].isdian = false;
          }

        } else {
          if (this.COMMEURL.isNewMessage) {
            this.linkArray[4].isdian = true;
          } else {
            this.linkArray[4].isdian = false;
          }

        }
      },
      setTableSelect: function (name) {
        for (var i = 0, len = self.linkArray.length; i < len; i++) {
          if (this.linkArray[i].name == name) {
            this.linkArray[i].select = true;
          } else {
            this.linkArray[i].select = false;
          }

        }

      },
      isMessage: function () {
        var self = this;
        this.$axios.post(self.COMMEURL.commonUrl + "/index.php?s=/ucenter/newindex/index").then(function (res) {
          if (res.data.code == 200) {
            self.COMMEURL.UID = res.data.data.user.uid;
            self.COMMEURL.Nickname = res.data.data.user.nickname;
            if (res.data.is_mobile == "true") {
              self.COMMEURL.isMobile = true;
              self.COMMEURL.Mobile = res.data.mobile
            } else {
              self.COMMEURL.isMobile = false;
            }
            if (parseInt(res.data.data.user.is_message) == 0) {
              self.linkArray[4].isdian = false;
            } else {

              self.COMMEURL.isNewMessage = true;
              if (self.$route.path == "/gerenzhongxin") {
                self.linkArray[4].isdian = false;
              } else {
                self.linkArray[4].isdian = true;
              }

            }

          }
        });

      },
    },
    created() {
      var self = this;
      var path = this.$route.path;

      if (path == "/") {

      } else {

        for (var i = 0, len = self.linkArray.length; i < len; i++) {

          if (path.indexOf(self.linkArray[i].name) > -1) {

            self.linkArray[i].select = true;
          } else {
            self.linkArray[i].select = false;
          }

        }
      }


    },
    beforeRouteEnter(to, from, next) {
    },
    beforeRouteUpdate(to, from, next) {

      this.setTableSelect(to.name);
      this.isMessage();
      next();
    },
    beforeRouteLeave(to, from, next) {
      console.log("routerUpdataname:" + to.name)
      next();
    }

  };
</script>
<style>
  .tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    height: 0.49rem;
    z-index: 100;
    box-shadow: 0 -2px 25px rgba(229, 28, 35, 0.06);
    /*border: 1px solid seagreen;*/
  }

  .tabs > ul,
  .tabs > ul > li {
    margin: 0;
    padding: 0;
  }

  .tabs ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    list-style: none;
  }

  .tabs ul > li {
    width: 33.3%;
    text-align: center;
    /*font-size: 16px;*/
    /*display: table-cell;*/
    /*padding: 0px 12px;*/
    cursor: pointer;
    height: 0.49rem;
    color: #f08300;
    /*border: 1px solid slateblue;*/
    position: relative;

  }

  .tabs .icon {
    /*border: 1px solid seagreen;*/

    margin: 0.06rem;
    position: relative;

  }

  .tabs ul > li > .icon > img {
    width: 0.22rem;
    height: 0.22rem;
    /*margin-top: -10rem;*/
    display: block;
    margin: 0 auto;

    /*border: 1px solid slateblue;*/
  }

  .tabs ul > li:nth-child(2) > .icon > img {
    width: 0.21rem;
    height: 0.21rem;
    /*margin-top: -10rem;*/
    display: block;
    margin: 0 auto;

  }

  .tabs ul > li .icon_text {
    color: #333333;
    font-size: 0.12rem;
    /*padding-top: 0.02rem;*/
    /*border: 1px solid seagreen;*/
    /*line-height: 0.01rem;*/
  }

  .tabs ul > .router-link-active .icon_text {
    color: #E51C23;
    padding-bottom: -5px;
  }

  .tabs-dian {
    position: absolute;
    top: 0.01rem;
    right: 0.12rem;
    width: 10px;
    height: 10px;
    /*border: 1px solid slateblue;*/
    background-image: url("../static/img/circle.png");
    background-position: center;
    background-size: 100% auto;
  }

  .tabs-baoming {
    font-size: 0.1rem;
    background-color: #E51C23;
    /*padding: 0.1rem;*/
    position: absolute;
    top: -0.04rem;
    right: -0.27rem;
    color: white;
    font-weight: lighter;
    border-radius: 0.04rem;
    padding: 0.008rem 0.015rem;
    text-align: center;
    /*line-height: 0.15rem;*/
  }

</style>

