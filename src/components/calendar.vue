 <!--团期日历-->
<template>
    <div class="calendar">
        <ul class="month-tab">
            <li v-for="(date,index) in tour" @click="indexDate=index" :class="index==indexDate?'active':''">
                <a href="javascript:;">
                    <p>{{date.month}}</p>
                    <h3>￥{{date.minPrice}}起</h3>
                </a>
            </li>
        </ul>
        <div class="calendar-week">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </div>
        <div class="calendar-bd">
            <ul v-if="indexDate==0" :class="arrWeek[0]==1?'one':(arrWeek[0]==2?'two':(arrWeek[0]==3?'three':(arrWeek[0]==4?'four':(arrWeek[0]==5?'five':(arrWeek[0]==6?'six':'')))))">
                <li v-for="(i,index) in first" :class="i.price==''?'invalid':(i.selected==true?'act':'')" @click="selectFun(first,index)">
                    <p>{{i.day}}</p>
                    <h3><span v-if="i.price!=''">￥</span>{{i.price}}</h3>
                    <!-- <input type="hidden" v-model="hh"></input> -->
                </li>
            </ul>
            <ul v-if="indexDate==1" :class="arrWeek[1]==1?'one':(arrWeek[1]==2?'two':(arrWeek[1]==3?'three':(arrWeek[1]==4?'four':(arrWeek[1]==5?'five':(arrWeek[1]==6?'six':'')))))">
                 <li v-for="(i,index) in second" :class="i.price==''?'invalid':(i.selected==true?'act':'')" @click="selectFun(second,index)">
                    <p>{{i.day}}</p>
                    <h3><span v-if="i.price!=''">￥</span>{{i.price}}</h3>
                </li>
            </ul>
            <ul v-if="indexDate==2" :class="arrWeek[2]==1?'one':(arrWeek[2]==2?'two':(arrWeek[2]==3?'three':(arrWeek[2]==4?'four':(arrWeek[2]==5?'five':(arrWeek[2]==6?'six':'')))))">
                 <li v-for="(i,index) in three" :class="i.price==''?'invalid':(i.selected==true?'act':'')" @click="selectFun(three,index)">
                    <p>{{i.day}}</p>
                    <h3><span v-if="i.price!=''">￥</span>{{i.price}}</h3>
                </li>
            </ul>
            <ul v-if="indexDate==3" :class="arrWeek[3]==1?'one':(arrWeek[3]==2?'two':(arrWeek[3]==3?'three':(arrWeek[3]==4?'four':(arrWeek[3]==5?'five':(arrWeek[3]==6?'six':'')))))">
                 <li v-for="(i,index) in four" :class="i.price==''?'invalid':(i.selected==true?'act':'')" @click="selectFun(four,index)">
                    <p>{{i.day}}</p>
                    <h3><span v-if="i.price!=''">￥</span>{{i.price}}</h3>
                </li>
            </ul>
            <p></p>
        </div>
    </div>
</template>

<script>
export default {
    // props:{
    //     tour:{
    //       type:Array
    //   }
    // },
  data() {
    return {
        indexDate:0,//显示第一个月的日期
        // dateList:[
        //     {
        //         month:'5',
        //         lowPrice:'2377'
        //     },
        //     {
        //         month:'6',
        //         lowPrice:'2377'
        //     },
        //     {
        //         month:'7',
        //         lowPrice:'2377'
        //     },
        //     {
        //         month:'8',
        //         lowPrice:'2377'
        //     },
        // ],//返回的四个月日期
        first:[],
        second:[],
        three:[],
        four:[],
        arrWeek:[],
        firstCopy:[],
        secondCopy:[],
        threeCopy:[],
        fourCopy:[],
        arrLastDay:[],
        tour:[],
        // hh:false,
        selectedDay:'',        
    };
  },
  methods:{
    // 返回一个月的第一天是星期几和这个月有多少天
      getWeekDay(year,month){
           let firstWeek =new Date(year, month,1).getDay();//拿到这个月1号是星期几  
           let lastDay = 32 - new Date(year, month, 32).getDate();//拿到这个月有多少天 
           var a;  
            if(firstWeek ==0){  
                a =7;  
            }else{  
                a=firstWeek;  
            }  
           console.log(a);
           console.log(lastDay);
           return {
               week:a,
               sumday:lastDay
           };
      },
      init(){
           let that = this;
           that.tour=JSON.parse(window.localStorage.getItem('tourList'));
           console.log(that.tour);

            for(let i=0;i<that.tour.length;i++){
                    that.arrWeek.push(that.getWeekDay(that.tour[i].month.split('-')[0],that.tour[i].month.split('-')[1]-1).week);//每月第一天从周几开始
                    that.arrLastDay.push(that.getWeekDay(that.tour[i].month.split('-')[0],that.tour[i].month.split('-')[1]-1).sumday);//一个月总共多少天
                } ;
                for(let i=0;i<that.arrLastDay.length;i++){
                    for(let j=0;j<that.arrLastDay[i];j++){
                        if(i==0){ 
                            that.first.push({'day':j+1,'price':'','selected':false,'date':'','id':''})
                        }
                        else if(i==1){
                            that.second.push({'day':j+1,'price':'','selected':false,'date':'','id':''})
                        }
                        else if(i==2){
                            that.three.push({'day':j+1,'price':'','selected':false,'date':'','id':''})
                        }
                        else if(i==3){
                            that.four.push({'day':j+1,'price':'','selected':false,'date':'','id':''})
                        }
                    }
                }



        //    that.$nextTick(()=>{
            that.firstCopy=that.tour[0].tourList;
            that.secondCopy=that.tour[1].tourList;
            that.threeCopy=that.tour[2].tourList;
            that.fourCopy=that.tour[3].tourList;
        //    })     
           console.log(that.firstCopy);
           console.log(that.secondCopy);
           console.log(that.threeCopy);
           console.log(that.fourCopy);
        //    debugger;
           for(let i=0;i<that.first.length;i++){
               for(let j=0;j<that.firstCopy.length;j++){
                //    console.log(that.first[i].day);
                   if(that.first[i].day==parseInt(that.firstCopy[j].tourDate.split('-')[2])){
                    // console.log(parseInt(that.firstCopy[j].tourDate.split('-')[2]));
                    // alert('aa');
                    that.first[i].price=that.firstCopy[j].salesPrice;
                    that.first[i].date=that.firstCopy[j].tourDate;
                    that.first[i].id=that.firstCopy[j].id;
                   }
               }
           }
           for(let i=0;i<that.second.length;i++){
               for(let j=0;j<that.secondCopy.length;j++){
                   if(that.second[i].day==parseInt(that.secondCopy[j].tourDate.split('-')[2])){
                    // console.log(parseInt(that.secondCopy[j].tourDate.split('-')[2]));
                    that.second[i].price=that.secondCopy[j].salesPrice;
                    that.second[i].date=that.secondCopy[j].tourDate;
                    that.second[i].id=that.secondCopy[j].id;
                   }
               }
           }
           for(let i=0;i<that.three.length;i++){
               for(let j=0;j<that.threeCopy.length;j++){
                   if(that.three[i].day==parseInt(that.threeCopy[j].tourDate.split('-')[2])){
                    // console.log(parseInt(that.threeCopy[j].tourDate.split('-')[2]));
                    that.three[i].price=that.threeCopy[j].salesPrice;
                    that.three[i].date=that.threeCopy[j].tourDate;
                    that.three[i].id=that.threeCopy[j].id;
                   }
               }
           }
           for(let i=0;i<that.four.length;i++){
               for(let j=0;j<that.fourCopy.length;j++){
                   if(that.four[i].day==parseInt(that.fourCopy[j].tourDate.split('-')[2])){
                    // console.log(parseInt(that.fourCopy[j].tourDate.split('-')[2]));
                    that.four[i].price=that.fourCopy[j].salesPrice;
                    that.four[i].date=that.fourCopy[j].tourDate;
                    that.four[i].id=that.fourCopy[j].id;
                   }
               }
           }
      },
      selectFun(obj,index){

           if(obj[index].price!=''){
                 this.$nextTick(()=>{
                      obj[index].selected=true;
                      this.selectedDay=obj[index].date;
                      this.tourid=obj[index].id;
                    //   console.log(this.selectedDay);
                      window.localStorage.setItem('selectedDay',this.selectedDay);
                      window.localStorage.setItem('tourid',this.tourid);
                      this.$emit("selectFun");
                 })
           for(let i=0;i<34;i++){
             if(i!=index&&obj[i].price!=''){
                  obj[i].selected=false;
             }
             if(obj==this.first){
                //  console.log('hhhh');
                 this.second[i].selected=false;
                 this.three[i].selected=false;
                 this.four[i].selected=false;
             }
             else if(obj==this.second){
                 this.first[i].selected=false;
                 this.three[i].selected=false;
                 this.four[i].selected=false;
             }
             else if(obj==this.four){
                 this.first[i].selected=false;
                 this.second[i].selected=false;
                 this.three[i].selected=false;
             }
             else if(obj==this.three){
                 this.first[i].selected=false;
                 this.four[i].selected=false;
                 this.second[i].selected=false;
             }
          }
        //   
          
      }
    //   window.localStorage.setItem('pricePolicyList',undefined);
      },
    //   高亮显示
    highlightFun(){
        let highDay=window.localStorage.getItem('selectedDay');
        for(let i=0;i<this.first.length;i++){
            if(highDay==this.first[i].date){
                 this.first[i].selected=true;
            }
        }
        for(let i=0;i<this.second.length;i++){
            if(highDay==this.second[i].date){
                 this.second[i].selected=true;
            }
        }
        for(let i=0;i<this.three.length;i++){
            if(highDay==this.three[i].date){
                 this.three[i].selected=true;
            }
        }
        for(let i=0;i<this.four.length;i++){
            if(highDay==this.four[i].date){
                 this.four[i].selected=true;
            }
        }
    }
  },
  mounted(){
    //   let arrWeek=[];
    //   this.init();
    //   this.tour=JSON.parse(window.localStorage.getItem('tourList'));
    //   let arrLastDay=[];
    //   let dateTest=[];
    //  for(let i=0;i<this.tour.length;i++){

    //  }
    //   let first=[];
    //   let second=[];
    //   let three=[];
    //   let four=[];
    //   for(let i=0;i<this.tour.length;i++){
    //      this.arrWeek.push(this.getWeekDay(this.tour[i].month.split('-')[0],this.tour[i].month.split('-')[1]-1).week);//每月第一天从周几开始
    //      this.arrLastDay.push(this.getWeekDay(this.tour[i].month.split('-')[0],this.tour[i].month.split('-')[1]-1).sumday);//一个月总共多少天
    //   } ;
    //   for(let i=0;i<this.arrLastDay.length;i++){
    //        for(let j=0;j<this.arrLastDay[i];j++){
    //            if(i==0){ 
    //               this.first.push({'day':j+1,'price':''})
    //            }
    //            else if(i==1){
    //                this.second.push({'day':j+1,'price':''})
    //            }
    //            else if(i==2){
    //                this.three.push({'day':j+1,'price':''})
    //            }
    //            else if(i==3){
    //                this.four.push({'day':j+1,'price':''})
    //            }
    //        }
    //   }
    //   console.log(this.arrWeek);
    //   console.log(this.arrLastDay);
    //   console.log(dateTest);
    //   console.log(hhe);
    //   console.log(second);
    //   console.log(three);
    //   console.log(four);
     this.init();
     this.highlightFun();

  }
};
</script>

<style lang="scss" scoped>
.calendar{
    .month-tab{
        height: toRem(90px);
        background: #222;
        >li{
            float: left;
            width:25%;
            text-align: center;
            padding-top: toRem(17px);
            >a{
                display: inline-block;
                height: toRem(73px);
                 >p{
                    @include sc(toRem(20px),#fff); 
                }
                >h3{
                    @include sc(toRem(20px),#fff200); 
                }
            }
            &.active{
                >a{
                    border-bottom:toRem(6px) solid #ed5714;
                }
            }
        }
    }
    .calendar-week{
        margin-top: toRem(15px);
        height:toRem(41px);
        border-bottom: toRem(1px) solid #ddd;
        font-size:0px;
        >span{
            display: inline-block;
            width:14.2%;
            text-align: center;
            @include sc(toRem(24px),#b7b7b7);
        }
    }
    .calendar-bd{
        width:100%;
        >ul{
            width:100%;
            >li{
                float: left;
                height:toRem(100px);
                width:14.28%;
                text-align:center; 
                padding-top: toRem(14px);
                >p{
                    @include sc(toRem(25px),#3e3e3e);
                }
                >h3{
                    @include sc(toRem(18px),#6b6b6b);
                }
                &.invalid{
                    // background: #ddd;
                    >p{
                        @include sc(toRem(20px),#ddd);
                    }
                }
                &.act{
                    background: #4a8aff;
                    >p,>h3{
                        color:#fff;
                    }
                }
            }
            &.one{
                >li:first-child{
                    margin-left: 14.2%;
                }
            }
            &.two{
                >li:first-child{
                    margin-left: 28.4%;
                }
            }
            &.three{
                 >li:first-child{
                    margin-left: 42.6%;
                }
            }
            &.four{
                 >li:first-child{
                    margin-left: 56.8%;
                }
            }
            &.five{
                 >li:first-child{
                    margin-left: 71%;
                }
            }
            &.six{
                 >li:first-child{
                    margin-left: 85.2%;
                }
            }
        }
        >p{
            clear: both;
        }
    }
}
</style>

