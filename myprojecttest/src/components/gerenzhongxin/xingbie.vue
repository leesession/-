<template>
  <div class="xingbie">
    <div id="app" class="box" v-longtouch="timeOutEvent" >  hahah  </div>
    <div  class="box"  v-longtouch="timeOutEvent1"  >  长按1</div>
    <div  class="box"  v-longtouch="timeOutEvent1"  >  长按1</div>
    <div  class="box"  v-longtouch="timeOutEvent1"  >  长按1</div>
    <div class="deleteDiv">
      <div class="delete">删除</div>
      <div class="triangle"></div>
    </div>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {
    name: "xingbie",
    directives:{
      longtouch:{
        bind:function(el, binding){
          var oDiv = el,
            value = binding.value,
            x = 0,
            y = 0,
            z = 0,
            timer = null;
          // console.log($(el));
          // console.log(binding);
          oDiv.addEventListener("touchstart", function(e) {
            if (e.touches.length > 1) {
              return false;
            }
            z = 0;
            timer = setTimeout(function() {
              z = 1;
            }, 400);
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            e.preventDefault();
          }, false);
          document.addEventListener("touchend", function(ev) {
            if (z != 1) {
              clearTimeout(timer);
              x = 0;
              y = 0;
              return false;
            } else {
              x = 0;
              y = 0;
              z = 0;
              // alert("长按了元素")
              console.log($(oDiv)[0].offsetHeight);
              console.log($(oDiv));
              console.log($(oDiv)[0].offsetLeft);
              console.log($(oDiv)[0].offsetTop);
              $(".deleteDiv").css("display","block");
              $(".deleteDiv").css("left",$(oDiv)[0].offsetLeft);

              $(".deleteDiv").css("top",$(oDiv)[0].offsetTop - 40>0?$(oDiv)[0].offsetTop - 40:0);
              // $(".delete").css("left",$(oDiv)[0].offsetHeight-$(oDiv)[0].offsetTop);

              // console.log($(oDiv));
              Toast({
                message:"长按了",
                duration:2000
              })
              // self.alrtFun();
            }
          }, false);
        }
      }
    },
    data() {
      return {
        name: "",
        timeOutEvent:0,
        timeOutEvent1:0
      }
    },
    methods: {
    alrtFun:function(){
      alert("长按")
    }
    }

  }
</script>
<style>
  .box {
    width:200px;
    height: 50px;
    background-color: red;
    color: #FFFFFF;
    text-align: center;
    line-height: 400px;
    font-size: 0.15rem;
    margin: 0.1rem;

  }
  .deleteDiv{
    width: 0.6rem;
    position:absolute;
    display: none;
  }
  .delete{
    line-height: 0.3rem;
    font-size: 0.14rem;
    color: white;
    background-color: rgba(0,0,0,0.8);
    border-radius: 0.04rem;
    width: 0.6rem;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  .triangle{
    position: absolute;
    top:0.3rem;
    left: 50%;
    transform: translateX(-50%);
    width:0;
            height:0;
             border-top:0.06rem solid rgba(0,0,0,0.8);
            border-left:0.06rem  solid transparent;
            border-right:0.06rem  solid transparent;
           border-bottom:0.06rem  solid transparent;
  }
</style>
