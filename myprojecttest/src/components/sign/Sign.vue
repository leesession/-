<template>
  <div id="sign">
    <!--顶部-->
    <div class="new-top">
      <div class="show-num">
        <div class="top-head">
          <img :src="pageData.portrait" alt="">
        </div>
        <div class="top-record">
          <div class="top-day">已累计签到<span>{{pageData.sign_days}}</span>天</div>
          <div class="top-score"><img src="../../../static/img/sign/new-score.png" alt="">总学分：{{pageData.new_integral}}</div>
          <div class="top-flower">
            <img src="../../../static/img/sign/little-flower.png" alt="">小红花：{{pageData.red_flowers}}
            <mt-button v-if="finishTime[0]!=1" @click="signZero">签到</mt-button>
            <mt-button  class="over" v-else >已签到</mt-button>
          </div>
        </div>
        <!--<div class="top-button"></div>-->
      </div>
      <div class="top-rukou">
        <div @click="gengXin">
          <p><img src="../../../static/img/sign/icon1.png" alt=""></p>
          <p>兑小红花</p>
        </div>
        <div @click="$router.push('/workrank')">
          <p><img src="../../../static/img/sign/icon2.png" alt=""></p>
          <p>排行榜</p>
        </div>
        <div @click="$router.push('/calendar')">
          <p><img src="../../../static/img/sign/icon3.png" alt=""></p>
          <p>签到日历</p>
        </div>
        <div @click="$router.push('/signrule')">
          <p><img src="../../../static/img/sign/icon4.png" alt=""></p>
          <p>规则</p>
        </div>
      </div>
    </div>
    <!--每日任务-->
    <div class="task">
      <div class="title" style="background-image: url('../../../static/img/sign/workday.png')"></div>
      <ul>
        <li class="task-detail" v-for="(item,index) in task">
          <!--序号-->
          <div class="xuhao">{{index+1}}</div>
          <div class="task-score">
            <div class="this-score">
              {{item.name}} <img src="../../../static/img/sign/flowered.png" alt="" v-if="serveMsg[index].is_complete != 1"> <img src="../../../static/img/sign/flower.png" alt="" v-else> <span>+{{item.score}}</span>
            </div>
            <div class="task-process" >
              <mt-progress :value="(finishTime[index]/serveMsg[index].task_count)*100" :bar-height="5"></mt-progress>
              <div class="finish-time"><span>{{finishTime[index]}}</span>/{{serveMsg[index].task_count}}</div>
            </div>
          </div>
          <mt-button  v-if="serveMsg[index].is_complete != 1" @click="taskClick(index)">{{item.button}}</mt-button>
          <mt-button  class="over" v-else >{{item.overButton}}</mt-button>
        </li>
      </ul>
    </div>
    <!--宝箱-->
    <div class="chest">
      <div class="title" style="background-image: url('../../../static/img/sign/chest-gift.png')"></div>
      <div class="bao-xiang">
        <div class="box">
          <p class="chest-image">
            <img src="../../../static/img/sign/chest-111.png" alt="" v-if="chestLists[0].uid!=0">
            <img src="../../../static/img/sign/chest-1.png" alt="" v-else-if="pageData.red_flowers<100" >
            <img src="../../../static/img/sign/chest-11.png" alt="" v-else @click="openChest(1)">

          </p>
          <p class="chest-score" >
            <span class="active" v-if="chestLists[0].uid!=0" >已开启</span>
            <span v-else-if="pageData.red_flowers<100"><img src="../../../static/img/sign/flowered.png" alt=""> 100</span>
            <span class="active" v-else><img src="../../../static/img/sign/little-flower.png" alt=""> 100</span>
          </p>
        </div>
        <div class="box">
          <p class="chest-image">
            <img src="../../../static/img/sign/chest-222.png" alt="" v-if="chestLists[1].uid!=0">
            <img src="../../../static/img/sign/chest-2.png" alt="" v-else-if="pageData.red_flowers<200" >
            <img src="../../../static/img/sign/chest-22.png" alt="" v-else @click="openChest(2)">
          </p>
          <p class="chest-score">
            <span class="active" v-if="chestLists[1].uid!=0" >已开启</span>
            <span v-else-if="pageData.red_flowers<200"><img src="../../../static/img/sign/flowered.png" alt=""> 200</span>
            <span class="active" v-else><img src="../../../static/img/sign/little-flower.png" alt=""> 200</span>
          </p>
        </div>
        <div class="box">
          <p class="chest-image">
            <img src="../../../static/img/sign/chest-333.png" alt="" v-if="chestLists[2].uid!=0">
            <img src="../../../static/img/sign/chest-3.png" alt="" v-else-if="pageData.red_flowers<300" >
            <img src="../../../static/img/sign/chest-33.png" alt="" v-else @click="openChest(3)">
          </p>
          <p class="chest-score">
            <span class="active" v-if="chestLists[2].uid!=0" >已开启</span>
            <span v-else-if="pageData.red_flowers<300"><img src="../../../static/img/sign/flowered.png" alt=""> 300</span>
            <span class="active" v-else><img src="../../../static/img/sign/little-flower.png" alt=""> 300</span>
          </p>
        </div>
        <div class="box">
          <p class="chest-image">
            <img src="../../../static/img/sign/chest-444.png" alt="" v-if="chestLists[3].uid!=0">
            <img src="../../../static/img/sign/chest-4.png" alt="" v-else-if="pageData.red_flowers<400" >
            <img src="../../../static/img/sign/chest-44.png" alt="" v-else @click="openChest(4)">
          </p>
          <p class="chest-score">
            <span class="active" v-if="chestLists[3].uid!=0" >已开启</span>
            <span v-else-if="pageData.red_flowers<400"><img src="../../../static/img/sign/flowered.png" alt=""> 400</span>
            <span class="active" v-else><img src="../../../static/img/sign/little-flower.png" alt=""> 400</span>
          </p>
        </div>
      </div>
      <div class="tip" v-if="99<pageData.red_flowers&&pageData.red_flowers<200&&(chestLists[0].uid==0)">
        <img src="../../../static/img/sign/warn.png" alt="">
        您当前拥有小红花{{pageData.red_flowers}}朵，可开启宝箱！
      </div>
      <div class="tip" v-else-if="199<pageData.red_flowers&&pageData.red_flowers<300&&(chestLists[0].uid==0 || chestLists[1].uid==0)">
        <img src="../../../static/img/sign/warn.png" alt="">
        您当前拥有小红花{{pageData.red_flowers}}朵，可开启宝箱！
      </div>
      <div class="tip" v-else-if="299<pageData.red_flowers&&pageData.red_flowers<400&&(chestLists[0].uid==0 || chestLists[1].uid==0 || chestLists[2].uid==0)">
        <img src="../../../static/img/sign/warn.png" alt="">
        您当前拥有小红花{{pageData.red_flowers}}朵，可开启宝箱！
      </div>
      <div class="tip" v-else-if="399<pageData.red_flowers&&(chestLists[0].uid==0 || chestLists[1].uid==0 || chestLists[2].uid==0 || chestLists[3].uid==0)">
        <img src="../../../static/img/sign/warn.png" alt="">
        您当前拥有小红花{{pageData.red_flowers}}朵，可开启宝箱！
      </div>
      <div class="tip" v-else-if="chestLists[0].uid!=0 && chestLists[1].uid!=0 && chestLists[2].uid!=0 && chestLists[3].uid!=0">
        <img src="../../../static/img/sign/warn.png" alt="">
        您已经开启全部宝箱！
      </div>
      <div class="tip" v-else>
        <img src="../../../static/img/sign/warn.png" alt="">
        您当前拥有小红花{{pageData.red_flowers}}朵，还差{{index1*100-pageData.red_flowers}}朵就可开启宝箱！
      </div>
    </div>
    <!--提示开启宝箱-->
    <div class="home-modal" v-if="homeModel" @touchmove.prevent>
      <div class="success">
        <div class="img">
          <img src="../../../static/img/sign/chest-warn.png" alt="">
          <p class="warn">是否用{{needFlower}}朵小红花开启宝箱？</p>
        </div>
        <div class="operate">
          <span @click="homeModel=!homeModel">暂不</span>
          <span @click="open">开启</span>
        </div>
      </div>
    </div>
    <!--获得的礼物-->
    <div class="gift-model" @touchmove.prevent v-if="giftModel">
      <div style="background-image: url('../../../static/img/sign/gift-back.png')" v-if="gift.name!='补签卡'" class="gift">
        <div>恭喜您获得</div>
        <div class="img">
          <img :src="gift.img_url" alt="">
        </div>
        <div class="name">{{gift.name}}</div>
        <div class="tip">
          <p>本月还剩余{{gift.red_flowers}}朵小红花</p>
          <p>完成更多任务，开启更多宝箱</p>
        </div>
        <div class="look-gift">
          <mt-button @click="look" v-show="gift.type!=0">查看礼物</mt-button>
        </div>
        <img src="../../../static/img/sign/close.png" alt="" @click="giftModel=!giftModel">
      </div>
      <!--若为卡包-->
      <div :style="{backgroundImage:'url('+gift.img_url+')'}" class="gift" v-else>
        <div class="card-gift">
          <mt-button @click="look">查看卡包</mt-button>
        </div>
        <img src="../../../static/img/sign/close.png" alt="" @click="giftModel=!giftModel">
      </div>
    </div>
    <!--宝箱抖动-->
    <div class="chest-model" v-if="chestModel" @touchmove.prevent>
      <img src="../../../static/img/sign/chest-11.png" alt="" v-if="needFlower===100">
      <img src="../../../static/img/sign/chest-22.png" alt="" v-else-if="needFlower===200">
      <img src="../../../static/img/sign/chest-33.png" alt="" v-else-if="needFlower===300">
      <img src="../../../static/img/sign/chest-44.png" alt="" v-else>
    </div>
  </div>
</template>

<script>
  require('../../../static/css/sign.css');
  import {wxConfig, share, shareUrl} from "../../../static/js/timeFormat";
  import { Toast  } from 'mint-ui'

 export default {
   data(){
     return{
       chestModel:false,
       homeModel:false,
       giftModel:false,
       status:[2,1,1,0],
       load:true,
       // 任务系统
       task:[
         {name:'签到',score:'1',time:1,button:'签到',overButton:'已完成'},
         {name:'点赞',score:'1',time:20,button:'点赞',overButton:'已点赞'},
         {name:'评论/回复',score:'1',time:20,button:'去完成',overButton:'已评论'},
         {name:'发布秀生活',score:'1',time:5,button:'发布',overButton:'已发布'},
         // {name:'发布秀文采',score:'1',time:1,button:'发布',overButton:'已发布'},
         // {name:'发布秀才艺',score:'1',time:3,button:'发布',overButton:'已发布'},
         {name:'文章分享/邀请',score:'1',time:3,button:'去完成',overButton:'已完成'},
       ],
       finishTime:[
         0,0,0,0,0,0,0
       ],
       process:'0',//小红花，最大400
       // 模拟周签到
       signWeek:[],
       pageData:{},
       singText:[],
       serveMsg:[
         {is_complete:''},{is_complete:''},{is_complete:''},{is_complete:''},{is_complete:''},{is_complete:''},{is_complete:''}
       ],
       chestLists:[{uid:''},{uid:''},{uid:''},{uid:''}],
       needFlower:0,
       box_id:10,
       gift:{
         name:'',img_url:'',red_flowers:''
       },
       index1:0,//用于判断开启最接近宝箱
     }
   },
   created(){
     this.getData();
     this.work();
     this.chestList();
   },
   mounted(){
     this.loading = this.$loading({
       lock: true,
       text: '加载中',
       background: '#fff'
     });
     wxConfig(this, window.location.href.split('#')[0]);
   },
   methods:{
     open(){
       let _this=this;
       let oldTime=Date.parse(new Date());
       this.chestModel=!this.chestModel;
       this.homeModel=!this.homeModel;
       this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/open_chest',qs.stringify({
         id:this.box_id
       })).then(val=>{
         let timer=setInterval(()=>{
           let newTime=Date.parse(new Date());
           if((newTime-oldTime)>1000){
             _this.chestModel=!_this.chestModel;
             _this.giftModel=!_this.giftModel;
             clearInterval(timer)
           }
         },100)
         this.gift=val.data.data;
         this.chestList();
         this.getData();
       }).catch()
     },
     openChest(index){
       this.homeModel=true;
       this.needFlower=index*100
       this.box_id=index
     },
     signZero(){
       Toast({
         message: '请点击右上角"..."，分享之后就签到哦',
         position: 'center',
         duration: 3000
       });
     },
     shareSign(){
       this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/do_sign').then(val=>{
         if(val.data.code === 200){
           Toast({
             message: val.data.msg,
             position: 'center',
             duration: 3000
           });
           this.getData();
           this.work();
         }else {
           Toast({
             message: val.data.msg,
             position: 'center',
             duration: 3000
           });
         }
       }).catch()
     },
     taskClick(index){
       if(index===0){//签到
         Toast({
           message: '请点击右上角"..."，分享之后就签到哦',
           position: 'center',
           duration: 3000
         });
       }else if(index===1){
         this.$router.push('/guangchang')
       }else if(index===2){
         this.$router.push('/guangchang')
       }else if(index===3){
         this.$router.push('/fabushuoshuo')
       }else if(index===4){
         this.$router.push('/shouye')
         // Toast({
         //   message: '请到秀芳华App端操作',
         //   position: 'center',
         //   duration: 3000
         // });
       }else if(index===5){
         this.$router.push('/shouye')
       }
     },
     gengXin(){
       Toast({
         message: '更新中',
         position: 'center',
         duration: 5000
       });
     },
     getData(){
       this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/get_sign_week').then(val=>{
         this.loading.close();
         if(val.data.err===0) {
           let days;
           this.pageData=val.data.data;
           days=parseInt(val.data.data.sign_days)+1;
           if(val.data.data.signinfo[6].sign)
             days=val.data.data.sign_days
           else
             days=parseInt(val.data.data.sign_days)+1;
           this.singText=[
             `交朋友，涨知识，享生活！我已在秀芳华签到${days}天，等你加入！`,
             `分享快乐，遇见最美丽的自己！我已在秀芳华签到${days}天！`,
             `我已在秀芳华签到${days}天！学会分享快乐，遇见最优秀的自己。`,
             `在秀芳华我已签到${days}天！发现生活的精彩，分享快乐的自己！`,
             `分享是一种快乐，让生活更加精彩！我已在秀芳华签到${days}天！`,
             `芳华不老情不绝，期待与你在秀芳华相遇，我已签到${days}天。`,
             `在秀芳华签到的第${days}天，结怨不如结缘，高寿不如高兴！`,
             `我已在秀芳华签到${days}天。不积跬步，无以至千里，为自己加油！`,
             `持之以恒，每个人都是自己的赢家！我已在秀芳华签到${days}天。`,
             `在秀芳华签到的第${days}天！走过了春夏秋冬，我还是最爱芳华。`,
             `朋友，你好！快跟我一起来秀芳华！我已在秀芳华签到${days}天。`,
             `结交天下秀友，从秀芳华签到开始。我已签到${days}天！`,
             `这个冬天，给你更多温暖！在秀芳华签到第${days}天，等你来！`,
             `快乐就要分享！在秀芳华签到的第${days}天，我比以前更开心了。`,
             `快乐你我，就来秀出最美芳华！我已在秀芳华签到${days}天。`,
             `冬天已经到来，春天也不远了，我已在秀芳华签到${days}天!`,
             `喜欢做的事情，坚持下去就对了！我已在秀芳华坚持签到了${days}天！`,
             `坚持签到，开启活力满满的一天，我已在秀芳华签到${days}天！`,
             `今天是我在秀芳华签到的第${days}天，我想把快乐和精彩分享给你！`,
             `我已经在秀芳华签到${days}天，越来越快乐，你要不要跟我一起？`,
             `每天分享快乐，每天都在进步！我在秀芳华已坚持签到${days}天。`,
             `我已在秀芳华签到的${days}天！遇见很多新朋友，学到很多新知识！`,
             `在秀芳华坚持签到${days}天！让生活更加充实，丰富，精彩，快乐！`,
             `保持健康快乐，分享美丽生活！我在秀芳华已签到${days}天！`,
             `生活充满惊喜，快乐无处不在！我在秀芳华签到的${days}天，等你加入！`
           ]
           let num=parseInt(Math.random()*25);//随机数 0-24
           share(this.singText[num], 'http://oxycohppa.bkt.clouddn.com/sign.png', 'http://xfhwx.xiufanghua.com/social/index.php?s=/ucenter/newindex/jmAuthLogin', this.singText[num],0);
         }
       }).catch()
     },//获取数据
     getWork(){
       this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/task_list').then(val=>{
         if(val.data.is_sign) {
           this.finishTime=[1,0,0,0,0,0,0]
         }
       }).catch()
     },
     work(){
       this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/task_list_new').then(val=>{
         let workList=val.data.data,arr=[];
         if(val.data.err==0){
           for(let i in workList){
             arr[i]=workList[i].count
           }
           this.finishTime=arr;
           this.serveMsg=workList;
         }
       }).catch()
     },//任务列表
     chestList(){
       this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/chest_list').then(val=>{
         this.chestLists=val.data.data
         for(let i in this.chestLists){
           if(this.chestLists[i].uid==0){
             this.index1=++i;
             return
           }
         }

       }).catch()
     },//宝箱列表
     look(){
       Toast({
         message: '请到秀芳华App端的卡包中查看礼物',
         position: 'center',
         duration: 3000
       });
     }
   }
 }
</script>

<style>

</style>
