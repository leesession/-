<template>
  <div class="wode">
    <!--<div>41341231231</div>-->
    <div class="gerenzhongxin-info">
      <router-link
        :to="{name:'xiangxixinxi',query:{imgUrl: grzxInfo.user.portrait,nickname:grzxInfo.user.nickname,mobile:grzxInfo.user.mobile,birthday:grzxInfo.user.reg_time,ruxueshijian:ruxueshijian,lastlogintime:grzxInfo.user.last_login_time}}">
        <div class="top">
          <div class="top-left">
            <img :src=grzxInfo.user.portrait class="headerImg">
            <img src="../../static/img/V@2x.png" class="dav1" v-show="parseInt(grzxInfo.user.uid)==50">
            <img src="../../static/img/jinv.png" class="dav1" v-show="grzxInfo.user.user_type=='1'">
          </div>
          <div class="middle">
            <!---->
            <p class="m-name" ><span  v-html="grzxInfo.user.nickname"></span> <img src="../../static/img/huangv.png" v-show="grzxInfo.user.uid=='1'" class="grzxhuangv" >
              <span v-show="grzxInfo.user.uid=='6463'" class="yunying">官方认证</span>
              <span v-show="grzxInfo.user.uid=='6864'">官方认证</span>
              <span v-show="grzxInfo.user.uid=='26'">官方认证</span>
            </p>
            <p class="m-time " v-bind:class="{signaturetext:grzxInfo.user.signature==''}">
              <!--{{grzxInfo.user.signature==''?'留下你的签名吧!':grzxInfo.user.signature}}-->
              <span>{{ruxueshijian=='true'?grzxInfo.user.reg_time:grzxInfo.user.last_login_time}}入学</span>
              <span
              class="yxl">学籍号：</span><span>{{xuejihao}}</span>
            </p>
            <!--alert(gradation(grzxInfo.user.score1));-->
            <!--<p class="m-time"><span>学籍号：{{xuejihao}}</span></p>-->
            <!--<p class="m-time"><span>影响力：<span style="color: #000;font-size: .12rem">{{grzxInfo.user.score1}}</span></span></p>-->
            <p class="m-time"><span>学历：<span style="color: #000;font-size: .13rem">{{gradation(grzxInfo.user.score1)}}</span></span></p>
            <!--<p class="m-time"><span>学历：<span style="font-size: .14rem;color: #000000">{{gradation(grzxInfo.user.score1)}}</span></span></p>-->
            <!--<p class="m-time " v-if="yiwanchengshimingrenzheng"><span class="m-reset">请尽快实名注册，通行无阻秀芳华</span></p>-->
            <p class="sdsm"></p>
          </div>

          <img src="../../static/img/reset.png" id="reset">

        </div>
      </router-link>
      <div class="square">
        <div>
          <router-link :to="{name:'wodefabu'}">
            <p>文章<span>{{grzxInfo.user.article_count==null?0:grzxInfo.user.article_count}}</span></p>
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'haoyouliebiao',query:{type:'guanzhu'}}">
            <p>关注<span>{{grzxInfo.user.focus_count==null?0:grzxInfo.user.focus_count}}</span></p>
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'haoyouliebiao',query:{type:'haoyou'}}">
            <p>粉丝<span>{{grzxInfo.user.fans_count==null?0:grzxInfo.user.fans_count}}</span></p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="gerenzhongxin-zhanwei"></div>

    <div class="anniu">
      <router-link :to="{name:'wodeqianbao'}">
        <div>
          <img src="../../static/img/wode/qianbao.png" alt="">
          <p>我的钱包</p>
        </div>
      </router-link>
      <router-link :to="{name:'haoyoutuijian'}">
        <div>
          <img src="../../static/img/wode/tuijianhaoyou.png" alt="">
          <p style="color: #f5746f">秀友推荐</p>
        </div>
      </router-link>
      <router-link :to="{name:'haoyouliebiao'}">
        <div>
          <img src="../../static/img/wode/haoyou.png" alt="">
          <p>我的秀友</p>
        </div>
      </router-link>
      <router-link :to="{name:'wodefabu'}">
        <div>
          <img src="../../static/img/wode/fabu.png" alt="">
          <p>我的文章</p>
        </div>
      </router-link>
      <router-link :to="{name:'wodexiaoxi',query:{isRead:grzxInfo.user.is_message}}">
        <div>
          <img src="../../static/img/wode/xiaoxi.png" alt="">
          <p>系统消息<span class="grzxdian" v-show="grzxInfo.user.is_message!='0'"></span></p>
        </div>
      </router-link>
      <router-link :to="{name:'wodeshoucang'}">
        <div>
          <img src="../../static/img/wode/shoucang.png" alt="">
          <p>我的收藏</p>
        </div>
      </router-link>

    </div>
    <div class="gerenzhongxin-zhanwei"></div>
    <router-link :to="{name:'yijianfankui'}">
      <div class="yijianfankui">
        <img src="../../static/img/wode/yijian.png" alt="">
        <p style="color:#178fe5">有奖反馈</p>
      </div>
    </router-link>

    <div class="hongbao-dialog" v-show="isshowhongbao">
      <div class="hongbaoDialogImg" v-if="isdianjihongbao">
        <div class="dianhongbao" @click="dianhongbao"></div>
      </div>
      <div class="hongbaoDialogImg2" v-else>
        <div class="hongbaoedit">
          <p>{{grzxInfo.user.Authentication}}<span>元</span></p>
          <p>已存入钱包</p>

          <p @click="closehongbao">关闭</p>
        </div>

        <!--<div class="dianhongbao" @click="dianhongbao"></div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui';
  import {formatDate, tabbarChange,gradation} from '../../static/js/timeFormat'
  export default {
    name: "wode",
    data() {
      return {
        gradation,
        tabbarChange,
        url: this.COMMEURL.commonUrl,
        grzxInfo: "",
        loading: "",
        yiwanchengshimingrenzheng: false,//是否完成实名认证
        ruxueshijian: "",
        isshowhongbao: false,//是否显示红包
        isdianjihongbao: true,//是否显示点红包
        xuejihao:"",
      }
    },

    watch: {
      yiwanchengshimingrenzheng: {
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      }
    },
    created(){
      tabbarChange(this.COMMEURL.linkArray, this.$route.path);
    },
    mounted() {
      this.userInfo();
    },
    activated(){
      this.userInfo();
    },
    methods: {
      userInfo:function () {
        var self = this;
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/index").then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {

            self.yiwanchengshimingrenzheng = false;
            self.grzxInfo = res.data.data;
            console.log(self.grzxInfo);
            self.ruxueshijian = res.data.is_mobile;

            // sessionStorage.setItem("phone", res.data.data.user.mobile);
            self.xuejihao=self.grzxInfo.user.uid;
            if(res.data.data.user.is_message=='0'){
              self.COMMEURL.isNewMessage=false;
            }else{
              self.COMMEURL.isNewMessage=true;
            }
            if(self.grzxInfo.user.Authentication){
              self.isshowhongbao=true;
            }
            if (self.xuejihao.length < 6) {
              while (self.xuejihao.length < 6) {
                self.xuejihao= '0' + self.xuejihao;
              }
            }
            if (res.data.data.user.is_message == "0") {
              $(".dian").css("display", 'none');
            }
            if (res.data.is_mobile == null) {
              //没有实名认证
              self.yiwanchengshimingrenzheng = true;
            } else {
              if (res.data.data.user.redEnvelopes > 0) {
                self.isshowhongbao = true;
                self.isdianjihongbao = true;
              }
            }
            if (res.data.is_mobile == 'error') {
              //每天弹出弹窗，提醒实名认证
              self.yiwanchengshimingrenzheng = true;

              if (self.COMMEURL.count > 1) {
                self.grzxInfo = res.data.data;
                return false;
              }
              const h = self.$createElement;
              self.$msgbox({
                title: '提示',
                message: h('p', null, [
                  h('p', null, '恭喜您成为秀芳华的一员！为了确保您的账户正常使用，依据《网络安全法》相关要求，请进行实名认证，感谢您的理解及支持!'),
                  h('p', {style: 'margin-top: 10px'}, '您的个人账号及信息将受到秀芳华的严密保护，不会透露给个人及第三方机构。'),
                  h('p', {style: 'margin-top: 10px'}, '实名注册，共抢百元红包好运来。')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',

              }).then(action => {
                self.$router.push({path: '/xiangxixinxi'})
              }).catch(function (e) {
                self.grzxInfo = res.data.data;
              })

            }
          }
        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
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
      }
    }

  }
</script>
<style>
  @import "../../static/css/gerenzhongxin.css";
</style>
