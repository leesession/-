<template>
    <div id="work-rank">
      <mt-navbar v-model="selected" fixed>
        <mt-tab-item id="1">红花季榜</mt-tab-item>
        <mt-tab-item id="2">学分月榜</mt-tab-item>
        <mt-tab-item id="3">签到总榜</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <!--swipeable-->
      <mt-tab-container v-model="selected" >

        <mt-tab-container-item id="1">
          <div class="other-people">
            <ul>
              <li class="one-person" v-for="(item,index) in flowerRank">
                <div class="xuhao">
                  <img src="../../../static/img/sign/one.png" alt="" v-if="index===0">
                  <img src="../../../static/img/sign/two.png" alt="" v-else-if="index===1">
                  <img src="../../../static/img/sign/three.png" alt="" v-else-if="index===2">
                  <span v-else>{{index+1}}</span>
                </div>
                <div class="head">
                  <img class="user-head" :src="item.portrait" alt="">
                </div>
                <div class="intro">
                  <p :class="index<3?'active':''">{{item.nickname}}</p>
                  <p><img src="../../../static/img/sign/little-flower.png" alt=""> {{item.num}}</p>
                </div>
                <div class="look-button">
                  <mt-button @click="honor(item.uid)">查看</mt-button>
                </div>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="other-people">
            <ul>
              <li class="one-person" v-for="(item,index) in scoreRank">
                <div class="xuhao">
                  <img src="../../../static/img/sign/one.png" alt="" v-if="index===0">
                  <img src="../../../static/img/sign/two.png" alt="" v-else-if="index===1">
                  <img src="../../../static/img/sign/three.png" alt="" v-else-if="index===2">
                  <span v-else>{{index+1}}</span>
                </div>
                <div class="head">
                  <img class="user-head" :src="item.portrait" alt="">
                </div>
                <div class="intro">
                  <p :class="index<3?'active':''">{{item.nickname}}</p>
                  <p><img src="../../../static/img/sign/rank-score.png" alt=""> {{item.num}}</p>
                </div>
                <div class="look-button">
                  <mt-button @click="honor(item.uid)">查看</mt-button>
                </div>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="other-people">
            <ul>
              <li class="one-person" v-for="(item,index) in signRank">
                <div class="xuhao">
                  <img src="../../../static/img/sign/one.png" alt="" v-if="index===0">
                  <img src="../../../static/img/sign/two.png" alt="" v-else-if="index===1">
                  <img src="../../../static/img/sign/three.png" alt="" v-else-if="index===2">
                  <span v-else>{{index+1}}</span>
                </div>
                <div class="head">
                  <img class="user-head" :src="item.portrait" alt="">
                </div>
                <div class="intro">
                  <p :class="index<3?'active':''">{{item.nickname}}</p>
                  <p><img src="../../../static/img/sign/rank-sign.png" alt=""> {{item.num}}</p>
                </div>
                <div class="look-button">
                  <mt-button @click="honor(item.uid)">查看</mt-button>
                </div>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="myself">
        <div class="xuhao">{{myShow.rank}}</div>
        <div class="head">
          <img class="user-head" :src="myShow.portrait" alt="">
        </div>
        <div class="intro">
          <p>{{myShow.nickname}}</p>
          <p v-if="selected==1"><img src="../../../static/img/sign/little-flower.png" alt=""> {{myShow.num}}</p>
          <p v-else-if="selected==2"><img src="../../../static/img/sign/rank-score.png" alt=""> {{myShow.num}}</p>
          <p v-else><img src="../../../static/img/sign/rank-sign.png" alt=""> {{myShow.num}}</p>
        </div>
        <!--$router.push('/honor')-->
        <div class="look-button" @click="honor(uid)">
          我的荣誉卡 <img src="../../../static/img/sign/go.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  require('../../../static/css/sign.css');
  import { Toast } from 'mint-ui'

    export default {
      name: "workrank",
      watch:{
        selected(newVal,oldVal){
          newVal==1?this.myShow=this.myFlower:newVal==2?this.myShow=this.myScore: this.myShow=this.mySign
        }
      },
      data(){
          return{
            selected:'1',
            flowerRank:[],//红花总榜
            myFlower:{},
            scoreRank:[],//积分月榜
            myScore:{},
            signRank:[],//签到总榜
            mySign:{},
            myShow:{},//显示的排名
            uid:''
          }
      },
      created(){
        this.flower()
        this.score()
        this.sign()
      },
      mounted(){
        this.uid=this.COMMEURL.UID
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          background: '#fff'
        });
      },
      methods:{
        flower(){
          this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/get_flower_rank').then(val=>{
            this.loading.close();
            if(val.data.success){
              this.flowerRank=val.data.data
              this.myFlower=val.data.my_rank[0]
              this.myShow=val.data.my_rank[0]
            }
          }).catch()
        },//红花总榜
        score(){
          this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/get_integral_rank').then(val=>{
            if(val.data.success){
              this.scoreRank=val.data.data;
              this.myScore=val.data.my_rank[0]
            }
          }).catch()
        },//积分月榜
        sign(){
          this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/get_sign_rank').then(val=>{
            if(val.data.success){
              this.signRank=val.data.data;
              this.mySign=val.data.my_rank[0]
            }
          }).catch()
        },//签到总榜
        gengXin(){
          Toast({
            message: '更新中',
            position: 'center',
            duration: 3000
          });
        },
        honor(uid){
          this.$router.push(
            {
              path:'/honor',
              query:{uid:uid}}
            )
        }
      }
    }
</script>

<style scoped>

</style>
