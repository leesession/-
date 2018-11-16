<template>
  <!--评论组件-->
  <div class="pinglun">
    <div class="pinglundiv">
      <div>取消</div>
      <div>评论</div>
      <div>发表</div>
    </div>
    <div class="pinglundivzhanwei"></div>
    <textarea name="" id="" cols="30" rows="6" id="pinglundiv_textarea"></textarea>
    <div class="emojpanel">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <div class="emojpaneldiv">
            <div>
              <img :src=i.url  v-for="(i,index) in emojArray" v-if="index<28">
            </div>

          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="emojpaneldiv">
            <div>
              <img :src=i.url  v-for="(i,index) in emojArray" v-if="28<index<56">
            </div>

          </div>

        </mt-swipe-item>
        <mt-swipe-item>
          <div>13</div>

        </mt-swipe-item>
        <mt-swipe-item>
          <div>15</div>
        </mt-swipe-item>


      </mt-swipe>
    </div>
    <div class="emojdiv">
      <img src="../../static/img/emoj.png" alt="">
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "pinglun",
    data() {
      return {
        emojArray:this.COMMEURL.emojArray
      }
    },
    mounted() {
      alert(213)
      console.log("dasda:"+this.COMMEURL.emojArray.length);
    },

    methods: {}
  }
</script>
<style>
  .pinglun {
    width: 100%;
    overflow-x: hidden;
  }

  .pinglundiv {
    width: 94%;
    display: flex;
    flex-direction: row;
    /*border: 1px solid seagreen;*/
    margin: 0 auto;
    height: 0.45rem;
  }

  .pinglundiv > div {
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.45rem;

  }

  .pinglundiv > div:nth-child(2) {
    flex: 1;
  }

  .pinglundiv > div:nth-child(3) {
    line-height: 0.28rem;
    height: 0.28rem;
    background-color: #dd191d;
    color: white;
    padding: 0 0.1rem;
    border-radius: 0.04rem;
    margin-top: 0.09rem;
  }

  .pinglundivzhanwei {
    width: 100%;
    height: 0.05rem;
    background-color: #f5f5f5;
    margin-top: 0.05rem;
  }

  #pinglundiv_textarea {
    width: 94%;
    margin: 0.1rem auto;
    display: block;
    outline: none;
    font-size: 0.16rem;
    color: #444444;
    line-height: 0.25rem;
    overflow-y: scroll;
  }

  .emojdiv {
    width: 100%;
    height: 0.4rem;
    background-color: #f5f5f5;
    margin-top: 0.1rem;
  }

  .emojdiv img {
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 3%;
    margin-top: 0.05rem;
  }

  .emojpanel {
    border: 1px solid slateblue;
    height: 1.5rem;

    width: 94%;
    margin: 0 auto;
  }
  .emojpaneldiv{
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
    border: 1px solid seagreen;
    flex-wrap: wrap;
  }
  .emojpaneldiv div{
    width: 100%;
    /*margin: 0.1rem 0 0.1rem auto;*/
    border: 1px solid slateblue;
  }
  .emojpaneldiv img{
    width: 0.2rem;
    height: 0.2rem;
    margin-left: 0.25rem;
    margin-top: 0.1rem;
    /*margin-top: 0.1rem;*/
  }
</style>
