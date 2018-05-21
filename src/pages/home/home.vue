<!-- h5微商城首页 -->
<template>
  <div class="home">
     <!-- <Loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
      <div class="header-logo">
          <img src="../../assets/image/logo.png" alt="">
          <div>
               <img src="../../assets/image/line.png" alt="">
               <p>在线客服</p>
          </div>
      </div>
      <img class="home-bg" src="../../assets/image/home-bg.png" alt="">
      <div class="company-about">
          <div>
              <p>公司名称：海南事达国际旅行社上海分公司</p>
              <p>电话：010-58695235</p>
              <p>微信号：859465235</p>
              <p>客服热线：021-2585242</p>
          </div>
          <div>
              <img src="" alt="">
              <p>长按识别二维码</p>
          </div>
      </div>
       <!-- 跟团游/自由行/半自助游/机票+酒店 -->
        <div class="travel-type">
            <a href="javascript:;" v-for="(item,index) in productType" :class="productType.length==3?'esp':''">
                <img :src="i.image" alt="" v-for="(i,ind) in travelType" v-if="index==ind">
                <p>{{item.producttype}}</p>
            </a>
        </div>
        <div class="tab-content">
            <ul>
                <li v-for="(tab,index) in tabList" @click="tabIndex=index" :class="tabIndex==index?'active':''"><span>{{tab.name}}</span></li>
            </ul>
            <div v-if="tabIndex==0">
                <div class="search-content">
                     <input type="text" placeholder="点击输入关键词/目的地/景点"  @click="toSearch()">
                     <i></i>
                </div>
                <div>
                    <router-link v-for="(hot,index) in homeProductList" :to="{path:'/details/'+'13D76550-8963-4F8F-8AE8-193D9A8D6FC0'}" @click.native="go('/details','13D76550-8963-4F8F-8AE8-193D9A8D6FC0')">
                        <div>
                            <img :src="apiUrl+hot.coverImg" alt="">
                            <i @click.stop.prevent="collectedFun(index)" :class="select==true&&num==index?'active':''"></i>
                        </div>
                        <div>
                            <h2>{{hot.aliaseName}}</h2>
                            <p><span v-if="userType==2 && homeSite==site.sitename" v-for="site in hot.sites">{{site.directprice}}</span><i>销量100{{hot.sales}}</i></p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-if="tabIndex==1">
                <div class="search-content">
                     <input type="text" placeholder="点击输入关键词/目的地/景点"  @click="toSearch()">
                     <i></i>
                </div>
                <div>
                     <!-- <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
                    <router-link v-for="(hot,index) in homeProductList" :to="{path:'/details/'}" @click.native="go('/details','13D76550-8963-4F8F-8AE8-193D9A8D6FC0')">
                        <div>
                            <img :src="apiUrl+hot.coverImg" alt="">
                            <i @click.stop.prevent="collectedFun(index)" :class="select==true&&num==index?'active':''"></i>
                        </div>
                        <div>
                            <h2>{{hot.aliaseName}}</h2>
                            <p><span v-if="userType==2 && homeSite==site.sitename" v-for="site in hot.sites">{{site.directprice}}</span><i>销量100{{hot.sales}}</i></p>
                        </div>
                    </router-link>
                     <!-- </v-loadmore> -->
                </div>
            </div>       
        </div>
     <!-- </Loadmore> -->
    <!-- 底部组件 -->
    <footerView :footerObject="footerObject"></footerView>
  </div>
</template>
<script>
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import footerView from '../../components/footer'
import Vue from 'vue'
import axios from 'axios'
import { getHomeList,getProductType,getDetail } from '../../services/index';
import { mapState, mapActions, mapMutations } from 'vuex'
import tools from '../../common/tools'
import { apiUrl } from '../../common/env'
export default {
  data() {
    return {
     apiUrl:'',
     footerObject: '',
     tabIndex:0,//tab切换初始值
     select:false,//是否收藏
     num:'',
     homeSite:'',//站点
     userType:'',//用户类型
     travelType:[
         {
            image:require('../../assets/image/home-type-1.png'),
            name:'跟团游',
         },
         {
            image:require('../../assets/image/home-type-2.png'),
            name:'自由行',
         },
         {
            image:require('../../assets/image/home-type-3.png'),
            name:'半自助游',
         },
         {
            image:require('../../assets/image/home-type-4.png'),
            name:'机票+酒店',
         }
     ],
     productType:[],
    //  热门推荐列表
     homeProductList:[
        //  {
        //      image:require('../../assets/image/hot-1.png'),
        //      content:'海南三亚4日3晚跟团游(5钻)·【小长假精选】',
        //      price:3899.00,  
        //      sales:120,         
        //  },    
     ],
    //  tab切换选项
    tabList:[
        {name:'热门推荐'},
        {name:'全部线路'},
    ],
    page:0,
    allLoaded:false,
    }
  },
   components: {
      footerView,
      Loadmore 
    },
    // filters:{
    //     format:function(value){
    //     // var html,_val;
    //     value =Number(value).toFixed(2);
    //     // if(value==0){
    //     //     value=0;
    //     //     return 0;
    //     // }else if(value.split('.')[1].substring(1)==0){
    //     //     value = Number(value).toFixed(1);
    //     // }
    //     // _val = value.split('.');
    //     // return html = '￥<span>'+_val[0]+'</span><em>.'+_val[1]+'</em>';
    // }
    // },
    computed: {

    },
  methods: {
   ...mapActions(['getHomeList','getProductType','getDetail']),
   collectedFun(index){
        this.num=index;
        this.select=!this.select;
   },
   toSearch(){
       this.$router.push('/search-list');
   },
   getInitList(page){
        let that = this;
        let params = {
            "start":page
        };
        that.apiUrl=apiUrl;
        getHomeList(params).then(function(response) {
            console.log(response);
            console.log(response.meta.success);
            if(response.meta.success==true){
                 for(let i = 0; i < response.data.page.content.length; i++) {
                            that.homeProductList.push(response.data.page.content[i]);
                        }
                // that.homeProductList=response.data.page.content;
                that.homeSite=response.data.site;
                console.log(response.data.page.content);
                console.log('数据获取成功');
                if(response.data.userType==2){
                    that.userType=2;
                }
                else if(response.data.userType==1){
                    that.userType=1;
                }
                else if(response.data.userType==3){
                    that.userType=3;
                }
            }
            else{
                console.log('数据获取失败');
            }
        }).catch(function(err) {
            that.$Message.info('接口获取失败');
        });
        // 获取产品类型
        getProductType(params).then(function(response){
         console.log('获取产品类型区');
         console.log(response);
          if(response.meta.success==true){
              console.log('数据获取成功');
              that.productType=response.data;
          }
          else{
              console.log('数据获取失败');
          }
        }).catch(function(err){
            that.$Message.info('接口获取失败');
        });
   },
    //跳转方法
      go(url, key, id) {
        //跳转到对应详情
         let params='13D76550-8963-4F8F-8AE8-193D9A8D6FC0';
        if (url == '/details') {
          console.log(url, key, id);
          getDetail(params).then(function(response){
              console.log('请求详情接口成功');
          });
        }
      },
         //下拉加载  
    //   loadTop() { 
    //       this.homeProductList = [];
    //     this.getInitList(0);  
    //     this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位 
    //   },
      loadBottom() {
        // 上拉加载  
        alert('0');
        if(this.page>=this.totalCount/10){
            this.allLoaded=true;
        }
        this.more();// 上拉触发的分页查询  
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
    },
   
      more(){  
          // 分页查询  
         this.page++;
         this.getInitList(this.page); 
       },
  },
  mounted(){
    this.getInitList(0);
  }
}
</script>
<style lang="scss">
.home{
    padding-bottom: toRem(134px);
    overflow-y: auto;
    height: 100vh;
   .header-logo{
     padding:toRem(22px) toRem(28px) toRem(9px) toRem(33px);
     >img{
        @include wh(toRem(229px),toRem(69px));
     }
     >div{
         float: right;
         margin-top: toRem(-10px);
         >img{
             @include wh(toRem(63px),toRem(63px)); 
             border-radius: 50%;
             display: block;
             margin-bottom: toRem(6px);
             margin: auto;
         }
         >p{
             @include sc(toRem(18px),#211f2c);
         }
     }
 }
 .home-bg{
    width:100vw;
    height:toRem(370px);
    display: block;
 }
 .company-about{
     padding: toRem(24px) toRem(44px) 0 toRem(29px);
     margin-bottom: toRem(24px);
     >div{
         display: inline-block;
         &:nth-child(1){
            >p{
             @include sc(toRem(22px),#2a5f8e);
             line-height: toRem(22px);
             margin-bottom: toRem(16px);
           }
         }
         &:nth-child(2){
             float: right;
             vertical-align: top;
             >img{
                display: block;
                @include wh(toRem(130px),toRem(130px));  
                background: #eee;
                margin-bottom: toRem(7px);
             }
            >p{
             @include sc(toRem(18px),#2a5f8e);
           }
         }
     }
 }
 .travel-type{
     >a{
         display: inline-block;
         margin-left: toRem(54px);
         >img{
             @include wh(toRem(121px),toRem(121px)); 
             border-radius:50%; 
         }
         >p{
             @include sc(toRem(26px),#252525);
             text-align: center;
             line-height: toRem(26px);
             margin-bottom: toRem(14px);
         }
         &.esp{
             margin-left: toRem(100px);
         }
     }
     &:after{
         content:'';
         display: block;
         height:toRem(18px);
         background: #eee;
     }
 }
 .tab-content{
     >ul{
         height:toRem(86px);
         border-bottom:1px solid #d4d7da;
         >li{
             float:left;
             width:50%;
             text-align: center;
             >span{
                 display: inline-block;
                 @include sc(toRem(34px),#8f8f8f);
                 line-height: toRem(84px);
             }
             &.active{
                 >span{
                     @include sc(toRem(34px),#0082c2);
                      border-bottom:toRem(6px) solid #00a0e9;
                 }
             }
         }
     }
     >div{
         clear: both;
         &:nth-child(2){
             padding: toRem(30px) toRem(48px) 0 toRem(48px);
             .search-content{
                position: relative;
                >input{
                   width:100%;
                   height:toRem(55px);
                   padding-left: toRem(59px);
                   margin-bottom: toRem(36px);
                   box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.13);
	               border: solid 1px #00a0e9;
                   line-height: toRem(55px);
                }
                >input::placeholder{
                    @include sc(toRem(21px),#858585);
                    //  &:before{
                    //     display: inline-block;
                    //     @include wh(toRem(38px),toRem(38px));
                    //     background:url("../../assets/image/search.png") no-repeat;
                    //     background-size: 100%;
                    //  }
                }
                >i{
                position: absolute;
                z-index: 100;
                top: toRem(10px);
                left: toRem(14px);
                width: toRem(35px);
                height: toRem(35px);
                background: url("../../assets/image/search.png") no-repeat 0 0;
                background-size: toRem(35px) toRem(35px);
                }
             }
             >div{
                //   max-height: toRem(1111px);
                //   overflow-y: auto;
                 >a{
                     display: inline-block;
                     margin-bottom: toRem(30px);
                     vertical-align: top;
                     >div{
                         &:nth-child(1){
                            @include wh(toRem(306px),toRem(306px));
                            position: relative;
                            >img{
                                @include wh(toRem(306px),toRem(306px));
                            }
                            >i{
                                position: absolute;
                                display: inline-block;
                                bottom:toRem(14px);
                                right:toRem(18px);
                                @include wh(toRem(35px),toRem(32px));
                                background:url("../../assets/image/not-collection.png") no-repeat;
                                background-size: 100%;
                                &.active{
                                   background:url("../../assets/image/collection.png") no-repeat;
                                   background-size: 100%;  
                                }
                            }
                         }
                          &:nth-child(2){
                              width:toRem(306px);
                              >h2{
                                 @include sc(toRem(20px),#252525);
                                 margin-top: toRem(5px); 
                              }
                              >p{
                                 >span{
                                     &:before{
                                         content:'￥';
                                         @include sc(toRem(26px),#ff414b);
                                     }
                                     @include sc(toRem(32px),#ff414b);
                                     line-height: toRem(32px);
                                     &:after{
                                          content:'起';
                                         @include sc(toRem(18px),#ff414b);
                                     }
                                 } 
                                 >i{
                                     display: inline-block;
                                     vertical-align: top;
                                     margin-top: 6px;
                                     float: right;
                                     @include sc(toRem(17px),#b4b4b4);
                                 }
                              }
                         }
                     }
                     &:nth-child(odd){
                         margin-right: toRem(60px);
                     }
                 }
             }    
         }
          &:nth-child(3){
           

         }
     }
 }
}
</style>
