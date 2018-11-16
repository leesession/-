<template>
  <div id="app" v-cloak>
    <keep-alive>
      <!--<keep-alive :include="['home']">-->
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>

  export default {
    name: 'app',
    data() {
      return {}
    },

  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    font-size: .15rem;
    display: inherit;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .el-loading-spinner .el-loading-text {
    color: #999999 !important;
    margin: 3px 0;
    font-size: 14px;
  }

  .el-message-box__wrapper {
    z-index: 1000000 !important;
  }

  .el-loading-spinner .path {
    -webkit-animation: loading-dash 1.5s ease-in-out infinite;
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #999999 !important;
    stroke-linecap: round;
  }

  .before-trigger span {
    font-size: 0.15rem !important;
    /*border: 1px solid seagreen;*/
  }

  .el-message-box {
    width: 85% !important;
  }

  .w-e-text {
    width: 100%;
    /*padding: 0 ;*/
    overflow-y: scroll !important;
    font-size: 0.18rem !important;
    line-height: 0.3rem !important;
    padding-top: 0.1rem !important;
  }

  .w-e-text img {
    width: 100%;
    display: block;
    margin: 0.3rem auto;
    height: auto;
  }

  /*//定义大v*/

</style>
