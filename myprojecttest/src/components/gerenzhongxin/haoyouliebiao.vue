<template>
  <div class="haoyouliebiao">
    <div class="haoyou-nav">
      <ul class="nav-ul">
        <!--:class="{isSelected: selectedIndex == index }"-->
        <li @click="clickItem(item.id,index)"  :class="{isSelected:selected==item.id}"
            v-for="(item,index) in tabbar" >
          {{item.name}}
        </li>

      </ul>

    </div>
    <mt-tab-container v-model="selected" id="hylieb" >
      <mt-tab-container-item id="guanzhu" >
        <div class="guanzhu">
          <div class="guanzhuxianshi" v-show="isguanzhuxianshi">暂无关注人</div>
          <div class="guanzhuDIv" v-for="guanzhuItem in guanzhuList" @click="linkgerenzhuye(guanzhuItem.user.uid)">
            <img v-lazy='guanzhuItem.portrait' alt="">
            <img src="../../../static/img/jinv.png" class="hylbdav" v-show="guanzhuItem.user.user_type=='1'">
            <div class="liebiaoInfo">
              <p>{{guanzhuItem.user.nickname}}</p>
              <p>{{guanzhuItem.user.signature}}</p>
            </div>
            <div class="ygz">已关注</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="haoyou">

        <div class="haoyou">
          <div class="haoyouxianshi" v-if="ishaoyouxianshi">暂无好友</div>
          <div class="haoyouDIv" v-for="(haoyouItem,index) in haoyoulist" v-else @click="linkgerenzhuye(haoyouItem.user.uid)">
            <img v-lazy='haoyouItem.user.portrait' alt="">
            <img src="../../../static/img/jinv.png" class="hylbdav" v-show="haoyouItem.user.user_type=='1'">
            <div class="liebiaoInfo">
              <p>{{haoyouItem.user.nickname}}</p>
              <p>{{haoyouItem.user.signature}}</p>
            </div>
            <!--<div class="ygz" v-if="haoyouItem.user.gz_state=='true'">已关注</div>-->
            <div :class="{ 'wgz':haoyouItem.user.gz_state=='false', 'ygz': haoyouItem.user.gz_state=='true' }"   @click="addAttention($event,index,haoyouItem.user.uid,haoyouItem.user.gz_state)" >{{haoyouItem.user.gz_state=='false'?'+关注':'已关注'}}</div>
          </div>

        </div>
      </mt-tab-container-item>
    </mt-tab-container>


  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "haoyouliebiao",
    data() {
      return {
        url: this.COMMEURL.commonUrl,
        selected: 'haoyou',
        selectedIndex: 0,
        isguanzhuxianshi:false,
        ishaoyouxianshi:false,

        tabbar: [
          {
            id: "guanzhu",
            name: "我关注的"
          },
          {
            id: "haoyou",
            name: "关注我的"
          }
        ],
        guanzhuList: [],
        haoyoulist: []
      }
    },
    mounted() {
      var type=this.$route.query.type;

     if(type=="haoyou"){
        this.selected='haoyou';
        this.selectedIndex=1;
      }else{
        this.selected='guanzhu';
       this.selectedIndex=0;
      }
      this.getGuanzhuList();
      this.getHaoyouList();
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: 'transparent'
      });
      this.$loading.fullscreenLoading = true;
    },
    watch: {
      haoyoulist: {
        //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
        deep: true
      },
      isguanzhuxianshi:{
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      },
      ishaoyouxianshi:{
        handler(curVal, oldVal) {
          console.log(curVal, oldVal)
        },
      }
    },
    methods: {
      clickItem: function (id, index) {
        this.selected = id;
        console.log(id);
        this.selectedIndex = index;

      },
      getGuanzhuList() {
        var self = this;
        this.loading = this.$loading({
          lock: true,
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/friends").then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
        if(res.data.data==null){
          self.isguanzhuxianshi=true
        }else{
          self.guanzhuList = res.data.data.follow;
        }

          }
        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })

      },
      getHaoyouList:function () {
        var self = this;
        this.loading = this.$loading({
          lock: true,
          background: 'transparent'
        });
        this.$loading.fullscreenLoading = true;
        self.$axios.post(self.url + "/index.php?s=/ucenter/newindex/friend").then(function (res) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
          if (res.data.code == 200) {
            if(res.data.data==false){
              self.ishaoyouxianshi=true;
            }else{
              self.haoyoulist =res.data.data
            }

          }
        }).catch(function (e) {
          self.$loading.fullscreenLoading = false;
          self.loading.close();
        })

      },
      addAttention: function (e,index,id,isattention) {
        e.preventDefault();
        e.cancelBubble = true;
        //加关注
        var self = this;
        console.log("关注前:"+self.haoyoulist[index].user.gz_state);

        if(isattention=='false'){
          self.haoyoulist[index].user.gz_state = "true";
          // this.loading = this.$loading({
          //   lock: true,
          //   text: '关注中',
          //   background: 'transparent'
          // });
          this.$axios.post(self.url + "/index.php/ucenter/newindex/follow", qs.stringify({
            uid: id
          })).then(function (res) {
            self.$loading.fullscreenLoading = false;
            self.loading.close();
            if (res.data.code == 200) {
              // Toast({
              //   message: "关注成功",
              //   duration: 2000,
              //   position: true,
              // });
              // $(self).text("已关注")

              console.log("关注后:"+self.haoyoulist[index].gz_state);
            }
          })
        }else{

        }

      },
      linkgerenzhuye:function (id) {
        //跳转到个人主页
        this.$router.push({name:'gerenzhuye',query:{'toUid':id}});
      }
    }

  }
</script>
<style>
  html, body {
    background-color: #ffffff;
  }

  .haoyou-nav {
    width: 100%;
    height: 0.46rem;
    border-bottom: 1px solid #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #ffffff;
    /*border: 1px solid seagreen;*/
  }

  .haoyou-nav .nav-ul {
    width: 60%;
    margin: 0 auto;
    height: 0.45rem;
    display: flex;
    flex-direction: row;
    list-style: none;

    /*border: 1px solid slateblue;*/
  }

  .haoyou-nav .nav-ul li {
    flex-grow: 1;
    height: 100%;
    text-align: center;
    line-height: 0.45rem;
    font-size: 0.16rem;
color: #999999;

  }

  .haoyou-nav .nav-ul li span {
    color: #333333;
    font-size: 0.16rem;
  }

  .isSelected {
    color: #f5746f !important;
    border-bottom: 1px solid #f5746f;
    font-size: 0.16rem;
  }
#hylieb{

  position: absolute;
  top: 0.46rem;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}
  .guanzhu_liebiao {
    position: fixed;
    top: 0.95rem;
    left: 0;
    right: 0;
    bottom: 0rem;
    width: 100%;

    background-color: #ffffff;

  }

  .guanzhu_liebiao .guanzhuwrapper {
    height: 100%;
    overflow: hidden;
  }

  .guanzhu, .haoyou {
    width:100%;
    margin: 0 auto;



    background-color: #ffffff;

    /*border: 1px solid black;*/
  }

  .guanzhuDIv, .haoyouDIv {
    width: 94%;
    margin: 0 auto;
    height: 0.92rem;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    flex-direction: row;
    position: relative;

  }

  .guanzhuDIv > img, .haoyouDIv > img {
    width: 0.68rem;
    height: 0.68rem;
    border-radius: 50%;
    margin: 0.12rem 0.1rem 0.12rem 0;
    font-size: 0.68rem;
  }

  .liebiaoInfo {
    /*flex-grow: 0;*/

    height: 0.6rem;
    margin: 0.15rem 0;
    /*width: 100%;*/
    width: 60%;
    flex: 1;
    /*border: 1px solid seagreen;*/
  }

  .liebiaoInfo p {
    font-size: 0.14rem;
    /*line-height: 0.3rem;*/
  }

  .liebiaoInfo p:nth-child(1) {
    color: #444444;
    flex:1;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*border: 1px solid slateblue;*/
  }

  .liebiaoInfo p:nth-child(2) {
    color: #666666;
    margin-top: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    flex-shrink: 4;
  }

  .ygz {
    width: 0.6rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    color: #999999;
    font-size: 0.14rem;
    border-radius: 0.06rem;
    border: 1px solid #f5f5f5;
    flex-basis: 0.6rem;
    /*padding: 0  0.1rem;*/
    margin: 0.31rem 0;
  }

  .wgz {
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    color: #f5746f;
    font-size: 0.14rem;
    border-radius: 0.06rem;
    border: 1px solid #f5746f;
    /*flex-basis: 1rem;*/
    width: 0.6rem;
    /*width: 0.7rem;*/
    /*padding: 0  0.1rem;*/
    margin: 0.31rem 0;
  }
  .haoyouxianshi,.guanzhuxianshi{
    width: 100%;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.13rem;
    color: #333333;
  }
  .hylbdav {
    width: 0.12rem !important;
    height: 0.12rem !important;
    position: absolute;
    bottom: 0.01rem;
    left: 0.5rem ;
  }
</style>
