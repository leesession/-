<template>
  <div id="integralDetail">
    <!-- header start -->
    <!-- header end -->
    <!-- 总积分 start -->
    <div class="integral-all">
      总积分：
      <span>{{this.COMMEURL.signAll!=null?this.COMMEURL.signAll:0}}</span>
      <span v-show="false">卡包</span>
    </div>
    <!-- 总积分 end -->

    <!-- 积分详情 start -->
    <div class="integral-details">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">积分收入</mt-tab-item>
        <mt-tab-item id="2">积分兑换</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul v-if="income.length>0"
              v-infinite-scroll="getIntegral"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="28"
          >
            <li v-for="item in income" class="thing-one">
              <p class="thing-title">签到</p>
              <p class="thing-time">{{item.time}}</p>
              <div class="thing-score red">+{{item.num}}</div>
            </li>
          </ul>
          <div v-else class="no-record" v-show="!getLoad">无收入记录，快去签到吧！</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul v-if="outcome.length>0"
              v-infinite-scroll="payIntegral"
              infinite-scroll-disabled="outloading"
              infinite-scroll-distance="28"
          >
            <li v-for="item in outcome" class="thing-one">
              <p class="thing-title">{{ item.type!=2?'积分兑换红包':item.num==100?'脉通理疗券':'康养体验卡'}}</p>
              <p class="thing-time">{{item.time}}</p>
              <div class="thing-score green">-{{item.num}}</div>
            </li>
          </ul>
          <div v-else class="no-record">无兑换记录，快去兑换吧！</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 积分详情 end -->
    <div class="team-load" v-show="getLoad">
      <mt-spinner type="fading-circle"></mt-spinner>
      <p>加载中</p>
    </div>
  </div>
</template>

<script>

  require("../../../static/css/register.css");
  export default {
    name: "integralDetail",
    data() {
      return {
        getLoad:false,
        selected: '1',
        load: true,
        income: [],
        outcome: [],
        loading:false,
        outloading:false,
        page:1,//当前页
        outPage:1,
        pageCount:1,//总页数
        outPageCount:1,
      };
    },
    created() {
      this.payIntegral();
      this.getIntegral();
    },
    mounted() {

    },
    methods: {
      payIntegral() {
        let _this=this;
        if(!(this.outPage>this.outPageCount)) {// 当前页 1 <= 1
          this.getLoad=true;
          this.outloading=true;
          this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/intelist', qs.stringify({
            type: 0,//
            page:_this.page,
          })).then(val => {
            this.getLoad=false;
            this.outloading=false;
            if (val.data.code === 200) {
              this.outPage++;
              this.outPageCount=val.data.data.data.totlepage;
              for(let d of val.data.data.data.list){
                this.outcome.push(d)
              }
            }
          }).catch(err => {})
        }

      },//支出
      getIntegral() {
        let _this=this;
        if(!(this.page>this.pageCount)){// 当前页 1 <= 1
          this.getLoad=true;
          this.loading=true;
          this.$axios.post('http://xfhwx.xiufanghua.com/social/index.php?s=/news/newindex/intelist', qs.stringify({
            type: 1,//
            page:_this.page,
          })).then(val => {
            this.getLoad=false;
            this.loading=false;
            if (val.data.code === 200) {
              this.page++;
              this.pageCount=val.data.data.data.totlepage;
              for(let d of val.data.data.data.list){
                this.income.push(d)
              }
            }
          }).catch(err => {})
        }
      },//收入
    }
  };
</script>

<style scoped>

</style>
