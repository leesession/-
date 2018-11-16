<template>
  <div class="xingbie">

    <div id="app" class="box"

         v-longtap="{fn:vuetap,name:'长按'}"

    >
      {{ name }}
    </div>
  </div>
</template>
<script>
  // import {vueTouch} from '../../../static/js/vue'
  export default {
    name: "xingbie",
    directive:{
      bind:function(el,binding){
        new vueTouch(el,binding,"longtap");
      }
    },
    data() {
      return {
        vuetap:function(s){
          this.name=s.name;
        }

      }
    },
    methods:{

    }

  }
</script>
<style>
  .box{
    width: 400px;
    height: 400px;
    background-color: red;
    color: #FFFFFF;
    text-align: center;
    line-height: 400px;
    font-size: 100px;
  }
</style>
