<template>
  <div id="calendar">
    <div class="calendar-nav">
      <span>{{month}}</span>
    </div>
    <div class="calendar-week">
      <span v-for="item in week">{{item}}</span>
    </div>
    <div class="calendar-day" v-for="(item,index1) in total.length">
      <div class="week" v-for="(item1,index) in total[index1]">
        <!--显示或者隐藏-->
        <span :class="signs[index+index1*7]===1?'day sign':today<item1?'day':'day not-sign'" v-if="item1 !== 0">{{item1}}</span>
        <span class="day active" v-else>{{item1}}</span>
        <!--点或者未签-->
        <span :class="item1 !== 0 && today>=item1?'circle':'circle active'" v-if="signs[index+index1*7]===1"></span>
        <span :class="item1 !== 0 && today>=item1?'no-sign':'no-sign active'" v-else>未签</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="history">
      <mt-button @click="openPicker">查询签到</mt-button>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value}"
      :endDate="endDate"
      :startDate="startDate"
      @confirm="handleConfirm"
      v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>
  require('../../../static/css/sign.css');

  export default {
    data(){
      return{
        load:true,
        month:'',
        week:['周日','周一','周二','周三','周四','周五','周六'],
        total:[],
        everyWeek:[],
        signs:[],
        today:'',
        weekDay:'',
        pickerValue:new Date(),
        endDate:new Date(),
        startDate:new Date('2018-08'),
      }
    },
    created(){
      this.getData();
    },
    mounted(){
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        background: '#fff'
      });
    },
    methods:{
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(){
        if(this.pickerValue != ''){
          let month = this.pickerValue.getMonth()+1;
          let year = this.pickerValue.getFullYear();
          let day = new Date(year,month,0).getDate();
          this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/get_sign_month',qs.stringify({
            month:month,
            year:year
          })).then(val=>{
            if(val.data.err === 0){
              this.signs=[];
              this.total=[];
              this.everyWeek=[];
              let week=new Date(year+'/'+month+'/1').getDay();
              for(let j=0 ; j<week ;j++){
                this.signs.push(0)
              }
              for (let d of val.data.data){
                d.sign?this.signs.push(1):this.signs.push(0)
              }
              this.getMonth(year+'/'+month+'/'+day,1);
            }
          }).catch()
        }
      },
      getMonth(serveTime,index){
        let Day='';
        let Year=serveTime.split('/')[0];
        let Month=serveTime.split('/')[1];
        if(index===1 && ((new Date().getMonth()+1)==Month)){
          Day=new Date().getDate();
        }else {
          Day=serveTime.split('/')[2];
        }
        if(Month.length<2)Month=('0'+Month)
        //当前的年月
        this.month=Year+'年'+Month+'月';
        //本天的日期
        this.today=Day;
        //本月1日的周几
        let week=new Date(Year+'/'+Month+'/1').getDay();
        this.weekDay=week;
        for(let j=0 ; j<week ;j++){
          this.everyWeek.push(0)
        }
        //获取当前月的天数
        let totalDay=new Date(Year,Month,0).getDate();
        //循环成几周，
        for(let i=1 ;i <= totalDay ;i++){
          if(week<6){
            this.everyWeek.push(i)
            week++;
          }else {
            this.everyWeek.push(i);
            this.total.push(this.everyWeek)
            this.everyWeek=[];
            week=0;
          }
        }
        //结束后不为空数组就压入total
        if(0<this.everyWeek.length<7){
          let len=7-this.everyWeek.length;
          for(let k=0;k<len;k++) this.everyWeek.push(0)
          this.total.push(this.everyWeek)
        }else if(this.everyWeek.length===7){
          this.total.push(this.everyWeek)
        }
      },
      getData(){
        this.$axios.post(this.COMMEURL.commonUrl+'/index.php?s=/ucenter/task/get_sign_month').then(val=>{
          this.loading.close();
          if(val.data.err === 0){
            let year=val.data.date.split('/')[0];
            let month=val.data.date.split('/')[1];
            let week=new Date(year+'/'+month+'/1').getDay();
            for(let j=0 ; j<week ;j++){
              this.signs.push(0)
            }
            for (let d of val.data.data){
              d.sign?this.signs.push(1):this.signs.push(0)
            }
            this.getMonth(val.data.date,0);
          }
        }).catch()
      }
    }
  }
</script>

<style>

</style>
