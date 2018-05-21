<!--这是团期选择页面-->
<template>
    <div class="group-seletion">
       <div class="group-selection-content">
           <calendarView @selectFun="chooseDayFun"></calendarView>
           <div>
               <h2>出发地选择<span>往返接送机说明</span></h2>
               <div>
                    <div>
                        <a href="javascript:;" v-for="(origin,index) in originList" v-if="index<showNum" @click="chooseDeparture(origin,index)" :class="index==indexDeparture?'active':''">{{origin.departure}}</a>
                    </div>
                    <a href="javascript:;" @click="moreFun()" v-if="isShow&&originList.length>14">更多</a>
                    <a href="javascript:;" @click="packFun()" v-if="!isShow">收起</a>
                    <p></p>
               </div>
           </div>
           <div>
               <h2>请选择出游人数<span>说明</span></h2>
               <div class="passenger-numbers">
                    <div v-for="(pricePolicy,index) in pricePolicyList">
                        <h1>
                            <em>{{pricePolicy.policyName}}</em>
                            <div>
                                <i :class="pricePolicy.count==1&&pricePolicy.policyName=='成人价'?'not-reduce':''" @click="reduceFun(pricePolicy)"></i>
                                <input v-model="pricePolicy.count" type="number">
                                <!-- <input v-model="minNumChildren" type="number" v-if="pricePolicy.policyName=='儿童价'&&minNumChildren>0"> -->
                                <i class="add" @click="addFun(pricePolicy)"></i>
                            </div>
                            <span>￥{{pricePolicy.salesPrice}}<i>/人</i></span>
                        </h1>
                        <p v-if="pricePolicy.policyName=='成人价'">65岁周岁以上不含</p>
                        <p v-if="pricePolicy.policyName=='儿童价'">2-12周岁不含</p>
                    </div>
                    <!-- <div>
                        <h1>
                            <em>儿童</em>
                            <div>
                                <i></i>
                                <input type="number">
                                <i class="add"></i>
                            </div>
                            <span>￥3099<i>/人</i></span>
                        </h1>
                        <p>2-12周岁不含</p>
                    </div> -->
                </div>
           </div>
       </div>
       <div class="group-seletion-bottom">
         <div>
             <div>
                <h2>出游人数：<span v-for="(pricePolicy,index) in pricePolicyList">{{pricePolicy.count}}{{pricePolicy.policyName}}<i v-if="index!=pricePolicyList.length">，</i></span></h2>
                <p>出游日期：{{chooseDay}}</p>
             </div>
             <a href="#/order-check" @click="selected()">完成</a>
         </div>
       </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {getPriceList,getTourList,getDeparture } from '../../services/index';
import { mapState, mapActions, mapMutations } from 'vuex'
import tools from '../../common/tools'
import { apiUrl } from '../../common/env'
import calendarView from '../../components/calendar'
export default {
    data(){
        return{
           indexDeparture:0,//出发地默认值
           minNumAdult:[],
        //    minNumChildren:1,
           showNum:14,
           isShow:true,
           originList:[
            //    {city:'上海'},
            //    {city:'南京'},
            //    {city:'苏州'},
            //    {city:'无锡'},
            //    {city:'西安'},
            //    {city:'杭州'},
            //    {city:'武汉'},
            //    {city:'南通'},
            //    {city:'长春'},
            //    {city:'常州'},
            //    {city:'青岛'},
            //    {city:'郑州'},
            //    {city:'南宁'},
            //    {city:'济南'},
            //    {city:'长沙'},
            //    {city:'安徽'},
            //    {city:'河南'},
            //    {city:'保定'},
            //    {city:'湖南'},
            //    {city:'合肥'},
            //    {city:'芜湖'},
           ],
           pricePolicyList:[],//价格策略列表
           tourList:[],//团期数组
           chooseDay:'',//所选日期
        }
    },
    methods: {
        moreFun(){
            this.showNum=this.originList.length;
            this.isShow=false;
        },
        packFun(){
            this.showNum=14;
            this.isShow=true;
        },
        // 价格策略
         getPriceInit(){
            let that = this;
            // let id='13D76550-8963-4F8F-8AE8-193D9A8D6FC0';
            let params={
                'id':'13D76550-8963-4F8F-8AE8-193D9A8D6FC0',
                // 'tourDate':'2018-05-31',
                'tourDate':that.chooseDay
                };
             getPriceList(params).then(function(response){
              console.log(response);
              if(response.meta.success=true){
                   console.log('请求价格策略数据成功');
                   for(let i=0;i<response.data[0].pricePolicyList.length;i++){
                       that.$set(response.data[0].pricePolicyList[i], 'count', 1);
                   }
                   console.log(window.localStorage.getItem('pricePolicyList'));
                //    console.log(JSON.parse(window.localStorage.getItem('pricePolicyList')));
                //    if(window.localStorage.getItem('pricePolicyList')){
                //        alert('1')
                //        that.pricePolicyList=JSON.parse(window.localStorage.getItem('pricePolicyList'));
                //    }
                //    else{
                        that.pricePolicyList=response.data[0].pricePolicyList;
                //    }
                   console.log(that.pricePolicyList);
              }
              else{
                   console.log('请求价格策略数据失败');
              }
          })
       },

        // 获取出发地信息
       getDepartureInit(){
            let that = this;
            let params='13D76550-8963-4F8F-8AE8-193D9A8D6FC0';
             getDeparture(params).then(function(response){
              console.log(response);
              if(response.meta.success=true){
                   console.log('请求出发地数据成功');
                   that.originList=response.data;
                //    console.log(that.productDetail);
              }
              else{
                   console.log('请求出发地数据失败');
              }
          }).catch(function(err){
            that.$Message.info('出发地接口获取失败');
        });
       },
        // 获取团期信息
    //   getTourListInit(){
    //         let that = this;
    //         let params='13D76550-8963-4F8F-8AE8-193D9A8D6FC0';
    //          getTourList(params).then(function(response){
    //           console.log(response);
    //           if(response.meta.success=true){
    //                console.log('团期选择请求团期数据成功');
    //             //    debugger;
    //                that.groupList=response.data[0].tourList;
    //                that.tourList=response.data;
    //                console.log(that.groupList);
    //                console.log(that.tourList);
    //                window.localStorage.setItem('tourList',JSON.stringify(that.tourList));
    //           }
    //           else{
    //                console.log('请求团期数据失败');
    //           }
    //       }).catch(function(err){
    //         that.$Message.info('请求团期接口获取失败');
    //     });
    //    },
       //减少人数
       reduceFun(pricePolicy){
        pricePolicy.count--;
        console.log('reduce');
        //  window.localStorage.setItem('pricePolicyList',JSON.stringify(this.pricePolicyList));
       },
       //增加人数
       addFun(pricePolicy){
        pricePolicy.count++;
        console.log('add');
        //  window.localStorage.setItem('pricePolicyList',JSON.stringify(this.pricePolicyList));
       },
     // 选择完成进入下一页
       selected(){
           window.localStorage.setItem('pricePolicyList',JSON.stringify(this.pricePolicyList));
       },
       dateInit(){
           console.log(window.localStorage.getItem('selectedDay'));        
       },
       chooseDayFun(){
           this.chooseDay=window.localStorage.getItem('selectedDay');
        //    window.localStorage.setItem('pricePolicyList',undefined);
           this.getPriceInit();
       },
       chooseDeparture(origin,index){
           this.indexDeparture=index;
        //    alert(origin.departure);
           let departure=origin.departure;
           window.localStorage.setItem('departure',departure);
       }
    },
//      computed: {
//       ...mapState({
//             'tourList': 'tourList',
//         })
//   },
    mounted(){
        this.chooseDay=window.localStorage.getItem('selectedDay');
        // 初始化价格策略
        this.getPriceInit();
        // 初始化初始地
        this.getDepartureInit()
        this.dateInit();
        
        // this.getTourListInit();
    },
    // computed:{
    //     chooseDay:()=>{
    //     return window.localStorage.getItem('selectedDay');
    //     }     
    //     // console.log(window.localStorage.getItem('selectedDay'));
    //     // console.log(this.chooseDay);
    // },
    components: {
     calendarView
    },
}
</script>

<style lang="scss">
.group-seletion{
    .group-selection-content{
        background: #eee;
        margin-bottom: toRem(98px);
        >div{
            background: #fff;
            // &:nth-child(1){
            //     height: toRem(650px);
            // }
            &:nth-child(2),&:nth-child(3){
                >h2{
                    height: toRem(71px);
                    padding-left: toRem(25px);
                    @include sc(toRem(38px),#3e3e3e);
                    line-height: toRem(71px);
                    border-bottom:toRem(1px) solid #626262;
                    >span{
                         @include sc(toRem(24px),#099fde);
                         margin-left: toRem(25px);
                    }
                }
            }
            &:nth-child(2){
                margin: toRem(12px) 0;
                >div{
                     padding: toRem(25px) toRem(60px) toRem(13px) toRem(60px);
                    >div{
                        >a{
                           @include sc(toRem(28px),#3e3e3e); 
                           margin-right: toRem(35px);
                           &.active{
                               @include sc(toRem(28px),#099fde); 
                           }
                        }
                    }
                    >a{
                        float: right;
                        display: inline-block;
                        height: toRem(25px);
                        // padding-right: toRem(23px);
                    }
                    p{
                        clear: both;
                    }
                }
            }
            &:nth-child(3){
                .passenger-numbers{
                    margin-top: toRem(10px);
                    >div{
                        padding: 0 toRem(62px) 0 toRem(30px);
                        >h1{
                            line-height: toRem(47px);
                            >em{
                              @include sc(toRem(26px),#000);  
                              margin-right: toRem(54px);
                            }
                            >span{
                             @include sc(toRem(47px),#e20836); 
                             line-height: toRem(47px);
                             >i{
                                 @include sc(toRem(26px),#282828);  
                             }    
                            }
                            >div{
                                display: inline-block;
                                float: right;
                                font-size: 0px;
                                >i{
                                    display: inline-block;
                                    vertical-align: middle;
                                    @include wh(toRem(42px),toRem(42px));
                                    background: url('../../assets/image/reduce.png') no-repeat;
                                    background-size: 100%;
                                    &.add{
                                        background: url('../../assets/image/add.png') no-repeat;
                                        background-size: cover;
                                    }
                                    &.not-reduce{
                                        background: url('../../assets/image/not-reduce.png') no-repeat;
                                        background-size: cover;
                                    }
                                }
                                >input{
                                    display: inline-block;
                                    vertical-align: middle;
                                    @include wh(toRem(98px),toRem(42px));
                                    line-height: toRem(42px);
                                    @include sc(toRem(31px),#000);
                                    text-align: center;
                                    border:1px solid #aaa;
                                    margin: 0 toRem(13px);
                                }
                            }
                        }
                        >p{
                           @include sc(toRem(20px),#868686); 
                           padding-bottom: toRem(10px);
                        }
                    }
                }
            }
        }
    }
     .group-seletion-bottom{
        position: fixed;
        bottom: 0;
        height:toRem(98px);
        width:100%;
        >div{
            width: 100%;
            position: relative;
            >div{
                background: #eee;
                padding: toRem(16px) 0 0 toRem(31px);
                height: toRem(98px);
                width:50%;
                >h2{
                    @include sc(toRem(26px),#050505);
                    line-height: toRem(26px);
                    >span{
                       @include sc(toRem(26px),#eb6100); 
                    }
                }
                >p{
                     @include sc(toRem(21px),#6e6e6e); 
                }
            }
            >a{
                position: absolute;
                display: inline-block;
                top:0;
                right:0;
                @include wh(toRem(389px),toRem(98px));
                @include sc(toRem(30px),#fff);
                text-align: center;
                background: #222;
                line-height: toRem(98px);
            }
        }
    }
}
</style>

