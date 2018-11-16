<template>
  <div id="app">
    <tabs></tabs>
    <div class="content">
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </div>
  </div>
</template>
<script>
  import tabs from "../tabs.vue"
  export default {
    name: 'home',
    data(){
      return {}
    },
    mounted(){
    },
    components: {
      tabs
    },

  }
</script>
<style>
  *{
    padding:0;
    margin:0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
