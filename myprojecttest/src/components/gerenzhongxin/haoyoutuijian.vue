<template>
  <div class="haoyoutuijian">

    <div class="hytj-search">
      <div class="serch-div">
        <input type="text" v-model="seachwords" >
        <img src="../../../static/img/search.png" alt="" @click="seachWords(seachwords)">
      </div>
    </div>
    <div class="haoyoudiv">
      <p class="hytj-text">与您志趣相投的朋友<span>((o(^_ ^)o))</span></p>
      <div @click="huanyipi">
        <img src="../../../static/img/refresh.png">
        <span>换一批</span>
      </div>

    </div>
  <p class="zanwu" v-if="haoyouList==null">暂无好友推荐</p>
    <ul class="hytj-ul" v-else>
      <li class="hytj-li" v-for="(haoyouIten,index) in haoyouList">
        <img v-lazy='haoyouIten[2]' alt="">
        <img src="../../../static/img/jinv.png" class="bytjdav" v-show="haoyouIten[4]=='1'">
        <div class="hytj-info">
          <p class="hy-name">{{haoyouIten[1]}}</p>
          <p class="hy-sign">{{haoyouIten[3]}}</p>
        </div>
        <div class="hytj-wgz" @click="hytjFollow(haoyouIten[0],index)" v-if="user_id!=haoyouIten[0]">+关注</div>
      </li>
    </ul>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "haoyoutuijian",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        seachwords: "",
        haoyouList: [],
        user_id:"",//用户id

      }
    },
    watch:{
      haoyouList:{
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)

        },
        deep: true
      },
      seachwords:{
        handler(curVal, oldVal) {
        if(curVal.length==0){
          this.haoyouTuijian();
        }

        },
      }
    },
    mounted() {
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
      this.haoyouTuijian();
    },

    methods: {
      searchInput: function () {
        console.log(this.seachwords.length);
        if(this.seachwords.length==0){
          console.log("searcjL:"+this.seachwords);
          console.log("监听input"+this.seachwords);
          this.haoyouTuijian();
          return;
        }
      },
      //搜索
      seachWords: function (seachwords) {
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        this.haoyouList=[];
        this.haoyouTuijian();
      },
      //好友推荐列表
      haoyouTuijian: function () {
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/weibo/index/push",qs.stringify({
          search:self.seachwords
        })).then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.haoyouList = res.data.data;
          self.user_id=res.data.uid;
          }

        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })
      },
      huanyipi: function () {
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: 'transparent'
        });
        this.haoyouList = [];
        this.$loading.fullscreenLoading = true;
        this.haoyouTuijian();
      },
      hytjFollow: function (id,index) {
        //关注
        var self=this;
       $('.hytj-li').eq(index).find(".hytj-wgz").addClass("hytj-ygz");
       $('.hytj-li').eq(index).find(".hytj-wgz").text('已关注');
        this.$axios.post(self.url + "/index.php/ucenter/newindex/follow", qs.stringify({
          uid: id
        })).then(function (res) {
          if (res.data.code == 200) {
            // Toast({
            //   message: "关注成功",
            //   duration: 2000,
            //   position: 'middle'
            // });
           // self.haoyouTuijian();

          }else{
            Toast({
              message: res.data.msg,
              duration: 2000,
              position: 'middle'
            });
          }
        })
      }

    }

  }
</script>
<style>
  @import "../../../static/css/haoyoutuijian.css";
</style>
