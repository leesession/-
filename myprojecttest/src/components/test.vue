<template>
  <div class="test">
    <img src="wxLocalResource://541834666317863"  class="img">
  </div>
</template>
<script>
  import {wxConfig, share, shareUrl} from "../../static/js/timeFormat";
  export default {
    name: "test",
    data() {
      return {
       img:"",
        imgarray:[],

      }
    },
    watch:{
      imgarray: {
        handler(curVal, oldVal) {
        },
      },
    },
    mounted: function () {
      wxConfig(this, window.location.href.split('#')[0]);
    this.img=this.$route.query.base;
    alert(this.img);
    var self=this;

    },

    methods: {


    }

  }
</script>
<style>
  html, body {
    margin: 0;
  }

.img{
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
</style>
