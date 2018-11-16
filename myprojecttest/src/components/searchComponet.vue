<template>
  <div class="haoyoutuijian">

    <div class="hytj-search">
      <div class="serch-div">
        <input type="text" v-model="seachwords" v-on:input="searchInput(seachwords)">
        <img src="../../static/img/search.png" alt="" @click="seachWords">
      </div>
    </div>
    <div class="haoyoudiv">
      <p class="hytj-text">与您志趣相投的朋友<span>((o(^_ ^)o))</span></p>
      <div @click="huanyipi">
        <img src="../../../static/img/refresh.png">
        <span>换一批</span>
      </div>

    </div>

    <ul class="hytj-ul">
      <li class="hytj-li" v-for="haoyouIten in haoyouList">
        <img :src=haoyouIten[2] alt="">
        <div class="hytj-info">
          <p class="hy-name">{{haoyouIten[1]}}</p>
          <p class="hy-sign">{{haoyouIten[3]}}</p>
        </div>
        <div class="hytj-ygz">+关注</div>
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
        haoyouList: []
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
      searchInput: function (searchInput) {

      },
      seachWords: function () {

      },
      haoyouTuijian: function () {
        var self = this;
        this.$axios.post(self.url + "/index.php?s=/weibo/index/push").then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            self.haoyouList = res.data.data;
          }

        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })
      },
      huanyipi: function () {
        this.haoyouTuijian();
      }

    }

  }
</script>
<style>
  @import "../../static/css/haoyoutuijian.css";
</style>
