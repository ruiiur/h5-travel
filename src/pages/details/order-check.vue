<!--这是订单核对页面-->
<template>
    <div class="order-check">
        <div class="order-check-content">
            <div>
                <h2>五星全包游</h2>
                <p>{{productContent.aliasename}}</p>
                <h3>出发日期：{{chooseDay}}  <span v-for="pricePolicy in tourSelectedList">{{pricePolicy.count}}{{pricePolicy.policyName}}</span></h3>
            </div>
            <div>
                <div class="passenger-numbers">
                    <!-- <div>
                        <h1>
                            <em>成人</em>
                            <div>
                                <i :class="minNum==1?'not-reduce':''"></i>
                                <input v-model="minNum" type="number">
                                <i class="add"></i>
                            </div>
                            <span>￥3899<i>/人</i></span>
                        </h1>
                        <p>65岁周岁以上不含</p>
                    </div> -->
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
                     <div v-for="(pricePolicy,index) in tourSelectedList">
                        <h1>
                            <em>{{pricePolicy.policyName}}</em>
                            <span>￥{{pricePolicy.salesPrice}}<i>/人</i></span>
                            <div>
                                <i :class="pricePolicy.count==1&&pricePolicy.policyName=='成人价'?'not-reduce':''" @click="reduceFun(pricePolicy)"></i>
                                <input v-model="pricePolicy.count" type="number" @input="changeCount()">
                                <!-- <input v-model="minNumChildren" type="number" v-if="pricePolicy.policyName=='儿童价'&&minNumChildren>0"> -->
                                <i class="add" @click="addFun(pricePolicy)"></i>
                            </div>
                        </h1>
                        <p v-if="pricePolicy.policyName=='成人价'">65岁周岁以上不含</p>
                        <p v-if="pricePolicy.policyName=='儿童价'">2-12周岁不含</p>
                    </div>
                </div>
                <div>
                    <h2>机票<span>所有航班起抵时间均为当地时间（24小时制）</span><a href="javascript:;">退改签说明</a></h2>
                    <ul>
                        <li v-for="(flight,index) in flightList" v-if="flight.status==1">
                            <h3>{{flight.flightinfo.flightdate}}<em v-if="flight.days!=0">隔夜航班</em><span><i></i>{{flight.flightinfo.times}}<em>剩{{flight.flightcabin.cabinnum}}张</em></span></h3>
                            <h1><span>{{flight.flightinfo.begintime}}</span><i>{{flight.flightinfo.ariline}}{{flight.flightinfo.flightno}}</i><span>{{flight.flightinfo.endtime}}</span></h1>
                            <h2><i>{{flight.goCityName}}</i><span><i>{{flight.flightcabin.cabinname}}</i></span><i>{{flight.backCityName}}</i></h2>
                            <p>{{flight.goAirportName}}<span>{{flight.backAirportName}}<i>+{{flight.days}}</i></span></p>
                        </li>
                         <li v-for="(flight,index) in flightList" v-if="flight.status==2">
                            <h3>{{flight.flightinfo.flightdate}}<em v-if="flight.days!=0">隔夜航班</em><span><i></i>{{flight.flightinfo.times}}<em>剩{{flight.flightcabin.cabinnum}}张</em></span></h3>
                            <h1><span>{{flight.flightinfo.endtime}}</span><i>{{flight.flightinfo.ariline}}{{flight.flightinfo.flightno}}</i><span>{{flight.flightinfo.begintime}}</span></h1>
                            <h2><i>{{flight.backCityName}}</i><span :class="flight.status==2?'arrived':''"><i>{{flight.flightcabin.cabinname}}</i></span><i>{{flight.goCityName}}</i></h2>
                            <p>{{flight.backAirportName}}<span>{{flight.goAirportName}}<i>+{{flight.days}}</i></span></p>
                        </li>
                    </ul>
                    <p><span><i></i>航班价格变动频繁，请在提交订单后20分钟内完成支付。</span><a href="javascript:;">更换航班</a></p>
                </div>
                <div>
                    <h2>酒店</h2>
                    <h3>三亚 <span>2018-05-23至2018-05-28（5晚）</span></h3>
                    <p>三亚哈曼度假酒店 <span>港湾房</span><em>1间</em><a href="javascript:;">退改说明</a></p>
                </div>
                <div>
                    <h2>单房差</h2>
                    <p>需支付房差费<span> ¥{{singleRoomPrice}}元</span></p>
                    <div class="single-room">
                        <i  @click="reduceSingleNum()"></i>
                        <input  type="number" v-model="singleNum">
                        <!-- <input v-model="minNumChildren" type="number" v-if="pricePolicy.policyName=='儿童价'&&minNumChildren>0"> -->
                        <i class="add" @click="addSingleNum()"></i>
                    </div>
                </div>
                <div>
                    <h2>优惠</h2>
                    <p>两人起订，立减200元<span>- ¥580元</span></p>
                </div>
                <div>
                    <h2>限时赠送</h2>
                    <p>含价值198元2人一次下午茶<span><em>原价：188元</em><i>免费</i></span></p>
                    <p>潜水代金券<span><em>原价：300元</em><i>免费</i></span></p>
                </div>
                <div>
                    <h2>预定说明</h2>
                    <div>
                        <!-- <h3>自理费用</h3> -->
                        <!-- <p>
                        因景区儿童标准不一样，儿童价不含景区门票费用，如产生儿童门票费用，游客可自行到景区购买门票或由导游代为购买。
                        超重行李的托运费、保管费; 因交通延阻、罢工、天气、机器故障等不可抗力原因所导致的额外费用: 酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费; 自由活动期间的用车服务; 提供导游服务的产品在自由活动期间无陪同服务;当地参加的自费以及“费用包含”中不包含的其它项目。 
                        </p> -->
                        <p>{{productContent.attention}}</p>
                    </div>
                    <!-- <div>
                        <h3>费用包含</h3>
                        <p>往返经济舱机票燃油附加费（以实际收费标准为准）机场建设费</p>
                        <p>行程所列酒店住宿费用</p>
                        <p>默认安排双床，如您需要大床 请备注告知，我们尽量协调安排行程内所列餐食，具体情况请见行程推荐/安排。</p>
                        <p>当地中文导游服务。</p>
                        <p>安排当地专属用车(除部分特殊路段因当地规定及安全考量，则依规定派遣小型车)。</p>
                        <p>行程中所列景点首道大门票蜈支洲岛、天堂森林公园、南山、天涯海角</p>
                        <p>如需加床 70元每天每间</p>
                        <p>儿童价特殊说明：年龄2--12周岁（不含），不占床,含机票、机票税，车费、导游费用、半正餐费。不含任何景点门票、早餐及其它费用，产生超高及其他费用需自理。</p>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="order-check-bottom">
         <div>
             <div>
                 <div>
                     <p>总费用</p>
                     <h2><span >{{sum}}</span><a href="javascript:;">明细</a></h2>
                 </div>
                 <div>
                     <img src="../../assets/image/contact.png" alt="">
                     <p>联系客服</p>
                 </div>
             </div>
             <a href="javascript:;" @click="continueConfirm()">继续确认行程</a>
         </div>
       </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {getMessage,validateInfo } from '../../services/index';
import { mapState, mapActions, mapMutations } from 'vuex'
import tools from '../../common/tools'
import { apiUrl } from '../../common/env'
export default {
    data(){
        return{
           minNum:1,
           flightList:[
            //    {
            //       date:'2018/05/23',
            //       type:'隔夜航班',
            //       time:'3h15m',
            //       remain:'9',
            //       flightNo:'南方航空CZ6782',
            //       startTime:'20:50',
            //       endTime:'00:05',
            //       origin:'上海',
            //       destination:'三亚',
            //       seatType:'经济舱',
            //       leaveAirport:'浦东国际机场T2',
            //       arrivedAirport:'凤凰国际机场T1',
            //       interval:'1',
            //       status:'0'//出发
            //    },
           ],
           tourSelectedList:[],//团期选择相关信息
           singleRoomPrice:'',//单房差价格
           productContent:'',//产品相关信息
           sum:0,
           chooseDay:'',
           singleNum:0,//单房差数量
           peopleCount:0,//总人数
        }
    },
    methods: {
         // 机票相关信息
       getMessageInit(){
           return new Promise((resolve,reject)=>{
               let that = this;
                // let id='13D76550-8963-4F8F-8AE8-193D9A8D6FC0';
                let params={
                    'proid':'13D76550-8963-4F8F-8AE8-193D9A8D6FC0',
                    'tourid':'CD73A758-5128-48D8-84F2-45C95C3D7C88'
                    };
                getMessage(params).then(function(response){
                    resolve(response);
                 console.log(response);
                if(response.meta.success=true){
                    console.log('请求机票相关数据成功');
                    that.flightList=response.data.flightInfodto;
                    that.singleRoomPrice=response.data.singleRoomPrice;
                    //    window.localStorage.setItem('singleRoomPrice',response.data.singleRoomPrice);
                    that.productContent=response.data.proProduct;
                    console.log(that.singleRoomPrice);
                }
                else{
                    console.log('请求机票相关数据失败');
                }
            }).catch(function(err){
                that.$Message.info('机票信息接口获取失败');
            });
           })
       },
       //初次计算sum
       init(){
        //    this.getMessageInit();
           this.tourSelectedList=JSON.parse(window.localStorage.getItem('pricePolicyList'));
           console.log(this.tourSelectedList);
           for(let i=0;i<this.tourSelectedList.length;i++){
              this.peopleCount+=parseFloat(this.tourSelectedList[i].count);
              this.computedSingleNum();
              this.sum+=parseFloat(this.tourSelectedList[i].count)*parseFloat(this.tourSelectedList[i].salesPrice);
              console.log(this.singleRoomPrice);
            //   console.log(window.localStorage.getItem('singleRoomPrice'));
              console.log(this.singleNum);
           }
           console.log(this.sum);
           console.log(this.peopleCount);
         },
        //    计算sum
        computedSum(){
            this.sum=0;
            this.peopleCount=0;
            for(let i=0;i<this.tourSelectedList.length;i++){
                this.peopleCount+=parseFloat(this.tourSelectedList[i].count);
                this.sum+=parseFloat(this.tourSelectedList[i].count)*parseFloat(this.tourSelectedList[i].salesPrice);
            }
        },
        //计算单房差初始值
        computedSingleNum(){
            if(this.peopleCount%2==0){
                this.singleNum=0;
            }
            else {
                this.singleNum=1;
            }
        },
        //减少单房差
        reduceSingleNum(){
            if(this.peopleCount%2==0&&this.singleNum>0){
                this.singleNum--;
            }
            else if(this.peopleCount%2==0&&this.singleNum==0){
                this.singleNum=0;
                alert('已经是最少的啦')                
            }
            else  if(this.peopleCount%2!=0&&this.singleNum>1){
                this.singleNum--;             
            }
            else {
                this.singleNum=1;
                alert('因为人数原因，至少有一个')
            }
        },
        //增加单房差数量
        addSingleNum(){
          this.singleNum++;
        },
        //减少人数
       reduceFun(pricePolicy){
        pricePolicy.count--;
        console.log(pricePolicy.count);
        console.log('reduce');
        this.computedSum();
        this.computedSingleNum();
        console.log(this.peopleCount);
       },
       //增加人数
       addFun(pricePolicy){
        pricePolicy.count++;
        console.log('add');
        this.computedSum();
        this.computedSingleNum();
        console.log(this.peopleCount);
       },
       //input输入框人数改变的时候
       changeCount(){
           this.sum=0;
            for(let i=0;i<this.tourSelectedList.length;i++){ 
                if(this.tourSelectedList[i].count){
                    this.sum+=parseFloat(this.tourSelectedList[i].count)*parseFloat(this.tourSelectedList[i].salesPrice);
                }
            }         
       },
       //点击继续确认
       continueConfirm(){
           let that = this;
           window.localStorage.setItem('pricePolicyList',JSON.stringify(this.tourSelectedList));
           let tourid=window.localStorage.getItem('tourid');
           let tourSelectedList=JSON.parse(window.localStorage.getItem('pricePolicyList'));
           let policyidArr=[];
           let numArr=[];
            for(let i=0;i<tourSelectedList.length;i++){
                policyidArr.push(tourSelectedList[i].id);
                numArr.push(eval(tourSelectedList[i].count));
            }
            let params={
                'policyid':policyidArr,
                'personnum':numArr,
                'tourid':tourid,
                'totalprice':that.sum,
                'singleroomprice':that.singleNum
            };
            validateInfo(params).then(function(response){
                 console.log(response);
                if(response.meta.success=true){
                    console.log('校验信息成功');
                }
                else{
                    console.log('校验信息失败');
                }
            }).catch(function(err){
                that.$Message.info('校验信息接口获取失败');
            });
       }
    },
    mounted(){
        console.log(this.singleRoomPrice);
         this.chooseDay=window.localStorage.getItem('selectedDay');
         this.getMessageInit();
         this.init();
         this.computedSingleNum();
    },
    computed:{
    },
    components: {
    //  calendarView
    },
}
</script>

<style lang="scss">
.order-check{
    .order-check-content{
        padding-bottom: toRem(98px);
        >div{
            &:nth-child(1){
                background: url('../../assets/image/order-bg.png') no-repeat;
                height: toRem(235px);
                background-size: 100%;
                padding: toRem(26px) toRem(38px) 0 toRem(29px);
                >h2{
                    @include sc(toRem(42px),#fff);
                    line-height: toRem(42px);
                }
                >p{
                   @include sc(toRem(28px),#fff);  
                   line-height: toRem(35px);
                   margin: toRem(17px) 0 toRem(14px) 0;
                }
                >h3{
                    @include sc(toRem(26px),#1cfdc5);
                    line-height: toRem(26px);
                }
            }
             &:nth-child(2){
                 padding: 0 toRem(40px);
                .passenger-numbers{
                    margin-bottom: toRem(24px);
                    >div{
                        >h1{
                            >em{
                              @include sc(toRem(26px),#000);  
                              margin-right: toRem(40px);
                            }
                            >span{
                                float: right;
                             @include sc(toRem(47px),#e20836); 
                             >i{
                                 @include sc(toRem(26px),#282828);  
                             }    
                            }
                            >div{
                                display: inline-block;
                                >i{
                                    display: inline-block;
                                    vertical-align: middle;
                                    @include wh(toRem(41px),toRem(41px));
                                    background: url('../../assets/image/reduce.png') no-repeat;
                                    background-size: 100%;
                                    &.add{
                                        background: url('../../assets/image/add.png') no-repeat;
                                        background-size: 100%;
                                    }
                                    &.not-reduce{
                                        background: url('../../assets/image/not-reduce.png') no-repeat;
                                        background-size: 100%;
                                    }
                                }
                                >input{
                                    display: inline-block;
                                    vertical-align: middle;
                                    @include wh(toRem(98px),toRem(41px));
                                    line-height: toRem(41px);
                                    @include sc(toRem(31px),#000);
                                    text-align: center;
                                    border:1px solid #aaa;
                                }
                            }
                        }
                        >p{
                           @include sc(toRem(20px),#868686); 
                        }
                    }
                }
                >div:not(.passenger-numbers){
                    padding-bottom: toRem(35px);
                    border-bottom: 1px solid #a0a0a0;
                    margin-bottom: toRem(28px);
                    >h2{
                       @include sc(toRem(38px),#1c7dab);
                       height: toRem(66px);
                       border-bottom:toRem(6px) solid #eee; 
                       padding-left: toRem(3px);
                       padding-right: toRem(10px);
                       background: #f6f6f6;
                       line-height: toRem(66px);
                       font-weight: bold;
                    //    box-sizing: border-box;
                       >span{
                          @include sc(toRem(20px),#1c7dab);  
                          margin-left: toRem(14px);
                          font-weight: normal;
                       }
                       >a{
                            float: right;
                            @include sc(toRem(20px),#1c7dab);  
                            margin-top: toRem(10px);
                            font-weight: normal;
                       } 
                    }
                    &:nth-child(2){
                        >ul{
                            >li{
                                padding-top: toRem(30px);
                                padding-bottom: toRem(30px);
                                >h3{
                                    @include sc(toRem(26px),#434343);
                                    >em{
                                        display: inline-block;
                                        @include wh(toRem(133px),toRem(35px));
                                        border:toRem(2px) solid #7ecef4;
                                        line-height: toRem(35px);
                                        text-align: center;
                                        margin-left: toRem(11px);
                                    }
                                    >span{
                                        float: right;
                                        border-left:toRem(2px) solid #aaa;
                                        line-height: toRem(22px);
                                        padding-left: toRem(10px);
                                        >i{
                                            background: url('../../assets/image/time.png') no-repeat;
                                            @include wh(toRem(22px),toRem(22px));
                                            display: inline-block;
                                            background-size: 100%;
                                            margin-right: toRem(4px);
                                        }
                                        @include sc(toRem(24px),#434343);
                                        >em{
                                            @include sc(toRem(21px),#fb184d);
                                            margin-left: toRem(15px);
                                        }
                                    }
                                }
                                >h1{
                                    padding:0 toRem(93px);
                                    margin-top: toRem(10px);
                                    >span{
                                        @include sc(toRem(42px),#434343);
                                    }
                                    >i{
                                         @include sc(toRem(23px),#434343);
                                         margin:0 toRem(58px) 0 toRem(32px);
                                         display: inline-block;
                                         min-width: toRem(190px);
                                    }
                                }
                                >h2{
                                    padding:0 toRem(120px);
                                    >i{
                                        @include sc(toRem(25px),#434343);
                                        font-weight: bold;
                                    }
                                    >span{
                                        position: relative;
                                        display: inline-block;
                                        width: toRem(182px);
                                        height:toRem(20px);
                                        margin: 0 toRem(79px) 0 toRem(62px);
                                        background: url('../../assets/image/right.png') no-repeat;
                                        background-size: 100%;
                                        &.arrived{
                                            background: url('../../assets/image/left.png') no-repeat;
                                            background-size: 100%;
                                        }
                                        >i{
                                            position: absolute;
                                            @include sc(toRem(23px),#434343);
                                            left:toRem(53px);
                                            bottom:toRem(10px);
                                        }
                                    }
                                }
                                >p{
                                    padding: 0 toRem(65px);
                                     @include sc(toRem(22px),#434343);
                                    >span{
                                         float:right;
                                         @include sc(toRem(22px),#434343);
                                         >i{
                                             @include sc(toRem(22px),#0c86ee); 
                                             margin-left: toRem(10px);
                                         }
                                    }
                                }
                                &:nth-child(1){
                                    border-bottom:1px dashed #a0a0a0;
                                }
                            }
                        }
                        >p{
                            >span{
                                display: inline-block;
                                @include sc(toRem(18px),#434343); 
                                background-color: #dcdcdc;
                                height:toRem(32px);
                                padding:0 toRem( 13px) 0 toRem(10px);
                                line-height: toRem(32px);
                                >i{
                                    display: inline-block;
                                    vertical-align: middle;
                                    @include wh(toRem(24px),toRem(24px));
                                    background: url('../../assets/image/tip.png') no-repeat;
                                    background-size: 100%;
                                    margin-right: toRem(8px);
                                }
                            }
                            >a{
                                float: right;
                               @include sc(toRem(24px),#1c7dab); 
                            }
                        }
                    }
                     &:nth-child(3){
                        >h3{
                            @include sc(toRem(30px),#434343);
                            font-weight: bold;
                            line-height: toRem(30px);
                            margin: toRem(24px) 0 toRem(30px) 0;
                            >span{
                                @include sc(toRem(24px),#434343);
                                font-weight: normal;
                                margin-left: toRem(43px);
                            }
                        }
                        >p{
                            @include sc(toRem(28px),#434343);
                            line-height: toRem(28px);
                            >span{
                                @include sc(toRem(28px),#434343);
                                margin: 0 toRem(80px) 0 toRem(62px);
                            }
                            >em{
                                @include sc(toRem(28px),#434343);
                            }
                            >a{
                                float: right;
                                @include sc(toRem(24px),#ff6420);
                            }
                        }
                        
                    }
                    &:nth-child(4){
                         >p{
                             display: inline-block;
                           font-size: toRem(28px);
                           color:#222;
                           margin-top: toRem(35px);
                           line-height: toRem(28px);
                           padding-right: toRem(18px);
                           >span{
                            //    float: right;
                               color: #ff851c;
                               margin-left: toRem(200px);
                           } 
                        }
                        .single-room{
                            display: inline-block;
                            float: right;
                            margin-top: toRem(30px);
                             >i{
                                display: inline-block;
                                vertical-align: middle;
                                @include wh(toRem(41px),toRem(41px));
                                background: url('../../assets/image/reduce.png') no-repeat;
                                background-size: 100%;
                                &.add{
                                    background: url('../../assets/image/add.png') no-repeat;
                                    background-size: 100%;
                                }
                                &.not-reduce{
                                    background: url('../../assets/image/not-reduce.png') no-repeat;
                                    background-size: 100%;
                                }
                            }
                            >input{
                                display: inline-block;
                                vertical-align: middle;
                                @include wh(toRem(98px),toRem(41px));
                                line-height: toRem(41px);
                                @include sc(toRem(31px),#000);
                                text-align: center;
                                border:1px solid #aaa;
                            }
                        }
                    }
                     &:nth-child(5){
                        >p{
                           font-size: toRem(28px);
                           color:#222;
                           margin-top: toRem(35px);
                           line-height: toRem(28px);
                           padding-right: toRem(18px);
                           >span{
                               float: right;
                               color: #ff851c;
                           } 
                        }
                    }
                     &:nth-child(6){
                        >p{
                            @include sc(toRem(28px),#222);
                            padding-right: toRem(11px);
                            line-height: toRem(28px);
                            >span{
                               float: right;
                               >em{
                                   @include sc(toRem(24px),#4e4d4d);
                                    text-decoration: line-through;
                               }
                               >i{
                                   @include sc(toRem(24px),#ff851c);
                                   margin-left: toRem(15px);
                               } 
                            }
                            &:nth-child(2){
                                margin: toRem(28px) 0 toRem(23px) 0;
                            }
                        }
                    }
                    &:nth-child(7){
                        margin-bottom: toRem(97px);
                        >div{
                            margin-top: toRem(30px);
                            >h3{
                                @include sc(toRem(24px),#333);
                                font-weight: 600;
                            }
                            >p{
                                @include sc(toRem(24px),#222);
                            }
                        }
                    }
                }
            }
        }
    }
    .order-check-bottom{
        position: fixed;
        bottom: 0;
        height:toRem(98px);
        width:100%;
        >div{
            width: 100%;
            position: relative;
            >div{
                background: #eee;
                padding: toRem(10px) 0 0 toRem(10px);
                >div{
                    display: inline-block;
                    &:nth-child(1){
                        >p{
                           @include sc(toRem(22px),#eb6100); 
                           line-height: toRem(22px);
                           margin-bottom: toRem(4px);
                        }
                        >h2{
                            line-height: toRem(50px);
                            padding-left: toRem(16px);
                            >span{
                                @include sc(toRem(50px),#eb6100);
                                &:before{
                                    content:'￥';
                                    @include sc(toRem(24px),#eb6100);
                                }
                            }
                            >a{
                               text-decoration: underline;
                               @include sc(toRem(20px),#272727); 
                               margin-left: toRem(17px);
                               margin-right: toRem(45px);
                            }
                        }
                    }
                    &:nth-child(2){
                        text-align: center;
                        >img{
                            @include wh(toRem(47px),toRem(46px));
                        }
                        >p{
                           @include sc(toRem(17px),#272727); 
                        }
                    }
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

