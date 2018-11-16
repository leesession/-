<template>
  <!--转发组件-->

</template>
<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "forward",
    data() {
      return {
        isshowZhuanfa: false,//是否显示表情框
        displayEmoj: true,//是否显示转发框
      }
    },
    props:[
      'article_id','title','toUid'
    ],
    methods: {
      choiceEmoj: function (e) {
        if (e.target.nodeName == "IMG") {
          var choice = e.target;
          var cEle = choice.cloneNode(true); //深度复制，复制节点下面所有的子节点 ，直接将整个表情的IMG标签复制，并添加到发布框的<p></p>里面
          $(".zhaunfa-input-div").append(cEle);
          this.$parent.set_focus($(".zhaunfa-input-div")[0]);
        }
      },

      clickImg: function () {
        this.isshowZhuanfa = !this.isshowZhuanfa
      },
      cancel: function () {
        this.displayEmoj = false;
        this.$emit('childClickCancel', "")
      },
      confirm: function () {
        //提交转发
        var self=this;
        this.$axios.post(self.url+"/index.php?s=/news/newindex/ forward",qs.stringify({
          uid:''	,//用户Id
          article_id:self.article_id,	  //文章id
          Title:self.title,	//文章标题
          content	:$(".zhaunfa-input-div").html(),//转发内容
          toUid:self.toUid
        })).then(function (res) {
          if(res.data.code==200){
            Toast({
              message:"转发成功",
              position: 'middle',
              duration: 3000
            })
          }else{
            Toast({
              message:res.data.info,
              position: 'middle',
              duration: 3000
            })
          }
        }).catch(function (e) {

        })
      }
    }
  }
</script>
<style>


</style>
