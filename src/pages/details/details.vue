<!--这是详情页面-->
<template>
    <div class="details">
        <div class="details-top">
            <img src="../../assets/image/bg-1.png" alt="">
            <i></i>
        </div>
       <h1>{{productName}} </h1>
        <p><span>{{productDetail.price}}</span></p>
       <div class="group-stage">
           <h2>团期选择<span>展开<i @click="openFun()" :class="open==true?'active':''"></i></span></h2>
           <div v-if="open==false" class="not-open">
               <ul>
                   <li v-for="group in groupList">
                       <p>{{group.tourDate}}</p>
                       <h3>￥{{group.salesPrice}}</h3>
                    </li>
               </ul>
           </div>
           <div v-if="open==true" class="spread-calendar">
               <calendarView></calendarView>
           </div>
       </div>
       <span></span>
       <div class="tab-content">
            <ul>
                <li v-for="(tab,index) in tabList" @click="tabIndex=index" :class="tabIndex==index?'active':''"><span>{{tab.name}}</span></li>
            </ul>
            <div v-if="tabIndex==0">
               <img src="../../assets/image/bg-2.png" alt="">
                <div>
                    <h2>行程美景</h2>
                    <div>
                        <p>蜈支洲岛</p>
                        <img src="../../assets/image/bg-3.png" alt="">
                        <div>
                            <img src="../../assets/image/bg-4.png" alt="">
                            <img src="../../assets/image/bg-5.png" alt="">
                        </div>
                    </div>
                    <div>
                        <p>天涯海角</p>
                        <img src="../../assets/image/bg-6.png" alt="">
                        <div>
                            <img src="../../assets/image/bg-7.png" alt="">
                            <img src="../../assets/image/bg-8.png" alt="">
                        </div>
                    </div>
                </div>
                <div>
                    <h2>入住酒店</h2>
                    <p><i></i><span>凤凰岛度假酒店</span></p>
                    <img src="../../assets/image/bg-10.png" alt="">
                    <p><i></i><span>三亚凤凰岛位于三亚湾“阳光海岸”的核心区，一期工程规划有七大项目，即：国际邮轮母港、七星级酒店、国际养生度假中心、国际游艇会、热带风情商业街、商务度假别墅、奥运主题公园。</span></p>
                    <img src="../../assets/image/bg-11.png" alt="">
                    <img src="../../assets/image/bg-12.png" alt="">
                    <div>
                        <img src="../../assets/image/bg-13.png" alt="">
                        <img src="../../assets/image/bg-14.png" alt="">
                    </div>
                    <p><i></i><span>酒店将是您情侣蜜月、时尚旅行、亲子旅游及家庭聚会的不二之选，在这里您将与大海融为一体，尽情享受海岛生活的愉悦！</span></p>
                </div>
                <div>
                    <h2>精品美食</h2>
                    <img src="../../assets/image/bg-15.png" alt="">
                    <div>
                        <img src="../../assets/image/bg-16.png" alt="">
                        <img src="../../assets/image/bg-17.png" alt="">
                    </div>
                    <img src="../../assets/image/bg-18.png" alt="">
                    <img src="../../assets/image/bg-19.png" alt="">
                </div>
            </div>
            <div v-if="tabIndex==1">
                <div class="trip">
                    <h1>参考航班</h1>
                    <div class="trip-line" v-for="traffic in trafficList">
                        <p><i></i>机票<span>{{traffic.depname}}<i></i>{{traffic.arrname}}</span></p>
                        <div>
                            <div>
                                <h1>{{traffic.deptime}}<span>{{traffic.arrtime}}</span></h1>
                                <h2>{{traffic.depname}}<i></i>{{traffic.arrname}}</h2>
                                <!-- <p>{{traffic.depname}}<span>{{traffic.arrname}}<i></i></span></p> -->
                            </div>
                            <div>
                                <p>{{traffic.airline}}</p>
                                <p>{{traffic.flightno}}</p>
                            </div>
                            <!-- <span>经济舱</span> -->
                        </div>
                    </div>
                    <div class="first-day">
                        <h2 class="title-line"><i></i>{{tripList[0].schName}}</h2>
                        <div class="hotel">
                            <h2><i></i>酒店</h2>
                            <p>参考酒店：石溪墅建国度假酒店</p>
                            <div>
                                <img src="../../assets/image/xc1.png" alt="">
                                <img src="../../assets/image/xc2.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="second-day">
                        <h2 class="title-line"><i></i>{{tripList[1].schName}}</h2>
                        <div class="scene">
                             <h2><i></i>景点</h2>
                             <div>
                                 <h3>蜈支洲岛</h3>
                                 <p>{{tripList[1].schInfo}}</p>
                                 <div>
                                    <img src="../../assets/image/xc3.png" alt="">
                                    <img src="../../assets/image/xc4.png" alt="">
                                 </div>
                             </div>
                              <div>
                                 <h3>天涯海角</h3>
                                 <p>天涯海角游览区，位于海南省三亚市天涯区，距主城区西南约23公里处，背对马岭山，面向茫茫大海，是海南建省20年第一旅游名胜，新中国成立60周年海南第一旅游品牌.</p>
                                 <div>
                                    <img src="../../assets/image/xc3.png" alt="">
                                    <img src="../../assets/image/xc4.png" alt="">
                                 </div>
                             </div>
                        </div>
                        <div class="hotel">
                            <h2><i></i>酒店</h2>
                            <p>参考酒店：{{tripList[1].schStay}}</p>
                            <div>
                                <img src="../../assets/image/xc3.png" alt="">
                                <img src="../../assets/image/xc4.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="three-day">
                        <h2 class="title-line"><i></i>{{tripList[2].schName}}</h2>
                        <div class="scene">
                             <h2><i></i>景点</h2>
                             <div>
                                 <h3>蜈支洲岛</h3>
                                 <p>{{tripList[2].schInfo}}</p>
                                 <div>
                                    <img src="../../assets/image/xc3.png" alt="">
                                    <img src="../../assets/image/xc4.png" alt="">
                                 </div>
                             </div>
                              <div>
                                 <h3>天涯海角</h3>
                                 <p>天涯海角游览区，位于海南省三亚市天涯区，距主城区西南约23公里处，背对马岭山，面向茫茫大海，是海南建省20年第一旅游名胜，新中国成立60周年海南第一旅游品牌.</p>
                                 <div>
                                    <img src="../../assets/image/xc3.png" alt="">
                                    <img src="../../assets/image/xc4.png" alt="">
                                 </div>
                             </div>
                        </div>
                        <div class="hotel">
                            <h2><i></i>酒店</h2>
                            <p>参考酒店：{{tripList[2].schStay}}</p>
                            <div>
                                <img src="../../assets/image/xc3.png" alt="">
                                <img src="../../assets/image/xc4.png" alt="">
                            </div>
                        </div>
                        <div class="entertainment">
                            <h2><i></i>娱乐</h2>
                            <p>骏达车技</p>
                            <div>
                                <img src="../../assets/image/xc3.png" alt="">
                                <img src="../../assets/image/xc4.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="four-day">
                        <h2 class="title-line"><i></i>{{tripList[3].schName}}</h2>
                        <div class="scene">
                             <h2><i></i>景点</h2>
                             <div>
                                 <h3>蜈支洲岛</h3>
                                 <p>{{tripList[3].schInfo}}</p>
                                 <div>
                                    <img src="../../assets/image/xc3.png" alt="">
                                    <img src="../../assets/image/xc4.png" alt="">
                                 </div>
                             </div>
                              <div>
                                 <h3>天涯海角</h3>
                                 <p>天涯海角游览区，位于海南省三亚市天涯区，距主城区西南约23公里处，背对马岭山，面向茫茫大海，是海南建省20年第一旅游名胜，新中国成立60周年海南第一旅游品牌.</p>
                                 <div>
                                    <img src="../../assets/image/xc3.png" alt="">
                                    <img src="../../assets/image/xc4.png" alt="">
                                 </div>
                             </div>
                        </div>
                        <div class="hotel">
                            <h2><i></i>酒店</h2>
                            <p>参考酒店：{{tripList[3].schStay}}</p>
                            <div>
                                <img src="../../assets/image/xc3.png" alt="">
                                <img src="../../assets/image/xc4.png" alt="">
                            </div>
                        </div>
                        <div class="entertainment">
                            <h2><i></i>娱乐</h2>
                            <p>骏达车技</p>
                            <div>
                                <img src="../../assets/image/xc3.png" alt="">
                                <img src="../../assets/image/xc4.png" alt="">
                            </div>
                        </div>
                    </div>
                     <div class="five-day">
                        <h2 class="title-line"><i></i>{{tripList[4].schName}}</h2>
                        <!-- <div class="trip-line">
                            <p><i></i>机票<span>上海<i></i>三亚</span></p>
                            <div>
                                <div>
                                    <h1>20:50<span>00:05</span></h1>
                                    <h2>上海<i></i>三亚</h2>
                                    <p>浦东国际机场T2<span>凤凰国际机场T1<i></i></span></p>
                                </div>
                                <div>
                                    <p>南方航空</p>
                                    <p>CZ6782</p>
                                </div>
                                <span>经济舱</span>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
             <div v-if="tabIndex==2">
                这是游客评价的内容
            </div>
        </div>
        <div class="details-bottom">
            <div>
                <ul>
                    <li><img src="../../assets/image/information.png" alt=""><p>客服</p></li>
                    <li><img src="../../assets/image/details-home.png" alt=""><p>首页</p></li>
                    <li><img src="../../assets/image/details-c.png" alt=""><p>收藏</p></li>
                </ul>
                <!-- <a href="#/fill-information">开始预定<span>(填写信息)</span></a> -->
                <!-- <a href="#/order-check">开始预定<span>(填写信息)</span></a> -->
                <a href="#/group-selection" >开始预定<span>(填写信息)</span></a>
            </div>
        </div>
    </div>
</template>
<script>
import calendarView from '../../components/calendar'
import Vue from 'vue'
import axios from 'axios'
import {getDetail,getTourList } from '../../services/index';
import { mapState, mapActions, mapMutations } from 'vuex'
import tools from '../../common/tools'
import { apiUrl } from '../../common/env'
export default {
   data(){
       return{
           open:false,
           tabList:[
               {name:'产品亮点'},
               {name:'行程介绍'},
               {name:'游客评价'},
           ],//tab切换
           tabIndex:0,//tab默认值
           groupList:[
               {
                   time:'5月10号',
                   price:'3899'
               },
               {
                   time:'5月11号',
                   price:'3899'
               },
               {
                   time:'5月12号',
                   price:'3899'
               },
               {
                   time:'5月13号',
                   price:'3899'
               },
               {
                   time:'5月14号',
                   price:'3899'
               },
               {
                   time:'5月15号',
                   price:'3899'
               },
               {
                   time:'5月15号',
                   price:'3899'
               },
           ],
           productDetail:{},
           tourList:[],//团期数组
           productName:'',
           tripList:[],//行程规划
           trafficList:[],//行程介绍的航班
       }
   },
    methods: {
        openFun(){
            this.open=!this.open;
        },
        // 获取详情信息
       getDetailsInit(){
            let that = this;
            let params=that.$route.params.id;
            window.localStorage.setItem('proid',params);
             getDetail(params).then(function(response){
              console.log(response);
              if(response.meta.success=true){
                   console.log('请求详情数据成功');
                   that.productDetail=response.data;
                   that.productName=response.data.product.proname;
                   that.tripList=response.data.scheduleList;
                   that.trafficList=response.data.trafficList;
                   console.log(that.productDetail);
              }
              else{
                   console.log('请求详情数据失败');
              }
          }).catch(function(err){
            that.$Message.info('详情接口获取失败');
        });
       },

    // 获取团期信息
    getTourListInit(){
            let that = this;
            let params='13D76550-8963-4F8F-8AE8-193D9A8D6FC0';
             getTourList(params).then(function(response){
              console.log(response);
              if(response.meta.success=true){
                   console.log('请求团期数据成功');
                   that.groupList=response.data[0].tourList;
                   that.tourList=response.data;
                   console.log(that.groupList);
                   console.log(that.tourList);
                    window.localStorage.setItem('tourList',JSON.stringify(that.tourList));
              }
              else{
                   console.log('请求团期数据失败');
              }
          }).catch(function(err){
            that.$Message.info('团期接口获取失败');
        });
       }
    },
    mounted(){
        this.getDetailsInit();
        this.getTourListInit();
    },
    components: {
        calendarView
    },
}
</script>

<style lang="scss">
.details{
    padding-bottom: toRem(94px);
    .details-top{
        position: relative;
        height:toRem(360px);
        >img{
            width:100%;
            height:toRem(360px);
       }
       >i{
           position: absolute;
           bottom: toRem(-3px);
           background: url('../../assets/image/bg-s.png');
           width: 100%;
           height: toRem(171px);
           background-size:100%;
       }
    }
    >h1{
       @include sc(toRem(44px),#151516);
       padding: toRem(23px) toRem(33px) 0 toRem(20px);
    //    margin-bottom: toRem(10px);
       @include sc(toRem(25px),#747474);
    }
    >p{
        @include sc(toRem(20px),#747474);
        padding: 0 toRem(33px) 0 toRem(20px);
        // word-wrap:break-word;
        // word-break: break-word;
        height:toRem(35px);
        >span{
           float: right;
           @include sc(toRem(35px),#f0095b);
           &:before{
               content:'￥';
               @include sc(toRem(36px),#f0095b);
               display: inline-block;
           }
       }
    }
    >.group-stage{
        margin-top: toRem(30px);
        >h2{
            height:toRem(66px);
            line-height: toRem(66px);
            padding: 0 toRem(36px) 0 toRem(20px);
            @include sc(toRem(29px),#151516);
            border-top:1px solid #d4d7da;
          >span{
              float: right;
              @include sc(toRem(20px),#4a8aff);
              line-height: toRem(20px);
              margin-top: toRem(24px);
              >i{
                  display: inline-block;
                  vertical-align: middle;
                  @include wh(toRem(15px),toRem(8px));
                  background:url('../../assets/image/arrow-top.png') no-repeat;
                  background-size: 100%;
                  margin-left: toRem(6px);
                  &.active{
                      background:url('../../assets/image/arrow-bottom.png') no-repeat;
                      background-size: 100%;
                  }
              }
          } 
        //   >div{
        //       clear: both;
        //   }
        }
        >.not-open{
            // clear: both;
            // &:nth-child(2){
                //  overflow-x: auto;
                overflow: hidden;
                height:toRem(75px);
                // width: 100%;
                padding-left:toRem(23px);
                margin-bottom: toRem(25px);
               >ul{
                   display: block;
                   height:toRem(75px);
                   width:auto;
                   overflow-x: scroll !important;
                   overflow-y: hidden;
                //    overflow: scroll;
                   white-space: nowrap;
                   >li{
                       padding: toRem(14px) 0 toRem(14px) 0;
                       display: inline-block;
                    //    float: left;
                        @include wh(toRem(103px),toRem(75px));
                        background-color: #eeeeee;
	                    border-radius: 10px;
                        text-align: center;
                        >p{
                            @include sc(toRem(20px),#151516);
                            line-height: toRem(18px);
                            margin-bottom: toRem(11px);
                        }
                        >h3{
                             @include sc(toRem(23px),#3b72ff);
                              line-height: toRem(18px);
                        }
                        margin-right: toRem(18px);
                   }
                   &::-webkit-scrollbar {display:none}
               }
            // }
        }
        >.spread-calendar{
            // height: toRem(623px);
            border-bottom:toRem(4px) solid #000;
        }
    }
    >span{
        height:toRem(18px);
        display: inline-block;
        width:100%;
        background: #eee;
    }
    >.tab-content{
     >ul{
         height:toRem(86px);
         border-bottom:1px solid #d4d7da;
         >li{
             float:left;
             width:33.3%;
             text-align: center;
             >span{
                 display: inline-block;
                 @include sc(toRem(34px),#8f8f8f);
                 line-height: toRem(84px);
             }
             &.active{
                 >span{
                     @include sc(toRem(34px),#1253ac);
                      border-bottom:toRem(6px) solid #2754b0;
                 }
             }
         }
     }
     >div{
        &:nth-child(2){
            padding: toRem(26px) toRem(30px) 0 toRem(30px);
            >img{
                @include wh(100%,toRem(972px));
            }
            >div{
                &:nth-child(2){
                    >h2{
                        height:toRem(66px);
                        line-height: toRem(66px);
                        background-image: linear-gradient(-82deg, #2a64d0 0%, #2ca3bc 43%, #2ee1a8 100%);
                        text-align: center;
                        @include sc(toRem(40px),#fff);
                        margin: toRem(40px) 0 toRem(20px) 0;
                    }
                    >div{
                        >p{
                            @include sc(toRem(28px),#0e0e0e);
                            margin-bottom: toRem(5px);
                        }
                        &:nth-child(2){
                            >img{
                                @include wh(100%,toRem(287px));
                                margin-bottom: toRem(12px);
                            }
                            >div{
                                margin-bottom: toRem(14px);
                                >img{
                                    &:nth-child(1){
                                         @include wh(toRem(258px),toRem(209px));
                                    }
                                     &:nth-child(2){
                                         float: right;
                                         @include wh(toRem(430px),toRem(209px));
                                    }
                                }
                            }
                        }
                        &:nth-child(3){
                            >img{
                                @include wh(toRem(290px),toRem(498px));
                            }
                            >div{
                                float: right;
                                display: inline-block;
                                width:toRem(395px);
                                vertical-align: top;
                                >img{
                                    &:nth-child(1){
                                         @include wh(toRem(395px),toRem(235px));
                                         margin-bottom: toRem(19px);
                                    }
                                     &:nth-child(2){
                                         @include wh(toRem(395px),toRem(235px));
                                    }
                                }
                            }
                        }
                    }
                }
                &:nth-child(3){
                     >h2{
                        height:toRem(66px);
                        line-height: toRem(66px);
                        background-image: linear-gradient(-82deg, #8fc320 0%, #c7de10 0%, #fff800 0%, #f963ff 100%);
                        text-align: center;
                        @include sc(toRem(40px),#fff);
                        margin: toRem(20px) 0 toRem(25px) 0;
                    }
                    >p{
                        >span{
                            display: inline-block;
                            @include sc(toRem(28px),#0e0e0e);
                            width: calc(100% - #{toRem(13px)});
                        }
                        >i{
                            margin-right: toRem(7px);
                        }
                        &:nth-child(2){
                            >i{
                                display: inline-block;
                                @include wh(toRem(6px),toRem(28px));
                                // height:auto;
                                background: url('../../assets/image/i-1.png') no-repeat;
                                background-size: cover;
                            }
                        }
                        &:nth-child(4){
                            margin-bottom: toRem(15px);
                            >span{
                                 text-indent: 32px;
                            }
                            >i{
                                display: inline-block;
                                @include wh(toRem(6px),toRem(145px));
                                background: url('../../assets/image/i-2.png') no-repeat;
                                background-size: cover;
                            }
                        }
                        &:nth-child(8){
                            >span{
                                text-indent: 32px;
                            }
                             >i{
                                display: inline-block;
                                @include wh(toRem(6px),toRem(100px));
                                background: url('../../assets/image/i-3.png') no-repeat;
                                background-size: cover;
                            }
                        }
                    }
                    >img{
                        &:nth-child(3){
                            width:100%;
                            height: toRem(395px);
                        }
                         &:nth-child(5){
                             width:100%;
                            height: toRem(390px);
                        }
                         &:nth-child(6){
                             width:100%;
                            height: toRem(355px);
                        }
                    }
                    >div{
                        >img{
                            @include wh(toRem(349px),toRem(228px));
                            &:last-child{
                                float: right;
                            }
                        }
                    }
                }
                &:nth-child(4){
                    >h2{
                        height:toRem(66px);
                        line-height: toRem(66px);
                        background-image: linear-gradient(94deg, #8fc320 0%, #5dbf55 0%, #2bba89 0%, #178e28 100%);
                        text-align: center;
                        @include sc(toRem(40px),#fff);
                        margin: toRem(57px) 0 toRem(33px) 0;
                    }
                    >img{
                        &:nth-child(2){
                            @include wh(100%,toRem(334px));
                        }
                         &:nth-child(4){
                            @include wh(100%,toRem(306px));
                        }
                         &:nth-child(5){
                            @include wh(100%,toRem(299px));
                        }
                    }
                    >div{
                        font-size: 0;
                        >img{
                            &:nth-child(1){
                                @include wh(toRem(286px),toRem(265px));
                            }
                            &:nth-child(2){
                                width:calc(100% - #{toRem(286px)});
                                height: toRem(265px);
                                //  @include wh(toRem(424.5px),toRem(265px));
                                //  margin-left: toRem(-9px);
                            }
                        }
                    }
                }
            }
        }
        .trip{
            // background: url('../../assets/image/dian.png') repeat;
            // background-size: toRem(2px) 100%;
            margin-left: toRem(40px);
            border-left: toRem(8px) dotted #2a2a2a;
            padding-left: toRem(15px);
            box-sizing: border-box;
            >h1{
             @include sc(toRem(30px),#373737);     
            }
            .title-line{
                position: relative;
                >i{
                    position: absolute;
                    top:toRem(7px);
                    left:toRem(-28px);
                    display: inline-block;
                    @include wh(toRem(18px),toRem(18px));
                    background: url('../../assets/image/yuan.png') no-repeat;
                    background-size: 100%;
                    }
                  @include sc(toRem(26px),#373737);  
                  height: toRem(36px);
                  padding-bottom: toRem(10px);
                  border-bottom: solid 1px #626262;
                  padding-left: toRem(5px);
            }
            .trip-line{
                margin-top: toRem(15px);
                >p{
                    // line-height: toRem(39px);
                    margin-bottom: toRem(16px);
                    >i{
                        display: inline-block;
                        vertical-align: middle;
                        @include wh(toRem(45px),toRem(39px));
                        background: url('../../assets/image/jipiao.png') no-repeat;
                        background-size: 100%; 
                        margin-right: toRem(7px); 
                    }
                    @include sc(toRem(24px),#29abe2);
                    >span{
                      @include sc(toRem(20px),#373737);
                      margin-left: toRem(20px);
                      >i{
                        display: inline-block;
                        @include wh(toRem(33px),toRem(11px));
                        background: url('../../assets/image/xc-right.png') no-repeat;
                        background-size: 100%;  
                    }  
                    }
                }
                >div{
                    border:1px solid #626262;
                    padding: toRem(19px) toRem(26px) toRem(19px) toRem(19px);
                    border-radius: toRem(4px);
                    >div{
                        display: inline-block;
                        &:nth-child(1){
                            width:toRem(373px);
                            >h1{
                               @include sc(toRem(26px),#434343);
                               padding-left: toRem(19px); 
                               >span{
                                  @include sc(toRem(26px),#434343); 
                                  float: right; 
                                  margin-right:toRem(35px); 
                               }
                            }
                            >h2{
                                @include sc(toRem(19px),#29abe2); 
                                padding-left: toRem(10px);
                                margin-top:toRem(10px);
                                 >i{
                                    display: inline-block;
                                    @include wh(toRem(130px),toRem(22px));
                                    background: url('../../assets/image/fly.png') no-repeat;
                                    background-size: 100%;  
                                    margin: 0 toRem(29px);
                                }
                                // margin-bottom: toRem(5px);  
                            }
                            >p{
                                 @include sc(toRem(18px),#434343); 
                                 >span{
                                     @include sc(toRem(18px),#434343); 
                                     float: right;
                                     >i{
                                        @include sc(toRem(18px),#0c86ee);  
                                     }
                                 }
                            }
                        }
                        &:nth-child(2){
                            width:toRem(90px);
                            vertical-align: top;
                            margin-top: toRem(5px);
                            margin-left: toRem(39px);
                            >p{
                                @include sc(toRem(20px),#434343); 
                            }
                        }
                    }
                    >span{
                        display: inline-block;
                        vertical-align: top;
                        float: right;
                        @include sc(toRem(20px),#434343); 
                        margin-top: toRem(30px);
                    }
                }
            }
            .hotel,.entertainment{
                >h2{
                    >i{
                       display: inline-block;
                        @include wh(toRem(42px),toRem(37px));
                        background: url('../../assets/image/jiudian.png') no-repeat;
                        background-size: 100%;  
                    }
                     @include sc(toRem(24px),#dc9023);
                     margin-top: toRem(21px);
                }
                >p{
                    @include sc(toRem(20px),#373737);
                }
                >div{
                    font-size: 0;
                    >img{
                        @include wh(toRem(319px),toRem(202px));
                        &:nth-child(2){
                            float: right;
                        }
                    }
                }
            }
            .scene{
                >h2{
                    >i{
                       display: inline-block;
                        @include wh(toRem(27px),toRem(37px));
                        background: url('../../assets/image/jingdian.png') no-repeat;
                        background-size: 100%;  
                    }
                     @include sc(toRem(24px),#dc9023);
                     margin-top: toRem(21px);
                }
                >div{
                    >h3{
                        @include sc(toRem(20px),#373737);
                        margin-bottom: toRem(5px);
                    }
                    >p{
                        @include sc(toRem(18px),#303030);
                    }
                    >div{
                        font-size: 0;
                    >img{
                        @include wh(toRem(319px),toRem(202px));
                        &:nth-child(2){
                            float: right;
                        }
                    }
                    }
                }
            }
            >div{
               margin-bottom: toRem(70px);
            }
        }
         
     }
    }
    >.details-bottom{
        width: 100%;
        height:toRem(84px);
        position: fixed;
        bottom:0;
        >div{
            position: relative;
            >ul{
            display: inline-block;
            width: calc(100% - #{toRem(420px)});
            background: #eee;
            height:toRem(84px);
            >li{
                float: left;
                width: 33.3%;
                text-align: center;
                padding-top:toRem(9px);
                >img{
                    @include wh(toRem(50px),toRem(40px));
                    display: block;
                    margin: auto;
                    margin-bottom: toRem(5px);
                }
                >p{
                    @include sc(toRem(18px),#1c1c1c);
                }
            }
        }
        >a{
            position: absolute;
            right:0;
            top: 0;
            width: toRem(422px);
            // display: inline-block;
            // vertical-align: top;
            background: #1e5cab;
            height:toRem(85px);
            line-height: toRem(85px);
            text-align: center;
            @include sc(toRem(30px),#fff);
            >span{
                @include sc(toRem(20px),#fff);
            }
            // margin-left: toRem(-3px);
        }
        }
    }
}
</style>

