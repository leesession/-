<!--<template>-->
  <!--<div class="jyjl">-->
    <!--<div class="jyjl-timer">2018年1月</div>-->
    <!--<ul class="jyjl-ul">-->
      <!--<li v-for="item in list">-->
        <!--<div class="div1">-->
          <!--<p>{{item.body}}</p>-->
          <!--<p>{{item.create_time}}</p>-->
        <!--</div>-->
        <!--<div class="div2">-->
          <!--<p>{{item.type==1?'-':'+'}}{{item.amount}}</p>-->
        <!--</div>-->
      <!--</li>-->

    <!--</ul>-->

  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--export default {-->
    <!--name: "jiaoyijilu",-->
    <!--data() {-->
      <!--return {-->
        <!--url: this.COMMEURL.commonUrl,-->
        <!--list: []-->

      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--var self = this;-->
      <!--this.$axios.post(self.url + "/index.php?s=/ucenter/newindex/orderSee").then(function (res) {-->
        <!--console.log(JSON.stringify(res));-->
        <!--if (res.data.code == 200) {-->
          <!--self.list = res.data.data;-->
        <!--}-->

      <!--})-->
    <!--}-->

  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--html, body {-->
    <!--background-color: #ffffff;-->
  <!--}-->

  <!--.jyjl-timer {-->
    <!--width: 100%;-->
    <!--height: 0.4rem;-->
    <!--font-size: 0.14rem;-->
    <!--line-height: 0.4rem;-->
    <!--background-color: #f5f5f5;-->
    <!--color: #333333;-->
    <!--padding-left: 0.2rem;-->
  <!--}-->

  <!--.jyjl-ul {-->
    <!--width: 100%;-->
    <!--height: auto;-->
    <!--list-style: none;-->
    <!--margin-top: 0.1rem;-->
  <!--}-->

  <!--.jyjl-ul > li {-->
    <!--width: 100%;-->
    <!--/*height: 0.5rem;*/-->
    <!--/*border: 1px solid seagreen;*/-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--border-bottom: 1px solid #f5f5f5;-->
    <!--background-color: #ffffff;-->

  <!--}-->

  <!--/*.jyjl-ul > li > div {*/-->
    <!--/*flex: 1;*/-->
    <!--/*!*border: 1px solid slateblue;*!*/-->
  <!--/*}*/-->
  <!--.jyjl-ul > li >.div1{-->
    <!--flex: 1;-->
  <!--}-->
  <!--.jyjl-ul > li > div > p:nth-child(1) {-->
    <!--font-size: 0.14rem;-->
    <!--color: #333333;-->
    <!--margin: 0.05rem 0 0.05rem 0.2rem;-->
  <!--}-->

  <!--.jyjl-ul > li > div > p:nth-child(2) {-->
    <!--font-size: 0.11rem;-->
    <!--color: #666666;-->
    <!--margin-left: 0.2rem;-->
  <!--}-->

  <!--.jyjl-ul > li > .div2 {-->
    <!--text-align: right;-->
    <!--margin-right: 0.2rem;-->

  <!--}-->

  <!--.jyjl-ul > li > .div2 > p:nth-child(1) {-->
    <!--font-size: 0.16rem;-->
    <!--color: #41AD42;-->
    <!--/*margin-left: 0.2rem;*/-->
  <!--}-->

  <!--.jyjl-ul > li > .div2 > .fu {-->
    <!--color: #E51C23 !important;-->
  <!--}-->

<!--</style>-->
