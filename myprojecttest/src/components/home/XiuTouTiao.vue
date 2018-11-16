<template>
  <div id="toutiao">
    <ul>
      <li v-for="(item,index) in toutiao" @click="detail(index)">
        <div>
          <p class="title">{{item.title}}</p>
          <p class="view">{{item.viewnumber}}人浏览过</p>
        </div>
        <div class="img" :style="'backgroundImage: url('+item.cover_img+')'"></div>
      </li>
    </ul>
  </div>
</template>

<script>

  require('../../../static/css/index.css');
  export default {
    data(){
      return{
        toutiao:[],
      }
    },
    mounted(){
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: '#fff'
      });
      this.getList()
    },
    methods:{
      getList(){
        this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/headline_list').then(val=>{
          this.loading.close();
          if(val.data.code === 200){
            this.toutiao = val.data.data
          }
        }).catch(err=>{})
      },
      detail(index){
        this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/headline_addview',qs.stringify({
          id:this.toutiao[index].id
        })).then(val=>{
          if(this.toutiao[index].type==='0'){
            window.location.href=this.toutiao[index].jump_url
          }else {
            this.$router.push({
              name:'TTdetail',
              params:{
                content:this.toutiao[index].content,
                title:this.toutiao[index].title,
                banner:this.toutiao[index].cover_img
              }
            })
          }

        }).catch(err=>{
          window.location.href=this.toutiao[index].jump_url
        })

      }
    },
    beforeRouteEnter(to , from , next){
      next()
    }
  }
</script>

<style>

</style>
